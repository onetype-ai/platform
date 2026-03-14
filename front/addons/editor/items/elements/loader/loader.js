onetype.AddonReady('elements', () =>
{
	elements.ItemAdd({
		id: 'editor-loader',
		icon: 'hourglass_empty',
		name: 'Editor Loader',
		description: 'Loading screen for the editor.',
		category: 'Editor',
		author: 'OneType',
		render: function()
		{
			return `
				<div class="content">
					<div class="logo">
						<div class="ring"></div>
						<div class="ring outer"></div>
						<i>edit_square</i>
					</div>
					<div>
						<p class="title">Loading Editor</p>
						<p class="description">Preparing your workspace...</p>
					</div>
				</div>
			`;
		}
	});
});
