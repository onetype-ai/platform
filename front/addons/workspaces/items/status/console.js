onetype.AddonReady('status', (status) =>
{
	status.Item({
		id: 'console',
		order: 1,
		align: 'left',
		icon: 'terminal',
		label: 'Console',
		render: `<div style="padding: 16px; color: var(--ot-text-2); font-size: 13px;">Console panel content goes here.</div>`
	});

	status.Item({
		id: 'ready',
		order: 1,
		align: 'right',
		icon: 'check_circle',
		label: 'Ready'
	});
});
