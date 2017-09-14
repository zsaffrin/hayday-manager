import React, { Component } from 'react';
import { arrayOf, shape } from 'prop-types';

import { appendTimeStringFieldToArray } from './_staticFunctions';
import Controls from './productInfoTable/Controls';
import Table from './productInfoTable/Table';

class ProductInfoTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: props.products,
			fields: {
				name: {
					label: 'Product',
					showField: true,
				},
				minLevelRequired: {
					label: 'Level',
					showField: true,
				},
				maxResale: {
					label: 'Max Value',
					showField: true,
				},
				minutesToProduce: {
					label: 'Time',
					showField: true,
					customFormat: 'timeString',
				},
				xp: {
					label: 'XP',
					showField: true,
				},
				source: {
					label: 'Source',
					showField: true,
				},
			},
			filters: [
				{
					type: 'max',
					field: 'minLevelRequired',
					value: 22,
				},
			],
		};
	}

	handleFieldChange = (e) => {
		const fieldKey = e.target.getAttribute('name');
		const { fields } = this.state;
		fields[fieldKey].showField = !fields[fieldKey].showField;
		this.setState({ fields });
	}

	render() {
		const { products, fields, filters } = this.state;
		const formattedProducts = appendTimeStringFieldToArray(products, 'minutesToProduce');

		return (
			<div id="product-info-table">
				<Controls
					fields={fields}
					filters={filters}
					handleFieldChange={this.handleFieldChange}
				/>

				<Table
					data={formattedProducts}
					fields={fields}
					filters={filters}
					defaultSortKey="minLevelRequired"
				/>
			</div>
		);
	}
}
ProductInfoTable.propTypes = {
	products: arrayOf(shape({})),
};
ProductInfoTable.defaultProps = {
	products: [],
};

export default ProductInfoTable;
