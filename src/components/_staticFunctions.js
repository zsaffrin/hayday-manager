
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

export const appendTimeStringFieldToArray = (array, fieldKey) => {
	const formattedArray = array.map((item) => {
		const formattedItem = item;
		formattedItem.timeString = formatTime(formattedItem[fieldKey]);
		return formattedItem;
	});

	return formattedArray;
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

export const filterArray = (data, filters) => {
	let filteredArray;
	for (let x = 0; x < filters.length; x += 1) {
		const { type, field, value } = filters[x];

		filteredArray = data.filter((entry) => {
			if (type === 'max') {
				return entry[field] <= value;
			}
			return true;
		});
	}

	return filteredArray;
};
