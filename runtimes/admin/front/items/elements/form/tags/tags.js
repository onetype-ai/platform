onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-tags',
		icon: 'label',
		name: 'Tags',
		description: 'Tag input with autocomplete, multi select, async options and keyboard navigation.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'array',
				value: ['design', 'frontend'],
				each: {
					type: 'string|number',
					description: 'A single selected tag value.'
				},
				description: 'Selected tag values.'
			},
			name: {
				type: 'string',
				description: 'Hidden input name for forms.'
			},
			placeholder: {
				type: 'string',
				value: 'Add a tag…',
				description: 'Input placeholder while no tags are selected.'
			},
			options: {
				type: 'array|function',
				value: ['design', 'frontend', 'backend', 'platform', 'marketing'],
				each: {
					type: 'object|string|number',
					description: 'A single option. Strings and numbers auto-wrap to { label, value }, objects take label, value, icon, description and disabled.'
				},
				description: 'Suggestions list, or an async callback(value, type). Called with (query, "search") while typing and with ([values], "selected") to resolve labels for already selected values. Objects resolve their label from label, title or name.'
			},
			mode: {
				type: 'string',
				value: 'input',
				options: ['input', 'select'],
				description: 'Input mode types to add, select mode toggles chips.'
			},
			max: {
				type: 'number',
				value: 0,
				description: 'Maximum number of tags. Zero is unlimited.'
			},
			minLength: {
				type: 'number',
				value: 0,
				description: 'Minimum character length per tag.'
			},
			restrict: {
				type: 'boolean',
				value: false,
				description: 'Only allow values from options.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the tag chips.'
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
				description: 'Called with { value } when the tags change.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.query = '';
			this.open = false;
			this.above = false;
			this.active = null;
			this.shake = null;

			/* ===== SOURCE ===== */

			elements.Fn('source', this, () => this.options);

			this.Compute(() =>
			{
				this.isSelect = this.mode === 'select';

				if(this.sourced && this.value.length)
				{
					this.resolve(this.value);
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

			/* ===== HELPERS ===== */

			this.labelOf = (value) =>
			{
				const found = this.sourced ? this.find(value) : this.list().find((option) => option.value === value);

				return found ? found.label : String(value);
			};

			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background, this.color];

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

			this.chipClass = (option) =>
			{
				const selected = this.value.some((value) => value == option.value);

				return 'chip' + (selected ? ' selected' : '');
			};

			this.reachedMax = () =>
			{
				return this.max > 0 && this.value.length >= this.max;
			};

			this.filtered = () =>
			{
				const list = this.list();

				if(!list.length)
				{
					return [];
				}

				const query = this.query.toLowerCase();

				return list.filter((option) =>
				{
					if(this.value.some((value) => value == option.value))
					{
						return false;
					}

					if(this.sourced || !query)
					{
						return true;
					}

					return String(option.label ? option.label : '').toLowerCase().includes(query);
				});
			};

			/* ===== HANDLERS ===== */

			this.add = (option) =>
			{
				if(this.disabled || !option || option.disabled || this.reachedMax())
				{
					return;
				}

				const existing = this.value.find((value) => value == option.value);

				if(existing !== undefined)
				{
					this.shake = existing;
					this.Update();

					setTimeout(() =>
					{
						this.shake = null;
						this.Update();
					}, 400);

					return;
				}

				this.value.push(option.value);
				this.query = '';
				this.active = null;
				this.open = false;
				this.Update();

				if(this._change)
				{
					this._change({ value: this.value });
				}
			};

			this.addRaw = (text) =>
			{
				if(this.disabled || this.restrict)
				{
					return;
				}

				text = String(text ? text : '').trim();

				if(!text || (this.minLength && text.length < this.minLength) || this.reachedMax())
				{
					return;
				}

				if(this.value.some((value) => value == text))
				{
					return;
				}

				this.value.push(text);
				this.query = '';
				this.active = null;
				this.open = false;
				this.Update();

				if(this._change)
				{
					this._change({ value: this.value });
				}
			};

			this.remove = (tag) =>
			{
				if(this.disabled)
				{
					return;
				}

				const index = this.value.findIndex((value) => value == tag);

				if(index === -1)
				{
					return;
				}

				this.value.splice(index, 1);
				this.Update();

				if(this._change)
				{
					this._change({ value: this.value });
				}
			};

			this.toggle = (option) =>
			{
				if(this.disabled || option.disabled)
				{
					return;
				}

				const index = this.value.findIndex((value) => value == option.value);

				if(index !== -1)
				{
					this.value.splice(index, 1);
				}
				else
				{
					if(this.reachedMax())
					{
						return;
					}

					this.value.push(option.value);
				}

				this.Update();

				if(this._change)
				{
					this._change({ value: this.value });
				}
			};

			this.input = ({ value }) =>
			{
				this.query = value;
				this.active = null;

				if(this.sourced)
				{
					this.search(value);

					if(!this.open)
					{
						this.openDropdown();
					}

					this.Update();
					return;
				}

				const filtered = this.filtered();

				if(filtered.length > 0 && !this.open)
				{
					this.openDropdown();
				}
				else if(filtered.length === 0 && this.open)
				{
					this.closeDropdown();
				}

				this.Update();
			};

			this.focus = () =>
			{
				if(this.filtered().length > 0)
				{
					this.openDropdown();
				}
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

			this.handleKey = ({ event }) =>
			{
				const filtered = this.filtered();

				if(event.key === 'Enter')
				{
					event.preventDefault();

					if(this.open && filtered.length > 0)
					{
						const option = filtered.find((entry) => entry.value === this.active);

						this.add(option ? option : filtered[0]);
					}
					else if(this.query.trim() && !this.restrict)
					{
						this.addRaw(this.query);
					}

					return;
				}

				if(event.key === 'Backspace' && !this.query && this.value.length)
				{
					this.remove(this.value[this.value.length - 1]);
					return;
				}

				if(event.key === 'ArrowDown')
				{
					event.preventDefault();

					if(filtered.length > 0)
					{
						if(!this.open)
						{
							this.openDropdown();
						}

						this.move(1);
						this.Update();
					}

					return;
				}

				if(event.key === 'ArrowUp')
				{
					event.preventDefault();
					this.move(-1);
					this.Update();
					return;
				}

				if(event.key === 'Escape')
				{
					event.preventDefault();
					this.closeDropdown();
				}
			};

			this.openDropdown = () =>
			{
				if(this.open)
				{
					return;
				}

				const box = this.Element.querySelector('.box');
				const rect = box.getBoundingClientRect();

				this.above = window.innerHeight - rect.bottom < 320;
				this.open = true;
				this.Update();

				window.addEventListener('scroll', this.handleScroll, true);
				window.addEventListener('resize', this.closeDropdown);
			};

			this.closeDropdown = () =>
			{
				if(!this.open)
				{
					return;
				}

				this.open = false;
				this.above = false;
				this.query = '';
				this.active = null;
				this.Update();

				window.removeEventListener('scroll', this.handleScroll, true);
				window.removeEventListener('resize', this.closeDropdown);
			};

			this.handleScroll = (event) =>
			{
				if(event.target.closest && event.target.closest('.dropdown'))
				{
					return;
				}

				this.closeDropdown();
			};

			this.dismiss = () =>
			{
				this.closeDropdown();
			};

			/* ===== RENDER ===== */

			if(this.isSelect)
			{
				return /* html */ `
					<div :class="classes()">
						<input type="hidden" :name="name" :value="value.join(',')" />
						<div ot-if="loading && !list().length" class="empty">Loading…</div>
						<div ot-if="!loading || list().length" class="chips">
							<span ot-if="!list().length && !loading" class="placeholder">{{ placeholder }}</span>
							<button
								ot-for="option in list()"
								:ot-key="option.value"
								type="button"
								:class="chipClass(option)"
								ot-click="() => toggle(option)"
								:disabled="disabled || option.disabled"
							>
								<i ot-if="option.icon">{{ option.icon }}</i>
								<span>{{ option.label }}</span>
							</button>
						</div>
					</div>
				`;
			}

			return /* html */ `
				<div :class="classes()" ot-click-outside="dismiss">
					<input type="hidden" :name="name" :value="value.join(',')" />
					<div class="field">
						<span ot-for="tag in value" :ot-key="tag" :class="'tag' + (shake === tag ? ' shake' : '')">
							<span class="text">{{ labelOf(tag) }}</span>
							<button ot-if="!disabled" type="button" class="remove" ot-click="() => remove(tag)">
								<i>close</i>
							</button>
						</span>
						<input
							ot-if="!reachedMax()"
							class="input"
							type="text"
							:value="query"
							:placeholder="value.length ? '' : placeholder"
							:disabled="disabled"
							autocomplete="off"
							spellcheck="false"
							ot-input="input"
							ot-keydown="handleKey"
							ot-focus="focus"
						/>
					</div>
					<div ot-if="open" class="dropdown">
						<div ot-if="loading" class="empty">Loading…</div>
						<div ot-if="!loading && filtered().length === 0" class="empty">No results</div>
						<div ot-if="!loading" class="list">
							<div ot-for="option in filtered()" :ot-key="option.value">
								<button
									type="button"
									:class="'option' + (option.value === active ? ' active' : '')"
									ot-click="() => add(option)"
								>
									<i ot-if="option.icon">{{ option.icon }}</i>
									<span class="label">{{ option.label }}</span>
									<span ot-if="option.description" class="description">{{ option.description }}</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			`;
		}
	});
});
