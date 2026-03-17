elements.ItemAdd({
	id: 'sites-variables',
	icon: 'data_object',
	name: 'Variables',
	description: 'Site variables panel with groups as tabs.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.group = 'Default';
		this.groups = [];
		this.items = [];
		this.editing = null;

		const load = () =>
		{
			const all = Object.values(sites.variables.Items()).map(item => item.data);
			const set = new Set(all.map(item => item.group).filter(Boolean).sort());

			this.groups = [...set];
			this.items = all;

			if(!this.groups.includes(this.group) && this.groups.length)
			{
				this.group = this.groups[0];
			}
		};

		const callback = (item) =>
		{
			if(item.addon.GetName() === 'sites.variables')
			{
				load();
			}
		};

		load();

		this.On('@addon.item.added', callback);
		this.On('@addon.item.modified', callback);
		this.On('@addon.item.removed', callback);

		this.filtered = () =>
		{
			return this.items.filter(item => item.group === this.group).sort((a, b) => a.name.localeCompare(b.name));
		};

		this.tab = (name) =>
		{
			if(this.editing && this.editing.startsWith('group:'))
			{
				return;
			}

			this.group = name;
			this.editing = null;
			sites.variables.Fn('deactivate');
		};

		this.icon = (type) =>
		{
			const icons = {
				text: 'title',
				number: 'tag',
				color: 'palette',
				boolean: 'toggle_on',
				repeater: 'list'
			};

			return icons[type] || 'data_object';
		};

		this.select = ({ event }, item) =>
		{
			if(event.target.closest('.card-edit'))
			{
				return;
			}

			if(item.active)
			{
				this.editing = null;
				sites.variables.Fn('deactivate');
			}
			else
			{
				this.editing = item.id;
				sites.variables.Fn('activate', item.id);
			}
		};

		this.change = (id, key, { value }) =>
		{
			sites.variables.Fn('update', id, { [key]: value });
		};

		this.changeType = (id, { value }) =>
		{
			sites.variables.Fn('update', id, { type: value, value: '', values: [] });
		};

		this.add = () =>
		{
			const target = this.group || 'Default';

			sites.variables.Fn('create', {
				name: 'untitled',
				group: target,
				type: 'text'
			});
		};

		this.addGroup = () =>
		{
			const name = 'Group ' + (this.groups.length + 1);

			sites.variables.Fn('create', {
				name: 'untitled',
				group: name,
				type: 'text'
			});

			this.group = name;
		};

		this.renameGroup = (name) =>
		{
			this.editing = 'group:' + name;
			this.Update();
		};

		this.commitGroup = (old, { value }) =>
		{
			const target = value.trim() || old;

			if(target !== old)
			{
				const items = Object.values(sites.variables.Items()).filter(i => i.Get('group') === old);

				for(const item of items)
				{
					sites.variables.Fn('update', item.Get('id'), { group: target });
				}

				this.group = target;
			}

			this.editing = null;
		};

		this.remove = (id) =>
		{
			sites.variables.Fn('delete', id);
		};

		this.close = () =>
		{
			$ot.modal.close();
		};

		this.types = [
			{ label: 'Text', value: 'text' },
			{ label: 'Number', value: 'number' },
			{ label: 'Color', value: 'color' },
			{ label: 'Boolean', value: 'boolean' }
		];

		return `
			<div class="holder">
				<div class="sidebar">
					<div class="sidebar-header">
						<i class="icon">data_object</i>
						<span class="title">Variables</span>
					</div>
					<div class="sidebar-groups">
						<div ot-for="name in groups" :class="'group' + (group === name ? ' active' : '')" ot-click="() => tab(name)">
							<i>folder</i>
							<e-form-input ot-if="editing === 'group:' + name" :value="name" :variant="['bg-3', 'size-s']" :_change="(data) => commitGroup(name, data)" ot-click.stop></e-form-input>
							<button ot-if="editing === 'group:' + name" class="edit" ot-click.stop="() => commitGroup(name, { value: name })"><i>check</i></button>
							<span ot-if="editing !== 'group:' + name" class="label">{{ name }}</span>
							<button ot-if="editing !== 'group:' + name" class="edit" ot-click.stop="() => renameGroup(name)"><i>edit</i></button>
						</div>
					</div>
					<button class="sidebar-add" ot-click="addGroup">
						<i>add</i>
						<span>New Group</span>
					</button>
				</div>
				<div class="main">
					<div class="main-header">
						<div class="left">
							<span class="label">{{ group }}</span>
							<span class="count">{{ filtered().length }}</span>
						</div>
						<div class="right">
							<e-form-button text="Add" icon="add" :variant="['bg-1', 'border', 'size-s']" :_click="add"></e-form-button>
							<button class="close" ot-click="close"><i>close</i></button>
						</div>
					</div>
					<div class="main-body ot-scrollbar">
						<div ot-for="item in filtered()" :class="'card' + (item.active ? ' active' : '')" ot-click="(e) => select(e, item)">
							<div class="card-header">
								<div class="card-name">
									<i class="card-icon">{{ icon(item.type) }}</i>
									<span>{{ item.name }}</span>
								</div>
								<button class="card-more" ot-click.stop="() => remove(item.id)"><i>delete</i></button>
							</div>
							<div ot-if="!item.active" class="card-value">
								<div ot-if="item.type === 'color'" class="color">
									<span class="swatch" :style="'background:' + item.value"></span>
									<span>{{ item.value }}</span>
								</div>
								<span ot-if="item.type === 'boolean'">{{ item.value === 'true' ? 'Yes' : 'No' }}</span>
								<span ot-if="item.type !== 'color' && item.type !== 'boolean'">{{ item.value || '—' }}</span>
							</div>
							<div ot-if="item.active" class="card-edit">
								<div class="field">
									<span class="field-label">Name</span>
									<e-form-input :value="item.name" :variant="['bg-3', 'border', 'size-s']" :_change="(data) => change(item.id, 'name', data)"></e-form-input>
								</div>
								<div class="field">
									<span class="field-label">Type</span>
									<e-form-select :value="item.type" :options="types" :variant="['bg-3', 'border', 'size-s']" :_change="(data) => changeType(item.id, data)"></e-form-select>
								</div>
								<div class="field">
									<span class="field-label">Value</span>
									<e-form-textarea ot-if="item.type === 'text'" :value="item.value" :rows="2" :variant="['bg-3', 'border', 'size-s']" :_change="(data) => change(item.id, 'value', data)"></e-form-textarea>
									<e-form-input ot-if="item.type === 'number'" :value="item.value" type="number" :variant="['bg-3', 'border', 'size-s']" :_change="(data) => change(item.id, 'value', data)"></e-form-input>
									<e-form-color ot-if="item.type === 'color'" :value="item.value" :variant="['bg-3', 'border', 'size-s']" :_change="(data) => change(item.id, 'value', data)"></e-form-color>
									<e-form-toggle ot-if="item.type === 'boolean'" :value="item.value === 'true'" :variant="['bg-3', 'size-s']" :_change="({ value }) => change(item.id, 'value', { value: String(value) })"></e-form-toggle>
								</div>
							</div>
						</div>
						<div ot-if="!filtered().length" class="empty">
							<e-status-empty icon="data_object" title="No variables" description="Add your first variable to this group."></e-status-empty>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
