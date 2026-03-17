sites.elements.ItemOn('added', (item) =>
{
	const slug = item.Get('slug');
	const code = item.Get('code');
	const style = item.Get('style');

	if(!slug || document.head.querySelector('[data-element="' + slug + '"]'))
	{
		return;
	}

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
