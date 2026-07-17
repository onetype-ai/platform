onetype.AddonReady('elements', (elements) =>
{
	/* ===== GRAMMARS ===== */

	const LANG_JS = {
		keywords: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|this|typeof|instanceof|in|of|try|catch|finally|throw|async|await|import|from|export|default|null|undefined|true|false|void|delete|yield|static)\b/g,
		comment: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
		string: /(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|&quot;(?:(?!&quot;)[^\\]|\\.)*&quot;)/g,
		number: /\b(\d+(\.\d+)?)\b/g,
		fn: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g
	};

	const LANG_CSS = {
		comment: /(\/\*[\s\S]*?\*\/)/g,
		string: /(&quot;(?:(?!&quot;)[^\\]|\\.)*&quot;|'(?:[^'\\]|\\.)*')/g,
		selector: /([.#]?[a-zA-Z_-][\w-]*(?:\s*[>+~]\s*[.#]?[a-zA-Z_-][\w-]*)*)(?=\s*\{)/g,
		prop: /([a-zA-Z-]+)(?=\s*:)/g,
		number: /\b(\d+(\.\d+)?(px|em|rem|vh|vw|%|s|ms)?)\b/g
	};

	const LANG_HTML = {
		comment: /(&lt;!--[\s\S]*?--&gt;)/g,
		tag: /(&lt;\/?)([a-zA-Z][\w-]*)/g,
		attr: /(\s)([a-zA-Z-:@_.]+)(?==)/g,
		string: /(=)(&quot;[^&]*&quot;|'[^']*')/g
	};

	const LANG_CURL = {
		comment: /(#[^\n]*)/g,
		string: /(&quot;(?:(?!&quot;)[^\\]|\\.)*&quot;|'(?:[^'\\]|\\.)*')/g,
		url: /(https?:\/\/[^\s'&]+)/g,
		method: /(-X\s+)(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)/g,
		variable: /(\$\w+|\$\{[^}]+\})/g,
		flag: /(\s)(-{1,2}[\w-]+)/g,
		command: /^(\s*)(curl|http|wget)\b/gm
	};

	/* ===== HELPERS ===== */

	const escape = (text) =>
	{
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	};

	const toKey = (n) =>
	{
		const map = 'abcdefghij';
		return String(n).split('').map((d) => map[parseInt(d)]).join('');
	};

	const fromKey = (key) =>
	{
		const map = 'abcdefghij';
		return parseInt(key.split('').map((c) => map.indexOf(c)).join(''));
	};

	const stash = (placeholders, html) =>
	{
		const index = placeholders.length;
		placeholders.push(html);
		return '\u0001' + toKey(index) + '\u0002';
	};

	const unstash = (code, placeholders) =>
	{
		return code.replace(/\u0001([a-j]+)\u0002/g, (m, key) => placeholders[fromKey(key)]);
	};

	/* ===== TOKENIZERS ===== */

	const tokenizeJs = (code) =>
	{
		const ph = [];

		code = code.replace(LANG_JS.comment, (m) => stash(ph, '<span class="t-comment">' + m + '</span>'));
		code = code.replace(LANG_JS.string, (m) => stash(ph, '<span class="t-string">' + m + '</span>'));
		code = code.replace(LANG_JS.keywords, '<span class="t-keyword">$1</span>');
		code = code.replace(LANG_JS.number, '<span class="t-number">$1</span>');
		code = code.replace(LANG_JS.fn, '<span class="t-fn">$1</span>');

		return unstash(code, ph);
	};

	const tokenizeCss = (code) =>
	{
		const ph = [];

		code = code.replace(LANG_CSS.comment, (m) => stash(ph, '<span class="t-comment">' + m + '</span>'));
		code = code.replace(LANG_CSS.string, (m) => stash(ph, '<span class="t-string">' + m + '</span>'));
		code = code.replace(LANG_CSS.selector, (m) => stash(ph, '<span class="t-fn">' + m + '</span>'));
		code = code.replace(LANG_CSS.prop, '<span class="t-keyword">$1</span>');
		code = code.replace(LANG_CSS.number, '<span class="t-number">$1</span>');

		return unstash(code, ph);
	};

	const tokenizeHtml = (code) =>
	{
		const ph = [];

		code = code.replace(LANG_HTML.comment, (m) => stash(ph, '<span class="t-comment">' + m + '</span>'));
		code = code.replace(LANG_HTML.string, (m, eq, value) => eq + stash(ph, '<span class="t-string">' + value + '</span>'));
		code = code.replace(LANG_HTML.attr, '$1<span class="t-fn">$2</span>');
		code = code.replace(LANG_HTML.tag, '$1<span class="t-keyword">$2</span>');

		return unstash(code, ph);
	};

	const tokenizeCurl = (code) =>
	{
		const ph = [];

		code = code.replace(LANG_CURL.comment, (m) => stash(ph, '<span class="t-comment">' + m + '</span>'));
		code = code.replace(LANG_CURL.string, (m) => stash(ph, '<span class="t-string">' + m + '</span>'));
		code = code.replace(LANG_CURL.url, (m) => stash(ph, '<span class="t-url">' + m + '</span>'));
		code = code.replace(LANG_CURL.method, (m, flag, method) => flag + stash(ph, '<span class="t-number">' + method + '</span>'));
		code = code.replace(LANG_CURL.variable, '<span class="t-number">$1</span>');
		code = code.replace(LANG_CURL.flag, '$1<span class="t-fn">$2</span>');
		code = code.replace(LANG_CURL.command, '$1<span class="t-keyword">$2</span>');

		return unstash(code, ph);
	};

	const tokenize = (code, language) =>
	{
		const escaped = escape(code);

		const map = {
			js: tokenizeJs,
			html: tokenizeHtml,
			css: tokenizeCss,
			curl: tokenizeCurl
		};

		const fn = map[language];

		return fn ? fn(escaped) : escaped;
	};

	const parseHighlight = (value) =>
	{
		if(!value)
		{
			return [];
		}

		const lines = [];

		value.split(',').forEach((part) =>
		{
			const range = part.split('-').map((n) => parseInt(n.trim()));

			if(range.length === 2)
			{
				for(let i = range[0]; i <= range[1]; i++)
				{
					lines.push(i);
				}
			}
			else if(!isNaN(range[0]))
			{
				lines.push(range[0]);
			}
		});

		return lines;
	};

	elements.ItemAdd({
		id: 'global-code',
		icon: 'code',
		name: 'Code',
		description: 'Code block with syntax highlighting for JavaScript, HTML, CSS and cURL, a copy button, line numbers and line highlights.',
		category: 'Global',
		collection: 'Home',
		author: 'OneType',
		config: {
			source: {
				type: 'string',
				value: "const packages = onetype.Addon('packages');\n\n// Every package is an addon with a manifest\npackages.Fn('scan');",
				description: 'Raw code string.'
			},
			language: {
				type: 'string',
				value: 'js',
				options: ['js', 'html', 'css', 'curl', 'text'],
				description: 'Syntax language. Text renders without highlighting.'
			},
			filename: {
				type: 'string',
				description: 'Filename in the header. Replaces the language label.'
			},
			lines: {
				type: 'boolean',
				value: false,
				description: 'Show line numbers.'
			},
			highlight: {
				type: 'string',
				description: 'Lines to highlight while line numbers are on, like 2,4-6.'
			},
			copy: {
				type: 'boolean',
				value: true,
				description: 'Show the copy button.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the code surface from 1 to 3. 0 renders transparent, without background or borders.'
			}
		},
		render: function()
		{
			this.copied = false;

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				const raw = this.source.replace(/^\n+|\n+$/g, '');
				const highlighted = tokenize(raw, this.language);
				const marks = parseHighlight(this.highlight);

				if(this.lines)
				{
					this.output = '<div class="numbered">' + highlighted.split('\n').map((line, index) =>
					{
						const number = index + 1;
						const cls = 'line' + (marks.includes(number) ? ' marked' : '');

						return '<div class="' + cls + '"><span class="number">' + number + '</span><span class="code">' + (line ? line : ' ') + '</span></div>';
					}).join('') + '</div>';
				}
				else
				{
					this.output = '<span class="plain">' + highlighted + '</span>';
				}
			});

			/* ===== HANDLERS ===== */

			this.grab = () =>
			{
				const text = this.source.replace(/^\n+|\n+$/g, '');

				if(navigator.clipboard && text)
				{
					navigator.clipboard.writeText(text);
				}

				this.copied = true;

				setTimeout(() =>
				{
					this.copied = false;
				}, 1800);
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="'box bg-' + background">
					<div class="head">
						<div class="dots"><span></span><span></span><span></span></div>
						<div ot-if="filename" class="filename">{{ filename }}</div>
						<div ot-if="!filename" class="language">{{ language }}</div>
						<button ot-if="copy" :class="copied ? 'copy copied' : 'copy'" type="button" ot-click="grab">
							<i>{{ copied ? 'check' : 'content_copy' }}</i>
							<span>{{ copied ? 'Copied' : 'Copy' }}</span>
						</button>
					</div>
					<pre class="body"><code ot-html="output"></code></pre>
				</div>
			`;
		}
	});
});
