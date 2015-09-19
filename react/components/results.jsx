var Box = require('./box.jsx');

// 1 - 6 results
module.exports = React.createClass({
	// for each in data, create a box, always the same width

	render: function() {
		var boxes = [];
		this.props.data.forEach(function(result) {
			boxes.push(<div className="three columns"><Box data={result} /></div>);
		});

		return (
			<div className="container">
				<div className="row">
					{boxes}
				</div>
			</div>
		)
	}
});