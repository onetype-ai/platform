onetype.AddonReady('ui.dock', (dock) =>
{
	dock.Item({
		id: 'apps',
		name: 'All applications',
		icon: 'apps',
		order: 1,
		position: 'bottom',
		panel: {
			title: 'Applications',
			description: 'Switch or launch an application.',
			close: true
		},
		render: '<e-apps-list></e-apps-list>'
	});
});
