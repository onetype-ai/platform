import html from '@onetype/framework/html';

onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'platform:html',
        addon: 'platform',
        description: 'Serves the platform html shell for any unmatched route.',
        exposed: true,
        method: 'GET',
        endpoint: '*',
        type: 'HTML',
        silent: true,
        callback: async function(properties, resolve)
        {
            resolve(html.Fn('render', this));
        }
    });
});
