/* TEMP DEMO — remove once real items exist. Shows navbar design with reference-style items. */

navbar.Item({
	id: 'demo-logo',
	position: 'left',
	type: 'dropdown',
	icon: 'graph_3',
	render: () => `<div style="padding: var(--ot-spacing-s); min-width: 180px;">Workspace menu</div>`
});

navbar.Item({ id: 'demo-builder', position: 'left', icon: 'dashboard', label: 'Builder', selected: true, onClick: () => {} });
navbar.Item({ id: 'demo-cms', position: 'left', icon: 'database', tooltip: 'CMS', onClick: () => {} });
navbar.Item({ id: 'demo-members', position: 'left', icon: 'group', tooltip: 'Memberships', onClick: () => {} });
navbar.Item({ id: 'demo-storage', position: 'left', icon: 'cloud', tooltip: 'Storage', onClick: () => {} });
navbar.Item({ id: 'demo-code', position: 'left', icon: 'code', tooltip: 'Code', onClick: () => {} });
navbar.Item({ id: 'demo-seo', position: 'left', icon: 'travel_explore', tooltip: 'SEO', onClick: () => {} });

navbar.Item({
	id: 'demo-ai',
	position: 'left',
	type: 'popup',
	icon: 'auto_awesome',
	tooltip: 'AI assistant',
	render: () => `<div style="padding: var(--ot-spacing-l); min-width: 320px;">AI assistant</div>`
});

navbar.Item({
	id: 'demo-search',
	position: 'right',
	render: () => `
		<div style="display: flex; align-items: center; gap: var(--ot-spacing-x); height: var(--ot-height-s); width: 220px; padding: 0 var(--ot-spacing-s); background: var(--ot-bg-1); border: 1px solid var(--ot-bg-2-border); border-radius: var(--ot-radius-s); color: var(--ot-text-3); font-size: var(--ot-size-m);">
			<i style="font-size: 16px;">search</i>
			<span style="flex: 1;">Search...</span>
			<span style="font-size: var(--ot-size-s); opacity: 0.6;">⌘/</span>
		</div>
	`
});

navbar.Item({ id: 'demo-settings', position: 'right', icon: 'settings', label: 'Site Settings', type: 'dropdown', render: () => `<div style="padding: var(--ot-spacing-s); min-width: 200px;">Site settings</div>` });

navbar.Item({
	id: 'demo-publish',
	position: 'right',
	render: () => `<button style="height: var(--ot-height-s); padding: 0 var(--ot-spacing-m); background: var(--ot-brand); color: #fff; border: none; border-radius: var(--ot-radius-s); font-size: var(--ot-size-m); font-weight: 600; cursor: pointer;">Publish</button>`
});
