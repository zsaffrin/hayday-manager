import React from 'react';

import Header from './Header';
import ProductTable from './ProductTable';

require('overeasy/dist/overeasy-plain.min.css');
require('../styles/App.scss');

const { products } = require('../data/data.json');

const App = () => (
	<div id="app" className="p2">
		<Header />

		<ProductTable products={products} />
	</div>
);

export default App;
