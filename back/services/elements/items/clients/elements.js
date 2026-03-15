import commands from '@onetype/framework/commands';

commands.Fn('grpc.client', 'service.elements.onetype.ai', 443, {}, 'service:elements', false, {
		onConnect: function()
		{
			console.log('Elements service connected.');
		},
		onStreamEnd: function()
		{
			console.log('Elements service disconnected.');
		},
		onError: function(message)
		{
			console.log('Elements service error:', message);
		}
	}
);
