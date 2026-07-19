ui.navbar.Fn('item.open', function(item)
{
	const popup = item.Get('popup');

	this.methods.content = () =>
	{
		return typeof popup.render === 'function' ? popup.render : () => popup.render;
	};

	this.methods.options = () =>
	{
		const options = { ...popup };
		const finish = popup.onClose;

		delete options.type;
		delete options.render;

		options.id = 'ui-navbar-' + item.Get('id');

		options.onClose = () =>
		{
			$ot.modules.settings.set('ui.navbar.open', null);

			onetype.Emit('ui.navbar.close', {});

			finish && finish();
		};

		return options;
	};

	this.methods.dropdown = () =>
	{
		const target = document.querySelector('[data-navbar-id="' + item.Get('id') + '"]');

		if(!target)
		{
			return false;
		}

		$ot.float.popup(target, this.methods.content(), this.methods.options());

		return true;
	};

	this.methods.surface = () =>
	{
		const options = this.methods.options();

		$ot.float.drawer({
			...options,
			content: this.methods.content(),
			position: options.position || (popup.type === 'drawer' ? 'right' : 'center'),
			clean: !options.title && !options.description
		});

		return true;
	};

	return (popup.type || 'default') === 'dropdown' ? this.methods.dropdown() : this.methods.surface();
});
