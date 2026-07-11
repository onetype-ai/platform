onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'cms-presentation-page',
		isActive: true,
		condition: { app: ['cms'], mode: ['presentation'] },
		zone: 'root',
		slot: 'center',
		render: function()
		{
			return `
				<div class="ot-flex-vertical ot-flex-1 ot-scrollbar">
					<e-cms-presentation></e-cms-presentation>
				</div>
			`;
		}
	});
});
