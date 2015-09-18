var Test = require('./components/test.jsx');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			data: 'data'
		}
	},

	render: function() {
		return (
			<div>
				Testing testing
				<Test />
			</div>
		)
	}
});