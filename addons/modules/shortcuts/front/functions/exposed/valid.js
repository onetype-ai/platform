shortcuts.FnExpose('valid', function(key)
{
	const modifiers = ['ctrl', 'alt', 'shift', 'meta'];
	const parts = key.split('+').filter((part) => part !== '');

	if(!parts.length)
	{
		return false;
	}

	if(modifiers.includes(parts[parts.length - 1]))
	{
		return false;
	}

	return parts.slice(0, -1).every((part) => modifiers.includes(part));
});
