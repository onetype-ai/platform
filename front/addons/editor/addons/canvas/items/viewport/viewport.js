elements.ItemAdd({
	id: 'editor-viewport',
	icon: 'crop_free',
	name: 'Editor Viewport',
	description: 'Viewport frame that renders site content.',
	category: 'Editor',
	author: 'OneType',
	config: {
		width: {
			type: 'number',
			value: 1440
		},
		zoom: {
			type: 'number',
			value: 100
		},
		label: {
			type: 'string',
			value: ''
		}
	},
	render: function()
	{
		const parse = (color) =>
		{
			let r, g, b, a = 1;

			if(color.startsWith('#'))
			{
				const hex = color.slice(1);

				r = parseInt(hex.substring(0, 2), 16);
				g = parseInt(hex.substring(2, 4), 16);
				b = parseInt(hex.substring(4, 6), 16);
			}
			else
			{
				const match = color.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)/);

				if(!match)
				{
					return null;
				}

				r = +match[1];
				g = +match[2];
				b = +match[3];
				a = match[4] !== undefined ? +match[4] : 1;
			}

			r /= 255;
			g /= 255;
			b /= 255;

			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			const l = (max + min) / 2;

			let h = 0;
			let s = 0;

			if(max !== min)
			{
				const d = max - min;

				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

				if(max === r)
				{
					h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
				}
				else if(max === g)
				{
					h = ((b - r) / d + 2) / 6;
				}
				else
				{
					h = ((r - g) / d + 4) / 6;
				}
			}

			return { h: h * 360, s: s * 100, l: l * 100, a };
		};

		const hslToRgba = (h, s, l, a) =>
		{
			h /= 360;
			s /= 100;
			l /= 100;

			let r, g, b;

			if(s === 0)
			{
				r = g = b = l;
			}
			else
			{
				const hue = (p, q, t) =>
				{
					if(t < 0) t += 1;
					if(t > 1) t -= 1;
					if(t < 1 / 6) return p + (q - p) * 6 * t;
					if(t < 1 / 2) return q;
					if(t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

					return p;
				};

				const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				const p = 2 * l - q;

				r = hue(p, q, h + 1 / 3);
				g = hue(p, q, h);
				b = hue(p, q, h - 1 / 3);
			}

			return 'rgba(' + Math.round(r * 255) + ', ' + Math.round(g * 255) + ', ' + Math.round(b * 255) + ', ' + a + ')';
		};

		this.colors = () =>
		{
			const colors = $ot.get('site').colors;
			let css = '';

			for(const [key, value] of Object.entries(colors))
			{
				const c = parse(value);

				if(!c)
				{
					continue;
				}

				const light = c.l > 50;
				const border = light ? c.l - 8 : c.l + 8;
				const hover = light ? c.l - 4 : c.l + 4;

				css += '--ot-' + key + ':' + value + ';';
				css += '--ot-' + key + '-border:' + hslToRgba(c.h, c.s, border, c.a) + ';';
				css += '--ot-' + key + '-opacity:' + hslToRgba(c.h, c.s, c.l, 0.12) + ';';
				css += '--ot-' + key + '-hover:' + hslToRgba(c.h, c.s, hover, c.a) + ';';
			}

			return css;
		};

		this.style = () =>
		{
			const scale = this.zoom / 100;

			return 'width: ' + this.width + 'px; transform: scale(' + scale + '); transform-origin: top center;' + this.colors();
		};

		this.On('@state.change', (key) =>
		{
			if(key === 'site')
			{
				this.Update();
			}
		});

		return `
			<div class="holder">
				<span ot-if="label" class="label">{{ label }} — {{ width }}px</span>
				<div class="frame" :style="style()">
					<div class="body">
						<slot name="content"></slot>
					</div>
				</div>
			</div>
		`;
	}
});
