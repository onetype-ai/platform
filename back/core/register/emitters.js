import onetype from '@onetype/framework';

onetype.EmitRegister('platform.boot', {
	description: 'Fires once after the boot middleware chain finishes and before the http server opens. Signals that every package and addon has loaded its data. Listeners react to a fully booted server, they cannot cancel or delay it.'
});

onetype.EmitRegister('platform.reload', {
	description: 'Fires once the reload is decided, moments before the process exits. Listeners have a breath to flush, they cannot cancel.'
});
