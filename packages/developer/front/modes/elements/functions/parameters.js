developer.Fn('elements.parameters', function(id)
{
	const item = elements.ItemGet(id);

	return item ? onetype.DataDescribe(item.Get('config')) : [];
});
