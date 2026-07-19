onetype.AddonReady('elements', (elements) =>
{
	const VIDEOS = ['mp4', 'webm', 'mov', 'm4v'];

	elements.ItemAdd({
		id: 'global-gallery',
		icon: 'photo_library',
		name: 'Gallery',
		description: 'Media gallery for images and video: featured collage or uniform grid, built in lightbox with keyboard navigation.',
		category: 'Global',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ src: 'https://picsum.photos/id/1018/1200/800', title: 'Mountain lake' },
					{ src: 'https://picsum.photos/id/1015/800/600', title: 'River valley' },
					{ src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Big Buck Bunny', duration: '0:10', poster: 'https://picsum.photos/id/1084/800/600' },
					{ src: 'https://picsum.photos/id/1039/800/600', title: 'Waterfall' },
					{ src: 'https://picsum.photos/id/1043/800/600', title: 'Foggy hills' },
					{ src: 'https://picsum.photos/id/1025/800/600', title: 'Good boy' },
					{ src: 'https://picsum.photos/id/1035/800/600', title: 'Ridge line' }
				],
				each: {
					type: 'object',
					config: {
						src: {
							type: 'string',
							description: 'Media URL. Video is detected from the extension unless type is set.'
						},
						type: {
							type: 'string',
							options: ['image', 'video'],
							description: 'Explicit media kind. Empty detects from the extension.'
						},
						title: {
							type: 'string',
							description: 'Caption shown in the lightbox.'
						},
						description: {
							type: 'string',
							description: 'Muted line under the title in the lightbox.'
						},
						poster: {
							type: 'string',
							description: 'Video thumbnail image.'
						},
						duration: {
							type: 'string',
							description: 'Video duration badge, like 2:34.'
						}
					}
				},
				description: 'Media items in order. The first one leads the featured collage.'
			},
			layout: {
				type: 'string',
				value: 'featured',
				options: ['featured', 'grid'],
				description: 'Featured renders a hero with a two by two collage, grid renders uniform tiles.'
			},
			columns: {
				type: 'number',
				value: 3,
				options: [2, 3, 4, 5],
				description: 'Grid columns while layout is grid.'
			},
			_open: {
				type: 'function',
				description: 'Called with { item } when a tile opens in the lightbox.'
			}
		},
		render: function()
		{
			this.active = -1;

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.list = this.items.map((item, index) =>
				{
					const extension = String(item.src).split('?')[0].split('.').pop().toLowerCase();
					const kind = item.type ? item.type : (VIDEOS.includes(extension) ? 'video' : 'image');

					return { ...item, index, kind };
				});

				this.featured = this.layout === 'featured' && this.list.length >= 3;
				this.visible = this.featured ? this.list.slice(0, 5) : this.list;
				this.hidden = this.list.length - this.visible.length;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				if(this.featured)
				{
					return 'collage tiles-' + this.visible.length;
				}

				return 'plain';
			};

			/* ===== HANDLERS ===== */

			this.open = (item) =>
			{
				this.active = item.index;

				if(this._open)
				{
					this._open({ item });
				}
			};

			this.close = () =>
			{
				this.active = -1;
			};

			this.step = (direction) =>
			{
				const next = this.active + direction;

				this.active = next < 0 ? this.list.length - 1 : (next >= this.list.length ? 0 : next);
			};

			this.current = () =>
			{
				return this.list[this.active];
			};

			this.keys = (event) =>
			{
				if(this.active === -1)
				{
					return;
				}

				if(event.key === 'Escape')
				{
					this.close();
				}

				if(event.key === 'ArrowRight')
				{
					this.step(1);
				}

				if(event.key === 'ArrowLeft')
				{
					this.step(-1);
				}
			};

			this.OnMounted(() => document.addEventListener('keydown', this.keys));
			this.OnDestroy(() => document.removeEventListener('keydown', this.keys));

			/* ===== RENDER ===== */

			return /* html */ `
				<div class="box">
					<div :class="'grid ' + classes()" :style="featured ? null : 'grid-template-columns: repeat(' + columns + ', minmax(0, 1fr))'">
						<div ot-for="item in visible" :ot-key="item.src" class="cell">
							<button type="button" class="tile" ot-click="() => open(item)">
								<img ot-if="item.kind === 'image'" :src="item.src" alt="" loading="lazy" />
								<img ot-if="item.kind === 'video' && item.poster" :src="item.poster" alt="" loading="lazy" />
								<div ot-if="item.kind === 'video'" class="film">
									<span class="play"><i>play_arrow</i></span>
									<span ot-if="item.duration" class="duration">{{ item.duration }}</span>
								</div>
								<span ot-if="hidden > 0 && item.index === visible.length - 1" class="more">
									<i>grid_view</i>
									<span>Show all {{ list.length }}</span>
								</span>
							</button>
						</div>
					</div>
					<div ot-if="active > -1" class="lightbox" ot-click="close">
						<div class="stage" ot-click.stop="() => {}">
							<img ot-if="current().kind === 'image'" :src="current().src" alt="" :ot-key="current().src" />
							<video ot-if="current().kind === 'video'" :src="current().src" :poster="current().poster" controls autoplay :ot-key="current().src"></video>
						</div>
						<div class="caption">
							<span ot-if="current().title" class="title">{{ current().title }}</span>
							<span ot-if="current().description" class="description">{{ current().description }}</span>
							<span class="count">{{ active + 1 }} / {{ list.length }}</span>
						</div>
						<button type="button" class="control close" ot-click.stop="close"><i>close</i></button>
						<button type="button" class="control prev" ot-click.stop="() => step(-1)"><i>chevron_left</i></button>
						<button type="button" class="control next" ot-click.stop="() => step(1)"><i>chevron_right</i></button>
					</div>
				</div>
			`;
		}
	});
});
