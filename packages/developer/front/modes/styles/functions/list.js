developer.Fn('styles.list', function()
{
	const groups = [
		['--ot-spacing', 'Spacing', 'blue'],
		['--ot-radius', 'Radius', 'blue'],
		['--ot-height', 'Sizing', 'blue'],
		['--ot-size', 'Typography', 'green'],
		['--ot-font', 'Typography', 'green'],
		['--ot-bg', 'Background', 'orange'],
		['--ot-text', 'Text', 'green'],
		['--ot-brand', 'Color', 'brand'],
		['--ot-blue', 'Color', 'brand'],
		['--ot-red', 'Color', 'brand'],
		['--ot-orange', 'Color', 'brand'],
		['--ot-green', 'Color', 'brand'],
		['--ot-transition', 'Motion', 'orange'],
		['--ot-blur', 'Effect', 'orange']
	];

	const classify = (token) =>
	{
		const match = groups.find(([prefix]) => token.startsWith(prefix));

		return match ? { group: match[1], groupColor: match[2] } : { group: 'Other', groupColor: 'blue' };
	};

	const kinds = [
		[/^ot-(container|grid|flex|gap|scrollbar)/, 'Layout', 'blue'],
		[/^ot-(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml)-/, 'Spacing', 'green'],
		[/^ot-(truncate|clamp)/, 'Text', 'orange'],
		[/blur/, 'Effect', 'brand']
	];

	const classifyClass = (name) =>
	{
		const match = kinds.find(([pattern]) => pattern.test(name));

		return match ? { group: match[1], groupColor: match[2] } : { group: 'Misc', groupColor: 'blue' };
	};

	const rows = [];
;

	const push = (kind, token, value, group, groupColor) =>
	{
		if(seen[token])
		{
			return;
		}

		seen[token] = true;
		rows.push({ kind, token, value, group, groupColor });
	};

	for(const sheet of document.styleSheets)
	{
		let rules = null;

		try
		{
			rules = sheet.cssRules;
		}
		catch(error)
		{
			continue;
		}

		for(const rule of rules ? rules : [])
		{
			if(rule.selectorText === ':root')
			{
				const names = rule.cssText.match(/--ot-[a-z0-9-]+(?=\s*:)/g);

				for(const property of names ? names : [])
				{
					const kind = classify(property);

					push('variable', 'var(' + property + ')', rule.style.getPropertyValue(property).trim(), kind.group, kind.groupColor);
				}
			}

			if(rule.selectorText && /^\.ot-[a-z0-9-]+$/.test(rule.selectorText) && !/^\.ot-(type|page|overlay)/.test(rule.selectorText))
			{
				const name = rule.selectorText.slice(1);
				const value = rule.style.cssText;
				const kind = classifyClass(name);

				push('class', name, value.length > 90 ? value.slice(0, 90) + '…' : value, kind.group, kind.groupColor);
			}
		}
	}

	return rows;
});
