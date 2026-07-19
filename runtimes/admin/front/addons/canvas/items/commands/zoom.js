commands.Item({
	id: 'ui:canvas:zoom',
	exposed: true,
	description: 'Set the canvas zoom level around the viewport center. Level 1 is 100 percent, limits are 0.25 to 2.',
	metadata: { addon: 'ui.canvas' },
	in: {
		level: {
			type: 'number',
			required: true,
			description: 'Zoom level to apply, clamped between 0.25 and 2.'
		}
	},
	out: {
		level: {
			type: 'number',
			description: 'Zoom level the canvas now holds.'
		}
	},
	callback: function(properties, resolve)
	{
		const level = Math.min(2, Math.max(0.25, properties.level));
		const camera = $ot.modules.settings.get('ui.canvas.camera', { x: 0, y: 0, z: 1 });
		const viewport = ui.canvas.StoreGet('viewport') || { width: 1200, height: 800 };

		const center = { x: viewport.width / 2, y: viewport.height / 2 };
		const ratio = level / camera.z;

		$ot.modules.settings.set('ui.canvas.camera', {
			x: center.x - (center.x - camera.x) * ratio,
			y: center.y - (center.y - camera.y) * ratio,
			z: level
		});

		resolve({ level }, 'Canvas zoomed to ' + Math.round(level * 100) + ' percent.');
	}
});
