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
		mp4: { icon: 'movie', color: 'brand' },
		webm: { icon: 'movie', color: 'brand' },
		mov: { icon: 'movie', color: 'brand' },
		mp3: { icon: 'music_note', color: 'brand' },
		wav: { icon: 'music_note', color: 'brand' },
		svg: { icon: 'shapes', color: 'orange' },
		json: { icon: 'data_object', color: 'green' }
	};

	const IMAGES = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'ico', 'bmp'];

	const parse = (url) =>
	{
		const hash = url.split('#')[1];
		const clean = url.split('#')[0].split('?')[0];
		const segment = hash ? hash : clean.split('/').pop();
		const dot = segment.lastIndexOf('.');
		const extension = dot !== -1 ? segment.substring(dot + 1).toLowerCase() : '';
		const kind = KINDS[extension] ? KINDS[extension] : { icon: 'draft', color: 'blue' };

		return { name: segment, extension, image: IMAGES.includes(extension), ...kind };
	};

	elements.ItemAdd({
		id: 'form-upload-many',
		icon: 'cloud_upload',
		name: 'Upload Many',
		description: 'Multi file upload with a drop zone, preview tiles, drag reorder and per file remove.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'array',
				value: [
					'https://picsum.photos/seed/one/240/240#hero.png',
					'https://picsum.photos/seed/two/240/240#team.jpg',
					'https://picsum.photos/seed/three/240/240#office.webp',
					'https://example.com/files/brand-guidelines.pdf',
					'https://example.com/files/content-export.zip'
				],
				each: {
					type: 'string',
					description: 'A single file URL.'
				},
				description: 'File URLs in display order.'
			},
			max: {
				type: 'number',
				value: 0,
				description: 'Maximum number of files. Zero is unlimited.'
			},
			accept: {
				type: 'string',
				description: 'Accepted file extensions (.png, .pdf) or MIME patterns (image/*).'
			},
			label: {
				type: 'string',
				value: 'Drop files here or browse',
				description: 'Drop zone label while empty.'
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
				description: 'Background depth of the tile surfaces from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_change: {
				type: 'function',
				description: 'Called with { value } when the files change.'
			},
			_upload: {
				type: 'function',
				description: 'Called with { file } per dropped or picked file. Must return a URL string or null.'
			},
			_error: {
				type: 'function',
				description: 'Called with { errors } when files are rejected.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.uploading = false;
			this.hovering = false;
			this.dragging = null;
			this.target = null;

			this.Compute(() =>
			{
				this.tiles = this.value.map((url, index) => ({ url, index, key: index + ':' + url, ...parse(url) }));
				this.canAdd = !this.max || this.value.length < this.max;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background];

				if(this.hovering)
				{
					list.push('hovering');
				}

				if(this.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			this.tileClasses = (tile) =>
			{
				const list = ['tile', tile.color];

				if(this.dragging === tile.index)
				{
					list.push('dragging');
				}

				if(this.target === tile.index && this.dragging !== tile.index)
				{
					list.push('target');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.emit = () =>
			{
				if(this._change)
				{
					this._change({ value: this.value });
				}
			};

			this.addUrls = (urls) =>
			{
				const errors = [];
				const accepted = [];

				for(const url of urls)
				{
					if(!url || typeof url !== 'string')
					{
						continue;
					}

					if(this.accept)
					{
						const extension = parse(url).extension;
						const patterns = this.accept.split(',').map((pattern) => pattern.trim().toLowerCase().replace('.', ''));
						const mime = patterns.some((pattern) => pattern.includes('/'));

						if(extension && !mime && !patterns.includes(extension))
						{
							errors.push('File "' + parse(url).name + '" type is not allowed.');
							continue;
						}
					}

					if(this.max && this.value.length + accepted.length >= this.max)
					{
						errors.push('Maximum of ' + this.max + ' files reached.');
						break;
					}

					accepted.push(url);
				}

				this.value = [...this.value, ...accepted];

				if(errors.length && this._error)
				{
					this._error({ errors });
				}

				this.emit();
			};

			this.addFiles = async (files) =>
			{
				if(this.disabled || !this._upload)
				{
					return;
				}

				this.uploading = true;

				await Promise.all(Array.from(files).map(async (file) =>
				{
					try
					{
						const url = await this._upload({ file });

						if(url && typeof url === 'string')
						{
							this.addUrls([url]);
						}
					}
					catch(error)
					{
						if(this._error)
						{
							this._error({ errors: [error.message ? error.message : 'Upload failed.'] });
						}
					}
				}));

				this.uploading = false;
			};

			this.remove = (tile) =>
			{
				if(this.disabled)
				{
					return;
				}

				this.value = this.value.filter((url, index) => index !== tile.index);
				this.emit();
			};

			this.browse = () =>
			{
				if(this.disabled)
				{
					return;
				}

				const input = this.Element.querySelector('.picker');

				if(input)
				{
					input.click();
				}
			};

			this.pick = ({ event }) =>
			{
				const files = event.target.files;

				if(files && files.length)
				{
					this.addFiles(files);
				}

				event.target.value = '';
			};

			/* ===== REORDER ===== */

			this.dragStart = (tile) => () =>
			{
				if(this.disabled)
				{
					return;
				}

				this.dragging = tile.index;
			};

			this.dragOver = (tile) => () =>
			{
				if(this.disabled || this.dragging === null)
				{
					return;
				}

				this.target = tile.index;
			};

			this.dragDrop = (tile) => () =>
			{
				if(this.disabled || this.dragging === null || this.dragging === tile.index)
				{
					this.dragging = null;
					this.target = null;
					return;
				}

				const next = [...this.value];
				const moved = next.splice(this.dragging, 1)[0];

				next.splice(tile.index, 0, moved);

				this.dragging = null;
				this.target = null;
				this.value = next;
				this.emit();
			};

			this.dragEnd = () =>
			{
				this.dragging = null;
				this.target = null;
			};

			/* ===== ZONE DROP ===== */

			this.enter = () => () =>
			{
				if(!this.disabled && this.dragging === null)
				{
					this.hovering = true;
				}
			};

			this.leave = () => () =>
			{
				this.hovering = false;
			};

			this.drop = () => ({ event }) =>
			{
				this.hovering = false;

				if(this.disabled || this.dragging !== null)
				{
					return;
				}

				const files = event.dataTransfer ? event.dataTransfer.files : null;

				if(files && files.length)
				{
					this.addFiles(files);
					return;
				}

				const text = event.dataTransfer ? event.dataTransfer.getData('text/plain') : '';

				if(text)
				{
					this.addUrls([text.trim()]);
				}
			};

			this.clear = () =>
			{
				if(this.disabled)
				{
					return;
				}

				this.value = [];
				this.emit();
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()" ot-dragenter="enter()" ot-dragover="enter()" ot-dragleave="leave()" ot-drop="drop()">
					<div ot-if="tiles.length === 0" class="zone" ot-click="browse">
						<div class="ring">
							<i ot-if="!uploading">cloud_upload</i>
							<i ot-if="uploading" class="spin">progress_activity</i>
						</div>
						<span class="label">{{ label }}</span>
					</div>
					<div ot-if="tiles.length > 0" class="grid">
						<div ot-for="tile in tiles" :ot-key="tile.key">
							<div
								:class="tileClasses(tile)"
								ot-dragstart="dragStart(tile)"
								ot-dragover="dragOver(tile)"
								ot-drop="dragDrop(tile)"
								ot-dragend="dragEnd"
								:ot-tooltip="{ text: tile.name, position: { x: 'center', y: 'top' } }"
							>
								<img ot-if="tile.image" class="shot" :src="tile.url" :alt="tile.name" loading="lazy" />
								<div ot-if="!tile.image" class="doc">
									<i>{{ tile.icon }}</i>
									<span class="extension">{{ tile.extension ? tile.extension.toUpperCase() : 'FILE' }}</span>
								</div>
								<button ot-if="!disabled" type="button" class="remove" ot-click.stop="() => remove(tile)"><i>close</i></button>
							</div>
						</div>
						<div ot-if="uploading" class="tile add"><i class="spin">progress_activity</i></div>
						<div ot-if="!uploading && canAdd && !disabled" class="tile add" ot-click="browse"><i>add</i></div>
					</div>
					<div ot-if="tiles.length > 1" class="footer">
						<span class="count">{{ tiles.length }} files</span>
						<button ot-if="!disabled" type="button" class="wipe" ot-click="clear">
							<i>delete_sweep</i>
							<span>Clear all</span>
						</button>
					</div>
					<input class="picker" type="file" multiple :accept="accept ? accept : null" :disabled="disabled" ot-change="pick" />
				</div>
			`;
		}
	});
});
