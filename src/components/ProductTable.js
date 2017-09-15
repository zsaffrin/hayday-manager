import React, { Component } from 'react';
import { arrayOf, shape } from 'prop-types';

import { filterArray, getMaxOfField, sortArray } from './_staticFunctions';
import Table from './Table';

class ProductTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fields: {
				name: {
					label: 'Product',
					showField: true,
				},
				minLevelRequired: {
					label: 'Level',
					showField: true,
					align: 'center',
				},
				maxResale: {
					label: 'Max Value',
					showField: true,
					align: 'center',
				},
				minutesToProduce: {
					label: 'Time',
					showField: true,
					align: 'center',
					format: 'timeString',
				},
				xp: {
					label: 'XP',
					showField: true,
					align: 'center',
				},
				source: {
					label: 'Source',
					showField: true,
				},
			},
			filters: {
				maxLevel: getMaxOfField(props.products, 'minLevelRequired'),
			},
			products: props.products,
			sortKey: 'minLevelRequired',
			sortDescending: false,
		};
	}

	changeSortKey = key => (
		this.setState({ sortKey: key })
	)

	handleFieldCheckboxChange = (e) => {
		const fieldKey = e.target.getAttribute('name');
		const { fields } = this.state;
		fields[fieldKey].showField = !fields[fieldKey].showField;
		this.setState({ fields });
	}

	toggleSortDescending = () => (
		this.setState({ sortDescending: !this.state.sortDescending })
	)

	handleMaxLevelFilterChange = e => (
		this.setState({
			filters: {
				maxLevel: e.target.value,
			},
		})
	)

	render() {
		const { fields, filters, products, sortKey, sortDescending } = this.state;

		let preparedProducts = sortArray(products, sortKey, sortDescending);
		preparedProducts = filterArray(preparedProducts, 'minLevelRequired', 'max', filters.maxLevel);

		const columnVisibilityCheckboxes = Object.keys(fields).map((key) => {
			const { label, showField } = fields[key];
			return (
				<div className="p1" key={key}>
					<input
						id={key}
						name={key}
						type="checkbox"
						checked={showField}
						onChange={this.handleFieldCheckboxChange}
					/>
					<label htmlFor={key}>{label}</label>
				</div>
			);
		});

		const maxLevelSelectOptions = (max) => {
			const options = [];
			for (let i = 1; i <= max; i += 1) {
				options.push(
					<option value={i} key={i}>{i}</option>,
				);
			}
			return options;
		};

		return (
			<div id="product-table">
				<div className="p1">
					<h5>Fields</h5>
					<div className="flex flex-wrap size-sm">
						{columnVisibilityCheckboxes}
					</div>
				</div>

				<div className="p1">
					<h5>Filters</h5>
					<div className="flex flex-wrap size-sm">
						<div className="p1">
							<label htmlFor="max-level-select">Max Level: </label>
							<select
								id="max-level-select"
								value={this.state.filters.maxLevel}
								onChange={this.handleMaxLevelFilterChange}
							>
								{maxLevelSelectOptions(96)}
							</select>
						</div>
					</div>
				</div>

				<Table
					data={preparedProducts}
					fields={fields}
					sortKey={sortKey}
					sortDescending={sortDescending}
					changeSortKey={this.changeSortKey}
					toggleSortDescending={this.toggleSortDescending}
				/>
			</div>
		);
	}
}
ProductTable.propTypes = {
	products: arrayOf(shape({})),
};
ProductTable.defaultProps = {
	products: [],
};

export default ProductTable;
