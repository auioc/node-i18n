/**
 * Translation data
 * @example
 * {
 *     "hello": "Hello",
 *     // Positional parameters
 *     "greeting_pos": "Hello, {0}",
 *     // Named parameters
 *     "greeting_name": "Hello, {name}",
 *     // Singular or plural form
 *     "item": { "one": "Item", "other": "Items" },
 *     // The following two are equivalent
 *     "user.profile.title": "Profile",
 *     "user": { "profile": { "title": "Profile" } }
 * }
 */
export interface Translation {
    [key: string]: string | Translation;
}

/**
 * Convenient translation methods
 * @example
 * const t = i18n.t();
 * t('greeting', 'John');             // Positional parameters
 * t.t('greeting', 'John');           // Positional parameters
 * t.k('greeting', { name: 'John' }); // Named parameters
 * t.n('item', 5, 'param1');          // Plural + positional parameters
 * t.nk('item', 5, { key: 'value' }); // Plural + named parameters
 */
export interface Translate {
    (key: string, ...params: string[]): string;
    t(key: string, ...params: string[]): string;
    k(key: string, params?: Record<string, string>): string;
    n(key: string, count: number, ...params: string[]): string;
    nk(key: string, count: number, params?: Record<string, string>): string;
}
