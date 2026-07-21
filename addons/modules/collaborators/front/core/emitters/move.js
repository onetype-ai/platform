onetype.EmitRegister('platform.collaborators.move', {
	description: 'Fired on every cursor move of a collaborator. The cursor layer writes the position straight to the DOM, nothing re-renders.',
	metadata: { addon: 'collaborators' },
	config: {
		id: {
			type: 'string',
			description: 'ID of the collaborator that moved.'
		},
		x: {
			type: 'number',
			description: 'Horizontal viewport position in pixels.'
		},
		y: {
			type: 'number',
			description: 'Vertical viewport position in pixels.'
		}
	}
});
