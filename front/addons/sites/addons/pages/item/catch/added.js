sites.pages.ItemOn('added', (item) =>
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
				<e-sites-sections-builder :page="'${item.Get('id')}'"></e-sites-sections-builder>
			`; 	
		}
	});
});