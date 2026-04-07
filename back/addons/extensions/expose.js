import extensions from '#extensions/addon.js';

extensions.Expose({
    filter: ['id', 'name'],
    sort: ['name', 'order', 'updated_at', 'created_at'],
    select: [
        'id', 'name', 'slug', 'icon', 'description', 'config', 'categories', 'order', 'updated_at', 'created_at'
    ]
});
