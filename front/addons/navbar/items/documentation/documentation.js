onetype.AddonReady('documentation', (documentation) =>
{
	documentation.Item({
		id: 'navbar',
		order: 6,
		group: 'Global',
		icon: 'toolbar',
		label: 'Navbar',
		addon: 'navbar',
		title: 'Navbar',
		description: 'Top toolbar with left, center and right positions. Addons inject items.',
		overview: `
## Navbar

The navbar is the top toolbar of the workspace. It has three positions, left, center and right, and anything in it comes from addon items. There is no hardcoded content, a third party can drop a button, a search field or a whole menu into any position the same way we do.

A navbar item is just an addon item. Register one from anywhere:

\`\`\`js
onetype.AddonReady('navbar', (navbar) =>
{
	navbar.Item({
		id: 'preview',
		position: 'right',
		icon: 'visibility',
		label: 'Preview',
		onClick: () => $ot.command('preview:open')
	});
});
\`\`\`

### Item types

The type field decides how an item behaves:

- **default** is a button. Give it an icon, a label, or both, plus an onClick. If you set a render instead, that custom markup is dropped in directly with no button wrapper, which is how the logo, search field and publish button are built.
- **dropdown** turns the item into a trigger. The icon and label become the button, and render is the panel that opens right under it, anchored and tracking the trigger.
- **popup** opens render as a centered modal with a backdrop, independent of where the trigger sits.

So the same render field means different things per type, the inline content for default, the panel for dropdown and popup. The element maps all of this to the float system internally, the item author never touches it.

### Tooltip and selected

Set tooltip to show a label on hover without taking up space, useful for icon only items. Set selected to true to give an item the active pill, a soft brand background with a brand indicator on top, matching the apps rail and the sidebar.

### How it works

Items are grouped by position and sorted by order through navbar.Fn('positions'). The element listens to apps.switch and modes.switch, so the same app and mode filters used everywhere apply here too, each app can show its own navbar items. Custom renders go through the item render function, declarative buttons are drawn by the element itself.
		`.trim()
	});
});
