shortcuts.FnExpose('format', function(key)
{
	const map = {
		meta: '⌘',
		ctrl: 'Ctrl',
		alt: 'Alt',
		shift: 'Shift',
		escape: 'Esc',
		delete: '⌫',
		backspace: '⌫',
		enter: '↵',
		tab: '⇥',
		space: 'Space',
		arrowup: '↑',
		arrowdown: '↓',
		arrowleft: '←',
		arrowright: '→'
	};

	return key.split('+').map((part) => map[part] || part.toUpperCase()).join(' ');
});
