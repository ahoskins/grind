var styles = {
	outer: {
		border: '2px solid black',
		borderRadius: 2,
		height: 200
	}
}

// format this is a title, content author, url
// it will always be the same width
// the shade will depend on the level of sentiment
module.exports = React.createClass({
	render: function() {
		return (
			<div style={styles.outer}>
				{this.props.data.title}
			</div>
		)
	}
});