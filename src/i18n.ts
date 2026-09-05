import type { Translate, Translation } from './types';
import { arrayToIndexedObject as a2o, getNestedValue } from './utils';

const _dummyTranslate = (k: string) => k;

const dummyTranslate: Translate = Object.assign((k: string) => k, {
    t: _dummyTranslate,
    k: _dummyTranslate,
    n: _dummyTranslate,
    nk: _dummyTranslate,
});

const defaultLocale = 'en_US';

export default class I18n {
    private readonly translations: Map<string, Translation> = new Map();
    private locate: string;
    private _t?: Translate;

    /**
     * Creates an {@linkcode I18n} instance
     * @param locale Initial locale setting, defaults to `en_US`
     * @param translation Initial translation data, will be loaded automatically if provided
     */
    constructor(locale = defaultLocale, translation?: Translation) {
        this.locate = locale;
        if (translation) {
            this.load(locale, translation);
        }
    }

    /**
     * Loads translation data for a specific locale
     * @param locale Locale identifier (e.g., 'en', 'zh-CN')
     * @param translation Translation data for the locale
     */
    load(locale: string, translation: Translation) {
        this.translations.set(locale, translation);
    }

    /**
     * Sets the current active locale
     * @param locale Locale identifier to switch to
     * @throws {Error} Throws an error if translations for the specified locale are not loaded
     */
    setLocale(locale: string): void {
        if (!this.translations.has(locale)) {
            throw new Error(`Translations for locale "${locale}" not loaded`);
        }
        this.locate = locale;
    }

    /**
     * Gets the current locale setting
     * @returns The current locale identifier
     */
    getLocale(): string {
        return this.locate;
    }

    /**
     * Translates the specified key
     * Searches in the current locale first, falls back to the default locale if not found
     * @param key Translation key, supports dot-notation for nested keys (e.g., 'user.name')
     * @param params Optional interpolation parameters object
     * @returns Translated text, or the original key if no translation is found
     * @example
     * // Basic translation
     * i18n.translate('hello'); // Returns "Hello"
     *
     * // Translation with parameters
     * i18n.translate('greeting', { name: 'John' }); // Returns "Hello, John"
     *
     * // Nested key
     * i18n.translate('user.profile.title'); // Returns "Profile"
     */
    translate(key: string, params?: Record<string, string>): string {
        let result = this.get(key, this.locate);

        if (result === undefined && this.locate !== defaultLocale) {
            result = this.get(key, defaultLocale);
        }

        if (result === undefined) {
            return key;
        }

        if (typeof result === 'string' && params) {
            result = this.interpolate(result, params);
        }

        return result;
    }

    /**
     * Translates plural form keys
     * Automatically selects singular or plural form based on count
     * @param key Base translation key
     * @param count Count used to determine singular or plural form
     * @param params Optional interpolation parameters object
     * @returns Translated text
     * @example
     * // Singular form
     * i18n.translatePlural('item', 1); // Uses 'item.one' key
     *
     * // Plural form
     * i18n.translatePlural('item', 5); // Uses 'item.other' key
     */
    translatePlural(
        key: string,
        count: number,
        params?: Record<string, string>
    ) {
        if (count !== undefined) {
            if (count === 1) {
                key = `${key}.one`;
            } else {
                key = `${key}.other`;
            }
        }

        return this.translate(key, params);
    }

    /**
     * Creates a function object provides multiple convenient translation methods
     * @returns Function object with multiple translation methods, see {@linkcode Translate}
     * @example
     * const t = i18n.t();
     * t('greeting', 'John');             // Positional parameters
     * t.t('greeting', 'John');           // Positional parameters
     * t.k('greeting', { name: 'John' }); // Named parameters
     * t.n('item', 5, 'param1');          // Plural + positional parameters
     * t.nk('item', 5, { key: 'value' }); // Plural + named parameters
     */
    t(): Translate {
        if (!this._t) {
            const t0 = (key: string, ...params: string[]) => {
                return this.translate(key, a2o(params));
            };
            this._t = Object.assign(t0, {
                t: t0,
                k: (key: string, params?: Record<string, string>) => {
                    return this.translate(key, params);
                },
                n: (key: string, count: number, ...params: string[]) => {
                    return this.translatePlural(key, count, a2o(params));
                },
                nk: (
                    key: string,
                    count: number,
                    params?: Record<string, string>
                ) => {
                    return this.translatePlural(key, count, params);
                },
            });
        }
        return this._t;
    }

    private get(key: string, locale: string): string | undefined {
        const translations = this.translations.get(locale);
        if (!translations) return undefined;

        let result: any;
        result = translations[key];
        if (typeof result !== 'string') {
            result = getNestedValue(translations, key.split('.'));
        }

        return typeof result === 'string' ? result : undefined;
    }

    private interpolate(text: string, params: Record<string, string>): string {
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            return params[key] !== undefined ? String(params[key]) : match;
        });
    }

    // ====================================================================== //

    /**
     * Creates a dummy {@linkcode Translate} function object with all methods that just return the original translation key
     * @example
     * const t = I18n.dummy();
     * t('greeting');    // Returns "greeting"
     */
    static dummy() {
        return dummyTranslate;
    }
}
