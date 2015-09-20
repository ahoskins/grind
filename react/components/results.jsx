var Box = require('./box.jsx');
var utils = require('../utils.js');

var styles = {
	third: {
		flex: '0 0 33%'
	},
	borderRight: {
		borderRight: '2px solid #607D8B'
	},
	content: {
		display: 'flex',
		flex: '1 1 auto'
	},
	box: {
		backgroundColor: 'hsl(50%, 50%, 50%)',
		transition: 'all 1250ms ease'
	}
};

module.exports = React.createClass({

	cb: function(string) {
		this.props.cb(string);
	},

	// first and second have refs...enough to know the starting point and position of all others
	render: function() {
		var self = this;
		var positiveList = this.props.positive.map(function(el, i) {
			return (
				<Box style={styles.box} data={el} cb={self.cb} key={el.Title} />
			)
		});
		var negativeList = this.props.negative.map(function(el, i) {
			return (
				<Box style={styles.box} data={el} cb={self.cb} key={el.Title} />
			)
		});
		var neutralList = this.props.neutral.map(function(el, i) {
			return (
				<Box style={styles.box} data={el} cb={self.cb} key={el.Title} />
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