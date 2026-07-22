collaborators.ElementAdd({
	id: 'avatars',
	icon: 'group',
	name: 'Collaborators',
	description: 'Avatar stack of everyone in the editor plus a live named cursor for every collaborator except the local session.',
	category: 'Collaborators',
	render: function()
	{
		const refresh = () =>
		{
			this.people = collaborators.Fn('list');
			this.others = this.people.filter((person) => !person.self);
		};

		this.Compute(refresh);

		this.On('platform.collaborators.join', refresh);
		this.On('platform.collaborators.leave', refresh);

		/* Cursor moves write straight to the DOM, the store keeps
		   the last spot so a re-render lands on the same place. */

		this.On('platform.collaborators.move', (data) =>
		{
			const node = this.Element && this.Element.querySelector('[data-cursor="' + data.id + '"]');

			node && (node.style.transform = 'translate(' + data.x + 'px, ' + data.y + 'px)');
		});

		this.where = (person) =>
		{
			const spot = collaborators.StoreGet('cursor:' + person.id) || { x: -100, y: -100 };

			return 'transform: translate(' + spot.x + 'px, ' + spot.y + 'px);';
		};

		this.initials = (person) =>
		{
			return person.name.split(' ').map((word) => word[0]).slice(0, 2).join('').toUpperCase();
		};

		/* The local session broadcasts its own cursor through the same
		   command every other collaborator uses, throttled per frame. */

		let last = 0;

		const track = (event) =>
		{
			const now = performance.now();

			if(now - last < 50)
			{
				return;
			}

			last = now;

			const self = this.people.find((person) => person.self);

			self && commands.Fn('run', 'collaborators:move', { id: self.id, x: event.clientX, y: event.clientY });
		};

		this.OnMounted(() => document.addEventListener('mousemove', track));
		this.OnUnmounted(() => document.removeEventListener('mousemove', track));

		return `
			<div class="box">
				<div class="people">
					<div ot-for="person in people" :ot-key="person.id" :class="'avatar ' + person.color" :ot-tooltip="{ text: person.name + (person.self ? ' (you)' : ''), position: { x: 'center', y: 'bottom' } }">
						<i ot-if="person.type === 'agent'">smart_toy</i>
						<span ot-if="person.type !== 'agent'">{{ initials(person) }}</span>
					</div>
				</div>
				<div class="cursors">
					<div ot-for="person in others" :ot-key="person.id" :class="'cursor ' + person.color" :style="where(person)" :data-cursor="person.id">
						<svg width="16" height="16" viewBox="0 0 16 16"><path d="M 0 0 L 15 5.5 L 8.5 8.5 L 5.5 15 z"></path></svg>
						<span class="tag">{{ person.name }}</span>
					</div>
				</div>
			</div>
		`;
	}
});
