onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'developer-elements-preview',
		isActive: true,
		condition: { app: ['developer'], mode: ['elements'] },
		zone: 'root',
		slot: 'center',
		config: {
			'developer_elements_selected': {
				type: 'string',
				value: '',
				description: 'Id of the element shown in the preview and the inspector.'
			},
			'developer_elements_tab': {
				type: 'string',
				value: 'preview',
				options: ['preview', 'parameters', 'code'],
				description: 'Active view of the element panel.'
			}
		},
		render: function()
		{
			this.tabs = [
				{ id: 'preview', label: 'Preview', icon: 'visibility' },
				{ id: 'parameters', label: 'Parameters', icon: 'data_object' },
				{ id: 'code', label: 'Code', icon: 'code' }
			];

			this.pick = ({ value }) =>
			{
				$ot.ui.layouts.data({ 'developer_elements_tab': value });
			};

			this.parameters = () =>
			{
				return developer.Fn('elements.parameters', this.developer_elements_selected);
			};

			this.snippet = () =>
			{
				return developer.Fn('elements.snippet', this.developer_elements_selected);
			};

			return `
				<div class="ot-flex-vertical ot-gap-l ot-container-s ot-py-l">
					<div ot-if="developer_elements_selected">
						<e-navigation-tabs tone="contained" :items="tabs" :active="developer_elements_tab" :_change="pick"></e-navigation-tabs>
					</div>
					<div ot-if="!developer_elements_selected || developer_elements_tab === 'preview'" class="ot-flex-1">
						<e-developer-element :element="developer_elements_selected"></e-developer-element>
					</div>
					<div ot-if="developer_elements_selected && developer_elements_tab === 'parameters'" class="ot-flex-1 ot-scrollbar">
						<e-global-parameters :items="parameters()" :background="2"></e-global-parameters>
					</div>
					<div ot-if="developer_elements_selected && developer_elements_tab === 'code'" class="ot-flex-1 ot-scrollbar">
						<e-global-code :source="snippet()" language="html" filename="usage" :copy="true" :background="2"></e-global-code>
					</div>
				</div>
			`;
		}
	});
});
