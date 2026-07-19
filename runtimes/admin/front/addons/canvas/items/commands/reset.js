commands.Item({
	id: 'ui:canvas:reset',
	exposed: true,
	description: 'Reset the canvas camera to the origin at 100 percent zoom. Ends focus if an item was focused.',
	metadata: { addon: 'ui.canvas' },
	out: {
		level: {
			type: 'number',
			description: 'Zoom level after the reset, always 1.'
		}
	},
	callback: function(properties, resolve)
	{
		const released = ui.canvas.Fn('release');

		$ot.modules.settings.set('ui.canvas.camera', { x: 0, y: 0, z: 1 });

		resolve({ level: 1 }, 'Canvas camera reset.' + (released ? ' Item ' + released + ' lost focus.' : ''));
	}
});
