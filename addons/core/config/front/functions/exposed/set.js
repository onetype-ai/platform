config.FnExpose('set', function(key, value)
{
	const item = this.one(key);

	if(!item)
	{
		return false;
	}

	item.Set('value', value);

	onetype.Emit('platform.config.set', { key, value });

	return true;
});
