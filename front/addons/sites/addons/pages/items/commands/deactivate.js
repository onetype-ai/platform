import commands from '@onetype/framework/commands';

commands.Item({
    id: 'editor:pages:deactivate',
    exposed: true,
    description: 'Deactivate all editor pages',
    callback: function(_, resolve)
    {
        sites.pages.Fn('deactivate');

        resolve();
    }
});
