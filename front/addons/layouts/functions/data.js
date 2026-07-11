ui.layouts.Fn('data', function(values)
{
	if(values)
	{
		$ot.modules.settings.set('ui.layouts.data', onetype.DataDefine({ ...this.Fn('data'), ...values }, this.Fn('config')));

		onetype.Emit('ui.layouts.data', { values });
	}

	const saved = $ot.modules.settings.get('ui.layouts.data', {});

	return onetype.DataDefine({ ...saved }, this.Fn('config'));
});
