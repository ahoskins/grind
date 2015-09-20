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

var fiftyShadesOfGrey = ['#9E9E9E', '#BDBDBD', '#E0E0E0', '#EEEEEE'];

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

	// mouseOver: function(e) {
	// 	var $el = $(React.findDOMNode(this.refs.outer));
	// 	var pos = $el.css('position');
	// 	$el.css('position', 'relative');
	// 	$el.animate({
	// 		left: '-=10px',
	// 		top: '-=10px',
	// 		height: '+=' + 20 + 'px',
	// 		width: '+=' + 20 + 'px'
	// 	});
	// },

	// mouseOut: function(e) {
	// 	var $el = $(React.findDOMNode(this.refs.outer));
	// 	$el.finish();
	// 	$el.animate({
	// 		left: '+=10px',
	// 		top: '+=10px',
	// 		height: '-=' + 20 + 'px',
	// 		width: '-=' + 20 + 'px'
	// 	}, function() {
	// 		// change position back to it resizes correctly
	// 		$el.css('position', 'static');
	// 	});
	// },

	// /*
	// Map sentiment score of 0-1 into a background-color property
	// */
	// mapColor: function() {
	// 	var range = 1 / fiftyShadesOfGrey.length;
	// 	for (var i = 1; i < fiftyShadesOfGrey.length; i++) {
	// 		if (this.props.data.sentiment < (i * range)) {
	// 			return {backgroundColor: fiftyShadesOfGrey[i]};
	// 		}	
	// 	}
	// 	return {backgroundColor: fiftyShadesOfGrey[i]};
	// },

	render: function() {
		return (
			<div style={utils.m(styles.outer)}
			 ref="outer"
			 onClick={this.handleClick} 
			 onMouseEnter={this.mouseOver} 
			 onMouseLeave={this.mouseOut} >
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