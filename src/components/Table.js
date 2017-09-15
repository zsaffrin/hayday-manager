import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import { formatTime } from './_staticFunctions';

require('../styles/Table.scss');

const Table = ({
	data,
	fields,
	sortKey,
	sortDescending,
	changeSortKey,
	toggleSortDescending,
}) => {
	const handleSortChange = key => (
		key === sortKey ?
			toggleSortDescending() :
			changeSortKey(key)
	);

	const sortIndicator = (key) => {
		if (sortKey === key) {
			return sortDescending ? ' ↓' : ' ↑';
		}
		return '';
	};

	const headerCells = Object.keys(fields).map((key) => {
		const { label, showField } = fields[key];
		return showField ? (
			<th key={key} onClick={() => handleSortChange(key)}>
				{label}
				{sortIndicator(key)}
			</th>
		) : false;
	});

	const renderBodyCells = item => (
		Object.keys(fields).map((key) => {
			const { showField, align, format } = fields[key];

			let displayValue = item[key];
			if (format) {
				if (format === 'timeString') {
					displayValue = formatTime(displayValue);
				}
			}

			return showField ? (
				<td
					className={align ? `${align}` : 'left'}
					key={key}
				>
					{displayValue}
				</td>
				) : false;
		})
	);

	const bodyRows = data.map(item => (
		<tr key={item.id}>
			{renderBodyCells(item)}
		</tr>
	));

	return (
		<table className="table">
			<thead>
				<tr>
					{headerCells}
				</tr>
			</thead>
			<tbody>
				{bodyRows}
			</tbody>
		</table>
	);
};
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
	sortKey: string,
	sortDescending: bool,
	changeSortKey: func,
	toggleSortDescending: func,
};
Table.defaultProps = {
	data: [],
	fields: {},
	sortKey: '',
	sortDescending: false,
	changeSortKey: () => {},
	toggleSortDescending: () => {},
};

export default Table;
