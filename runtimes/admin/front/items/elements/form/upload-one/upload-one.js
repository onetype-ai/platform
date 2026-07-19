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
		if(!url)
		{
			return { name: '', extension: '', image: false, icon: 'draft', color: 'blue' };
		}

		const hash = url.split('#')[1];
		const clean = url.split('#')[0].split('?')[0];
		const segment = hash ? hash : clean.split('/').pop();
		const dot = segment.lastIndexOf('.');
		const extension = dot !== -1 ? segment.substring(dot + 1).toLowerCase() : '';
		const kind = KINDS[extension] ? KINDS[extension] : { icon: 'draft', color: 'blue' };

		return { name: segment, extension, image: IMAGES.includes(extension), ...kind };
	};

	elements.ItemAdd({
		id: 'form-upload-one',
		icon: 'upload',
		name: 'Upload One',
		description: 'Compact single file upload row with a thumbnail or extension mark, drop support, URL paste and replace and clear actions.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'string',
				value: 'https://picsum.photos/seed/upload/240/240#cover.png',
				description: 'File URL.'
			},
			name: {
				type: 'string',
				description: 'Input name attribute.'
			},
			placeholder: {
				type: 'string',
				value: 'Drop a file, paste a URL or browse',
				description: 'Placeholder text while empty.'
			},
			accept: {
				type: 'string',
				description: 'Accepted file types for the picker.'
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
				description: 'Called with { value } when the file changes.'
			},
			_upload: {
				type: 'function',
				description: 'Called with { file }. Must return a URL string or null.'
			},
			_error: {
				type: 'function',
				description: 'Called with { error } when an upload fails.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.uploading = false;
			this.hovering = false;

			this.Compute(() =>
			{
				this.file = parse(this.value);
				this.hasFile = !!this.value;
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

			/* ===== HANDLERS ===== */

			this.set = (url) =>
			{
				this.value = url;

				if(this._change)
				{
					this._change({ value: url });
				}
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

			this.upload = async (file) =>
			{
				if(!file || !this._upload)
				{
					return;
				}

				this.uploading = true;

				try
				{
					const url = await this._upload({ file });

					if(url && typeof url === 'string')
					{
						this.set(url);
					}
				}
				catch(error)
				{
					if(this._error)
					{
						this._error({ error: error.message ? error.message : 'Upload failed.' });
					}
				}

				this.uploading = false;
			};

			this.pick = ({ event }) =>
			{
				const file = event.target.files ? event.target.files[0] : null;

				event.target.value = '';
				this.upload(file);
			};

			this.enter = () => () =>
			{
				if(!this.disabled)
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

				if(this.disabled)
				{
					return;
				}

				const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;

				if(file)
				{
					this.upload(file);
					return;
				}

				const text = event.dataTransfer ? event.dataTransfer.getData('text/plain') : '';

				if(text)
				{
					this.set(text.trim());
				}
			};

			this.paste = ({ event, value }) =>
			{
				this.set(value ? value.trim() : '');
			};

			this.clear = () =>
			{
				if(this.disabled)
				{
					return;
				}

				this.set('');
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()" ot-dragenter="enter()" ot-dragover="enter()" ot-dragleave="leave()" ot-drop="drop()">
					<div class="field">
						<img ot-if="hasFile && file.image" class="thumb" :src="value" :alt="file.name" />
						<span ot-if="hasFile && !file.image" :class="'mark ' + file.color">{{ file.extension ? file.extension : 'file' }}</span>
						<i ot-if="!hasFile && !uploading" class="icon">cloud_upload</i>
						<i ot-if="uploading" class="icon spin">progress_activity</i>
						<span ot-if="hasFile" class="name">{{ file.name }}</span>
						<input
							ot-if="!hasFile"
							class="input"
							type="text"
							:placeholder="placeholder"
							:disabled="disabled"
							autocomplete="off"
							spellcheck="false"
							ot-change="paste"
						/>
						<div class="tools">
							<button ot-if="!disabled" type="button" class="tool" ot-click.stop="browse" :ot-tooltip="{ text: hasFile ? 'Replace' : 'Browse', position: { x: 'center', y: 'top' } }"><i ot-if="hasFile">sync</i><i ot-if="!hasFile">folder_open</i></button>
							<button ot-if="hasFile && !disabled" type="button" class="tool danger" ot-click.stop="clear" :ot-tooltip="{ text: 'Remove', position: { x: 'center', y: 'top' } }"><i>close</i></button>
						</div>
					</div>
					<input class="picker" type="file" :name="name" :accept="accept ? accept : null" :disabled="disabled" ot-change="pick" />
				</div>
			`;
		}
	});
});
