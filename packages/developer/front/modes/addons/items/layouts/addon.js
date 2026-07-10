onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'developer-addons-addon',
		isActive: true,
		condition: { app: ['developer'], mode: ['addons'] },
		zone: 'root',
		slot: 'center',
		config: {
			'developer_addons_selected': {
				type: 'string',
				value: '',
				description: 'Id of the addon shown in the detail panel.'
			},
			'developer_addons_tab': {
				type: 'string',
				value: 'overview',
				options: ['overview', 'fields', 'commands'],
				description: 'Active view of the addon panel.'
			}
		},
		render: function()
		{
			this.tabs = [
				{ id: 'overview', label: 'Overview', icon: 'info' },
				{ id: 'fields', label: 'Fields', icon: 'data_object' },
				{ id: 'commands', label: 'Commands', icon: 'terminal' }
			];

			this.entry = () =>
			{
				const item = developer.addons.ItemGet(this.developer_addons_selected);

				return item ? item.Get(['id', 'name', 'description', 'content']) : null;
			};

			this.pick = ({ value }) =>
			{
				$ot.ui.layouts.data({ developer_addons_tab: value });
			};

			this.fields = () =>
			{
				return developer.Fn('addons.fields', this.developer_addons_selected);
			};

			this.commands = () =>
			{
				return developer.Fn('addons.commands', this.developer_addons_selected);
			};

			return `
				<div class="ot-flex-vertical ot-gap-l ot-container-m ot-py-l">
					<e-global-heading :title="entry().name" :description="entry().description" element="h2"></e-global-heading>

					<div ot-if="developer_addons_selected">
						<e-navigation-tabs tone="contained" :items="tabs" :active="developer_addons_tab" :_change="pick"></e-navigation-tabs>
					</div>
					<div ot-if="developer_addons_selected && developer_addons_tab === 'overview'" class="ot-flex-vertical ot-gap-l">
						<e-global-markdown ot-if="entry().content" :content="entry().content"></e-global-markdown>
					</div>
					<div ot-if="developer_addons_selected && developer_addons_tab === 'fields'" class="ot-flex-1 ot-scrollbar">
						<e-global-parameters ot-if="fields().length" :items="fields()"></e-global-parameters>
						<e-status-empty
							ot-if="!fields().length"
							icon="data_object"
							title="No fields"
							description="This addon does not declare any fields."
						></e-status-empty>
					</div>
					<div ot-if="developer_addons_selected && developer_addons_tab === 'commands'" class="ot-flex-vertical ot-gap-s ot-flex-1 ot-scrollbar">
						<e-status-empty
							ot-if="!commands().length"
							icon="terminal"
							title="No commands"
							description="This addon does not register any commands."
						></e-status-empty>
						<div ot-for="command in commands()" :ot-key="command.id">
							<e-core-section
								:title="command.id"
								:description="command.description"
								icon="terminal"
								:collapsible="true"
								:collapsed="true"
							>
								<div slot="content" class="ot-flex-vertical ot-gap-m">
									<div ot-if="command.parameters.length" class="ot-flex-vertical ot-gap-s">
										<e-global-heading title="Input" element="h3"></e-global-heading>
										<e-global-parameters :items="command.parameters" :background="2"></e-global-parameters>
									</div>
									<div ot-if="command.output.length" class="ot-flex-vertical ot-gap-s">
										<e-global-heading title="Output" element="h3"></e-global-heading>
										<e-global-parameters :items="command.output" :background="2"></e-global-parameters>
									</div>
									<span ot-if="!command.parameters.length && !command.output.length">This command takes no parameters and returns no data.</span>
								</div>
							</e-core-section>
						</div>
					</div>
					<div ot-if="!developer_addons_selected" class="ot-flex-1">
						<e-status-empty
							icon="extension"
							title="No addon selected"
							description="Pick an addon from the list on the left to inspect it here."
						></e-status-empty>
					</div>
				</div>
			`;
		}
	});
});
