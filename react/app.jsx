var Results = require('./components/results.jsx'),
	Search = require('./components/search.jsx');

var dummyData = [
	{
		title: 'Edmonton Oilers Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		keywords: 'hockey mcdavid edmonton',
		sentiment: 0.5
	},
	{
		title: 'Edmonton Oilers Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		sentiment: 0.8
	},
	{
		title: 'Edmonton Oilers Win Stanley Cup',
		source: 'tsn.ca',
		url: 'http://tsn.ca/nhl',
		sentiment: 0.2
	}
];

// for .NET
//   - sort the results in order of sentiment!

// Things to figure out
// 
// three articles looks good
// 	- map sentiment score to a certain color/shade
//  - mouse hover increases the size, or at least the color changes a bit
//  - top part of box (title, source, link clicks to url)
//  - bottom part of box (summary, sentiment score)

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