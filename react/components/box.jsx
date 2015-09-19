var styles = {
	outer: {
		border: '2px solid black',
		borderRadius: 2,
		height: 400
	},
	top: {
		borderBottom: '1px solid black',
		cursor: 'pointer'
	}
}

// format this is a title, content author, url
// it will always be the same width
// the shade will depend on the level of sentiment

// the prop is a 'result' type
module.exports = React.createClass({
	
	handleClick: function() {
		window.open(this.props.data.url);
	},

	render: function() {
		return (
			<div style={styles.outer}>
				<div style={styles.top} onClick={this.handleClick}>
					<div>
						{this.props.data.title}
					</div>
					<div>
						{this.props.data.source}
					</div>
				</div>
			</div>
		)
	}
});