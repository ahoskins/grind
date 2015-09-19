var Results = require('./components/results.jsx'),
	Search = require('./components/search.jsx');

var dummyData = [
	{
		title: 'Edmonton Oilers Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		sentiment: 0.2
	},
	{
		title: 'Edmonton Oilers Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		sentiment: 0.2
	},
	{
		title: 'Edmonton Oilers Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		sentiment: 0.2
	},
	{
		title: 'Edmonton Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		sentiment: 0.2
	}
];


// data flows down
//   data from node.js comes in here as props for Results
// events flow up
module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<Search />
				<Results data={dummyData} />
			</div>
		)
	}
});