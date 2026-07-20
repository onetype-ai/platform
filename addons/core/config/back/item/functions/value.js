import onetype from '@onetype/framework';
import config from '#config/addon.js';

config.Fn('item.value', function(item)
{
	const data = this.Fn('read');

	if(!(item.Get('key') in data))
	{
		return item.Get('value');
	}

	const define = item.Get('config');
	const value = data[item.Get('key')];

	return Object.keys(define).length ? onetype.DataDefineOne(value, define) : value;
});
