ui.dashboard.types.Item({
	id: 'table',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				columns: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							key: { type: 'string', description: 'Row field the column reads.' },
							label: { type: 'string', description: 'Header text.' },
							align: { type: 'string', value: 'left', options: ['left', 'right'], description: 'Cell alignment.' },
							badge: { type: 'boolean', value: false, description: 'Renders the cell as a colored pill, reading the color from the row field key plus Color.' }
						}
					},
					description: 'Columns left to right.'
				},
				rows: {
					type: 'array',
					value: [],
					each: { type: 'object', description: 'A single row keyed by the column keys.' },
					description: 'Rows top to bottom.'
				}
			},
			description: 'Table data.'
		}
	},
	render: function()
	{
		return `<e-data-table :background="0" :columns="payload.columns" :rows="payload.rows"></e-data-table>`;
	}
});
