onetype.AddonReady('editor.tabs', () =>
{
	editor.tabs.Item({
		id: 'element-settings',
		title: 'Element',
		icon: 'widgets',
		position: 'right',
		order: 20,
		render: function()
		{
			return `
				<e-sites-elements-settings></e-sites-elements-settings>
			`;
		}
	});
});
