sites.pages.Fn('create', function(title = 'Untitled', slug = '/untitled')
{
	const items = Object.values(this.Items());
	const order = items.length ? Math.max(...items.map(item => item.Get('order'))) + 1 : 0;
	const id = 'p' + Date.now();

	const item = this.Item({ id, title, slug, order });

	onetype.Emit('sites.pages.create', item);

	return item;
});
