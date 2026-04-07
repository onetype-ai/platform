pages.Item({
	id: 'preview',
	route: '/preview/:slug',
	title: 'Preview',
	grid: {
		template: '"main"',
		columns: '1fr',
		rows: '1fr',
		gap: '0'
	},
	areas: {
		main: function()
		{
			this.render = null;

			const slug = this.parameters.slug;

			$ot.command('elements:catalog:source', { slug }, true).then(result =>
			{
				const code = result.data.code;
				const style = result.data.style;

				if(style)
				{
					const tag = document.createElement('style');

					tag.setAttribute('data-preview', slug);
					tag.textContent = style;
					document.head.appendChild(tag);
				}

				if(code)
				{
					new Function(code)();
				}

				setTimeout(() =>
				{
					this.render = elements.Render(slug).Element;
				}, 0);
			});

			return `
				<div class="preview" style="min-height: 100vh; height: 100%; background: var(--ot-bg-1);">
					<div ot-if="render" ot-node="render"></div>
				</div>
			`;
		}
	},
	onBeforeLeave: function()
	{
		document.head.querySelectorAll('[data-preview]').forEach(tag => tag.remove());
	}
});
