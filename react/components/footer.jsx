

var styles = {
	footer: {
		borderTop: '2px solid #B0BEC5',
		backgroundColor: '#B0BEC5'
	},
	children: {
		textAlign: 'center',
		verticalAlign: 'middle',
		lineHeight: '40px',
		fontSize: '2em'
	}
};

module.exports = React.createClass({
	render: function() {
		return (
			<div className="flex-footer display-flex" style={styles.footer}>
				<div className="flex-footer-child" style={styles.children}>Negative</div>
				<div className="flex-footer-child" style={styles.children}>Neutral</div>
				<div className="flex-footer-child" style={styles.children}>Positive</div>
			</div>
		)
	}
});