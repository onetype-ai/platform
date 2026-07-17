ui.dashboard.types.Item({
	id: 'list',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				rows: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							icon: { type: 'string', description: 'Leading Material Symbols icon.' },
							label: { type: 'string', description: 'Row title.' },
							sublabel: { type: 'string', description: 'Muted text under the label.' },
							value: { type: 'string|number', description: 'Trailing value.' },
							percent: { type: 'number', description: 'Fill of the progress bar behind the row, 0 to 100. Empty draws no bar.' },
							color: { type: 'string', description: 'Bar and value color name. Empty uses the widget accent.' },
							onClick: { type: 'function', description: 'Called with the row on click.' }
						}
					},
					description: 'Rows top to bottom.'
				}
			},
			description: 'List data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.list = this.payload.rows.map((row) =>
			{
				return { ...row, color: row.color ? row.color : (this.color ? this.color : 'brand') };
			});
		});

		return `<e-data-list :background="0" :rows="list"></e-data-list>`;
	}
});
