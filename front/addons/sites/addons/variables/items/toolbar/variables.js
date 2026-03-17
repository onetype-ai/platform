onetype.AddonReady('editor.toolbar', () =>
{
	editor.toolbar.Item({
		id: 'variables',
		icon: 'data_object',
		label: 'Variables',
		position: 'left',
		active: true,
		order: 20,
		raw: true,
		render: function()
		{
			this.open = () =>
			{
				$ot.modal(function()
				{
					return `<e-sites-variables></e-sites-variables>`;
				});
			};

			return `
				<e-form-button icon="data_object" :variant="['bg-2', 'border', 'icon-only', 'size-s']" :_click="open" ot-tooltip="Variables"></e-form-button>
			`;
		}
	});
});
