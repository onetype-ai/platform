import html from '@onetype/framework/html';
import runtimes from '#runtimes/addon.js';

runtimes.ItemOn('added', (item) =>
{
	html.Item({
		id: 'assets-js-' + item.Get('id'),
		tag: 'script',
		position: 'head',
		attributes: {
			src: '/assets/build.js?v=' + Date.now() + '&scope=' + item.Get('id'),
			defer: null
		},
		condition: function()
		{
			return this.http.state.runtime === item.Get('id');
		}
	});

	html.Item({
		id: 'assets-css-' + item.Get('id'),
		tag: 'link',
		position: 'head',
		attributes: {
			rel: 'stylesheet',
			href: '/assets/build.css?v=' + Date.now() + '&scope=' + item.Get('id')
		},
		condition: function()
		{
			return this.http.state.runtime === item.Get('id');
		}
	});
});
