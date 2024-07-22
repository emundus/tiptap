import frTranslations from '@/locales/fr.js'
import enTranslations from '@/locales/en.js'

export default {

    methods: {
        translate: function(namespace, locale) {
            const translations = {
                fr: frTranslations,
                en: enTranslations,
            }

            try {
                var translation = namespace.split('.').reduce(function(a, b, index) {
                    return typeof a === 'object' ? a[b] : translations[locale][a][b];
                });
            } catch(e) {
                console.warn('No translation found for namespace %s using locale %s (%s)', namespace, locale, e);
            }

            return translation;
        }
    }
}