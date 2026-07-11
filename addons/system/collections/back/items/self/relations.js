import types from '../../types.js';

types.Item({ id: 'reference', name: 'Reference', icon: 'link', group: 'relations', type: 'reference' });
types.Item({ id: 'multireference', name: 'Multi Reference', icon: 'dataset_linked', group: 'relations', type: 'array', slot: false });
types.Item({ id: 'user', name: 'User', icon: 'person', group: 'relations', type: 'reference' });
