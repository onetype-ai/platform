elements.ItemAdd({
	id: 'sites-colors',
	icon: 'palette',
	name: 'Site Colors',
	description: 'Color settings panel for a site.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.fields = {};

		const site = $ot.get('site');

		this.values = site ? { ...site.colors } : {};

		console.log('colors site:', site);
		console.log('colors values:', this.values);

		this.sections = [
			{
				title: 'Brand',
				fields: [
					{ key: 'brand', label: 'Brand', description: 'Primary accent color.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } }
				]
			},
			{
				title: 'Backgrounds',
				fields: [
					{ key: 'bg-1', label: 'Background 1', description: 'Page background.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'bg-2', label: 'Background 2', description: 'Cards and panels.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'bg-3', label: 'Background 3', description: 'Nested panels.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'bg-4', label: 'Background 4', description: 'Inputs and deepest.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } }
				]
			},
			{
				title: 'Text',
				fields: [
					{ key: 'text-1', label: 'Primary', description: 'Headings and body.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'text-2', label: 'Secondary', description: 'Descriptions and muted.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'text-3', label: 'Disabled', description: 'Placeholders and disabled.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } }
				]
			},
			{
				title: 'Status',
				collapsed: true,
				fields: [
					{ key: 'blue', label: 'Blue', description: 'Info and links.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'red', label: 'Red', description: 'Error and danger.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'orange', label: 'Orange', description: 'Warning.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } },
					{ key: 'green', label: 'Green', description: 'Success.', position: 'top', element: 'form-color', properties: { variant: ['bg-3', 'border', 'size-s'] } }
				]
			}
		];

		this.change = ({ key, value }) =>
		{
			this.fields[key] = value;
			this.values[key] = value;
		};

		this.save = async () =>
		{
			if(!Object.keys(this.fields).length)
			{
				return;
			}

			await sites.Fn('colors', this.fields);

			this.fields = {};
		};

		return `
			<div class="holder">
				<e-core-builder :sections="sections" :values="values" :_change="change"></e-core-builder>
				<div class="actions">
					<e-form-button text="Save" icon="check" :variant="['brand', 'size-s', 'full']" :_click="save"></e-form-button>
				</div>
			</div>
		`;
	}
});
