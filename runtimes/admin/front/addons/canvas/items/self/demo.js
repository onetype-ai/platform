/* TEMP DEMO — fake cards until real builder content exists. */

ui.canvas.Fn('group.register', { id: 'pages', name: 'Pages', color: 'brand' });
ui.canvas.Fn('group.register', { id: 'data', name: 'Data', color: 'blue' });

const card = (title, hint) => `
	<div style="padding: var(--ot-spacing-m);">
		<div style="color: var(--ot-text-1); font-weight: 500;">${title}</div>
		<div style="margin-top: 4px; color: var(--ot-text-3); font-size: var(--ot-size-s);">${hint}</div>
	</div>
`;

ui.canvas.Item({ id: 'home', name: 'Home', icon: 'home', app: ['builder'], group: 'pages', x: 144, y: 120, links: [{ to: 'about' }, { to: 'posts' }], render: card('Home', 'Landing page') });
ui.canvas.Item({ id: 'about', name: 'About', icon: 'info', app: ['builder'], group: 'pages', x: 552, y: 120, render: card('About', 'Company page') });
ui.canvas.Item({ id: 'posts', name: 'Posts', icon: 'article', app: ['builder'], group: 'data', x: 552, y: 408, links: [{ to: 'about' }], render: card('Posts', 'Blog collection') });

ui.canvas.Item({ id: 'list-posts', name: 'GET /posts', icon: 'download', app: ['bridge'], order: 1, height: 96, links: [{ to: 'create-post' }], render: card('GET /posts', 'List every post') });
ui.canvas.Item({ id: 'create-post', name: 'POST /posts', icon: 'add', app: ['bridge'], order: 2, height: 96, links: [{ to: 'update-post' }], render: card('POST /posts', 'Create a post') });
ui.canvas.Item({ id: 'update-post', name: 'PUT /posts/:id', icon: 'edit', app: ['bridge'], order: 3, height: 96, links: [{ to: 'remove-post' }], render: card('PUT /posts/:id', 'Update a post') });
ui.canvas.Item({ id: 'remove-post', name: 'DELETE /posts/:id', icon: 'delete', app: ['bridge'], order: 4, height: 96, render: card('DELETE /posts/:id', 'Remove a post') });

ui.canvas.Item({ id: 'trigger', name: 'Form submitted', icon: 'bolt', app: ['workflows'], x: 432, y: 72, height: 96, links: [{ to: 'validate', label: 'on submit' }], render: card('Form submitted', 'Trigger') });
ui.canvas.Item({ id: 'validate', name: 'Validate input', icon: 'rule', app: ['workflows'], x: 432, y: 312, height: 96, links: [{ to: 'save', label: 'valid', color: 'green' }, { to: 'reject', label: 'invalid', color: 'red' }], render: card('Validate input', 'Step') });
ui.canvas.Item({ id: 'save', name: 'Save to Posts', icon: 'save', app: ['workflows'], x: 144, y: 552, height: 96, links: [{ to: 'notify', color: 'green' }], render: card('Save to Posts', 'Collection') });
ui.canvas.Item({ id: 'reject', name: 'Show error', icon: 'error', app: ['workflows'], x: 720, y: 552, height: 96, render: card('Show error', 'Response') });
ui.canvas.Item({ id: 'notify', name: 'Send email', icon: 'mail', app: ['workflows'], x: 144, y: 792, height: 96, render: card('Send email', 'Action') });
