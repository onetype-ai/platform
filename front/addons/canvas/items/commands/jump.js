commands.Item({
	id: 'ui:canvas:jump',
	exposed: true,
	description: 'Fly the camera to one canvas item and center it in the viewport. The item only gets centered, nothing is focused, use ui:canvas:focus to enter an item.',
	metadata: { addon: 'ui.canvas' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the canvas item to center on.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the centered item.'
		}
	},
	callback: function(properties, resolve)
	{
		const item = ui.canvas.ItemGet(properties.id);

		if(!item)
		{
			return resolve(null, 'Canvas item ' + properties.id + ' does not exist.', 404);
		}

		if(!item.Fn('visible'))
		{
			return resolve(null, 'Canvas item ' + properties.id + ' is hidden in the current app and mode.', 400);
		}

		const placed = (ui.canvas.StoreGet('placed') || []).find((entry) => entry.id === properties.id) || {
			x: item.Get('x'),
			y: item.Get('y'),
			width: item.Get('width'),
			height: item.Get('height')
		};

		const viewport = ui.canvas.StoreGet('viewport') || { width: 1200, height: 800 };
		const camera = $ot.modules.settings.get('ui.canvas.camera', { x: 0, y: 0, z: 1 });
		const level = Math.min(2, Math.max(1, camera.z));

		$ot.modules.settings.set('ui.canvas.camera', {
			x: viewport.width / 2 - (placed.x + placed.width / 2) * level,
			y: viewport.height / 2 - (placed.y + placed.height / 2) * level,
			z: level
		});

		onetype.Emit('ui.canvas.jump', { id: properties.id });

		resolve({ id: properties.id }, 'Canvas jumped to item ' + properties.id + '.');
	}
});
