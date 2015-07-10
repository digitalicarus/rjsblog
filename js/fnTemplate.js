export default function (f) {
	return f.toString()
		.replace(/[^\/]*\/\*!/m,'')
		.replace(/\*\/(.|\s)*/m, '');
};
