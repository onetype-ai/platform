import onetype from '@onetype/framework';

onetype.EmitRegister('boot', {
	description: 'Fires once after the boot middleware chain finishes and before the http server opens. Signals that every package and addon has loaded its data. Listeners react to a fully booted server, they cannot cancel or delay it.'
});
