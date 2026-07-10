elements.ItemAdd({
	id: 'terminal-prompt',
	icon: 'chevron_right',
	name: 'Terminal Prompt',
	description: 'Input that runs commands, with inline command suggestions.',
	category: 'Terminal',
	metadata: { addon: 'terminal' },
	render: function()
	{
		const history = [];
		let cursor = 0;

		this.typed = '';
		this.suggestion = null;

		const sync = (value) =>
		{
			this.typed = value;
			this.suggestion = terminal.Fn('suggest', value);
		};

		this.input = ({ value }) =>
		{
			sync(value);
		};

		this.paste = ({ event }) =>
		{
			const text = event.clipboardData.getData('text');

			if(!text || !text.includes('\n'))
			{
				return;
			}

			event.preventDefault();

			terminal.Fn('script', text);

			sync('');
		};

		this.rest = () =>
		{
			return this.suggestion ? this.suggestion.slice(this.typed.length) : '';
		};

		this.key = ({ event }) =>
		{
			if(event.key === 'Tab')
			{
				event.preventDefault();

				if(this.suggestion)
				{
					sync(this.suggestion);
				}

				return;
			}

			if(event.key === 'Enter')
			{
				const line = event.target.value.trim();

				if(!line)
				{
					return;
				}

				history.push(line);
				cursor = history.length;
				sync('');

				terminal.Fn('run', line);
			}

			if(event.key === 'ArrowUp')
			{
				event.preventDefault();

				if(!history.length)
				{
					return;
				}

				cursor = Math.max(0, cursor - 1);
				sync(history[cursor]);
			}

			if(event.key === 'ArrowDown')
			{
				event.preventDefault();

				if(!history.length)
				{
					return;
				}

				cursor = Math.min(history.length, cursor + 1);
				sync(cursor === history.length ? '' : history[cursor]);
			}
		};

		return `
			<div class="box">
				<i>chevron_right</i>
				<div class="field">
					<div class="ghost"><span class="typed">{{ typed }}</span><span class="rest">{{ rest() }}</span></div>
					<input :value="typed" spellcheck="false" placeholder="command:id key=value or command:id {&quot;key&quot;: &quot;value&quot;}" ot-keydown="key" ot-input="input" ot-paste="paste">
				</div>
				<span ot-if="suggestion" class="hint">tab</span>
			</div>
		`;
	}
});
