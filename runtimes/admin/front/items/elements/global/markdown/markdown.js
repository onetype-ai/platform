onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'global-markdown',
		icon: 'article',
		name: 'Markdown',
		description: 'Markdown renderer with premium typography, tables, quotes, images, code blocks through global-code and a read more fold.',
		category: 'Global',
		collection: 'Home',
		author: 'OneType',
		config: {
			content: {
				type: 'string',
				value: "# Getting started\n\nInstall the package and it lands in your project **immediately**. Every update ships through the *same channel*, so a site never breaks on install.\n\n## Quick facts\n\n- Works with every runtime\n- Ships with `ot-form` directives\n- Zero configuration needed\n\n> Packages are just addons with a manifest. Nothing else to learn.\n\n| Plan | Projects | Price |\n| --- | --- | --- |\n| Starter | 3 | Free |\n| Pro | Unlimited | $19 |\n\n```js\nconst forms = onetype.Addon('forms');\n\nforms.Item({ id: 'contact' });\n```\n\nRead the [documentation](https://onetype.ai) for the full guide.",
				description: 'Markdown string to render.'
			},
			collapsible: {
				type: 'boolean',
				value: false,
				description: 'Folds long content behind a read more toggle.'
			},
			height: {
				type: 'number',
				value: 220,
				description: 'Folded max height in pixels while collapsible is on.'
			},
			expanded: {
				type: 'boolean',
				value: false,
				description: 'Start unfolded while collapsible is on.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth, renders the article on its own bordered surface. 0 renders transparent, without background or borders.'
			},
			glow: {
				type: 'string',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Colored glow on top of the surface. Empty renders no glow.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				const parts = this.content.split(/```(\w*)\n([\s\S]*?)```/g);

				this.segments = [];

				const table = (block) =>
				{
					const lines = block.trim().split('\n');
					const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim().replace(/`/g, ''));
					const fields = cells(lines[0]).map((label, index) => ({ key: 'c' + index, label, type: 'text' }));

					const items = lines.slice(2).map((line, index) =>
					{
						const values = cells(line);
						const item = { id: index + 1 };

						fields.forEach((field, position) => item[field.key] = values[position] !== undefined ? values[position] : '');

						return item;
					});

					return { fields, items };
				};

				const text = (part) =>
				{
					const chunks = part.split(/((?:[ \t]*\|.*\|[ \t]*(?:\n|$)){2,})/);

					for(let i = 0; i < chunks.length; i++)
					{
						const chunk = chunks[i];

						if(!chunk || !chunk.trim())
						{
							continue;
						}

						if(i % 2)
						{
							this.segments.push({ key: this.segments.length, type: 'table', ...table(chunk) });
						}
						else
						{
							this.segments.push({ key: this.segments.length, type: 'html', content: onetype.Markdown(chunk) });
						}
					}
				};

				for(let i = 0; i < parts.length; i += 3)
				{
					const part = parts[i];
					const language = parts[i + 1];
					const source = parts[i + 2];

					if(part && part.trim())
					{
						text(part);
					}

					if(source !== undefined)
					{
						this.segments.push({ key: this.segments.length, type: 'code', language: language ? language : 'text', source: source.replace(/^\n+|\n+$/g, '') });
					}
				}
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box'];

				if(this.background || this.background === 0)
				{
					list.push('bg-' + this.background);
				}

				if(this.collapsible && !this.expanded)
				{
					list.push('folded');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.toggle = () =>
			{
				this.expanded = !this.expanded;
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<article :class="classes()">
					<div class="body" :style="collapsible && !expanded ? 'max-height: ' + height + 'px' : null">
						<div class="prose">
							<div ot-for="segment in segments" :ot-key="segment.key" class="segment">
								<div ot-if="segment.type === 'html'"><span ot-html="segment.content"></span></div>
								<e-global-code
									ot-if="segment.type === 'code'"
									:source="segment.source"
									:language="segment.language"
									:background="Math.min(background + 1, 3)"
								></e-global-code>
								<e-views-table
									ot-if="segment.type === 'table'"
									:fields="segment.fields"
									:items="segment.items"
									:background="Math.min(background + 1, 3)"
								></e-views-table>
							</div>
						</div>
					</div>
					<div ot-if="collapsible && !expanded" class="fade"></div>
					<button ot-if="collapsible" type="button" class="toggle" ot-click="toggle">
						<i>{{ expanded ? 'expand_less' : 'expand_more' }}</i>
						<span>{{ expanded ? 'Show less' : 'Read more' }}</span>
					</button>
				</article>
			`;
		}
	});
});
