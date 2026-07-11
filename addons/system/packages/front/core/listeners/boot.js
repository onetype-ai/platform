onetype.MiddlewareIntercept('boot', async (context) =>
{
	packages.ItemsAdd(Object.values($ot.get('packages') || {}));

	await context.next();
});
