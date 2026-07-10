ui.apps.Fn('theme', function()
{
	const root = document.documentElement;
	const color = $ot.ui.apps.active()?.Get('color');

	if(!color || color.includes('var('))
	{
		root.style.removeProperty('--ot-brand');
		root.style.removeProperty('--ot-brand-border');
		root.style.removeProperty('--ot-brand-opacity');
		root.style.removeProperty('--ot-brand-hover');

		return;
	}

	root.style.setProperty('--ot-brand', color);
	root.style.setProperty('--ot-brand-border', 'color-mix(in srgb, ' + color + ' 85%, white)');
	root.style.setProperty('--ot-brand-opacity', 'color-mix(in srgb, ' + color + ' 12%, transparent)');
	root.style.setProperty('--ot-brand-hover', 'color-mix(in srgb, ' + color + ' 88%, black)');
});
