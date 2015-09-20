

var styles = {
	footer: {
		flex: '0 1 40px',
		borderTop: '2px solid black',
		backgroundColor: '#B0BEC5',
		display: 'flex'
	},
	children: {
		flex: '1 1 auto',
		textAlign: 'center',
		verticalAlign: 'middle',
		lineHeight: '40px',
		fontSize: '2em'
	}
};

module.exports = React.createClass({
	render: function() {
		return (
			<div style={styles.footer}>
				<div style={styles.children}>Negative</div>
				<div style={styles.children}>Neutral</div>
				<div style={styles.children}>Positive</div>
			</div>
		)
	}
});

//a web app merging NLP with news and blogs, providing a complete-spectrum of opinions