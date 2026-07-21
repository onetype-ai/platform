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

	if(!Object.keys(define).length)
	{
		return value;
	}

	try
	{
		return onetype.DataDefineOne(value, define);
	}
	catch(error)
	{
		return item.Get('value');
	}
});
