developer.Fn('addons.commands', function(id)
{
	return Object.values(commands.Items())
		.filter((item) =>
		{
			const metadata = item.Get('metadata');

			return metadata && metadata.addon === id;
		})
		.map((item) => ({
			id: item.Get('id'),
			exposed: item.Get('exposed'),
			description: item.Get('description'),
			parameters: onetype.DataDescribe(item.Get('in')),
			output: onetype.DataDescribe(item.Get('out'))
		}))
		.sort((left, right) => left.id.localeCompare(right.id));
});
