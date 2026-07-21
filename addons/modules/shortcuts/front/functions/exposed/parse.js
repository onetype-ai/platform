shortcuts.FnExpose('parse', function(event)
{
	const parts = ['ctrl', 'alt', 'shift', 'meta'].filter((modifier) => event[modifier + 'Key']);
	const name = event.key.toLowerCase();

	if(!['control', 'alt', 'shift', 'meta'].includes(name))
	{
		parts.push(name);
	}

	return parts.join('+');
});
