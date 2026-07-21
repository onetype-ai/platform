onetype.AddonReady('admin.navbar', (navbar) =>
{
	navbar.Item({
		id: 'shortcuts',
		order: 6,
		position: 'right',
		popup: { title: 'Shortcuts', description: 'Enable or disable editor shortcuts.', width: 'l', render: () => '<e-shortcuts-panel></e-shortcuts-panel>' },
		icon: 'keyboard',
		tooltip: 'Shortcuts'
	});
});
