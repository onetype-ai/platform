elements.ItemAdd({
	id: 'dashboard',
	icon: 'dashboard',
	name: 'Dashboard',
	description: 'Responsive board that lays out dashboard widgets on a twelve column grid, grouped into sections, and resolves each widget data.',
	category: 'Dashboard',
	metadata: { addon: 'ui.dashboard' },
	render: function()
	{
		const load = async (widget) =>
		{
			const source = widget.item.Get('data');

			widget.state = 'loading';

			try
			{
				widget.payload = (typeof source === 'function' ? await source(widget.item) : source) || {};
				widget.state = 'ready';
			}
			catch(error)
			{
				widget.error = error?.message || 'Could not load this widget.';
				widget.state = 'error';
			}

			this.Update();
		};

		const map = (item) =>
		{
			const widget = {
				id: item.Get('id'),
				title: item.Get('title'),
				description: item.Get('description'),
				icon: item.Get('icon'),
				color: item.Get('color') || '',
				type: item.Get('type'),
				span: item.Get('span'),
				height: item.Get('height') || null,
				refresh: item.Get('refresh') || null,
				state: 'loading',
				error: '',
				payload: {},
				item
			};

			this.pending.push(widget);

			if(widget.refresh)
			{
				this.timers.push(setInterval(() => load(widget), widget.refresh * 1000));
			}

			return widget;
		};

		const group = (section) =>
		{
			return {
				id: section ? section.Get('id') : null,
				title: section ? section.Get('title') : '',
				description: section ? section.Get('description') : '',
				icon: section ? section.Get('icon') : '',
				color: section ? section.Get('color') : '',
				background: section ? section.Get('background') : null,
				widgets: ui.dashboard.Fn('widgets', section ? section.Get('id') : null).map(map)
			};
		};

		const build = () =>
		{
			this.timers.forEach(clearInterval);
			this.timers = [];
			this.pending = [];
			this.sections = [group(null), ...ui.dashboard.Fn('sections').map(group)].filter((section) => section.widgets.length);
		};

		const refresh = () =>
		{
			build();
			this.pending.forEach(load);
		};

		if(!this.sections)
		{
			this.timers = [];
			this.pending = [];

			build();

			this.OnMounted(() => this.pending.forEach(load));
			this.OnDestroy(() => this.timers.forEach(clearInterval));
		}

		this.On('@addon.item.added', (item) => ['ui.dashboard.widgets', 'ui.dashboard.sections'].includes(item.addon.GetName()) && refresh());
		this.On('@addon.item.removed', (item) => ['ui.dashboard.widgets', 'ui.dashboard.sections'].includes(item.addon.GetName()) && refresh());
		this.On('ui.apps.open', refresh);
		this.On('ui.apps.close', refresh);
		this.On('ui.modes.switch', refresh);

		this.retry = (widget) =>
		{
			widget.state = 'loading';

			this.Update();

			load(widget);
		};

		this.classes = (section) => section.background ? 'section panel bg-' + section.background : 'section';

		this.head = (section) => section.color ? 'head ' + section.color : 'head';

		this.card = (widget) => widget.color ? 'card ' + widget.color : 'card';

		this.body = (widget) => ui.dashboard.types.Render(widget.type, { color: widget.color, payload: widget.payload }).Element;

		return `
			<div class="box">
				<section ot-for="section in sections" :ot-key="section.id || 'loose'" :class="classes(section)">
					<header ot-if="section.title" :class="head(section)">
						<i ot-if="section.icon">{{ section.icon }}</i>
						<div class="text">
							<span class="title">{{ section.title }}</span>
							<span ot-if="section.description" class="description">{{ section.description }}</span>
						</div>
					</header>
					<div class="grid">
						<div ot-for="widget in section.widgets" :ot-key="widget.id" :class="card(widget)" :style="'grid-column: span ' + widget.span">
							<header ot-if="widget.title || widget.icon">
								<div ot-if="widget.icon" class="wrap"><i>{{ widget.icon }}</i></div>
								<div class="text">
									<span ot-if="widget.title" class="title">{{ widget.title }}</span>
									<span ot-if="widget.description" class="description">{{ widget.description }}</span>
								</div>
							</header>
							<div class="body" :style="widget.height ? 'height: ' + widget.height + 'px' : ''">
								<e-status-loading ot-if="widget.state === 'loading'"></e-status-loading>
								<e-status-error ot-if="widget.state === 'error'" icon="error" title="Failed to load" :description="widget.error" :_click="() => retry(widget)"></e-status-error>
								<div ot-if="widget.state === 'ready'" class="mount" ot-node="body(widget)"></div>
							</div>
						</div>
					</div>
				</section>
			</div>
		`;
	}
});
