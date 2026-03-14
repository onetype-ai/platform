elements.ItemAdd({
	id: 'sites-survey',
	icon: 'quiz',
	name: 'Site Survey',
	description: 'Multi-step survey for creating a new site.',
	category: 'Sites',
	author: 'OneType',
	render: function()
	{
		this.step = 0;
		this.total = 8;
		this.error = '';
		this.categories = [];

		this.form = {
			name: '',
			category: '',
			description: '',
			assets: [],
			color: '#E27055',
			fonts: [],
			extensions: [],
			method: 'ai'
		};

		this.colors = [
			'#E27055', '#3B82F6', '#8B5CF6', '#EC4899',
			'#F59E0B', '#10B981', '#06B6D4', '#EF4444',
			'#6366F1', '#14B8A6', '#F97316', '#84CC16'
		];

		this.methods = [
			{ icon: 'auto_awesome', label: 'AI generates my site', description: 'We\'ll build your entire site based on your answers.', value: 'ai' },
			{ icon: 'palette', label: 'Pick a theme', description: 'Choose a pre-built theme and customize it.', value: 'theme' },
			{ icon: 'code', label: 'Start from scratch', description: 'Empty canvas. Full control.', value: 'manual' }
		];

		this.steps = [
			{ title: 'Your website, ready in minutes', description: 'Answer a few questions and we\'ll handle the rest. No code, no complexity.' },
			{ title: 'Name your site', description: 'What should we call your website?' },
			{ title: 'Pick your colors', description: 'Choose a brand color. We\'ll build your entire palette from it.' },
			{ title: 'What type of site?', description: 'Pick a category that best describes your project.' },
			{ title: 'Describe your vision', description: 'Tell us what you want. Pages, features, style - the more detail, the better.' },
			{ title: 'Upload assets', description: 'Logo, images, brand files - anything you have ready.' },
			{ title: 'Choose your fonts', description: 'Pick up to 2 typefaces for your site.' },
			{ title: 'Extensions', description: 'What else should your site include?' },
			{ title: 'How should we build it?', description: 'Choose how you want to create your site.' }
		];

		/* Load data */

		categories.Find().sort('order', 'asc').many().then(items =>
		{
			this.categories = items.map(item => item.data);
		});

		this.changeFonts = ({ value }) =>
		{
			this.form.fonts = value;
		};

		this.changeExtensions = ({ value }) =>
		{
			this.form.extensions = value;
		};

		/* Actions */

		this.validate = () =>
		{
			if(this.step === 1 && !this.form.name.trim()) return 'Please enter a site name.';
			if(this.step === 3 && !this.form.category) return 'Please pick a category.';
			if(this.step === 4 && !this.form.description.trim()) return 'Please describe your vision.';

			return '';
		};

		this.next = () =>
		{
			const message = this.validate();

			if(message)
			{
				this.error = message;
				return;
			}

			this.error = '';
			if(this.step < this.total) this.step++;
		};

		this.prev = () =>
		{
			this.error = '';
			if(this.step > 0) this.step--;
		};

		this.pick = (field, value) =>
		{
			this.form[field] = value;
			this.Update();
		};

		this.change = (field, { value }) =>
		{
			this.form[field] = value;
		};

		this.changeColor = ({ value }) =>
		{
			this.form.color = value;
			this.Update();
		};

		this.submit = async () =>
		{
			if(!this.form.method)
			{
				this.error = 'Please choose a build method.';
				return;
			}

			this.error = '';

			const category = this.categories.find(item => item.slug === this.form.category);

			const result = await commands.Fn('api', 'sites:create', {
				name: this.form.name,
				category_id: category ? category.id : null,
				description: this.form.description,
				color: this.form.color,
				font_ids: this.form.fonts.map(font => font.id),
				extension_ids: this.form.extensions.map(item => item.id),
				method: this.form.method
			});

			if(result.error)
			{
				this.error = result.error;
				return;
			}

			$ot.page('/site/' + result.data.site.id);
		};

		return `
			<div class="holder">
				<div class="glow" :style="'--glow-color: ' + form.color"></div>

				<div class="progress">
					<div class="bar" :style="'width: ' + ((step + 1) / (total + 1) * 100) + '%'"></div>
				</div>

				<div class="header">
					<span class="counter">{{ step + 1 }} / {{ total + 1 }}</span>
					<h2 class="title">{{ steps[step].title }}</h2>
					<p class="description">{{ steps[step].description }}</p>
				</div>

				<div class="body">

					<div ot-if="step === 0" class="panel">
						<e-form-button text="Get Started" icon="arrow_forward" :variant="['brand', 'size-m']" :_click="next"></e-form-button>
					</div>

					<div ot-if="step === 1" class="panel">
						<e-form-input :value="form.name" placeholder="My Awesome Site" :variant="['bg-3', 'border', 'size-l']" :_input="(data) => change('name', data)"></e-form-input>
					</div>

					<div ot-if="step === 2" class="panel">
						<div class="swatches">
							<div ot-for="color in colors" :class="'swatch' + (form.color === color ? ' active' : '')" :style="'--swatch: ' + color" ot-click="pick('color', color)">
								<i ot-if="form.color === color">check</i>
							</div>
						</div>
						<div class="color-input">
							<div class="color-preview" :style="'background: ' + form.color"></div>
							<e-form-input :value="form.color" placeholder="#E27055" :variant="['bg-3', 'border', 'size-m']" :_input="changeColor"></e-form-input>
						</div>
					</div>

					<div ot-if="step === 3" class="panel">
						<div class="grid">
							<div ot-for="category in categories" :class="'option' + (form.category === category.slug ? ' active' : '')" ot-click="pick('category', category.slug)">
								<i class="icon">{{ category.icon }}</i>
								<span class="label">{{ category.name }}</span>
							</div>
						</div>
					</div>

					<div ot-if="step === 4" class="panel">
						<e-form-textarea :value="form.description" placeholder="I want a portfolio site with a homepage, about page, projects gallery, and a contact form. Clean and minimal style, dark theme preferred." :variant="['bg-3', 'size-l']" :rows="6" :_input="(data) => change('description', data)"></e-form-textarea>
					</div>

					<div ot-if="step === 5" class="panel">
						<div class="upload">
							<i class="upload-icon">cloud_upload</i>
							<p class="upload-text">Drag & drop files here</p>
							<p class="upload-hint">or click to browse - PNG, JPG, SVG, PDF</p>
						</div>
					</div>

					<div ot-if="step === 6" class="panel">
						<e-fonts-browse :selected="form.fonts" :max="2" :_change="changeFonts"></e-fonts-browse>
					</div>

					<div ot-if="step === 7" class="panel">
						<e-extensions-browse :selected="form.extensions" :_change="changeExtensions"></e-extensions-browse>
					</div>

					<div ot-if="step === 8" class="panel">
						<div class="methods">
							<div ot-for="method in methods" :class="'method' + (form.method === method.value ? ' active' : '')" ot-click="pick('method', method.value)">
								<i class="method-icon">{{ method.icon }}</i>
								<div class="method-text">
									<span class="method-label">{{ method.label }}</span>
									<span class="method-description">{{ method.description }}</span>
								</div>
							</div>
						</div>
					</div>

				</div>

				<e-global-notice ot-if="error" icon="warning" :text="error" :variant="['red']"></e-global-notice>

				<div class="footer">
					<e-form-button ot-if="step > 0" text="Back" icon="arrow_back" :variant="['ghost', 'size-m']" :_click="prev"></e-form-button>
					<div ot-if="step === 0" class="spacer"></div>
					<e-form-button ot-if="step > 0 && step < total" text="Continue" iconRight="arrow_forward" :variant="['brand', 'size-m']" :_click="next"></e-form-button>
					<e-form-button ot-if="step === total" text="Create Site" icon="rocket_launch" :variant="['brand', 'size-m']" :_click="submit"></e-form-button>
				</div>
			</div>
		`;
	}
});
