onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-select',
		icon: 'arrow_drop_down',
		name: 'Select',
		description: 'Custom dropdown select with search, keyboard navigation, async options and a clear action.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'string|number',
				description: 'Selected value.'
			},
			name: {
				type: 'string',
				description: 'Hidden input name for forms.'
			},
			placeholder: {
				type: 'string',
				value: 'Choose a team...',
				description: 'Placeholder text while nothing is selected.'
			},
			icon: {
				type: 'string',
				description: 'Icon on the left side of the trigger.'
			},
			options: {
				type: 'array|function',
				value: ['Design', 'Engineering', 'Marketing', 'Operations'],
				each: {
					type: 'object|string|number',
					description: 'A single option. Strings and numbers auto-wrap to { label, value }, objects take label, value, icon, description and disabled.'
				},
				description: 'List of options, or an async callback(value, type). Called with (query, "search") while typing and with ([values], "selected") to resolve labels for already selected values. Objects resolve their label from label, title or name.'
			},
			searchable: {
				type: 'boolean',
				value: true,
				description: 'Show a search input inside the dropdown.'
			},
			clearable: {
				type: 'boolean',
				value: false,
				description: 'Show a clear action while a value is selected.'
			},
			disabled: {
				type: 'boolean',
				value: false,
				description: 'Disabled state.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the control surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_change: {
				type: 'function',
				description: 'Called with { value } when the selection changes.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.open = false;
			this.above = false;
			this.query = '';
			this.active = null;

			/* ===== SOURCE ===== */

			elements.Fn('source', this, () => this.options);

			this.Compute(() =>
			{
				if(this.sourced && this.value !== null && this.value !== undefined && this.value !== '')
				{
					this.resolve([this.value]);
				}
			});

			this.list = () =>
			{
				if(this.sourced)
				{
					return this.results;
				}

				return this.normalize(Array.isArray(this.options) ? this.options : []);
			};

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background];

				if(this.open)
				{
					list.push('open');
				}

				if(this.above)
				{
					list.push('above');
				}

				if(this.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HELPERS ===== */

			this.current = () =>
			{
				if(this.sourced)
				{
					return this.find(this.value);
				}

				return this.list().find((option) => option.value === this.value);
			};

			this.filtered = () =>
			{
				if(this.sourced || !this.query)
				{
					return this.list();
				}

				return this.list().filter((option) =>
					String(option.label ? option.label : '').toLowerCase().includes(this.query.toLowerCase())
				);
			};

			/* ===== HANDLERS ===== */

			this.toggle = () =>
			{
				if(this.disabled)
				{
					return;
				}

				if(this.open)
				{
					this.close();
					return;
				}

				this.open = true;
				this.query = '';

				const box = this.Element.querySelector('.box');
				const rect = box.getBoundingClientRect();

				this.above = window.innerHeight - rect.bottom < 320;

				const current = this.current();
				const filtered = this.filtered();

				this.active = current ? current.value : (filtered.length ? filtered[0].value : null);

				window.addEventListener('scroll', this.handleScroll, true);
				window.addEventListener('resize', this.close);
				window.addEventListener('keydown', this.handleKey);

				if(this.searchable)
				{
					setTimeout(() =>
					{
						const search = this.Element ? this.Element.querySelector('.search > input') : null;

						if(search)
						{
							search.focus();
						}
					}, 10);
				}
			};

			this.close = () =>
			{
				this.open = false;
				this.above = false;
				this.query = '';
				this.active = null;

				window.removeEventListener('scroll', this.handleScroll, true);
				window.removeEventListener('resize', this.close);
				window.removeEventListener('keydown', this.handleKey);
			};

			this.select = (option) =>
			{
				if(option.disabled)
				{
					return;
				}

				this.value = option.value;
				this.close();

				if(this._change)
				{
					this._change({ value: this.value });
				}
			};

			this.clear = () =>
			{
				this.value = '';

				if(this._change)
				{
					this._change({ value: '' });
				}
			};

			this.typing = ({ value }) =>
			{
				this.query = value;

				const filtered = this.filtered();

				this.active = filtered.length ? filtered[0].value : null;

				if(this.sourced)
				{
					this.search(value);
				}
			};

			this.dismiss = () =>
			{
				this.close();
			};

			this.handleScroll = (event) =>
			{
				if(event.target.closest && event.target.closest('.dropdown'))
				{
					return;
				}

				this.close();
			};

			this.move = (step) =>
			{
				const filtered = this.filtered();

				if(!filtered.length)
				{
					return;
				}

				const index = filtered.findIndex((option) => option.value === this.active);

				this.active = filtered[Math.min(Math.max(index + step, 0), filtered.length - 1)].value;
			};

			this.handleKey = (event) =>
			{
				if(!this.open)
				{
					return;
				}

				const filtered = this.filtered();

				if(event.key === 'Escape')
				{
					event.preventDefault();
					this.close();
					return;
				}

				if(event.key === 'ArrowDown')
				{
					event.preventDefault();
					this.move(1);
					return;
				}

				if(event.key === 'ArrowUp')
				{
					event.preventDefault();
					this.move(-1);
					return;
				}

				if(event.key === 'Home')
				{
					event.preventDefault();
					this.active = filtered.length ? filtered[0].value : null;
					return;
				}

				if(event.key === 'End')
				{
					event.preventDefault();
					this.active = filtered.length ? filtered[filtered.length - 1].value : null;
					return;
				}

				if(event.key === 'Enter')
				{
					event.preventDefault();

					const option = filtered.find((entry) => entry.value === this.active);

					if(option)
					{
						this.select(option);
						return;
					}

					if(filtered.length)
					{
						this.select(filtered[0]);
					}
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()" ot-click-outside="dismiss">
					<input type="hidden" :name="name" :value="value" />
					<div class="trigger" ot-click="toggle">
						<i ot-if="icon" class="icon">{{ icon }}</i>
						<i ot-if="!icon && current() && current().icon" class="icon">{{ current().icon }}</i>
						<span ot-if="current()" class="selected">{{ current().label }}</span>
						<span ot-if="!current() && loading" class="placeholder">Loading…</span>
						<span ot-if="!current() && !loading" class="placeholder">{{ placeholder }}</span>
						<button
							ot-if="clearable && value && !disabled"
							type="button"
							class="action"
							ot-click.stop="clear"
							:ot-tooltip="{ text: 'Clear', position: { x: 'center', y: 'top' } }"
						>
							<i>close</i>
						</button>
						<i class="arrow">expand_more</i>
					</div>
					<div ot-if="open" class="dropdown">
						<div ot-if="searchable" class="search">
							<i>search</i>
							<input type="text" :value="query" placeholder="Search…" autocomplete="off" ot-input="typing" />
						</div>
						<div class="list">
							<div ot-for="option in filtered()" :ot-key="option.value">
								<button
									type="button"
									:class="'option' + (option.value === value ? ' selected' : '') + (option.value === active ? ' active' : '') + (option.disabled ? ' disabled' : '')"
									ot-click="() => select(option)"
								>
									<i ot-if="option.icon" class="icon">{{ option.icon }}</i>
									<span class="text">
										<span class="label">{{ option.label }}</span>
										<span ot-if="option.description" class="description">{{ option.description }}</span>
									</span>
									<i ot-if="option.value === value" class="check">check</i>
								</button>
							</div>
							<div ot-if="filtered().length === 0 && !loading" class="empty">No results</div>
							<div ot-if="loading" class="empty">Loading…</div>
						</div>
					</div>
				</div>
			`;
		}
	});
});
