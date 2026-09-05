# @auioc/i18n

Lightweight (~100 lines, <1KB) translation (i18n) module

>[!NOTE]
> This module itself does not support loading translation files from the file system, the network, etc. Handle this on your own.

## Install

```sh
npm install --save @auioc/i18n
```

## Examples

```json5
// en.json
{
    "hello": "Hello",
    // Positional parameters
    "greeting_1": "Hello, {0}",
    // Named parameters
    "greeting_2": "Hello, {name}",
    // Singular or plural form
    "item": { "one": "Item", "other": "Items" },
    // The following two are equivalent
    "user.profile.title": "Profile",
    "user": { "profile": { "title": "Profile" } }
}
```

```typescript
import I18n from '@auioc/i18n';

// This module itself does not support loading translation files
// from the file system, the network, etc.
// Handle this on your own.
import en from './i18n/en.json' with { type: 'json' };

const i18n = new I18n('en', en);

// Recommended: Use a convenient function object
const t = i18n.t();
t('hello');                          // "Hello"
t('greeting_1', 'John');             // "Hello, John"
t.t('greeting_1', 'John');           // "Hello, John"
t.k('greeting_2', { name: 'John' }); // "Hello, John"
t.n('item', 5);                      // "Items"
t.nk('item', 5);                     // "Items"

// Use the I18n instance methods directly
i18n.translate('hello');                         // "Hello"
i18n.translate('greeting', { name: 'John' });    // "Hello, John"
i18n.translatePlural('item', 1);                 // "Item"
i18n.translatePlural('item', 5);                 // "Items"
```

## TODO

- [ ] Improve docs

## Credits

- [AUIOC](https://www.auioc.com)
- [PCC-Studio](https://www.pccstudio.com)

## License

Package `@auioc/i18n` is licensed under the **MIT License**.
The full license is in the [LICENSE](/LICENSE) file.
