$ot.platform.config = {
	get: (key) =>
	{
		const item = $ot.platform.config.one(key);

		return item ? item.Get('value') : null;
	},
	set: (key, value) =>
	{
		const item = $ot.platform.config.one(key);

		if(!item)
		{
			return false;
		}

		item.Set('value', value);

		onetype.Emit('platform.config.set', { key, value });

		return true;
	},
	one: (key) =>
	{
		return Object.values(config.Items()).find((item) => item.Get('key') === key);
	},
	many: () =>
	{
		return Object.values(config.Items());
	}
};
