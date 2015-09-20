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
		// backgroundColor: '#03A9F4',
		fontSize: '1.5em',
		padding: 5,
		borderBottom: '2px solid grey'
	},
	right: {
		float: 'right !important',
		cursor: 'pointer'
	},
	left: {
		float: 'left !important',
		cursor: 'pointer'
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

	ahoskins: function(s) {
		window.open(s);
	},

	render: function() {
		return (
			<div style={styles.header}>
				<div style={styles.banner}>
					<span>
						<i style={styles.left} className="fa fa-github" onClick={this.ahoskins.bind(this, 'http://github.com/ahoskins/grind')}></i>
					</span>
					Grind: merging sentiment analysis with news and blogs
					<span>
						<i style={styles.right} className="fa fa-github" onClick={this.ahoskins.bind(this, 'http://github.com/udeyrishi/grind-back')}></i>
					</span>
				</div>
				<input style={styles.search} onChange={this.handleChange} value={this.state.query} type="email" placeholder="search for news and blogs" />
				<button onClick={this.produceArticle}>Article</button>
			</div>
		)
	}
});