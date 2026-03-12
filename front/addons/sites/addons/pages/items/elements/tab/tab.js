elements.ItemAdd({
	id: 'editor-pages-tab',
	icon: 'description',
	name: 'Editor Pages Tab',
	description: 'Tab switcher between pages list and page settings.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.view = 'list';
		this.page = null;

		this.settings = (page) =>
		{
			this.page = page;
			this.view = 'settings';
		};

		this.save = () =>
		{
			this.view = 'list';
		};

		return `
			<e-editor-pages-list ot-if="view === 'list'" :_settings="settings"></e-editor-pages-list>
			<e-editor-pages-settings ot-if="view === 'settings'" :page="page" :_save="save"></e-editor-pages-settings>
		`;
	}
});
