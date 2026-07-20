$ot.platform.packages = {
	limits: (slug) =>
	{
		const item = Object.values(packages.Items()).find((item) => item.Get('slug') === slug);

		return item ? item.Get('limits') : {};
	},
	get: {
		one: (slug) =>
		{
			return Object.values(packages.Items()).find((item) => item.Get('slug') === slug);
		},
		many: () =>
		{
			return Object.values(packages.Items());
		}
	}
};
