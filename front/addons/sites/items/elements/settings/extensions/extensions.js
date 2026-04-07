elements.ItemAdd({
	id: 'site-tab-extensions',
	icon: 'extension',
	name: 'Site Extensions',
	description: 'Extension marketplace for a site.',
	category: 'Sites',
	author: 'OneType',
	config: {
		site: {
			type: 'object',
			value: {}
		}
	},
	render: function()
	{
		this.items = [];
		this.installs = [];
		this.loading = true;
		this.search = '';

		const load = async () =>
		{
			const [all, installed] = await Promise.all([
				extensions.Find().sort('order', 'asc').many(),
				$ot.command('installs:list', { site_id: this.site.id }, true)
			]);

			this.items = all.map(item => item.data);
			this.installs = installed.data.installs;
			this.loading = false;
		};

		load();

		this.installed = (id) =>
		{
			return this.installs.find(i => i.extension_id === id);
		};

		this.has_config = (item) =>
		{
			return item.config && Object.keys(item.config).length > 0;
		};

		this.filtered = () =>
		{
			if(!this.search)
			{
				return this.items;
			}

			const query = this.search.toLowerCase();

			return this.items.filter(item =>
				item.name.toLowerCase().includes(query) ||
				item.description.toLowerCase().includes(query)
			);
		};

		this.install = async (item) =>
		{
			const result = await extensions.installs.Fn('install', this.site, item);

			if(result)
			{
				this.installs = [...this.installs, result.data];
			}
		};

		this.uninstall = async (item) =>
		{
			const install = this.installed(item.id);

			if(!install)
			{
				return;
			}

			await extensions.installs.Fn('uninstall', install.id);

			this.installs = this.installs.filter(i => i.id !== install.id);
		};

		this.configure = (item) =>
		{
			const install = this.installed(item.id);
			const schema = item.config;

			setTimeout(() =>
			{
				$ot.modal(function()
				{
					this.icon = item.icon;
					this.name = item.name;
					this.values = { ...install.config };
					this.saving = false;

					this.sections = [{
						fields: Object.keys(schema).map(key =>
						{
							const field = schema[key];

							return {
								key,
								label: field.label || key,
								position: 'top',
								element: 'form-input',
								properties: {
									placeholder: field.placeholder || '',
									variant: ['bg-3', 'border', 'size-m']
								}
							};
						})
					}];

					this.change = ({ key, value }) =>
					{
						this.values = { ...this.values, [key]: value };
					};

					this.save = async () =>
					{
						this.saving = true;

						await $ot.command('installs:update', {
							id: install.id,
							config: this.values
						}, true);

						install.config = this.values;
						this.saving = false;
						$ot.modal.close();
					};

					return `
						<div class="modal-extensions">
							<div class="modal-header">
								<i>{{ icon }}</i>
								<span>{{ name }}</span>
							</div>
							<div class="modal-body">
								<e-core-builder :sections="sections" :values="values" :_change="change"></e-core-builder>
							</div>
							<div class="modal-footer">
								<e-form-button text="Save" icon="save" :variant="['brand', 'size-m']" :loading="saving" :_click="save"></e-form-button>
							</div>
						</div>
					`;
				});
			});
		};

		return `
			<div class="holder">
				<div class="header">
					<div class="title">
						<i>extension</i>
						<span>Extensions</span>
					</div>
					<div class="search">
						<e-form-input icon="search" placeholder="Search extensions..." :variant="['bg-3', 'border', 'size-m']" :_input="(data) => search = data.value"></e-form-input>
					</div>
				</div>
				<e-status-loading ot-if="loading" :variant="['brand']"></e-status-loading>
				<div ot-if="!loading" class="grid">
					<div ot-for="item in filtered()" :class="'card' + (installed(item.id) ? ' installed' : '')">
						<div class="card-header">
							<div class="card-icon">
								<i>{{ item.icon }}</i>
							</div>
							<div class="card-info">
								<span class="card-name">{{ item.name }}</span>
								<span class="card-description">{{ item.description }}</span>
							</div>
						</div>
						<div class="card-actions">
							<e-form-button ot-if="!installed(item.id)" text="Install" icon="add" :variant="['brand', 'size-s']" :_click="() => install(item)"></e-form-button>
							<e-form-button ot-if="installed(item.id) && has_config(item)" text="Configure" icon="settings" :variant="['bg-3', 'border', 'size-s']" :_click="() => configure(item)"></e-form-button>
							<e-form-button ot-if="installed(item.id)" text="Uninstall" icon="delete" :variant="['ghost', 'size-s']" :_click="() => uninstall(item)"></e-form-button>
						</div>
					</div>
				</div>
				<e-status-empty ot-if="!loading && !filtered().length" icon="extension" title="No extensions" description="No extensions found."></e-status-empty>
			</div>
		`;
	}
});
