var utils = require('../utils.js');

var styles = {
	search: {
		width: 300,
		margin: '0 auto',
		margin: 15
	},
	header: {
		flex: '0 1 auto',
		textAlign: 'center'
	},
	banner: {
		backgroundColor: '#03A9F4',
		fontSize: '2em'
	}
};

module.exports = React.createClass({
	getInitialState: function() {
		return {
			query: ''
		}
	},

	// update the state to reflect the search query
	handleChange: function(e) {
		this.setState({query: e.target.value});
	},

	componentWillReceiveProps: function(newProps) {
		if (newProps.newQuery === null) return;
		this.setState({query: newProps.newQuery});
	},

	// when a click is made, handle it in the parent
	// if there is data in the queue, dequeue, otherwise hit the API
	produceArticle: function() {
		if (this.state.query === '') {
			return;
		} 
		this.props.handler(this.state.query);
	},

	render: function() {
		return (
			<div style={styles.header}>
				<div style={styles.banner}>Grind</div>
				<input style={styles.search} onChange={this.handleChange} value={this.state.query} type="email" placeholder="apple iphone, isis, oil price" />
				<button onClick={this.produceArticle}>Article</button>
			</div>
		)
	}
});