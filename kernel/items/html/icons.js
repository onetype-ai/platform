import html from '@onetype/framework/html';

html.Item({
	id: 'icons',
	tag: 'link',
	position: 'head',
	order: 90,
	attributes: {
		rel: 'stylesheet',
		defer: true,
		href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
	}
});
