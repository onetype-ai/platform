onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-transfer',
		icon: 'swap_horiz',
		name: 'Transfer',
		description: 'Two panel transfer list with search, bulk move actions and a max limit.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'array',
				value: ['deploy', 'logs'],
				each: {
					type: 'string|number',
					description: 'A single selected item value.'
				},
				description: 'Selected item values.'
			},
			items: {
				type: 'array|function',
				value: [
					{ value: 'deploy', label: 'Deploy', description: 'Push releases to production.', icon: 'rocket_launch' },
					{ value: 'logs', label: 'Logs', description: 'Read service logs.', icon: 'receipt_long' },
					{ value: 'billing', label: 'Billing', description: 'Manage plans and invoices.', icon: 'credit_card' },
					{ value: 'members', label: 'Members', description: 'Invite and remove people.', icon: 'group' },
					{ value: 'domains', label: 'Domains', description: 'Connect custom domains.', icon: 'language' }
				],
				each: {
					type: 'object',
					config: {
						value: {
							type: 'string|number',
							description: 'Unique item identifier.'
						},
						label: {
							type: 'string',
							description: 'Display label.'
						},
						description: {
							type: 'string',
							description: 'Secondary text.'
						},
						icon: {
							type: 'string',
							description: 'Material icon name.'
						},
						disabled: {
							type: 'boolean',
							description: 'Prevent moving this item.'
						}
					}
				},
				description: 'All available items, or an async callback(value, type). Called with (query, "search") for the available panel and with ([values], "selected") to resolve labels for already selected values.'
			},
			max: {
				type: 'number',
				description: 'Maximum selectable items.'
			},
			searchable: {
				type: 'boolean',
				value: true,
				description: 'Show search inputs.'
			},
			leftTitle: {
				type: 'string',
				value: 'Available',
				description: 'Left panel heading.'
			},
			rightTitle: {
				type: 'string',
				value: 'Selected',
				description: 'Right panel heading.'
			},
			emptyLeft: {
				type: 'string',
				value: 'No items',
				description: 'Left panel empty text.'
			},
			emptyRight: {
				type: 'string',
				value: 'None selected',
				description: 'Right panel empty text.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the panel surfaces from 1 to 3. 0 renders transparent, without background or borders.'
			},
			disabled: {
				type: 'boolean',
				value: false,
				description: 'Disable all interaction.'
			},
			_change: {
				type: 'function',
				description: 'Change handler. Receives { value }.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.leftSearch = '';
			this.rightSearch = '';

			/* ===== SOURCE ===== */

			elements.Fn('source', this, () => this.items);

			this.list = () =>
			{
				if(this.sourced)
				{
					const known = this.value.map((value) => this.find(value)).filter(Boolean);
					const extra = known.filter((option) => !this.results.some((entry) => entry.value === option.value));

					return [...this.results, ...extra];
				}

				return Array.isArray(this.items) ? this.items : [];
			};


			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background];

				if(this.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HELPERS ===== */

			this.isSelected = (id) =>
			{
				return this.value.includes(id);
			};

			this.filter = (list, query) =>
			{
				if(this.sourced || !query)
				{
					return list;
				}

				const search = query.toLowerCase();

				return list.filter(item =>
				{
					const label = String(item.label ? item.label : '').toLowerCase();
					const description = String(item.description ? item.description : '').toLowerCase();

					return label.includes(search) || description.includes(search);
				});
			};

			this.atMax = () =>
			{
				return this.max && this.value.length >= this.max;
			};

			this.slotsLeft = () =>
			{
				if(!this.max)
				{
					return Infinity;
				}

				return Math.max(0, this.max - this.value.length);
			};

			this.computed = () =>
			{
				const available = this.list().filter(item => !this.isSelected(item.value));
				const selected = this.list().filter(item => this.isSelected(item.value));

				return {
					available,
					selected,
					availableFiltered: this.filter(available, this.leftSearch),
					selectedFiltered: this.filter(selected, this.rightSearch)
				};
			};

			/* ===== HANDLERS ===== */

			this.toggleLeft = (item) =>
			{
				if(this.disabled || item.disabled)
				{
					return;
				}

				/* Single click moves the item to the selected side immediately. */

				if(this.slotsLeft() <= 0 && !this.value.includes(item.value))
				{
					return;
				}

				if(!this.value.includes(item.value))
				{
					this.value.push(item.value);
				}

				this.emit();
				this.Update();
			};

			this.toggleRight = (item) =>
			{
				if(this.disabled || item.disabled)
				{
					return;
				}

				/* Single click moves the item back to the available side. */

				this.value = this.value.filter(id => id !== item.value);
				this.emit();
				this.Update();
			};

			this.emit = () =>
			{
				const ordered = this.list().filter(item => this.value.includes(item.value)).map(item => item.value);
				this.value = ordered;

				if(this._change)
				{
					this._change({ value: this.value });
				}
			};

			this.moveAllRight = () =>
			{
				if(this.disabled)
				{
					return;
				}

				const eligible = this.list().filter(item => !item.disabled && !this.isSelected(item.value));
				const slots = this.slotsLeft();
				const ids = eligible.slice(0, slots).map(item => item.value);

				ids.forEach(id =>
				{
					if(!this.value.includes(id))
					{
						this.value.push(id);
					}
				});

				this.emit();
				this.Update();
			};

			this.moveAllLeft = () =>
			{
				if(this.disabled)
				{
					return;
				}

				const keepIds = this.list().filter(item => item.disabled && this.isSelected(item.value)).map(item => item.value);
				this.value = keepIds;
				this.emit();
				this.Update();
			};

			this.changeLeftSearch = ({ value }) =>
			{
				this.leftSearch = value;

				if(this.sourced)
				{
					this.search(value);
				}
			};

			this.changeRightSearch = ({ value }) =>
			{
				this.rightSearch = value;
			};

			/* ===== BUTTON STATES ===== */

			this.canMoveAllRight = () =>
			{
				if(this.disabled || this.atMax())
				{
					return false;
				}

				return this.list().some(item => !item.disabled && !this.isSelected(item.value));
			};

			this.canMoveAllLeft = () =>
			{
				if(this.disabled)
				{
					return false;
				}

				return this.list().some(item => !item.disabled && this.isSelected(item.value));
			};

			this.available = () =>
			{
				return this.computed().availableFiltered;
			};

			this.chosen = () =>
			{
				return this.computed().selectedFiltered;
			};

			this.Compute(() =>
			{
				if(this.sourced && this.value.length)
				{
					this.resolve(this.value);
				}
			});

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div class="panel">
						<header class="head">
							<span class="title">{{ leftTitle }}</span>
							<span class="counter">{{ computed().available.length }} / {{ list().length }}</span>
						</header>

						<div ot-if="searchable" class="search">
							<e-form-input
								icon="search"
								placeholder="Search…"
								:value="leftSearch"
								:_input="changeLeftSearch"
								:background="3"
							></e-form-input>
						</div>

						<div class="list">
							<div ot-if="!available().length" class="empty">
								<i>inbox</i>
								<span>{{ emptyLeft }}</span>
							</div>
							<button
								ot-for="item in available()"
								:ot-key="item.value"
								type="button"
								:class="'item' + (item.disabled ? ' disabled' : '')"
								:disabled="item.disabled || disabled"
								ot-click="() => toggleLeft(item)"
							>
								<i ot-if="item.icon" class="item-icon">{{ item.icon }}</i>
								<div class="item-text">
									<span class="item-label">{{ item.label }}</span>
									<span ot-if="item.description" class="item-desc">{{ item.description }}</span>
								</div>
								<i class="item-move">add</i>
							</button>
						</div>
					</div>

					<div class="controls">
						<button
							type="button"
							class="control"
							:disabled="!canMoveAllRight()"
							ot-click="moveAllRight"
							:ot-tooltip="{ text: 'Move all', position: { x: 'center', y: 'top' } }"
						>
							<i>keyboard_double_arrow_right</i>
						</button>
						<button
							type="button"
							class="control"
							:disabled="!canMoveAllLeft()"
							ot-click="moveAllLeft"
							:ot-tooltip="{ text: 'Remove all', position: { x: 'center', y: 'top' } }"
						>
							<i>keyboard_double_arrow_left</i>
						</button>
					</div>

					<div class="panel">
						<header class="head">
							<span class="title">{{ rightTitle }}</span>
							<span class="counter">{{ computed().selected.length }} / {{ max ? max : list().length }}</span>
						</header>

						<div ot-if="searchable" class="search">
							<e-form-input
								icon="search"
								placeholder="Search…"
								:value="rightSearch"
								:_input="changeRightSearch"
								:background="3"
							></e-form-input>
						</div>

						<div class="list">
							<div ot-if="!chosen().length" class="empty">
								<i>playlist_add</i>
								<span>{{ emptyRight }}</span>
							</div>
							<button
								ot-for="item in chosen()"
								:ot-key="item.value"
								type="button"
								:class="'item' + (item.disabled ? ' disabled' : '')"
								:disabled="item.disabled || disabled"
								ot-click="() => toggleRight(item)"
							>
								<i ot-if="item.icon" class="item-icon">{{ item.icon }}</i>
								<div class="item-text">
									<span class="item-label">{{ item.label }}</span>
									<span ot-if="item.description" class="item-desc">{{ item.description }}</span>
								</div>
								<i class="item-move">close</i>
							</button>
						</div>
					</div>
				</div>
			`;
		}
	});
});
