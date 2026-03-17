sites.elements.ItemOn('modified', (item) =>
{
	if(item.Get('active'))
	{
		editor.tabs.Fn('activate', 'element-settings');
	}
});
