onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'developer-preview',
		isActive: true,
		condition: { app: ['developer'], mode: ['elements'] },
		zone: 'root',
		slot: 'center',
		config: {
			developerElement: {
				type: 'string',
				value: '',
				description: 'Id of the element shown in the preview and the inspector.'
			},
			developerProps: {
				type: 'object',
				value: {},
				description: 'Prop overrides applied to the previewed element.'
			}
		},
		render: `<e-developer-preview :element="developerElement" :payload="developerProps"></e-developer-preview>`
	});
});
