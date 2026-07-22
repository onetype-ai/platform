import html from '@onetype/framework/html';

html.Item({
    id: 'assets-js',
    tag: 'script',
    position: 'head',
    attributes: {
        src: '/assets/build.js?v=' + Date.now(),
        defer: null
    },
    condition: function()
    {
        return !this.http.state.runtime;
    }
});
