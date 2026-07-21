onetype.EmitOn('platform.shortcuts.rebind', (change) =>
{
	const item = shortcuts.ItemGet(change.id);
	const entry = admin.explorer.ItemGet('shortcut-' + change.id);

	if(item && entry)
	{
		entry.Set('hint', item.Fn('hint'));
	}
});
