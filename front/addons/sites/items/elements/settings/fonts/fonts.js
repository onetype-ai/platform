elements.ItemAdd({
	id: 'site-tab-fonts',
	icon: 'font_download',
	name: 'Site Fonts',
	description: 'Font settings for a site.',
	category: 'Sites',
	author: 'OneType',
	config: {
		site: {
			type: 'object',
			value: {}
		}
	},
	render: function()
	{
		this.selected = [...(this.site.fonts || [])];
		this.saving = false;
		this.saved = false;
		this.error = '';

		this.change = ({ value }) =>
		{
			this.selected = value;
		};

		this.save = async () =>
		{
			this.saving = true;
			this.error = '';

			const result = await commands.Fn('api', 'sites:update', {
				id: this.site.id,
				font_ids: this.selected.map(font => font.id)
			});

			this.saving = false;

			if(result.error)
			{
				this.error = result.error;
				return;
			}

			this.saved = true;

			setTimeout(() => { this.saved = false; }, 3000);
		};

		return `
			<e-form-section title="Fonts" description="Typography for your site. Pick up to 2." :variant="['border', 'bg-2']">
				<div slot="content">
					<div ot-if="error" class="ot-p-m"><e-global-notice icon="error" :text="error" :variant="['red']"></e-global-notice></div>
					<div ot-if="saved" class="ot-p-m"><e-global-notice icon="check_circle" text="Fonts saved." :variant="['green']"></e-global-notice></div>
					<e-form-field label="Browse" description="Search and pick from hundreds of free fonts. You can select up to 2." :variant="['border-bottom']">
						<div slot="input">
							<e-fonts-browse :selected="selected" :max="2" :_change="change"></e-fonts-browse>
						</div>
					</e-form-field>
					<div class="ot-p-m ot-flex ot-justify-end">
						<e-form-button text="Save" icon="save" :variant="['brand', 'size-m']" :loading="saving" :_click="save"></e-form-button>
					</div>
				</div>
			</e-form-section>
		`;
	}
});
