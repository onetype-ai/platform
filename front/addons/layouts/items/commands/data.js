commands.Item({
	id: 'ui:layouts:data',
	exposed: true,
	description: 'Merge values into the global layout data. The data is validated against the merged config of every layout item, persisted and emitted through ui.layouts.data, so every open render refreshes.',
	metadata: { addon: 'ui.layouts' },
	in: {
		values: {
			type: 'object',
			required: true,
			description: 'Values to merge into the global layout data.'
		}
	},
	out: {
		data: {
			type: 'object',
			description: 'The full global layout data after the merge.'
		}
	},
	callback: function(properties, resolve)
	{
		const data = ui.layouts.Fn('data', properties.values);

		resolve({ data }, 'Layout data updated.');
	}
});
