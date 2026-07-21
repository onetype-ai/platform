shortcuts.ItemOn('modified', (item) =>
{
	const entry = admin.explorer.ItemGet('shortcut-' + item.Get('id'));

	if(entry)
	{
		entry.Set('label', item.Get('name') || item.Get('id'));
		entry.Set('hint', item.Fn('hint'));
	}
});
