elements.ItemAdd({
	id: 'assistant-chat',
	icon: 'smart_toy',
	name: 'Assistant Chat',
	description: 'Chat with an AI assistant. Type what you want, the assistant chats back and will launch workflows for real work.',
	category: 'Assistant',
	metadata: { addon: 'assistants' },
	config: {
		assistant: {
			type: 'string',
			value: 'main'
		}
	},
	render: function()
	{
		this.typed = '';
		this.busy = false;
		this.reason = '';
		this.workflow = null;

		const refresh = () =>
		{
			const item = assistants.ItemGet(this.assistant);

			this.messages = (item ? item.Get('messages') : []).map((message, index) =>
			{
				return { id: index, role: message.role, content: message.content };
			});

			requestAnimationFrame(() =>
			{
				const list = this.Element && this.Element.querySelector('.messages');

				list && (list.scrollTop = list.scrollHeight);
			});
		};

		this.Compute(refresh);

		this.On('assistants.message', (data) => data.id === this.assistant && refresh());
		this.On('assistants.clear', (data) => { this.workflow = null; data.id === this.assistant && refresh(); });

		const glance = () =>
		{
			requestAnimationFrame(() =>
			{
				const list = this.Element && this.Element.querySelector('.messages');

				list && (list.scrollTop = list.scrollHeight);
			});
		};

		this.On('workflows.start', (data) =>
		{
			this.workflow = { prompt: data.prompt, goals: [], current: 'Planning the steps...', status: 'running' };
			glance();
		});

		this.On('workflows.plan', (data) =>
		{
			if(!this.workflow)
			{
				return;
			}

			this.workflow.goals = data.goals.map((goal) => ({ goal, state: 'pending' }));
			this.workflow.current = null;
			this.Update();
			glance();
		});

		this.On('workflows.task', (data) =>
		{
			if(!this.workflow)
			{
				return;
			}

			const entry = this.workflow.goals.find((goal) => goal.goal === data.goal);

			entry && (entry.state = data.status === 'running' ? 'active' : data.status);
			this.Update();
			glance();
		});

		this.On('workflows.step', (data) =>
		{
			if(!this.workflow)
			{
				return;
			}

			this.workflow.current = data.goal;
			this.Update();
			glance();
		});

		this.On('workflows.done', (data) =>
		{
			if(!this.workflow)
			{
				return;
			}

			this.workflow.status = data.status;
			this.workflow.current = null;
			this.workflow.goals.forEach((entry) => entry.state = data.status === 'completed' ? 'done' : (entry.state === 'active' ? 'failed' : entry.state));
			this.Update();
			glance();
		});

		this.input = ({ value }) =>
		{
			this.typed = value;
		};

		this.key = async ({ event }) =>
		{
			if(event.key !== 'Enter')
			{
				return;
			}

			const prompt = event.target.value.trim();

			if(!prompt || this.busy)
			{
				return;
			}

			this.typed = '';
			this.busy = true;

			try
			{
				await $ot.command('assistants:ask', { id: this.assistant, prompt });
			}
			catch(error)
			{
			}

			this.busy = false;
		};

		this.close = () =>
		{
			$ot.ui.layouts.close('assistants');
		};

		this.note = ({ value }) =>
		{
			this.reason = value;
		};

		this.rate = async (verdict) =>
		{
			await $ot.command('assistants:rate', { id: this.assistant, verdict, reason: this.reason });

			this.reason = '';
		};

		this.good = () => this.rate('good');
		this.bad = () => this.rate('bad');

		return `
			<div class="box">
				<div class="head">
					<i>smart_toy</i>
					<span class="title">Assistant</span>
					<button class="exit" ot-click="close"><i>close</i></button>
				</div>
				<div class="messages">
					<div ot-if="!messages.length && !busy" class="empty">Say hi, or ask me to do something in the editor.</div>
					<div ot-for="message in messages" :ot-key="message.id" :class="'message ' + message.role">{{ message.content }}</div>
					<div ot-if="workflow" :class="'workflow ' + workflow.status">
						<div class="name">
							<i>{{ workflow.status === 'running' ? 'magic_button' : (workflow.status === 'completed' ? 'check_circle' : 'error') }}</i>
							<span>{{ workflow.prompt }}</span>
						</div>
						<div ot-for="entry in workflow.goals" :ot-key="entry.goal" :class="'task ' + entry.state">
							<i>{{ entry.state === 'done' ? 'check_circle' : (entry.state === 'active' ? 'progress_activity' : (entry.state === 'failed' || entry.state === 'skipped' ? 'cancel' : 'circle')) }}</i>
							<span>{{ entry.goal }}</span>
						</div>
						<div ot-if="workflow.current" class="task active">
							<i>progress_activity</i>
							<span>{{ workflow.current }}</span>
						</div>
					</div>
					<div ot-if="busy" class="message assistant thinking"><span></span><span></span><span></span></div>
				</div>
				<div class="field">
					<input :value="typed" spellcheck="false" placeholder="Ask the assistant..." ot-input="input" ot-keydown="key">
				</div>
				<div class="rate">
					<input :value="reason" spellcheck="false" placeholder="Why was it good or bad?" ot-input="note">
					<button class="good" ot-click="good"><i>thumb_up</i></button>
					<button class="bad" ot-click="bad"><i>thumb_down</i></button>
				</div>
			</div>
		`;
	}
});
