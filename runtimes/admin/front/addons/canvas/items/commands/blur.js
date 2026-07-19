commands.Item({
	id: 'ui:canvas:blur',
	exposed: true,
	description: 'End canvas focus and fly the camera back to the view it had before the item was focused.',
	metadata: { addon: 'ui.canvas' },
	out: {
		id: {
			type: 'string',
			description: 'ID of the item that lost focus.'
		}
	},
	callback: function(properties, resolve)
	{
		const focused = $ot.modules.settings.get('ui.canvas.focus', null);

		if(!focused)
		{
			return resolve(null, 'Canvas has no focused item.', 400);
		}

		$ot.modules.settings.set('ui.canvas.focus', null);
		$ot.modules.settings.set('ui.canvas.camera', { ...focused.back });

		onetype.Emit('ui.canvas.blur', { id: focused.id });

		resolve({ id: focused.id }, 'Canvas item ' + focused.id + ' is no longer focused, view restored.');
	}
});
