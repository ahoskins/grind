var utils = require('../utils.js');

var styles = {
	outer: {
		border: '2px solid black',
		borderRadius: 5,
		cursor: 'pointer',
		margin: 10
	},
	title: {
		fontWeight: 'bold'
	},
	source: {
		fontStyle: 'italic'
	}
}

// format this is a title, content author, url
// it will always be the same width
// the shade will depend on the level of sentiment

// the prop is a 'result' type
module.exports = React.createClass({
	getInitialState: function() {
		return {
		}
	},
	
	handleClick: function() {
		window.open(this.props.data.Url);
	},

	render: function() {
		return (
			<div style={utils.m(styles.outer)} onClick={this.handleClick}>
			 	<div style={styles.top}>
					<div style={styles.title}>
						{this.props.data.Title}
					</div>
					<div style={styles.source}>
						{this.props.data.Website}
					</div>
				</div>
			</div>
		)
	}
});