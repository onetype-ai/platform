onetype.EmitRegister('platform.packages.enable', {
    description: 'Fires after a package is enabled on the instance. The package loads on the next boot.',
    addon: 'platform.packages',
    config: {
        slug: {
            type: 'string',
            description: 'Slug of the package that was enabled.'
        }
    }
});
