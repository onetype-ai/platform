elements.ItemAdd({
	id: 'terminal',
	icon: 'terminal',
	name: 'Terminal',
	description: 'Command log with a prompt to run commands.',
	category: 'Terminal',
	metadata: { addon: 'terminal' },
	render: function()
	{
		return `
			<div class="box">
				<e-terminal-log></e-terminal-log>
				<e-terminal-prompt></e-terminal-prompt>
			</div>
		`;
	}
});
