onetype.EmitRegister('platform.collaborators.join', {
	description: 'Fired after a collaborator joins the editor. The navbar avatars and the cursor layer refresh on this event.',
	metadata: { addon: 'collaborators' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the collaborator that joined.'
		}
	}
});
