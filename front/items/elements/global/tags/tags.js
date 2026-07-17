onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'global-tags',
		icon: 'label',
		name: 'Tags',
		description: 'Selectable tag pills with icons, color dots, counts, single or multi selection.',
		category: 'Global',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 'all', label: 'All', count: 24 },
					{ id: 'design', label: 'Design', color: 'blue', count: 9 },
					{ id: 'engineering', label: 'Engineering', color: 'green', count: 8 },
					{ id: 'product', label: 'Product', color: 'orange', count: 5 },
					{ id: 'archived', label: 'Archived', disabled: true }
				],
				each: {
					type: 'string|object',
					config: {
						id: {
							type: 'string',
							description: 'Unique tag identifier.'
						},
						label: {
							type: 'string',
							description: 'Display text.'
						},
						icon: {
							type: 'string',
							description: 'Material Symbols icon before the label.'
						},
						count: {
							type: 'string|number',
							description: 'Count badge after the label.'
						},
						color: {
							type: 'string',
							options: ['brand', 'blue', 'red', 'orange', 'green'],
							description: 'Color dot and active accent. Empty falls back to brand on select.'
						},
						disabled: {
							type: 'boolean',
							value: false,
							description: 'Dims the tag and blocks selection.'
						},
						onClick: {
							type: 'function',
							description: 'Called with { event, tag } on click, before the selection change.'
						}
					}
				},
				description: 'Tags left to right. Strings or objects with id, label, icon, count, color and disabled.'
			},
			active: {
				type: 'string|array',
				description: 'Active tag id, or an array of ids while multiple is on.'
			},
			multiple: {
				type: 'boolean',
				value: false,
				description: 'Allow selecting more than one tag.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the tag pills from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_change: {
				type: 'function',
				description: 'Called with { event, value } after every selection change.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.normalized = this.items.map((item) =>
				{
					if(typeof item === 'string')
					{
						return { id: item, label: item };
					}

					return item;
				});
			});

			/* ===== CLASSES ===== */

			this.state = (tag) =>
			{
				const list = ['tag'];

				list.push(tag.color ? tag.color : 'brand');

				if(this.picked(tag))
				{
					list.push('active');
				}

				if(tag.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.picked = (tag) =>
			{
				if(Array.isArray(this.active))
				{
					return this.active.includes(tag.id);
				}

				return this.active === tag.id;
			};

			this.select = (tag, event) =>
			{
				if(tag.disabled)
				{
					return;
				}

				if(tag.onClick)
				{
					tag.onClick({ event, tag });
				}

				let next;

				if(this.multiple)
				{
					const current = Array.isArray(this.active) ? [...this.active] : [];
					const index = current.indexOf(tag.id);

					if(index === -1)
					{
						current.push(tag.id);
					}
					else
					{
						current.splice(index, 1);
					}

					next = current;
				}
				else
				{
					next = this.active === tag.id ? null : tag.id;
				}

				this.active = next;

				if(this._change)
				{
					this._change({ event, value: next });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="'box bg-' + background">
					<div ot-for="tag in normalized" :ot-key="tag.id">
						<button type="button" :class="state(tag)" ot-click="({ event }) => select(tag, event)">
							<span ot-if="tag.color && !tag.icon" class="dot"></span>
							<i ot-if="tag.icon">{{ tag.icon }}</i>
							<span class="label">{{ tag.label }}</span>
							<span ot-if="tag.count != null" class="count">{{ tag.count }}</span>
						</button>
					</div>
				</div>
			`;
		}
	});
});
