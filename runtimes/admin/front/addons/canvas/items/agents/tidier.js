onetype.AddonReady('ai.agents', (agents) =>
{
	agents.Item({
		id: 'tidier',
		name: 'Tidier',
		description: 'Arranges canvas cards into a clean grid layout based on their names, groups and links.',
		temperature: 0.7,
		tokens: 2000,
		instructions: 'You arrange cards on a canvas by assigning each one a slot in a grid. '
			+ 'You receive every card with its name, group, size and links. Return a row and a column for EVERY card, both start at 0. '
			+ 'Rules: no two cards share the same row and column. '
			+ 'A link means flow, the source card comes before the target, either in a lower column on the same row or in a lower row. '
			+ 'Cards of the same group sit next to each other. Branches of the same source split into separate rows or columns. '
			+ 'Keep the grid compact and readable, rows are read top to bottom, columns left to right.',
		input: {
			items: {
				type: 'array',
				required: true,
				description: 'Canvas cards to arrange.',
				each: {
					type: 'object',
					config: {
						id: { type: 'string', required: true, description: 'Card id.' },
						name: { type: 'string', description: 'Card name.' },
						group: { type: 'string', required: false, description: 'Group the card belongs to, null when loose.' },
						links: { type: 'array', each: { type: 'string' }, description: 'IDs of cards this card points to.' },
						width: { type: 'number', description: 'Card width in pixels.' },
						height: { type: 'number', description: 'Card height in pixels.' }
					}
				}
			}
		},
		output: {
			positions: {
				type: 'array',
				description: 'Grid slot for every card.',
				each: {
					type: 'object',
					config: {
						id: { type: 'string', required: true, description: 'Card id.' },
						row: { type: 'number', required: true, description: 'Grid row, 0 is the top.' },
						column: { type: 'number', required: true, description: 'Grid column, 0 is the left edge.' }
					}
				}
			}
		}
	});
});
