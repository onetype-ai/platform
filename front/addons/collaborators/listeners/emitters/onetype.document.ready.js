onetype.EmitOn('onetype.document.ready', () =>
{
    const user = $ot.get('user');

    commands.Fn('run', 'collaborators:join', {
        id: user ? String(user.id) : 'local',
        name: user ? user.name : 'Local',
        self: true
    });

    commands.Fn('run', 'collaborators:join', {
        id: 'assistant',
        name: 'Assistant',
        type: 'agent',
        color: 'brand'
    });
});
