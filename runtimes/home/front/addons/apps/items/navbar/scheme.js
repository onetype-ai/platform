onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.Item({
		id: 'scheme',
		order: 3,
		position: 'right',
		icon: 'contrast',
		tooltip: 'Switch scheme',
		condition: { app: true },
		onClick: () =>
		{
			const active = $ot.ui.apps.active();
			const schemes = ['midnight', 'studio', 'daylight', 'eclipse'];
			const index = schemes.indexOf(active.Get('scheme'));

			active.Set('scheme', schemes[(index + 1) % schemes.length]);
			ui.apps.Fn('theme');
		}
	});
});
