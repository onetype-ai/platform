$ot.boot.then(() =>
{
	const match = ui.screens.Fn('match', window.location.pathname);

	if(match)
	{
		$ot.command('ui:screens:open', { id: match.item.Get('id'), parameters: match.parameters });
	}
});
