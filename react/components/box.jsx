var utils = require('../utils.js');

var styles = {
	outer: {
		border: '2px solid black',
		borderRadius: 5,
		position: 'relative',
		height: 400,
		cursor: 'pointer',
		':hover': {
			color: 'white'
		}
	},
	top: {
		borderBottom: '1px solid black'
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
module.exports = Radium(React.createClass({
	getInitialState: function() {
		return {
			colorCss: this.mapColor()
		}
	},
	
	handleClick: function() {
		window.open(this.props.data.url);
	},

	mouseOver: function(e) {
		var $el = $(React.findDOMNode(this.refs.outer));
		$el.animate({
			left: '-=10px',
			top: '-=10px',
			height: '+=' + 20 + 'px',
			width: '+=' + 20 + 'px'
		});
	},

	mouseOut: function(e) {
		var $el = $(React.findDOMNode(this.refs.outer));
		$el.finish();
		$el.animate({
			left: '+=10px',
			top: '+=10px',
			height: '-=' + 20 + 'px',
			width: '-=' + 20 + 'px'
		});
	},

	/*
	Map sentiment score of 0-1 into a background-color property
	*/
	mapColor: function() {
		var range = 1 / fiftyShadesOfGrey.length;
		for (var i = 1; i < fiftyShadesOfGrey.length; i++) {
			if (this.props.data.sentiment < (i * range)) {
				return {backgroundColor: fiftyShadesOfGrey[i]};
			}	
		}
		return {backgroundColor: fiftyShadesOfGrey[i]};
	},

	render: function() {
		return (
			<div style={utils.m(styles.outer, this.state.colorCss)}
			 ref="outer"
			 onClick={this.handleClick} 
			 onMouseEnter={this.mouseOver} 
			 onMouseLeave={this.mouseOut} >
			 	<div style={styles.top}>
					<div style={styles.title}>
						{this.props.data.title}
					</div>
					<div style={styles.source}>
						{this.props.data.source}
					</div>
				</div>
			</div>
		)
	}
}));