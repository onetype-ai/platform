elements.ItemAdd({
	id: 'canvas',
	icon: 'crop_free',
	name: 'Canvas',
	description: 'Grid surface with a camera, floating item cards, group regions, connection lines and a minimap.',
	category: 'Canvas',
	metadata: { addon: 'ui.canvas' },
	config: {
		layout: {
			type: 'string',
			value: 'free',
			options: ['free', 'stack'],
			description: 'free places items by their own positions, stack lays them out vertically by order.'
		}
	},
	render: function()
	{
		/* ===== CAMERA — gestures write to the DOM directly, never re-render ===== */

		const camera = { ...$ot.modules.settings.get('ui.canvas.camera', { x: 0, y: 0, z: 1 }) };
		const limits = { min: 0.25, max: 2 };

		this.worldStyle = () =>
		{
			return 'transform: translate(' + camera.x + 'px, ' + camera.y + 'px) scale(' + camera.z + ');';
		};

		this.meshStyle = () =>
		{
			return 'background-size: ' + (24 * camera.z) + 'px ' + (24 * camera.z) + 'px; background-position: ' + camera.x + 'px ' + camera.y + 'px;';
		};

		const viewport = () =>
		{
			const box = this.Element ? this.Element.querySelector('.box') : null;

			return box ? box.getBoundingClientRect() : { width: 1200, height: 800, left: 0, top: 0 };
		};

		const apply = () =>
		{
			const box = this.Element && this.Element.querySelector('.box');
			const world = this.Element && this.Element.querySelector('.world');
			const mesh = this.Element && this.Element.querySelector('.mesh');
			const level = this.Element && this.Element.querySelector('.hud > .level');

			if(box)
			{
				box.dataset.tier = camera.z < 0.5 ? 'far' : 'near';
			}

			if(world)
			{
				world.style.transform = 'translate(' + camera.x + 'px, ' + camera.y + 'px) scale(' + camera.z + ')';
				world.style.setProperty('--inverse', Math.min(4, 1 / camera.z));
			}

			if(mesh)
			{
				mesh.style.backgroundSize = (24 * camera.z) + 'px ' + (24 * camera.z) + 'px';
				mesh.style.backgroundPosition = camera.x + 'px ' + camera.y + 'px';
			}

			if(level)
			{
				level.textContent = Math.round(camera.z * 100) + '%';
			}

			frame();
		};

		const persist = onetype.HelperDebounce(() =>
		{
			$ot.modules.settings.set('ui.canvas.camera', { ...camera });
		}, 300);

		/* Command driven camera moves ease in through the flying class,
		   gestures land first and keep writing the transform directly. */

		let flight = null;
		let kept = null;

		this.seek = null;
		this.matches = [];
		this.cursor = 0;

		const fly = () =>
		{
			const box = this.Element && this.Element.querySelector('.box');

			if(!box)
			{
				return apply();
			}

			clearTimeout(flight);
			box.classList.add('flying');

			apply();

			flight = setTimeout(() => box.classList.remove('flying'), 300);
		};

		const land = () =>
		{
			const box = this.Element && this.Element.querySelector('.box');

			clearTimeout(flight);

			box && box.classList.remove('flying');
		};

		/* ===== DATA ===== */

		const minimap = (items) =>
		{
			if(!items.length)
			{
				return { width: 150, height: 110, scale: 1, left: 0, top: 0, items: [] };
			}

			const padding = 100;
			const left = Math.min(...items.map((item) => item.x)) - padding;
			const top = Math.min(...items.map((item) => item.y)) - padding;
			const right = Math.max(...items.map((item) => item.x + item.width)) + padding;
			const bottom = Math.max(...items.map((item) => item.y + item.height)) + padding;
			const scale = Math.min(150 / (right - left), 110 / (bottom - top));

			return {
				width: 150,
				height: 110,
				scale,
				left,
				top,
				items: items.map((item) =>
				{
					return {
						id: item.id,
						x: (item.x - left) * scale,
						y: (item.y - top) * scale,
						width: item.width * scale,
						height: item.height * scale
					};
				})
			};
		};

		/* A zero sized svg never paints, so it sizes itself around the items,
		   with margin to keep live dragging inside. */

		const bounds = (items) =>
		{
			const margin = 500;
			const left = (items.length ? Math.min(...items.map((item) => item.x)) : 0) - margin;
			const top = (items.length ? Math.min(...items.map((item) => item.y)) : 0) - margin;
			const right = (items.length ? Math.max(...items.map((item) => item.x + item.width)) : 0) + margin;
			const bottom = (items.length ? Math.max(...items.map((item) => item.y + item.height)) : 0) + margin;

			return { left, top, width: right - left, height: bottom - top };
		};

		this.wireStyle = () =>
		{
			return 'left: ' + this.frame.left + 'px; top: ' + this.frame.top + 'px; width: ' + this.frame.width + 'px; height: ' + this.frame.height + 'px;';
		};

		this.wireShift = () =>
		{
			return 'translate(' + (-this.frame.left) + ' ' + (-this.frame.top) + ')';
		};

		const refresh = () =>
		{
			let items = ui.canvas.Fn('list');

			if(this.layout === 'stack')
			{
				items = ui.canvas.Fn('stack', items);
			}

			const state = $ot.modules.settings.get('ui.canvas.focus', null);

			if(state && !items.find((item) => item.id === state.id))
			{
				queueMicrotask(() => $ot.command('ui:canvas:blur'));
			}

			this.focus = state ? state.id : null;
			this.items = items;
			this.selected = (this.selected || []).filter((id) => items.find((item) => item.id === id));
			this.regions = this.layout === 'free' ? ui.canvas.Fn('regions', items) : [];
			this.edges = ui.canvas.Fn('edges', items);
			this.map = minimap(items);
			this.frame = bounds(items);

			ui.canvas.StoreSet('placed', items);
		};

		this.Compute(refresh);

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'ui.canvas' && refresh());
		this.On('@addon.item.modified', (item) => item.addon.GetName() === 'ui.canvas' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'ui.canvas' && refresh());

		this.On('ui.apps.open', refresh);
		this.On('ui.apps.close', refresh);
		this.On('ui.modes.switch', refresh);
		this.On('ui.canvas.move', refresh);
		this.On('ui.canvas.group', refresh);
		this.On('ui.canvas.focus', refresh);
		this.On('ui.canvas.blur', refresh);
		this.On('ui.canvas.link', refresh);
		this.On('ui.canvas.unlink', refresh);

		/* Tidy glides the cards into place, the class arms a transform transition
		   for the re-render that follows on ui.canvas.move. */

		this.On('ui.canvas.tidy', () =>
		{
			const box = this.Element && this.Element.querySelector('.box');

			if(!box)
			{
				return;
			}

			box.classList.add('tidying');

			setTimeout(() => box.classList.remove('tidying'), 400);
		});

		this.On('modules.settings.change', (change) =>
		{
			if(change.id === 'ui.canvas.camera')
			{
				Object.assign(camera, $ot.modules.settings.get('ui.canvas.camera', { x: 0, y: 0, z: 1 }));

				fly();
			}
		});

		/* ===== PULSE — a dot travels the connection line ===== */

		this.On('ui.canvas.pulse', (data) =>
		{
			const path = this.Element && this.Element.querySelector('[data-edge="' + data.from + ':' + data.to + '"]');

			if(!path)
			{
				return;
			}

			const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

			dot.setAttribute('r', 4);
			dot.setAttribute('class', 'pulse' + (data.color ? ' ' + data.color : ''));

			path.parentNode.appendChild(dot);
			path.classList.add('live');

			const total = path.getTotalLength();
			const start = performance.now();

			const travel = (now) =>
			{
				const step = Math.min(1, (now - start) / 700);
				const eased = step < 0.5 ? 2 * step * step : 1 - Math.pow(-2 * step + 2, 2) / 2;
				const point = path.getPointAtLength(total * eased);

				dot.setAttribute('cx', point.x);
				dot.setAttribute('cy', point.y);

				if(step < 1)
				{
					requestAnimationFrame(travel);
				}
				else
				{
					dot.remove();
					path.classList.remove('live');
				}
			};

			requestAnimationFrame(travel);
		});

		/* ===== MINIMAP ===== */

		this.dot = (rect) =>
		{
			return 'left: ' + rect.x + 'px; top: ' + rect.y + 'px; width: ' + rect.width + 'px; height: ' + rect.height + 'px;';
		};

		const frame = () =>
		{
			const view = this.Element && this.Element.querySelector('.minimap > .view');

			if(!view || !this.map)
			{
				return;
			}

			const size = viewport();

			view.style.left = ((-camera.x / camera.z - this.map.left) * this.map.scale) + 'px';
			view.style.top = ((-camera.y / camera.z - this.map.top) * this.map.scale) + 'px';
			view.style.width = (size.width / camera.z * this.map.scale) + 'px';
			view.style.height = (size.height / camera.z * this.map.scale) + 'px';
		};

		this.jump = ({ event }) =>
		{
			event.stopPropagation();

			const node = event.target.closest('.minimap');
			const rect = node.getBoundingClientRect();
			const size = viewport();

			camera.x = size.width / 2 - (this.map.left + (event.clientX - rect.left) / this.map.scale) * camera.z;
			camera.y = size.height / 2 - (this.map.top + (event.clientY - rect.top) / this.map.scale) * camera.z;

			apply();
			persist();
		};

		/* ===== GESTURES ===== */

		/* Screen point to world point, through the camera. */

		const spot = (clientX, clientY) =>
		{
			const rect = viewport();

			return {
				x: (clientX - rect.left - camera.x) / camera.z,
				y: (clientY - rect.top - camera.y) / camera.z
			};
		};

		const marquee = (event) =>
		{
			const world = this.Element.querySelector('.world');
			const anchor = spot(event.clientX, event.clientY);
			const frame = document.createElement('div');
			const hits = new Set();

			frame.className = 'marquee';
			world.appendChild(frame);

			const move = (moving) =>
			{
				const point = spot(moving.clientX, moving.clientY);
				const zone = {
					x: Math.min(anchor.x, point.x),
					y: Math.min(anchor.y, point.y),
					width: Math.abs(anchor.x - point.x),
					height: Math.abs(anchor.y - point.y)
				};

				frame.style.left = zone.x + 'px';
				frame.style.top = zone.y + 'px';
				frame.style.width = zone.width + 'px';
				frame.style.height = zone.height + 'px';

				hits.clear();

				this.items.forEach((item) =>
				{
					if(item.x < zone.x + zone.width && item.x + item.width > zone.x && item.y < zone.y + zone.height && item.y + item.height > zone.y)
					{
						hits.add(item.id);
					}
				});

				this.Element.querySelectorAll('.item').forEach((card) =>
				{
					card.classList.toggle('selected', hits.has(card.dataset.item));
				});
			};

			const up = () =>
			{
				document.removeEventListener('mousemove', move);
				frame.remove();

				this.selected = [...hits];
			};

			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up, { once: true });
		};

		this.pan = ({ event }) =>
		{
			if(event.button !== 0 || event.target.closest('.item, .minimap, .hud, .focusbar, .seekbar'))
			{
				return;
			}

			if(this.seek !== null)
			{
				settle();
			}

			if(this.focus)
			{
				$ot.command('ui:canvas:blur');
				return;
			}

			if(event.shiftKey && this.layout === 'free')
			{
				event.preventDefault();
				marquee(event);
				return;
			}

			if(this.selected.length)
			{
				this.selected = [];
			}

			event.preventDefault();
			land();

			const box = this.Element.querySelector('.box');
			const start = { x: event.clientX, y: event.clientY, cx: camera.x, cy: camera.y };

			box.classList.add('panning');

			const move = (moving) =>
			{
				camera.x = start.cx + moving.clientX - start.x;
				camera.y = start.cy + moving.clientY - start.y;

				apply();
			};

			const up = () =>
			{
				document.removeEventListener('mousemove', move);
				box.classList.remove('panning');

				persist();
			};

			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up, { once: true });
		};

		const wheel = (event) =>
		{
			if(this.focus)
			{
				return;
			}

			event.preventDefault();
			land();

			if(event.ctrlKey || event.metaKey)
			{
				const rect = viewport();
				const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
				const level = Math.min(limits.max, Math.max(limits.min, camera.z * (event.deltaY < 0 ? 1.08 : 0.92)));
				const ratio = level / camera.z;

				camera.x = point.x - (point.x - camera.x) * ratio;
				camera.y = point.y - (point.y - camera.y) * ratio;
				camera.z = level;
			}
			else
			{
				camera.x -= event.deltaX;
				camera.y -= event.deltaY;
			}

			apply();
			persist();
		};

		const measure = () =>
		{
			const size = viewport();

			/* Mid patch the box can read 0x0, a dead measurement poisons every
			   camera command that divides by it, so it never reaches the store. */

			if(!size.width || !size.height)
			{
				return;
			}

			ui.canvas.StoreSet('viewport', { width: size.width, height: size.height });
		};

		/* ===== QUICK JUMP — type anywhere, the camera glides to the match ===== */

		const settle = () =>
		{
			this.seek = null;
			this.matches = [];
			this.cursor = 0;
		};

		const preview = () =>
		{
			const hit = this.matches[this.cursor];

			if(!hit)
			{
				return;
			}

			const size = viewport();

			camera.x = size.width / 2 - (hit.x + hit.width / 2) * camera.z;
			camera.y = size.height / 2 - (hit.y + hit.height / 2) * camera.z;

			fly();
			persist();
		};

		const hunt = () =>
		{
			const query = this.seek.toLowerCase();

			this.matches = query ? this.items.filter((item) => (item.name || item.id).toLowerCase().includes(query) || item.id.toLowerCase().includes(query)) : [];
			this.cursor = 0;

			preview();
		};

		const type = (event) =>
		{
			if(event.key === 'Escape')
			{
				event.preventDefault();

				Object.assign(camera, kept);

				fly();
				persist();
				settle();
			}
			else if(event.key === 'Enter')
			{
				event.preventDefault();

				const hit = this.matches[this.cursor];

				hit && $ot.command('ui:canvas:jump', { id: hit.id });

				settle();
			}
			else if(event.key === 'Tab' || event.key === 'ArrowDown' || event.key === 'ArrowUp')
			{
				event.preventDefault();

				if(this.matches.length)
				{
					const step = (event.key === 'ArrowUp' || event.shiftKey) ? -1 : 1;

					this.cursor = (this.cursor + step + this.matches.length) % this.matches.length;

					preview();
				}
			}
			else if(event.key === 'Backspace')
			{
				event.preventDefault();

				if(!this.seek)
				{
					return settle();
				}

				this.seek = this.seek.slice(0, -1);

				hunt();
			}
			else if(event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey)
			{
				event.preventDefault();

				this.seek += event.key;

				hunt();
			}
		};

		const keys = (event) =>
		{
			if(!event.target.closest || event.target.closest('input, textarea, select, [contenteditable="true"]'))
			{
				return;
			}

			if(this.seek !== null)
			{
				return type(event);
			}

			if(event.key === 'Escape')
			{
				if(this.focus)
				{
					$ot.command('ui:canvas:blur');
				}
				else if(this.selected.length)
				{
					this.selected = [];
				}

				return;
			}

			/* Focused arrows tour the canvas, card by card. */

			if(this.focus)
			{
				if(event.key === 'ArrowRight' || event.key === 'ArrowLeft')
				{
					event.preventDefault();

					const next = ui.canvas.Fn('near', this.focus, event.key === 'ArrowRight' ? 1 : -1);

					next && $ot.command('ui:canvas:focus', { id: next });
				}

				return;
			}

			/* Any plain character starts the quick jump search. */

			if(event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey)
			{
				event.preventDefault();

				kept = { ...camera };

				this.seek = event.key;

				hunt();
			}
		};

		/* The viewport also changes without a window resize, panels open and
		   close around the canvas, so a focused item refits to the new space. */

		const refit = onetype.HelperDebounce(() =>
		{
			this.focus && $ot.command('ui:canvas:focus', { id: this.focus });
		}, 300);

		this.OnMounted(() =>
		{
			const box = this.Element.querySelector('.box');

			box.addEventListener('wheel', wheel, { passive: false });
			document.addEventListener('keydown', keys);

			measure();
			apply();
		});

		this.OnUnmounted(() => document.removeEventListener('keydown', keys));

		/* The observer fires once on attach with the current size,
		   only real changes after that refit a focused item. */

		let settled = false;

		this.OnResize(() =>
		{
			measure();

			if(!settled)
			{
				settled = true;
				return;
			}

			refit();
		});

		/* ===== ITEMS ===== */

		this.key = (entry) =>
		{
			return entry.id + ':' + JSON.stringify(entry.data);
		};

		this.render = (entry) =>
		{
			return ui.canvas.ItemGet(entry.id).Fn('render');
		};

		this.place = (entry) =>
		{
			return 'transform: translate(' + entry.x + 'px, ' + entry.y + 'px); width: ' + entry.width + 'px; height: ' + entry.height + 'px;';
		};

		this.shape = (region) =>
		{
			return 'left: ' + region.x + 'px; top: ' + region.y + 'px; width: ' + region.width + 'px; height: ' + region.height + 'px;';
		};

		const live = (moved) =>
		{
			ui.canvas.Fn('edges', moved).forEach((edge) =>
			{
				const path = this.Element.querySelector('[data-edge="' + edge.id + '"]');
				const label = this.Element.querySelector('[data-label="' + edge.id + '"]');

				path && path.setAttribute('d', edge.path);

				if(label)
				{
					label.setAttribute('x', edge.middle.x);
					label.setAttribute('y', edge.middle.y);
				}
			});

			ui.canvas.Fn('regions', moved).forEach((region) =>
			{
				const node = this.Element.querySelector('[data-region="' + region.id + '"]');

				if(node)
				{
					node.style.left = region.x + 'px';
					node.style.top = region.y + 'px';
					node.style.width = region.width + 'px';
					node.style.height = region.height + 'px';
				}
			});
		};

		/* Drag every selected card as one, the marquee companion to grab(). */

		const haul = (event) =>
		{
			const members = this.items.filter((item) => this.selected.includes(item.id));
			const ids = members.map((member) => member.id);
			const start = { x: event.clientX, y: event.clientY };
			const valid = { dx: 0, dy: 0 };
			const candidate = { dx: 0, dy: 0 };

			const move = (moving) =>
			{
				candidate.dx = Math.round(((moving.clientX - start.x) / camera.z) / 24) * 24;
				candidate.dy = Math.round(((moving.clientY - start.y) / camera.z) / 24) * 24;

				const blocked = members.some((member) =>
				{
					return ui.canvas.Fn('collides', {
						id: member.id,
						x: member.x + candidate.dx,
						y: member.y + candidate.dy,
						width: member.width,
						height: member.height
					}, ids);
				});

				if(!blocked)
				{
					valid.dx = candidate.dx;
					valid.dy = candidate.dy;
				}

				const moved = this.items.map((item) =>
				{
					if(!ids.includes(item.id))
					{
						return item;
					}

					const card = this.Element.querySelector('[data-item="' + item.id + '"]');
					const shifted = { ...item, x: item.x + candidate.dx, y: item.y + candidate.dy };

					if(card)
					{
						card.style.transform = 'translate(' + shifted.x + 'px, ' + shifted.y + 'px)';
						card.classList.toggle('blocked', blocked);
					}

					return shifted;
				});

				live(moved);
			};

			const up = () =>
			{
				document.removeEventListener('mousemove', move);

				this.Element.querySelectorAll('.item.blocked').forEach((card) => card.classList.remove('blocked'));

				if(valid.dx !== 0 || valid.dy !== 0)
				{
					$ot.command('ui:canvas:shift', { ids, dx: valid.dx, dy: valid.dy });
				}
				else
				{
					refresh();
				}
			};

			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up, { once: true });
		};

		this.down = (entry) =>
		{
			return ({ event }) =>
			{
				if(this.layout !== 'free' || event.button !== 0 || this.focus || event.target.closest('.port'))
				{
					return;
				}

				event.preventDefault();
				event.stopPropagation();

				if(this.seek !== null)
				{
					settle();
				}

				/* Shift click curates the selection, a drag inside it moves the whole pack. */

				if(event.shiftKey)
				{
					this.selected = this.selected.includes(entry.id)
						? this.selected.filter((id) => id !== entry.id)
						: this.selected.concat([entry.id]);

					return;
				}

				if(this.selected.length > 1 && this.selected.includes(entry.id))
				{
					return haul(event);
				}

				if(this.selected.length)
				{
					this.selected = [];
				}

				const card = event.target.closest('.item');
				const start = { x: event.clientX, y: event.clientY };
				const origin = { x: entry.x, y: entry.y };
				const valid = { x: entry.x, y: entry.y };
				const candidate = { x: entry.x, y: entry.y };

				card.classList.add('dragging');

				const move = (moving) =>
				{
					candidate.x = Math.round((origin.x + (moving.clientX - start.x) / camera.z) / 24) * 24;
					candidate.y = Math.round((origin.y + (moving.clientY - start.y) / camera.z) / 24) * 24;

					const blocking = ui.canvas.Fn('collides', { id: entry.id, x: candidate.x, y: candidate.y, width: entry.width, height: entry.height });

					if(!blocking)
					{
						valid.x = candidate.x;
						valid.y = candidate.y;
					}

					card.classList.toggle('blocked', !!blocking);
					card.style.transform = 'translate(' + candidate.x + 'px, ' + candidate.y + 'px)';

					live(this.items.map((item) =>
					{
						return item.id === entry.id ? { ...item, x: candidate.x, y: candidate.y } : item;
					}));
				};

				const up = () =>
				{
					document.removeEventListener('mousemove', move);
					card.classList.remove('dragging', 'blocked');

					if(valid.x !== origin.x || valid.y !== origin.y)
					{
						$ot.command('ui:canvas:move', { id: entry.id, x: valid.x, y: valid.y });
					}
					else
					{
						refresh();
					}
				};

				document.addEventListener('mousemove', move);
				document.addEventListener('mouseup', up, { once: true });
			};
		};

		this.grab = (region) =>
		{
			return ({ event }) =>
			{
				if(this.layout !== 'free' || event.button !== 0)
				{
					return;
				}

				event.preventDefault();
				event.stopPropagation();

				const node = this.Element.querySelector('[data-region="' + region.id + '"]');
				const members = this.items.filter((item) => region.members.includes(item.id));
				const start = { x: event.clientX, y: event.clientY };
				const valid = { dx: 0, dy: 0 };
				const candidate = { dx: 0, dy: 0 };

				node.classList.add('dragging');

				const move = (moving) =>
				{
					candidate.dx = Math.round(((moving.clientX - start.x) / camera.z) / 24) * 24;
					candidate.dy = Math.round(((moving.clientY - start.y) / camera.z) / 24) * 24;

					const blocked = members.some((member) =>
					{
						return ui.canvas.Fn('collides', {
							id: member.id,
							x: member.x + candidate.dx,
							y: member.y + candidate.dy,
							width: member.width,
							height: member.height
						}, region.members);
					});

					if(!blocked)
					{
						valid.dx = candidate.dx;
						valid.dy = candidate.dy;
					}

					node.classList.toggle('blocked', blocked);

					const moved = this.items.map((item) =>
					{
						if(!region.members.includes(item.id))
						{
							return item;
						}

						const card = this.Element.querySelector('[data-item="' + item.id + '"]');
						const shifted = { ...item, x: item.x + candidate.dx, y: item.y + candidate.dy };

						card && (card.style.transform = 'translate(' + shifted.x + 'px, ' + shifted.y + 'px)');

						return shifted;
					});

					live(moved);
				};

				const up = () =>
				{
					document.removeEventListener('mousemove', move);
					node.classList.remove('dragging', 'blocked');

					if(valid.dx !== 0 || valid.dy !== 0)
					{
						$ot.command('ui:canvas:shift', { group: region.id, dx: valid.dx, dy: valid.dy });
					}
					else
					{
						refresh();
					}
				};

				document.addEventListener('mousemove', move);
				document.addEventListener('mouseup', up, { once: true });
			};
		};

		/* Drag from a port, a ghost line follows, drop on a card to link. */

		this.wire = (entry) =>
		{
			return ({ event }) =>
			{
				if(event.button !== 0 || this.focus)
				{
					return;
				}

				event.preventDefault();
				event.stopPropagation();

				const layer = this.Element.querySelector('.edges > g');
				const ghost = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				const origin = { x: entry.x + entry.width, y: entry.y + entry.height / 2 };

				ghost.setAttribute('class', 'ghost');
				layer.appendChild(ghost);

				let target = null;

				const move = (moving) =>
				{
					const point = spot(moving.clientX, moving.clientY);
					const reach = Math.max(40, Math.min(120, Math.hypot(point.x - origin.x, point.y - origin.y) / 2));

					ghost.setAttribute('d', 'M ' + origin.x + ' ' + origin.y
						+ ' C ' + (origin.x + reach) + ' ' + origin.y
						+ ', ' + (point.x - reach) + ' ' + point.y
						+ ', ' + point.x + ' ' + point.y);

					const card = moving.target.closest && moving.target.closest('.item');
					const id = card && card.dataset.item !== entry.id ? card.dataset.item : null;

					if(target !== id)
					{
						this.Element.querySelectorAll('.item.target').forEach((node) => node.classList.remove('target'));

						target = id;
						target && this.Element.querySelector('[data-item="' + target + '"]').classList.add('target');
					}
				};

				const up = () =>
				{
					document.removeEventListener('mousemove', move);
					ghost.remove();

					this.Element.querySelectorAll('.item.target').forEach((node) => node.classList.remove('target'));

					target && $ot.command('ui:canvas:link', { from: entry.id, to: target });
				};

				document.addEventListener('mousemove', move);
				document.addEventListener('mouseup', up, { once: true });
			};
		};

		this.enter = (entry) =>
		{
			return () =>
			{
				!this.focus && $ot.command('ui:canvas:focus', { id: entry.id });
			};
		};

		this.leave = () =>
		{
			$ot.command('ui:canvas:blur');
		};

		this.zoom = (direction) =>
		{
			return () =>
			{
				$ot.command('ui:canvas:zoom', { level: Math.round(camera.z * (direction > 0 ? 1.25 : 0.8) * 100) / 100 });
			};
		};

		this.fit = () =>
		{
			$ot.command('ui:canvas:fit');
		};

		this.tidy = () =>
		{
			$ot.command('ui:canvas:tidy');
		};

		return `
			<div :class="'box' + (focus ? ' focused' : '') + (seek !== null ? ' seeking' : '')" ot-mousedown="pan">
				<div class="mesh" :style="meshStyle()"></div>
				<div class="world" :style="worldStyle()">
					<div ot-for="region in regions" :ot-key="region.id" :class="'region ' + region.color" :style="shape(region)" :data-region="region.id">
						<span class="tag" ot-mousedown="grab(region)">{{ region.name }}</span>
					</div>
					<svg class="edges" :style="wireStyle()">
						<defs>
							<marker id="ot-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
								<path d="M 0 0 L 8 4 L 0 8 z" fill="context-stroke"></path>
							</marker>
						</defs>
						<g :transform="wireShift()">
							<g ot-for="edge in edges" :ot-key="edge.id" :class="'edge ' + edge.color">
								<path :d="edge.path" :data-edge="edge.id" marker-end="url(#ot-arrow)"></path>
								<text ot-if="edge.label" :x="edge.middle.x" :y="edge.middle.y" :data-label="edge.id">{{ edge.label }}</text>
							</g>
						</g>
					</svg>
					<div ot-for="entry in items" :ot-key="key(entry)" :class="'item' + (entry.id === focus ? ' focus' : '') + (selected.includes(entry.id) ? ' selected' : '') + (matches.length && matches[cursor].id === entry.id ? ' mark' : '')" :style="place(entry)" :data-item="entry.id" ot-mousedown="down(entry)" ot-double-click="enter(entry)">
						<div class="content">
							<div ot-node="render(entry)"></div>
						</div>
						<div class="glance">
							<span class="label"><i ot-if="entry.icon">{{ entry.icon }}</i>{{ entry.name || entry.id }}</span>
						</div>
						<span class="port" ot-mousedown="wire(entry)"></span>
					</div>
				</div>
				<div class="hud">
					<button class="action" ot-click="zoom(-1)" :ot-tooltip="{ text: 'Zoom out', position: { x: 'center', y: 'bottom' } }"><i>remove</i></button>
					<span class="level">100%</span>
					<button class="action" ot-click="zoom(1)" :ot-tooltip="{ text: 'Zoom in', position: { x: 'center', y: 'bottom' } }"><i>add</i></button>
					<span class="split"></span>
					<button class="action" ot-click="fit" :ot-tooltip="{ text: 'Fit to view', position: { x: 'center', y: 'bottom' } }"><i>fit_screen</i></button>
					<button class="action" ot-click="tidy" :ot-tooltip="{ text: 'Tidy up', position: { x: 'center', y: 'bottom' } }"><i>auto_fix_high</i></button>
					<span class="split"></span>
					<span class="meta">{{ items.length }} {{ items.length === 1 ? 'item' : 'items' }}</span>
				</div>
				<div class="minimap" ot-mousedown="jump">
					<div ot-for="rect in map.items" :ot-key="rect.id" class="dot" :style="dot(rect)"></div>
					<div class="view"></div>
				</div>
				<div class="focusbar" ot-if="focus" ot-click="leave">
					<i>close_fullscreen</i>
					<span>{{ focus }}</span>
					<kbd>esc</kbd>
				</div>
				<div class="seekbar" ot-if="seek !== null">
					<i>search</i>
					<span class="typed">{{ seek }}</span>
					<span class="found" ot-if="matches.length">{{ (matches[cursor].name || matches[cursor].id) + (matches.length > 1 ? ' ' + (cursor + 1) + '/' + matches.length : '') }}</span>
					<span class="found none" ot-if="seek && !matches.length">no match</span>
					<kbd>enter</kbd>
				</div>
			</div>
		`;
	}
});
