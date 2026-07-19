ui.dashboard.Fn('sections', function()
{
	return Object.values(this.sections.Items())
		.filter((section) => this.Fn('visible', section))
		.sort((a, b) => a.Get('order') - b.Get('order'));
});
