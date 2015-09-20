var Box = require('./box.jsx');
var utils = require('../utils.js'),
MagicMove = require('../../public/react-magic-move.js');

// three equal sections...two divider lines and labels at the bottom
// three divs that take up the entire horizontal space

				// <div>
				// 	<Box style={styles.newItem} data={this.props.newItem} ref="newItem" />
				// </div>


var styles = {
	third: {
		flex: '0 0 33%'
	},
	borderRight: {
		borderRight: '2px solid black'
	},
	content: {
		display: 'flex',
		flex: '1 1 auto'
	},
	hide: {
		display: 'none'
	}
};

module.exports = React.createClass({
	// first and second have refs...enough to know the starting point and position of all others
	render: function() {
		var positiveList = this.props.positive.map(function(el, i) {
			return (
				<Box data={el} key={el.Title} />
			)
		});
		var negativeList = this.props.negative.map(function(el, i) {
			return (
				<Box data={el} key={el.Title} />
			)
		});
		var neutralList = this.props.neutral.map(function(el, i) {
			return (
				<Box data={el} key={el.Title} />
			)
		});

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