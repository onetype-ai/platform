developer.Fn('elements.snippet', function(id)
{
	const item = elements.ItemGet(id);
	const config = item ? item.Get('config') : null;
	const merged = {};

	for(const [key, define] of Object.entries(config ? config : {}))
	{
		if(define.type === 'function' || define.value === undefined)
		{
			continue;
		}

		if(Array.isArray(define.value) && !define.value.length)
		{
			continue;
		}

		if(typeof define.value === 'object' && define.value !== null && !Array.isArray(define.value) && !Object.keys(define.value).length)
		{
			continue;
		}

		if(define.value === '')
		{
			continue;
		}

		merged[key] = define.value;
	}

	const tag = 'e-' + id;
	const entries = Object.entries(merged);

	if(!entries.length)
	{
		return '<' + tag + '></' + tag + '>';
	}

	const props = entries.map(([key, value]) =>
	{
		if(typeof value === 'string')
		{
			return '\t' + key + '="' + value.replace(/"/g, '&quot;') + '"';
		}

		if(typeof value === 'object' && value !== null)
		{
			const json = JSON.stringify(value, null, '\t')
				.replace(/'/g, '&#39;')
				.split('\n')
				.map((line, index) => index ? '\t' + line : line)
				.join('\n');

			return "\t:" + key + "='" + json + "'";
		}

		return "\t:" + key + "='" + JSON.stringify(value) + "'";
	}).join('\n');

	return '<' + tag + '\n' + props + '\n></' + tag + '>';
});
