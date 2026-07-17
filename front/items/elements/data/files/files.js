onetype.AddonReady('elements', (elements) =>
{
	const KINDS = {
		pdf: { icon: 'picture_as_pdf', color: 'red' },
		zip: { icon: 'folder_zip', color: 'orange' },
		rar: { icon: 'folder_zip', color: 'orange' },
		doc: { icon: 'description', color: 'blue' },
		docx: { icon: 'description', color: 'blue' },
		txt: { icon: 'article', color: 'blue' },
		md: { icon: 'article', color: 'blue' },
		xls: { icon: 'table', color: 'green' },
		xlsx: { icon: 'table', color: 'green' },
		csv: { icon: 'table', color: 'green' },
		jpg: { icon: 'image', color: 'green' },
		jpeg: { icon: 'image', color: 'green' },
		png: { icon: 'image', color: 'green' },
		webp: { icon: 'image', color: 'green' },
		gif: { icon: 'image', color: 'green' },
		avif: { icon: 'image', color: 'green' },
		svg: { icon: 'shapes', color: 'orange' },
		mp4: { icon: 'movie', color: 'brand' },
		webm: { icon: 'movie', color: 'brand' },
		mp3: { icon: 'music_note', color: 'brand' },
		wav: { icon: 'music_note', color: 'brand' },
		js: { icon: 'code', color: 'orange' },
		css: { icon: 'code', color: 'blue' },
		html: { icon: 'code', color: 'red' },
		json: { icon: 'data_object', color: 'green' },
		fig: { icon: 'design_services', color: 'brand' }
	};

	const IMAGES = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];

	const resolve = (name) =>
	{
		const extension = String(name).split('?')[0].split('.').pop().toLowerCase();

		return { extension, image: IMAGES.includes(extension), ...(KINDS[extension] ? KINDS[extension] : { icon: 'draft', color: 'blue' }) };
	};

	elements.ItemAdd({
		id: 'data-files',
		icon: 'folder_open',
		name: 'Files',
		description: 'File grid with type colored icon tiles, image previews, groups holding multiple files and click to open.',
		category: 'Data',
		collection: 'Home',
		author: 'OneType',
		config: {
			files: {
				type: 'array',
				value: [
					{ name: 'Brand assets', files: [
						{ name: 'cover.png', size: '1.2 MB', src: 'https://picsum.photos/seed/cover/640/400' },
						{ name: 'logo.svg', size: '12 KB' },
						{ name: 'guidelines.pdf', size: '2.1 MB' },
						{ name: 'palette.json', size: '3 KB' },
						{ name: 'font-spec.md', size: '6 KB' }
					] },
					{ name: 'homepage-hero.png', size: '820 KB', date: 'Jul 9', src: 'https://picsum.photos/seed/hero/640/400' },
					{ name: 'brand-guidelines.pdf', size: '2.4 MB', date: 'Jul 8' },
					{ name: 'launch-video.mp4', size: '48 MB', date: 'Jul 9' },
					{ name: 'content-export.zip', size: '12 MB', date: 'Jul 6' },
					{ name: 'tokens.json', size: '8 KB', date: 'Jul 2' }
				],
				each: {
					type: 'object',
					config: {
						name: {
							type: 'string',
							description: 'File name with extension, drives the icon and color. Group name while files is set.'
						},
						size: {
							type: 'string',
							description: 'Size label, like 2.4 MB.'
						},
						date: {
							type: 'string',
							description: 'Date label in the meta row.'
						},
						src: {
							type: 'string',
							description: 'File URL, opened in a new tab on click while no onClick is set. Image files render it as a live preview.'
						},
						onClick: {
							type: 'function',
							description: 'Called with the file on click. Overrides the src navigation.'
						},
						files: {
							type: 'array',
							value: [],
							each: {
								type: 'object',
								config: {
									name: {
										type: 'string',
										description: 'File name with extension, drives the icon and color.'
									},
									size: {
										type: 'string',
										description: 'Size label, like 2.4 MB.'
									},
									date: {
										type: 'string',
										description: 'Date label in the meta row.'
									},
									src: {
										type: 'string',
										description: 'File URL, opened in a new tab on click while no onClick is set. Image files render it as a live preview.'
									},
									onClick: {
										type: 'function',
										description: 'Called with the file on click. Overrides the src navigation.'
									}
								}
							},
							description: 'Files inside this item. When set the item renders as a group tile that opens in place.'
						}
					}
				},
				description: 'Files and groups in grid order.'
			},
			columns: {
				type: 'number',
				value: 3,
				options: [2, 3, 4, 5, 6],
				description: 'Grid columns.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the file tiles from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_open: {
				type: 'function',
				description: 'Called with { file } on every file tile click.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.group = null;

			/* ===== DATA ===== */

			this.entry = (file) =>
			{
				const kind = resolve(file.name);

				return {
					...file,
					...kind,
					preview: kind.image && file.src ? true : false,
					meta: file.date ? file.size + ' · ' + file.date : file.size
				};
			};

			this.entries = () =>
			{
				const source = this.group ? this.group.files : this.files;

				return source.map((file) =>
				{
					if(file.files && file.files.length)
					{
						const stack = file.files.slice(0, file.files.length > 4 ? 3 : 4).map((member) => this.entry(member));

						return {
							...file,
							group: true,
							stack,
							extra: file.files.length - stack.length,
							meta: file.files.length + ' files'
						};
					}

					return this.entry(file);
				});
			};

			this.classes = (file) =>
			{
				const list = ['tile'];

				if(file.color)
				{
					list.push(file.color);
				}

				if(file.group)
				{
					list.push('folder');
				}

				if(file.preview)
				{
					list.push('shot');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.open = (file) =>
			{
				if(file.group)
				{
					this.group = file;
					return;
				}

				if(file.onClick)
				{
					file.onClick(file);
					return;
				}

				if(this._open)
				{
					this._open({ file });
					return;
				}

				if(file.src)
				{
					window.open(file.src, '_blank');
				}
			};

			this.back = () =>
			{
				this.group = null;
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="'box bg-' + background" :style="'grid-template-columns: repeat(' + columns + ', minmax(0, 1fr))'">
					<div ot-if="group" class="bar">
						<button type="button" class="return" ot-click="() => back()"><i>arrow_back</i></button>
						<span class="label">{{ group.name }}</span>
						<span class="count">{{ group.meta }}</span>
					</div>
					<div ot-for="file in entries()" :ot-key="file.name">
						<button type="button" :class="classes(file)" ot-click="() => open(file)">
							<div class="visual">
								<img ot-if="file.preview" class="thumb" :src="file.src" alt="" loading="lazy" />
								<div ot-if="!file.preview && !file.group" class="wrap"><i>{{ file.icon }}</i></div>
								<div ot-if="file.group" class="stack">
									<div ot-for="member in file.stack" :ot-key="member.name">
										<span :class="'mini ' + member.color">
											<img ot-if="member.preview" :src="member.src" alt="" loading="lazy" />
											<i ot-if="!member.preview">{{ member.icon }}</i>
										</span>
									</div>
									<span ot-if="file.extra" class="mini more">+{{ file.extra }}</span>
								</div>
							</div>
							<span ot-if="!file.group" class="badge">{{ file.extension.toUpperCase() }}</span>
							<span class="name">{{ file.name }}</span>
							<span ot-if="file.meta" class="meta">{{ file.meta }}</span>
						</button>
					</div>
				</div>
			`;
		}
	});
});
