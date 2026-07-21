import html from '@onetype/framework/html';

html.Item({
	id: 'state',
	tag: 'script',
	position: 'head',
	content: function()
	{
		return 'window.__STATE__ = ' + JSON.stringify(this.http.state) + ';';
	}
});
