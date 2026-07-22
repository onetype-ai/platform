import html from '@onetype/framework/html';

html.Item({
    id: 'assets-css',
    tag: 'link',
    position: 'head',
    attributes: {
        rel: 'stylesheet',
        href: '/assets/build.css?v=' + Date.now()
    },
    condition: function()
    {
        return !this.http.state.runtime;
    }
});
