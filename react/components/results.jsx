var Box = require('./box.jsx');
var utils = require('../utils.js');

// three equal sections...two divider lines and labels at the bottom
// three divs that take up the entire horizontal space


var styles = {
	third: {
		flex: '1 1 auto',
		display: 'flex'
	},
	borderRight: {
		borderRight: '2px solid black'
	},
	content: {
		display: 'flex',
		flex: '1 1 auto'
	}
};

module.exports = React.createClass({
	// positive is an array of elements, for each, make a box passing it as state
	var positiveList = this.props.positive.map(function(el) {
		return (
			<Box data={el} />
		)
	});
	var negativeList = this.props.negative.map(function(el) {
		return (
			<Box data={el} />
		)
	});
	var neutralList = this.props.neutral.map(function(el) {
		return (
			<Box data={el} />
		)
	});

	render: function() {
		return (
			<div style={styles.content}>
				<div style={utils.m(styles.third, styles.borderRight)}>
					{negativeList}
				</div>
				<div style={utils.m(styles.third, styles.borderRight)}>
					{neutralList}
				</div>
				<div style={styles.third}>
					{positiveList}
				</div>
			</div>
		)
	}
});