onetype.AddonReady('ui.navbar', (navbar) =>
{
	navbar.Item({
		id: 'explorer',
		order: 4,
		position: 'right',
		render: '<e-explorer-trigger :background="background"></e-explorer-trigger>',
		popup: {
			type: 'default',
			width: 'l',
			padding: 'none',
			render: '<e-explorer></e-explorer>',
			onClose: () => onetype.Emit('ui.explorer.close', {})
		}
	});
});
