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
	const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
	const min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();

	const result = `${hour}:${min}`;
	console.log(result);
	return `${hour}:${min}`;
};

const getAttnedTime = (target) => {
	if (!target) return null;
	const date = new Date(target);
	const hour = date.getHours();
	const min =
		date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	return `${hour}:${min}`;
};

const parsingIsoTime = (target) => {
	const time = target;

	const today = new Date().toISOString().split('T')[0];

	const localDateTime = `${today}T${time}:00`;
	return localDateTime;
};

const parsingMonthKorean = (target) => {
	console.log(target);
	const datedTarget = new Date(target);
	const year = datedTarget.getFullYear();
	const month =
		datedTarget.getMonth() + 1 < 10
			? '0' + (datedTarget.getMonth() + 1)
			: datedTarget.getMonth() + 1;

	return `${year}년 ${month}월`;
};

const getNowDateTime = () => {
	const now = new Date();

	const localDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

	return localDateTime;
	// 2026-06-28T22:28:09
};

const parsingDateTime = (time) => {
	const now = new Date();

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');

	const localDateTime = `${year}-${month}-${day}T${time}:00`;

	return localDateTime;
};

const parsingLocalDateToOnlyTime = (fullDate) => {
	if (!fullDate) return null;
	const date = new Date(fullDate);
	return `${date.getHours()}:${date.getMinutes()}`;
};

export {
	parsingDate,
	getToday,
	getNowTime,
	getAttnedTime,
	parsingIsoTime,
	parsingMonthKorean,
	getNowDateTime,
	parsingDateTime,
	parsingLocalDateToOnlyTime,
};
