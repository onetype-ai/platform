sites.elements.ItemOn('added', async (item) =>
{
	const slug = item.Get('slug');

	if(!slug || document.head.querySelector('[data-element="' + slug + '"]'))
	{
		return;
	}

	const result = await $ot.command('elements:catalog:source', { slug }, true);
	const code = result.data.code;
	const style = result.data.style;

	if(code)
	{
		const script = document.createElement('script');

		script.setAttribute('data-element', slug);
		script.textContent = code;
		document.head.appendChild(script);
	}

	if(style)
	{
		const tag = document.createElement('style');

		tag.setAttribute('data-element', slug);
		tag.textContent = style;
		document.head.appendChild(tag);
	}
});
