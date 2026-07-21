/* TEMP — the local session and the assistant join here
   until real sessions and the socket transport exist. */

onetype.EmitOn('onetype.document.ready', () =>
{
	const user = $ot.get('user');

	collaborators.Command('join', { id: user ? String(user.id) : 'local', name: user ? user.name : 'Local', self: true });
	collaborators.Command('join', { id: 'assistant', name: 'Assistant', type: 'agent', color: 'brand' });
});
