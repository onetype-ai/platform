onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'data-thread',
		icon: 'forum',
		name: 'Thread',
		description: 'Conversation feed: authored entries with timestamps, optional replies with an open state and waiting badge, and a composer with a floating send action.',
		category: 'Data',
		collection: 'Home',
		author: 'OneType',
		config: {
			entries: {
				type: 'array',
				value: [
					{ id: 1, author: { name: 'Mila Kovač' }, at: 'Jul 18, 09:12', text: 'The export keeps timing out on large collections.', replyable: true, reply: { author: { name: 'Stefan Pakić' }, at: 'Jul 18, 10:02', text: 'Batching landed, try again with the new build.' } },
					{ id: 2, author: { name: 'Ana Ilić' }, at: 'Jul 18, 11:40', text: 'Should the archive keep the original file names?', replyable: true, reply: null },
					{ id: 3, author: { name: 'Dejan Tomić' }, at: 'Jul 18, 12:05', text: 'Great progress on this one, the demo went really well.' }
				],
				each: {
					type: 'object',
					config: {
						id: {
							type: 'string|number',
							description: 'Unique entry identifier.'
						},
						author: {
							type: 'object',
							config: {
								name: {
									type: 'string',
									description: 'Display name of the author.'
								}
							},
							description: 'Who wrote the entry.'
						},
						at: {
							type: 'string',
							description: 'When the entry was written.'
						},
						text: {
							type: 'string',
							description: 'The entry itself.'
						},
						replyable: {
							type: 'boolean',
							value: false,
							description: 'Whether the entry expects a reply. Open entries carry the accent and the reply form.'
						},
						reply: {
							type: 'object',
							value: null,
							config: {
								author: {
									type: 'object',
									config: {
										name: {
											type: 'string',
											description: 'Display name of the reply author.'
										}
									},
									description: 'Who replied.'
								},
								at: {
									type: 'string',
									description: 'When the reply was written.'
								},
								text: {
									type: 'string',
									description: 'The reply itself.'
								}
							},
							description: 'The reply once given. Null while open.'
						}
					},
					description: 'A single entry of the thread.'
				},
				description: 'Entries of the thread, oldest first.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of open replyable entries and the send actions.'
			},
			waiting: {
				type: 'string',
				value: 'Waiting for a reply',
				description: 'Badge text on open replyable entries.'
			},
			placeholder: {
				type: 'string',
				value: 'Write a message...',
				description: 'Placeholder of the composer.'
			},
			replyPlaceholder: {
				type: 'string',
				value: 'Write a reply...',
				description: 'Placeholder of the reply forms.'
			},
			emptyIcon: {
				type: 'string',
				value: 'forum',
				description: 'Icon of the empty state.'
			},
			emptyTitle: {
				type: 'string',
				value: 'Nothing here yet',
				description: 'Title of the empty state.'
			},
			emptyDescription: {
				type: 'string',
				value: 'Start the conversation below.',
				description: 'Description of the empty state.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth the thread sits on. Entries sit one step above.'
			},
			_send: {
				type: 'function',
				description: 'Called with { value } when the composer submits. Omitted hides the composer.'
			},
			_reply: {
				type: 'function',
				description: 'Called with { id, value } when an open entry gets its reply. Omitted hides the reply forms.'
			}
		},
		render: function()
		{
			this.initials = (name) => String(name).split(' ').map((word) => word.charAt(0)).slice(0, 2).join('');

			this.state = (entry) =>
			{
				return entry.replyable && !entry.reply ? 'entry open ' + this.color : 'entry ' + this.color;
			};

			this.above = () => Math.min(this.background + 1, 3);

			this.sender = () => ({ value }) =>
			{
				if(this._send)
				{
					this._send({ value });
				}
			};

			this.replier = (id) => ({ value }) =>
			{
				if(this._reply)
				{
					this._reply({ id, value });
				}
			};

			return /* html */ `
				<div :class="'box bg-' + background">
					<e-status-empty ot-if="!entries.length" :icon="emptyIcon" :title="emptyTitle" :description="emptyDescription" :background="0"></e-status-empty>
					<div ot-for="entry in entries" :ot-key="entry.id" :class="state(entry)">
						<div class="said">
							<span class="avatar">{{ initials(entry.author ? entry.author.name : '?') }}</span>
							<div class="words">
								<span class="row"><b>{{ entry.author ? entry.author.name : 'Unknown' }}</b><span class="when">{{ entry.at }}</span><span ot-if="entry.replyable && !entry.reply" class="waits">{{ waiting }}</span></span>
								<span class="text">{{ entry.text }}</span>
							</div>
						</div>
						<div ot-if="entry.reply" class="replied">
							<i>subdirectory_arrow_right</i>
							<div class="words">
								<span class="row"><b>{{ entry.reply.author ? entry.reply.author.name : 'Unknown' }}</b><span class="when">{{ entry.reply.at }}</span></span>
								<span class="text">{{ entry.reply.text }}</span>
							</div>
						</div>
						<e-form-textarea ot-if="_reply && entry.replyable && !entry.reply" :placeholder="replyPlaceholder" :rows="2" :maxlength="2000" :counter="false" :background="above()" :_enter="replier(entry.id)"></e-form-textarea>
					</div>
					<div ot-if="_send" class="composer">
						<e-form-textarea :placeholder="placeholder" :rows="2" :maxlength="2000" :counter="false" :background="above()" :_enter="sender()"></e-form-textarea>
					</div>
				</div>
			`;
		}
	});
});
