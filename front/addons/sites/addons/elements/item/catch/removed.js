sites.elements.ItemOn('removed', (item) =>
{
	const slug = item.Get('slug');

	if(!slug)
	{
		return;
	}

	document.head.querySelectorAll('[data-element="' + slug + '"]').forEach(tag => tag.remove());
});
