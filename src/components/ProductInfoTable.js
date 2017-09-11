import React, { Component } from 'react';
import { arrayOf, string, shape } from 'prop-types';

const Table = ({ data, fields }) => (
	<table>
		<thead>
			<tr>
				{fields.map(({ label, key, showField }) => (
					showField ? (
						<th key={key}>
							{label}
						</th>
					) : false
				))}
			</tr>
		</thead>
		<tbody>
			{data.map(item => (
				<tr key={item.id}>
					{fields.map(({ key, showField }) => (
						showField ? (
							<td key={key}>
								{item[key]}
							</td>
						) : false
					))}
				</tr>
			))}
		</tbody>
	</table>
);
Table.propTypes = {
	data: arrayOf(
		shape({
			id: string,
			name: string,
		}),
	),
	fields: arrayOf(
		shape({
			label: string,
			key: string,
		}),
	),
};
Table.defaultProps = {
	data: [],
	fields: [],
};

class ProductInfoTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: props.products,
			fields: [
				{
					label: 'ID',
					key: 'id',
					showField: false,
				},
				{
					label: 'Product',
					key: 'name',
					showField: true,
				},
				{
					label: 'Max Value',
					key: 'maxResale',
					showField: true,
				},
			],
		};
	}

	render() {
		const { products, fields } = this.state;

		return (
			<div id="product-info-table">
				<div className="p2 flex">
					{fields.map(({ label, key, showField }) => (
						<div className="p1">
							<input type="checkbox" checked={showField} />
							{label}
						</div>
					))}
				</div>

				<Table data={products} fields={fields} />
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
