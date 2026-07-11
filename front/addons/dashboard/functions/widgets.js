ui.dashboard.Fn('widgets', function(section = null)
{
	return Object.values(this.widgets.Items())
		.filter((widget) => (widget.Get('section') || null) === section)
		.filter((widget) => this.Fn('visible', widget))
		.sort((a, b) => a.Get('order') - b.Get('order'));
});
