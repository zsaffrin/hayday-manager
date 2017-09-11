import React from 'react';

require('overeasy/dist/overeasy.min.css');
require('font-awesome/css/font-awesome.min.css');
require('../styles/App.scss');

const cropData = require('../data/products.json');

const App = () => (
	<div id="app" className="p2">
		<h1>HayDay-Manager</h1>

		<p>{cropData.length} products loaded</p>
	</div>
);

export default App;
