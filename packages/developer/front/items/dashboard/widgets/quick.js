onetype.AddonReady('ui.dashboard', (dashboard) =>
{
	dashboard.widgets.Item({
		id: 'developer-quick',
		title: 'Quick actions',
		icon: 'bolt',
		type: 'actions',
		section: 'developer-operations',
		span: 4,
		condition: { app: ['developer'] },
		data: {
			actions: [
				{ icon: 'rocket_launch', label: 'Deploy site', description: 'Publish the latest changes', color: 'green', onClick: () => $ot.float.toast({ title: 'Developer', message: 'Deploy started.', type: 'success' }) },
				{ icon: 'cached', label: 'Purge cache', description: 'Clear the edge cache', color: 'blue', onClick: () => $ot.float.toast({ title: 'Developer', message: 'Cache purged.', type: 'success' }) },
				{ icon: 'backup', label: 'Create backup', description: 'Snapshot content and settings', color: 'orange', onClick: () => $ot.float.toast({ title: 'Developer', message: 'Backup queued.' }) }
			]
		}
	});
});
