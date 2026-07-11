elements.ItemAdd({
	id: 'cms-presentation',
	icon: 'web',
	name: 'CMS Presentation',
	description: 'The CMS package presenting itself: hero, the three letters explained, view mocks and a call into the content mode.',
	category: 'CMS',
	collection: 'Home',
	author: 'OneType',
	metadata: { addon: 'cms' },
	config: {},
	render: function()
	{
		/* ===== DATA ===== */

		this.letters = [
			{ id: 'content', letter: 'C', title: 'Content', description: 'Entries live in collections on the universal database. Ten listing views, filters and search on every one of them.', color: 'green' },
			{ id: 'manage', letter: 'M', title: 'Manage', description: 'Design collections and their fields visually. The schema is data too, so AI and packages can shape it.', color: 'blue' },
			{ id: 'system', letter: 'S', title: 'System', description: 'Webhooks, tokens and delivery. Every entry is reachable as a command, from any package or from outside.', color: 'brand' }
		];

		this.facts = [
			{ id: 'views', value: '10', label: 'listing views' },
			{ id: 'commands', value: '100%', label: 'driven by commands' },
			{ id: 'database', value: '1', label: 'universal database' }
		];

		this.cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

		/* ===== HANDLERS ===== */

		this.enter = () =>
		{
			$ot.ui.modes.switch('content');
		};

		/* ===== RENDER ===== */

		return /* html */ `
			<div class="box">

				<section class="hero">
					<div class="badge"><i>deployed_code</i>CMS package</div>
					<h1><em class="c">Content.</em> <em class="m">Manage.</em> <em class="s">System.</em></h1>
					<p>A content platform that is not bolted onto your stack, it lives inside it. Collections, entries and media on the same database every other package uses.</p>
					<div class="actions">
						<button type="button" class="cta solid" ot-click="enter">Open Content<i>arrow_forward</i></button>
					</div>
					<div class="preview">
						<div class="pane table">
							<span class="row head"><span></span><span></span><span></span></span>
							<span class="row"><span></span><span></span><span></span></span>
							<span class="row"><span></span><span></span><span></span></span>
							<span class="row"><span></span><span></span><span></span></span>
						</div>
						<div class="pane board">
							<span class="lane orange"><span></span><span></span></span>
							<span class="lane blue"><span></span><span></span><span></span></span>
							<span class="lane green"><span></span><span></span></span>
						</div>
						<div class="pane calendar">
							<span ot-for="cell in cells" :ot-key="cell" :class="cell === 6 || cell === 10 ? 'cell marked' : 'cell'"></span>
						</div>
					</div>
				</section>

				<section class="block">
					<div class="trio">
						<div ot-for="entry in letters" :ot-key="entry.id" :class="'card ' + entry.color">
							<span class="letter">{{ entry.letter }}</span>
							<h3>{{ entry.title }}</h3>
							<p>{{ entry.description }}</p>
						</div>
					</div>
				</section>

				<section class="block">
					<div class="facts">
						<div ot-for="fact in facts" :ot-key="fact.id" class="fact">
							<span class="value">{{ fact.value }}</span>
							<span class="label">{{ fact.label }}</span>
						</div>
					</div>
				</section>

				<section class="ending">
					<h2>Your content is already <em class="s">home</em>.</h2>
					<p>No API keys between your site and your data. The builder, the workflows and the AI read the same collections this package manages.</p>
					<div class="actions">
						<button type="button" class="cta solid" ot-click="enter">Start managing content<i>arrow_forward</i></button>
					</div>
				</section>

			</div>
		`;
	}
});
