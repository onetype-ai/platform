onetype.AddonReady('ui.apps', (apps) =>
{
	apps.Item({
		id: 'transforms',
		name: 'Transforms',
		icon: 'transform',
		color: 'rgba(52, 211, 153, 1)',
		description: 'DOM transforms: declarative element transformations with configs, runtime dependencies and live updates.',
		order: 8,
		isVisible: false
	});
});
