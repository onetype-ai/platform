$ot.platform.packages = {
	limits: (slug) =>
	{
		const item = Object.values(packages.Items()).find((candidate) => candidate.Get('slug') === slug);

		return item ? item.Get('limits') : {};
	},
	get: {
		one: (slug) =>
		{
			return Object.values(packages.Items()).find((candidate) => candidate.Get('slug') === slug) || null;
		},
		many: () =>
		{
			return Object.values(packages.Items());
		}
	}
};
