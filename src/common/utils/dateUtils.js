const parsingDate = (targetDate) => {
	const newDate = new Date(targetDate);

	const year = newDate.getFullYear();
	const month =
		newDate.getMonth() + 1 < 10
			? `0${newDate.getMonth() + 1}`
			: newDate.getMonth() + 1;
	const date =
		newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();

	const parsedDate = `${year}-${month}-${date}`;
	return parsedDate;
};

const getToday = () => {
	const today = new Date();
	const fullYear = today.getFullYear();
	const month =
		today.getMonth() + 1 < 10
			? `0${today.getMonth() + 1}`
			: today.getMonth() + 1;

	const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();

	const parsedToday = `${fullYear}-${month}-${date}`;
	return parsedToday;
};

const getNowTime = () => {
	const now = new Date();
	const hour = now.getHours();
	const min = now.getMinutes();

	return `${hour}:${min}`;
};

export { parsingDate, getToday, getNowTime };
