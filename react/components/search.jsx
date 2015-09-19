var utils = require('../utils.js');

var styles = {
	search: {
		width: 300,
		margin: '0 auto'
	},
	pad: {
		paddingBottom: 20
	},
	labelPadding: {
		padding: '5px 0px'
	},
	center: {
		textAlign: 'center'
	}
};

module.exports = React.createClass({
	getInitialState: function() {
		return {
			query: ''
		}
	},

	handleChange: function() {

	},

	render: function() {
		return (
			<div style={utils.m(styles.center, styles.pad)}>
				<input style={styles.search} onChange={this.handleChange} value={this.state.query} type="email" placeholder="angular scope, closures" />
			</div>
		)
	}
});