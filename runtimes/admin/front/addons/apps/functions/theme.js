ui.apps.Fn('theme', function()
{
	const root = document.documentElement;
	const active = $ot.ui.apps.active();
	const color = active?.Get('color');
	const scheme = active ? active.Get('scheme') : 'studio';

	const schemes = {
		midnight: [],
		studio: ['ot-layout-light'],
		daylight: ['ot-light'],
		eclipse: ['ot-light', 'ot-layout-dark']
	};

	document.body.classList.remove('ot-light', 'ot-layout-light', 'ot-layout-dark');
	document.body.classList.add(...(schemes[scheme] ? schemes[scheme] : []));

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
