
export const formatTime = (totalMinutes) => {
	let days = 0;
	let hours = 0;
	let minutes = totalMinutes;

	while (minutes >= 60) {
		hours += 1;
		minutes -= 60;
	}
	while (hours >= 24) {
		days += 1;
		hours -= 24;
	}

	let timeString = 'Instant';
	if (days > 0 || hours > 0 || minutes > 0) {
		const daysString = days > 0 ? `${days}d ` : '';
		const hoursString = hours > 0 ? `${hours}h ` : '';
		const minutesString = minutes > 0 ? `${minutes}m` : '';
		timeString = daysString + hoursString + minutesString;
	}

	return timeString;
};

export const sortArray = (data, sortKey, sortDescending = false) => (
	data.sort((objA, objB) => {
		const valueA = objA[sortKey];
		const valueB = objB[sortKey];
		let sortVal = 0;

		if (valueA > valueB) {
			sortVal = 1;
		}
		if (valueA < valueB) {
			sortVal = -1;
		}
		if (sortVal !== 0 && sortDescending) {
			sortVal *= -1;
		}

		return sortVal;
	})
);

export const filterArray = (data, field, filterType, filterValue) => {
	const filteredArray = data.filter((entry) => {
		if (filterType === 'max') {
			return entry[field] <= filterValue;
		}
		return true;
	});

	return filteredArray;
};

export const getMaxOfField = (data, field) => {
	let max = 0;

	for (let i = 0; i < data.length; i += 1) {
		if (typeof data[i][field] !== 'number') {
			return false;
		}
		if (data[i][field] > max) {
			max = parseInt(data[i][field], 10);
		}
	}

	return max;
};
