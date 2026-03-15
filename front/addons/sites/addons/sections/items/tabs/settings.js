onetype.AddonReady('editor.tabs', () =>
{
	editor.tabs.Item({
		id: 'section-settings',
		title: 'Section',
		icon: 'view_agenda',
		position: 'right',
		active: true,
		order: 10,
		render: function()
		{
			return `
				<e-sites-sections-settings></e-sites-sections-settings>
			`;
		}
	});
});
