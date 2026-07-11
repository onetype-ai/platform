import types from '../../types.js';

types.Item({ id: 'text', name: 'Text', icon: 'text_fields', group: 'text', type: 'string' });
types.Item({ id: 'richtext', name: 'Rich Text', icon: 'format_align_left', group: 'text', type: 'string', slot: false });
types.Item({ id: 'email', name: 'Email', icon: 'mail', group: 'text', type: 'string' });
types.Item({ id: 'url', name: 'URL', icon: 'link', group: 'text', type: 'string' });
types.Item({ id: 'phone', name: 'Phone', icon: 'call', group: 'text', type: 'string' });
types.Item({ id: 'color', name: 'Color', icon: 'palette', group: 'text', type: 'string' });
types.Item({ id: 'select', name: 'Select', icon: 'arrow_drop_down_circle', group: 'text', type: 'string' });
