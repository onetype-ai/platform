onetype.EmitRegister('platform.collaborators.leave', {
    description: 'Fired after a collaborator leaves the editor and the avatar with the cursor disappears.',
    addon: 'platform.collaborators',
    config: {
        id: {
            type: 'string',
            description: 'ID of the collaborator that left.'
        }
    }
});
