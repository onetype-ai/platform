import html from '@onetype/framework/html';
import runtimes from '#runtimes/addon.js';

runtimes.ItemOn('added', (item) =>
{
	html.Item({
		id: 'assets-js-' + item.Get('slug'),
		tag: 'script',
		position: 'head',
		attributes: {
			src: '/assets/build.js?v=' + Date.now() + '&scope=' + item.Get('slug'),
			defer: null
		},
		condition: function()
		{
			return this.http.state.runtime === item.Get('slug');
		}
	});

	html.Item({
		id: 'assets-css-' + item.Get('slug'),
		tag: 'link',
		position: 'head',
		attributes: {
			rel: 'stylesheet',
			href: '/assets/build.css?v=' + Date.now() + '&scope=' + item.Get('slug')
		},
		condition: function()
		{
			return this.http.state.runtime === item.Get('slug');
		}
	});
});
