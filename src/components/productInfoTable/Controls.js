import React from 'react';
import { arrayOf, shape, func } from 'prop-types';

const Controls = ({ fields, filters, handleFieldChange }) => (
	<div id="controls" className="p2">
		<div className="p1">
			<h5>Fields</h5>
			<div className="flex flex-wrap size-sm">
				{Object.keys(fields).map((key) => {
					const { label, showField } = fields[key];
					return (
						<div className="p1" key={key}>
							<input
								id={key}
								name={key}
								type="checkbox"
								checked={showField}
								onChange={handleFieldChange}
							/>
							<label htmlFor={key}>{label}</label>
						</div>
					);
				})}
			</div>
		</div>
		<div className="p1">
			<h5>Filter</h5>
			<div className="flex flex-wrap size-sm">
				<div className="p1">
					{filters.map(({ type, field, value }) => (
						`${type} ${fields[field].label}: ${value}`
					))}
				</div>
			</div>
		</div>
	</div>
);
Controls.propTypes = {
	fields: shape({}),
	filters: arrayOf(shape({})),
	handleFieldChange: func,
};
Controls.defaultProps = {
	fields: {},
	filters: [],
	handleFieldChange: () => {},
};

export default Controls;
