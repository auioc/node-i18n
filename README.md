# @auioc/i18n

Lightweight (~100 lines, <1KB) translation (i18n) module

[![License](https://img.shields.io/github/license/auioc/node-i18n?style=flat-square)](https://github.com/auioc/node-i18n/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/%40auioc%2Fi18n?style=flat-square&logo=npm)](https://www.npmjs.com/package/@auioc/i18n)
![NPM Package Size](https://img.shields.io/bundlejs/size/%40auioc/i18n?style=flat-square&label=size%20(gzip)&logo=npm)
[![GitHub Release](https://img.shields.io/github/v/release/auioc/node-i18n?style=flat-square&logo=github)](https://github.com/auioc/node-i18n/releases)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/auioc/node-i18n/dev-build.yml?style=flat-square&logo=github&label=dev%20build)](https://github.com/auioc/node-i18n/actions/workflows/dev-build.yml)

>[!NOTE]
> This module itself does not support loading translation files from the file system, the network, etc. Handle this on your own.

## Install

### Node.js

```sh
npm install @auioc/i18n
```

```typescript
import I18n from '@auioc/i18n';
const i18n = new I18n();
```

### Browser

#### IIFE

```html
<script src="https://unpkg.com/@auioc/i18n/dist/browser/i18n.js"></script>
<script>
    const i18n = new I18n();
</script>
```

#### ECMAScript module

```html
<script type="module">
    import I18n from "https://esm.sh/@auioc/i18n";
    // import I18n from "https://unpkg.com/@auioc/i18n/dist/index.js";
    const i18n = new I18n();
</script>
```

## Example

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
