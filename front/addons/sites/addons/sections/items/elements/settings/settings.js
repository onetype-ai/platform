elements.ItemAdd({
	id: 'editor-sections-settings',
	icon: 'view_agenda',
	name: 'Section Settings',
	description: 'Settings panel for the active section.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.section = null;

		const load = () =>
		{
			const active = Object.values(sites.sections.Items()).find(item => item.Get('active'));

			this.section = active ? active.data : null;
		};

		const callback = (item) =>
		{
			if(item.addon.GetName() === 'sites.sections')
			{
				load();
			}
		};

		load();

		this.On('@addon.item.added', callback);
		this.On('@addon.item.modified', callback);
		this.On('@addon.item.removed', callback);

		this.sections = [
			{
				fields: [
					{
						key: 'container',
						label: 'Container',
						position: 'left',
						element: 'form-select',
						properties: {
							placeholder: 'Select...',
							variant: ['bg-3', 'border', 'size-s'],
							options: [
								{ label: 'None', value: 'none' },
								{ label: 'Small', value: 's' },
								{ label: 'Medium', value: 'm' },
								{ label: 'Large', value: 'l' },
								{ label: 'Full', value: 'full' }
							]
						}
					}
				]
			},
			{
				title: 'Spacing',
				fields: [
					{
						key: 'gap',
						label: 'Gap',
						position: 'left',
						element: 'form-slider',
						properties: { min: 0, max: 64, step: 4, variant: ['brand', 'size-s'] }
					}
				]
			},
			{
				title: 'Background',
				collapsed: true,
				fields: [
					{
						key: 'background',
						label: 'Color',
						position: 'left',
						element: 'form-color',
						properties: { placeholder: '#ffffff', variant: ['bg-3', 'border', 'size-s'] }
					}
				]
			}
		];

		this.change = ({ key, value }) =>
		{
			if (!this.section)
			{
				return;
			}

			sites.sections.Fn('update', this.section.id, { [key]: value });
		};

		return `
			<div class="holder" ot-if="section">
				<e-core-builder :sections="sections" :values="section" :_change="change"></e-core-builder>
			</div>
			<div class="empty" ot-if="!section">
				<e-status-empty icon="view_agenda" title="" description="Click a section in the canvas."></e-status-empty>
			</div>
		`;
	}
});
