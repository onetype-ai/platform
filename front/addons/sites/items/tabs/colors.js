onetype.AddonReady('editor.tabs', () =>
{
	editor.tabs.Item({
		id: 'colors',
		title: 'Colors',
		icon: 'palette',
		position: 'left',
		order: 30,
		render: function()
		{
			return `
				<e-sites-colors></e-sites-colors>
			`;
		}
	});
});
