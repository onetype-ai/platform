ui.canvas.Fn('frame', function(items)
{
	const padding = 80;
	const viewport = this.StoreGet('viewport') || { width: 1200, height: 800 };

	const left = Math.min(...items.map((item) => item.x)) - padding;
	const top = Math.min(...items.map((item) => item.y)) - padding;
	const right = Math.max(...items.map((item) => item.x + item.width)) + padding;
	const bottom = Math.max(...items.map((item) => item.y + item.height)) + padding;

	const level = Math.min(2, Math.max(0.25, Math.min(viewport.width / (right - left), viewport.height / (bottom - top), 1)));

	$ot.modules.settings.set('ui.canvas.camera', {
		x: (viewport.width - (right - left) * level) / 2 - left * level,
		y: (viewport.height - (bottom - top) * level) / 2 - top * level,
		z: level
	});

	return level;
});
