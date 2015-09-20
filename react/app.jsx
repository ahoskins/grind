var Results = require('./components/results.jsx'),
	Search = require('./components/search.jsx'),
	Footer = require('./components/footer.jsx');

var dummyData = [
	{
		title: 'Edmonton Oilers Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		keywords: 'hockey mcdavid edmonton',
		sentiment: 0.5
	},
	{
		title: 'Edmonton Oilers Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		sentiment: 0.8
	},
	{
		title: 'Edmonton Oilers Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		sentiment: 0.2
	}
];

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
			xNextUrl: null
		}
	},

	/*
	if xNextUrl add it to the request
	decrement the performance score and set xNextUrl to null if a response DOES NOT have X-Next-Url
	*/
	request: function() {
		var extra = {};
		if (xNextUrl !== null) {
			extra['X-Next-Url'] = xNextUrl;
		}
		$.get(url + performanceCount + '/' + query, extra, function(data, status) {

		});
	},

	produceArticle: function(query) {
		// on first load, and on fast clicks maybe
		if (articleQueue.length === 0) {
			this.request();
		} else {
			// pop the first, look at sentiment score, and append to a list
			var item = articleQueue.shift();

			if (articleQueue.length === 0) {
				// pro-actively request more articles
				this.request();
			}
		}
	},

	render: function() {
		return (
			<div style={styles.root}>
				<Search handler={this.productArticle}/>
				<Results positive={this.state.positiveList} 
				 negative={this.state.negativeList}
				 neutral={this.state.neutralList} />
				<Footer />
			</div>
		)
	}
});