commands.Item({
	id: 'ui:canvas:focus',
	exposed: true,
	description: 'Focus one canvas item. The camera flies in until the item fills the viewport and everything else fades away. Focus ends through ui:canvas:blur, the Escape key, or a click outside the item.',
	metadata: { addon: 'ui.canvas' },
	in: {
		id: {
			type: 'string',
			required: true,
			description: 'ID of the canvas item to focus.'
		}
	},
	out: {
		id: {
			type: 'string',
			description: 'ID of the focused item.'
		},
		level: {
			type: 'number',
			description: 'Zoom level the camera flew to.'
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

		/* Focusing an already focused item refits the camera to the current
		   viewport, the original back camera stays for the eventual blur. */

		const focused = $ot.modules.settings.get('ui.canvas.focus', null);

		/* Stack layouts place items away from their stored coordinates,
		   so the camera aims at the geometry the canvas last rendered. */

		const placed = (ui.canvas.StoreGet('placed') || []).find((entry) => entry.id === properties.id) || {
			x: item.Get('x'),
			y: item.Get('y'),
			width: item.Get('width'),
			height: item.Get('height')
		};

		const viewport = ui.canvas.StoreGet('viewport') || { width: 1200, height: 800 };
		const camera = $ot.modules.settings.get('ui.canvas.camera', { x: 0, y: 0, z: 1 });
		const level = Math.min(viewport.width / placed.width, viewport.height / placed.height);

		if(!level || !isFinite(level))
		{
			return resolve(null, 'Canvas item ' + properties.id + ' has no size to focus.', 400);
		}

		const target = {
			x: (viewport.width - placed.width * level) / 2 - placed.x * level,
			y: (viewport.height - placed.height * level) / 2 - placed.y * level,
			z: level
		};

		if(focused && focused.id === properties.id && camera.x === target.x && camera.y === target.y && camera.z === target.z)
		{
			return resolve({ id: properties.id, level }, 'Canvas item ' + properties.id + ' is already focused at ' + Math.round(level * 100) + ' percent.');
		}

		$ot.modules.settings.set('ui.canvas.focus', { id: properties.id, back: focused ? focused.back : { ...camera } });
		$ot.modules.settings.set('ui.canvas.camera', target);

		onetype.Emit('ui.canvas.focus', { id: properties.id });

		resolve({ id: properties.id, level }, 'Canvas item ' + properties.id + ' is now focused at ' + Math.round(level * 100) + ' percent.');
	}
});
