config.Fn('read', function()
{
	const stored = localStorage.getItem('onetype-config');

	return stored ? JSON.parse(stored) : {};
});
