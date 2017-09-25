import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import ProductTable from './ProductTable';

require('overeasy/dist/overeasy-plain.min.css');
require('../styles/App.scss');

const { products } = require('../data/data.json');

const App = () => (
	<Router>
		<div id="app" className="p2">
			<Header />

			<ProductTable products={products} />
		</div>
	</Router>
);

export default App;
