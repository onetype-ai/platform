onetype.AddonReady('editor.toolbar', () =>
{
	editor.toolbar.Item({
		id: 'images',
		icon: 'image',
		label: 'Images',
		position: 'left',
		active: true,
		order: 30,
		raw: true,
		render: function()
		{
			this.open = () =>
			{
				const site = $ot.get('site');

				$ot.modal(function()
				{
					this.site = site;

					return `<e-cloudflare-images :site="site"></e-cloudflare-images>`;
				});
			};

			return `
				<e-form-button icon="image" :variant="['bg-2', 'border', 'icon-only', 'size-s']" :_click="open" ot-tooltip="Images"></e-form-button>
			`;
		}
	});
});
