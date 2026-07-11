import onetype from '@onetype/framework';

const entries = onetype.Addon('collections.entries', (addon) =>
{
	addon.Table('entries');

	addon.Schema('id bigserial');
	addon.Schema('collection bigint not null');
	addon.Schema('t1 text');
	addon.Schema('t2 text');
	addon.Schema('t3 text');
	addon.Schema('n1 numeric');
	addon.Schema('n2 numeric');
	addon.Schema('d1 timestamptz');
	addon.Schema('r1 bigint');
	addon.Schema('r2 bigint');
	addon.Schema('b1 boolean');
	addon.Schema('fts tsvector');
	addon.Schema('data jsonb');
	addon.Schema('created_at timestamptz');
	addon.Schema('updated_at timestamptz');
	addon.Schema('deleted_at timestamptz');
	addon.Schema('primary key (collection, id)');
	addon.Schema('partition by list (collection)');
	addon.Schema('index using gin (data)');
});

export default entries;
