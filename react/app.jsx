var Results = require('./components/results.jsx'),
	Search = require('./components/search.jsx'),
	Footer = require('./components/footer.jsx');

var styles = {
	root: {
    	height: '100%'
	}
}

var url = 'http://grind.cloudapp.net/news/';

module.exports = React.createClass({
	getInitialState: function() {
		return {
			articleQueue: [],
			positiveList: [],
			neutralList: [],
			negativeList: [],
			performanceCount: 10,
			xNextUrl: null,
			currentQuery: null,
			requestInProgress: false
		}
	},

	/*
	if xNextUrl add it to the request
	decrement the performance score and set xNextUrl to null if a response DOES NOT have NextUrl in JSON
	*/
	request: function(query) {
		var self = this;
		var deferred = Q.defer();
		// add header for next-url if it's there
		this.setState({requestInProgress: true});
		if (this.state.xNextUrl !== null) {
			$.ajax(url + this.state.performanceCount + '/' + query, {
				headers: {
					'X-Next-Url': this.state.xNextUrl
				}
			}).done(function(data, status) {
				self.setState({requestInProgress: false});
				deferred.resolve(data, status);
			});
		} else {
			$.ajax(url + this.state.performanceCount + '/' + query).done(function(data, status) {
				self.setState({requestInProgress: false});
				deferred.resolve(data, status);
			});
		}

		return deferred.promise;
	},

	process: function(d, s) {
		// parse the articles into the queue
		var data = JSON.parse(d);

		// If NextUrl isn't there, decrement the performance and set xNextUrl == null in the state
		if (data.NextUrl === null) {
			this.setState({
				performanceCount: this.state.performanceCount - 1,
				xNextUrl: null
			});
		} else {
			this.setState({xNextUrl: data.NextUrl});
		}

		if (data.NewsItems.length !== 0) {
			// insert first item into list and rest into the queue
			this.insertItemIntoList(data.NewsItems[0]);
			this.setState({articleQueue: this.state.articleQueue.concat(data.NewsItems.slice(1))});
		} else {
			if (this.state.performanceCount < 0) {
				// don't request again
				alert('Sorry, no articles available!');
				return;
			} 
			// didn't get anything, request and process again
			this.request(this.state.currentQuery).then(this.process);
		}
	},

	insertItemIntoList: function(item) {
		var flag = false;
		this.state.negativeList.forEach(function(i) {
			if (i.Title === item.Title) {
				flag = true
			}
		});
		this.state.neutralList.forEach(function(i) {
			if (i.Title === item.Title) {
				flag = true
			}
		});
		this.state.negativeList.forEach(function(i) {
			if (i.Title === item.Title) {
				flag = true
			}
		});

		if (item.SentimentScore < 0.33) {
			if (!flag) this.setState({negativeList: this.state.negativeList.concat(item)});
		} else if (item.SentimentScore < 0.66) {
			if (!flag) this.setState({neutralList: this.state.neutralList.concat(item)});
		} else {
			if (!flag) this.setState({positiveList: this.state.positiveList.concat(item)});
		}
	},

	itemIntoList: function(query) {
		// make sure article queue 
		for (var o in this.state.articleQueue) {
			if ($.isEmptyObject(o)) {
				this.state.articleQueue.length = 0;
			}
		}
		if (this.state.articleQueue.length === 0) {
			this.request(query).then(this.process);
		} else {
			// pop the first, look at sentiment score, and append to a list
			var item = this.state.articleQueue.shift();
			this.insertItemIntoList(item);
		}
	},

	produceArticle: function(query) {
		if (query[0] === '#') {
			query = query.slice(1);
		}
		// clear it all because a new search is made
		// wait for it to clear before doing the new search
		if (query !== this.state.currentQuery || this.state.currentQuery === null) {
			this.setState({
				currentQuery: query,
				articleQueue: [],
				positiveList: [],
				neutralList: [],
				negativeList: [],
				xNextUrl: null,
				performanceCount: 10
			}, this.itemIntoList.bind(this, query));
		} else {
			this.itemIntoList(query);
		}
	},

	render: function() {
		return (
			<div className="display-flex column-flow" style={styles.root}>
				<Search handler={this.produceArticle} query={this.state.currentQuery} requestInProgress={this.state.requestInProgress}/>
				<Footer />
				<Results positive={this.state.positiveList} 
				 negative={this.state.negativeList}
				 neutral={this.state.neutralList}
				 handler={this.produceArticle} />
			</div>
		)
	}
});