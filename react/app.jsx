var Results = require('./components/results.jsx'),
	Search = require('./components/search.jsx'),
	Footer = require('./components/footer.jsx');

var styles = {
	root: {
		display: 'flex',
    	flexFlow: 'column',
    	height: '100%'
	}
}

// for .NET
//   - sort the results in order of sentiment!

// Things to figure out
// 
// three articles looks good
// 	- map sentiment score to a certain color/shade
//  - mouse hover increases the size, or at least the color changes a bit
//  - top part of box (title, source, link clicks to url)
//  - bottom part of box (summary, sentiment score)

// - hook up search to Gind.net API, return data, and fill

// data flows down
//   data from node.js comes in here as props for Results
// events flow up

// request happens here, and passes new data onto results
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
			currentQuery: null
		}
	},

	/*
	if xNextUrl add it to the request
	decrement the performance score and set xNextUrl to null if a response DOES NOT have NextUrl in JSON
	*/
	request: function(query) {
		var deferred = Q.defer();
		if (this.state.xNextUrl !== null) {
			$.ajax(url + this.state.performanceCount + '/' + query, {
				headers: {
					'X-Next-Url': this.state.xNextUrl
				}
			}).done(function(data, status) {
				deferred.resolve(data, status);
			});
		} else {
			$.ajax(url + this.state.performanceCount + '/' + query).done(function(data, status) {
				deferred.resolve(data, status);
			});
		}

		return deferred.promise;
	},

	process: function(d, s) {
		// parse the articles into the queue
		var data = JSON.parse(d);
		this.setState({articleQueue: this.state.articleQueue.concat(data.NewsItems)});

		// If NextUrl isn't there, decrement the performance and set xNextUrl == null in the state
		if (data.NextUrl === null) {
			this.setState({performanceCount: this.state.performanceCount - 1});
			this.setState({xNextUrl: null});
		} else {
			this.setState({xNextUrl: data.NextUrl});
		}

		// take the first off the queue, and put into proper list
		var item = this.state.articleQueue.shift();
		this.insertItemIntoList(item);
	},

	insertItemIntoList: function(item) {
		if (item.SentimentScore < 0.33) {
			var flag = false;
			this.state.negativeList.forEach(function(i) {
				if (i.Title === item.Title) {
					flag = true
				}
			});
			if (!flag) this.setState({negativeList: this.state.negativeList.concat(item)});
			// this.state.negativeList.unshift(item)
		} else if (item.SentimentScore < 0.66) {
			var flag = false;
			this.state.neutralList.forEach(function(i) {
				if (i.Title === item.Title) {
					flag = true
				}
			});
			// this.state.neutralList.unshift(item);
			if (!flag) this.setState({neutralList: this.state.neutralList.concat(item)});
		} else {
			// this.state.positiveList.unshift(item);
			var flag = false;
			this.state.negativeList.forEach(function(i) {
				if (i.Title === item.Title) {
					flag = true
				}
			});
			if (!flag) this.setState({positiveList: this.state.positiveList.concat(item)});
		}
	},

	itemIntoList: function(query) {
		if (this.state.articleQueue.length === 0) {
			this.request(query).then(this.process);
		} else {
			// pop the first, look at sentiment score, and append to a list
			var item = this.state.articleQueue.shift();
			this.insertItemIntoList(item);
		}
	},

	produceArticle: function(query) {
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
			<div style={styles.root}>
				<Search handler={this.produceArticle}/>
				<Results positive={this.state.positiveList} 
				 negative={this.state.negativeList}
				 neutral={this.state.neutralList} />
				<Footer />
			</div>
		)
	}
});