onetype.AddonReady('sites.pages', () =>
{
    sites.pages.Item({ id: 'p1', title: 'Home', slug: '/', order: 0 });
    sites.pages.Item({ id: 'p2', title: 'About', slug: '/about', order: 1 });
    sites.pages.Item({ id: 'p3', title: 'Services', slug: '/services', order: 2 });
    sites.pages.Item({ id: 'p4', title: 'Contact', slug: '/contact', order: 3 });
});
