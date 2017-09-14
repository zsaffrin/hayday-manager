import React, { Component } from 'react';
import { arrayOf, bool, number, string, shape } from 'prop-types';

import { formatTime, sortArray, filterArray } from '../_staticFunctions';

require('../../styles/Table.scss');

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			fields: props.fields,
			filters: props.filters,
			sortKey: props.defaultSortKey,
			sortDescending: props.sortDescending,
		};
	}

	handleSortChange = key => (
		this.state.sortKey === key ?
			this.setState({ sortDescending: !this.state.sortDescending }) :
			this.setState({ sortKey: key })
	)

	sortIndicator = (key) => {
		const { sortKey, sortDescending } = this.state;

		let indicator;
		if (key === sortKey) {
			indicator = sortDescending ? ' ↓' : ' ↑';
		}

		return indicator;
	}

	render() {
		const { data, fields, filters, sortKey, sortDescending } = this.state;

		const sortedData = sortArray(data, sortKey, sortDescending);
		const filteredData = filterArray(sortedData, filters);

		return (
			<table className="table">
				<thead>
					<tr>
						{Object.keys(fields).map((key) => {
							const { label, showField } = fields[key];
							return showField ? (
								<th key={key} onClick={() => this.handleSortChange(key)}>
									{label}
									{this.sortIndicator(key)}
								</th>
							) : false;
						})}
					</tr>
				</thead>
				<tbody>
					{filteredData.map(item => (
						<tr key={item.id}>
							{Object.keys(fields).map((key) => {
								const { showField, customFormat } = fields[key];

								let fieldContent = item[key];
								if (customFormat) {
									if (customFormat === 'timeString') {
										fieldContent = formatTime(item[key]);
									}
								}

								return showField ? (
									<td
										className={typeof item[key] === 'number' ? 'center' : 'left'}
										key={key}
									>
										{fieldContent}
									</td>
								) : false;
							})}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}
Table.propTypes = {
	data: arrayOf(
		shape({
			id: string,
			name: string,
		}),
	),
	fields: shape({
		label: string,
		showField: bool,
		customFormat: string,
	}),
	filters: arrayOf(
		shape({
			type: string,
			field: string,
			value: number,
		}),
	),
	defaultSortKey: string,
	sortDescending: bool,
};
Table.defaultProps = {
	data: [],
	fields: {},
	filters: [],
	defaultSortKey: '',
	sortDescending: false,
};

export default Table;
