elements.ItemAdd({
	id: 'site-tab-media',
	icon: 'image',
	name: 'Site Media',
	description: 'Media settings for a site.',
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
		this.change = (key, { value }) =>
		{
			console.log(key, value);
		};

		return `
			<e-form-section title="Media" description="Logo, favicon and cover image for your site." :variant="['border', 'bg-2']">
				<div slot="content">
					<e-form-field label="Logo" description="Your site logo. Displayed in the navigation bar and footer." :variant="['border-bottom']">
						<div slot="input">
							<e-cloudflare-input :site="site" :variant="['bg-3', 'border', 'size-m']" :_change="(data) => change('logo', data)"></e-cloudflare-input>
						</div>
					</e-form-field>
					<e-form-field label="Favicon" description="Small icon shown in browser tabs, bookmarks and mobile home screens." :variant="['border-bottom']">
						<div slot="input">
							<e-cloudflare-input :site="site" :variant="['bg-3', 'border', 'size-m']" :_change="(data) => change('favicon', data)"></e-cloudflare-input>
						</div>
					</e-form-field>
					<e-form-field label="Cover" description="Default cover image used when your site is shared on social media." :variant="['border-bottom']">
						<div slot="input">
							<e-cloudflare-input :site="site" :variant="['bg-3', 'border', 'size-m']" :_change="(data) => change('cover', data)"></e-cloudflare-input>
						</div>
					</e-form-field>
				</div>
			</e-form-section>
		`;
	}
});
