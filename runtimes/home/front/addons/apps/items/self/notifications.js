ui.apps.Item({
	id: 'notifications',
	name: 'Notifications',
	icon: 'notifications',
	color: 'rgba(56, 189, 248, 1)',
	order: 3,
	badge: 2,
	render: () => `
		<div class="ot-flex-vertical ot-gap-m ot-p-m">
			<e-global-heading title="Notifications" description="Recent activity across your workspace." element="h2" size="s"></e-global-heading>

			<e-cards-info title="Deploy finished" description="builder was deployed to production." icon="rocket_launch"></e-cards-info>
			<e-cards-info title="New comment" description="Someone commented on Collections." icon="chat_bubble"></e-cards-info>
			<e-cards-info title="Storage warning" description="You are close to your storage limit." icon="warning"></e-cards-info>
		</div>
	`
});
