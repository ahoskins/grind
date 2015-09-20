var utils = require('../utils.js');

var styles = {
	outer: {
		border: '2px solid black',
		borderRadius: 5,
		cursor: 'pointer',
		margin: 10,
		padding: 5
	},
	title: {
		fontWeight: 'bold'
	},
	source: {
		fontStyle: 'italic'
	},
	hashtags: {
		margin: 2,
		cursor: 'pointer',
		textDecoration: 'underline',
		textColor: 'blue'
	}
}

var map = {

}

// format this is a title, content author, url
// it will always be the same width
// the shade will depend on the level of sentiment
var no = false;

// the prop is a 'result' type
module.exports = React.createClass({
	getInitialState: function() {
		return {
		}
	},

	/*
	return a string representing the sentiment level
	*/
	mapSentiment: function(score) {
		if (score < 0.15) {
			return 'Very Negative';
		} else if (score < 0.33) {
			return 'Negative';
		} else if (score < 0.66) {
			return 'Neutral';
		} else if (score < 0.8) {
			return 'Positive';
		} else {
			return 'Very Positive';
		}
	},
	
	handleClick: function() {
		if (no) {
			no = false;
			return;
		}
		window.open(this.props.data.Url);
	},

	searchIt: function(s, e) {
		no = true;
		this.props.cb(s);
	},

	render: function() {
		var kws = [];
		for (var each in this.props.data.KeyWords) {
			var string = '#' + each;
			kws.push(<span style={styles.hashtags} onClick={this.searchIt.bind(this, string)}>{string}</span>);
		}

		return (
			<div style={styles.outer} onClick={this.handleClick}>
				<div style={styles.title}>
					{this.props.data.Title}
				</div>
				<div style={styles.source}>
					{this.props.data.Website}
				</div>
				<div style={styles.source}>
					Sentiment Level: {this.mapSentiment(this.props.data.SentimentScore)}
				</div>
				<div style={styles.source}>
					{kws}
				</div>
			</div>
		)
	}
});