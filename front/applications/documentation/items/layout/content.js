onetype.AddonReady('layouts', (layouts) =>
{
	layouts.Item({
		id: 'documentation-content',
		active: true,
		app: ['documentation'],
		zone: 'root',
		slot: 'center',
		config: {
			addon: {
				type: 'string',
				value: 'apps'
			}
		},
		render: function()
		{
			this.Compute(() =>
			{
				this.data = documentation.Fn('inspect', this.addon);

				const tabs = settings.Fn('get', 'documentation.tab', {});
				const saved = tabs[this.addon];

				this.active = saved || (this.data.overview ? 'overview' : 'fields');
			});

			this.change = (value) =>
			{
				this.active = value;

				const tabs = settings.Fn('get', 'documentation.tab', {});

				tabs[this.addon] = value;
				settings.Fn('set', 'documentation.tab', tabs);
			};

			return /* html */ `
				<div class="ot-container-m ot-py-l ot-flex-vertical">
					<e-global-heading :title="data.title" :description="data.description"></e-global-heading>
					<e-documentation-tabs :inspect="data" :active="active" :_change="change"></e-documentation-tabs>
					<e-documentation-overview ot-if="active === 'overview'" :content="data.overview"></e-documentation-overview>
					<e-documentation-fields ot-if="active === 'fields'" :fields="data.fields"></e-documentation-fields>
					<e-documentation-items ot-if="active === 'items'" :items="data.items"></e-documentation-items>
					<e-documentation-functions ot-if="active === 'functions'" :functions="data.functions"></e-documentation-functions>
					<e-documentation-store ot-if="active === 'store'" :store="data.store"></e-documentation-store>
					<e-documentation-elements ot-if="active === 'elements'" :elements="data.elements"></e-documentation-elements>
					<e-documentation-commands ot-if="active === 'commands'" :commands="data.commands"></e-documentation-commands>
					<e-documentation-pipelines ot-if="active === 'pipelines'" :pipelines="data.pipelines"></e-documentation-pipelines>
					<e-documentation-events ot-if="active === 'events'" :events="data.events"></e-documentation-events>
				</div>
			`;
		}
	});
});
