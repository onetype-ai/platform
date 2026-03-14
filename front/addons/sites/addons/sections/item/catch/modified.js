sites.sections.ItemOn('modified', (item) =>
{
	if(item.Get('active'))
	{
		editor.tabs.Fn('activate', 'section-settings');
	}
});
