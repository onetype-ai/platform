onetype.AssetsRegister('platform', import.meta.url, {
    description: 'The platform front, its core, commands and the fronts of the core addons.',
    addon: 'platform',
    js: [
        '../../../front',
        '../../../addons/core/config/front',
        '../../../addons/core/packages/front',
        '../../../addons/modules/shortcuts/front',
        '../../../addons/modules/collaborators/front'
    ],
    css: [
        '../../../addons/core/config/front',
        '../../../addons/core/packages/front',
        '../../../addons/modules/shortcuts/front',
        '../../../addons/modules/collaborators/front'
    ]
});
