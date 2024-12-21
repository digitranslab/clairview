import { Contact } from 'src/modules/contact-creation-manager/types/contact.type';
import { getUniqueContactsAndHandles } from 'src/modules/contact-creation-manager/utils/get-unique-contacts-and-handles.util';

describe('getUniqueContactsAndHandles', () => {
  it('should return empty arrays when contacts is empty', () => {
    const contacts: Contact[] = [];
    const result = getUniqueContactsAndHandles(contacts);

    expect(result.uniqueContacts).toEqual([]);
    expect(result.uniqueHandles).toEqual([]);
  });

  it('should return unique contacts and handles', () => {
    const contacts: Contact[] = [
      { handle: 'john@clairview.io', displayName: 'John Doe' },
      { handle: 'john@clairview.io', displayName: 'John Doe' },
      { handle: 'jane@clairview.io', displayName: 'Jane Smith' },
      { handle: 'jane@clairview.io', displayName: 'Jane Smith' },
      { handle: 'jane@clairview.io', displayName: 'Jane Smith' },
    ];
    const result = getUniqueContactsAndHandles(contacts);

    expect(result.uniqueContacts).toEqual([
      { handle: 'john@clairview.io', displayName: 'John Doe' },
      { handle: 'jane@clairview.io', displayName: 'Jane Smith' },
    ]);
    expect(result.uniqueHandles).toEqual([
      'john@clairview.io',
      'jane@clairview.io',
    ]);
  });
});
