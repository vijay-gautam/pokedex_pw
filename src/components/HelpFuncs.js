export const toTitleCase = str => {
	return str.replace(/\w\S*/g, txt => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};
export const parseId = url => {
	const myregexp = /\/(\d+)\//;
	var match = myregexp.exec(url);
	if (match != null) {
		let result = match[1];
		return result;
	}
};