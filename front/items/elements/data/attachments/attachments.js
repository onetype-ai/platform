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
		id: 'data-attachments',
		icon: 'attach_file',
		name: 'Attachments',
		description: 'Inline attachment chips with a colored extension mark, name, size and hover actions, wrapping like mail attachments.',
		category: 'Data',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ name: 'invoice-2026-07.pdf', size: '128 KB' },
					{ name: 'screenshot.png', size: '644 KB', src: 'https://picsum.photos/seed/attach/120/120' },
					{ name: 'notes.md', size: '4 KB' }
				],
				each: {
					type: 'object',
					config: {
						name: {
							type: 'string',
							description: 'File name with extension, drives the icon and color.'
						},
						size: {
							type: 'string',
							description: 'Size label, like 128 KB.'
						},
						src: {
							type: 'string',
							description: 'File URL for the download action. Image files render it as a thumbnail instead of the extension mark.'
						}
					}
				},
				description: 'Attachments top to bottom.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the chips from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_download: {
				type: 'function',
				description: 'Called with { item } on the download action. Overrides the src navigation.'
			},
			_remove: {
				type: 'function',
				description: 'Called with { item } on the remove action. Empty hides the remove button.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.list = this.items.map((item) =>
				{
					const kind = resolve(item.name);

					return { ...item, ...kind, preview: kind.image && item.src ? true : false };
				});
			});

			/* ===== HANDLERS ===== */

			this.download = (item) =>
			{
				if(this._download)
				{
					this._download({ item });
					return;
				}

				if(item.src)
				{
					window.open(item.src, '_blank');
				}
			};

			this.remove = (item) =>
			{
				if(this._remove)
				{
					this._remove({ item });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="'box bg-' + background">
					<div ot-for="item in list" :ot-key="item.name">
						<div :class="'chip ' + item.color">
							<img ot-if="item.preview" class="thumb" :src="item.src" alt="" loading="lazy" />
							<span ot-if="!item.preview" class="mark">{{ item.extension }}</span>
							<span class="name">{{ item.name }}</span>
							<span class="size">{{ item.size }}</span>
							<span class="tools">
								<button type="button" class="tool" ot-click="() => download(item)"><i>download</i></button>
								<button ot-if="_remove" type="button" class="tool danger" ot-click="() => remove(item)"><i>close</i></button>
							</span>
						</div>
					</div>
				</div>
			`;
		}
	});
});
