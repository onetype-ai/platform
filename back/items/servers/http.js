import commands from '@onetype/framework/commands';

commands.Fn('http.server', 3000, {
    onStart: () =>
    {
        console.log('OneType - Platform running on :3000.');
    },
    onRequest: (http) =>
    {
        const origin = http.request.headers['origin'];

        if(origin)
        {
            http.response.setHeader('Access-Control-Allow-Origin', origin);
            http.response.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
            http.response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        }

        if(http.request.method === 'OPTIONS')
        {
            http.response.writeHead(204);
            http.response.end();
            http.prevent = true;
        }
    }
});
