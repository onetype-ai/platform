sites.pages.ItemOn('modified', (item) =>
{
	editor.canvas.Item({
		id: item.Get('id'),
		active: item.Get('active'),
		label: item.Get('title'),
		width: 1440,
		order: item.Get('order'),
		render: function() 
		{ 
			return `
				<e-editor-sections-builder :page="'${item.Get('id')}'"></e-editor-sections-builder>
			`; 
		}
	});
});