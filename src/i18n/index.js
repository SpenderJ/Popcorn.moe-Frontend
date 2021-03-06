import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || (navigator.languages ? navigator.languages[0] : navigator.language),
  messages: {
    en: {
      route: {
        index: 'Index',
        search: 'Search',
        news: 'News',
        auth: {
          profile: 'Profile',
          library: 'Library',
          friends: 'Friends',
          settings: 'Settings',
          logout: 'Logout'
        }
      }
    },
    fr: {
      route: {
        index: 'Accueil',
        search: 'Rechercher',
        news: 'Nouveautés',
        auth: {
          profile: 'Profil',
          library: 'Librairie',
          friends: 'Amis',
          settings: 'Paramètres',
          logout: 'Se deconnecter'
        }
      }
    }
  },
  fallbackLocale: 'en'
})

export default i18n

export function isNull (val) {
  return val === null || val === undefined
}

function _translate(messages, locale, fallback, key, host, interpolateMode, args) {
  let res = this._interpolate(locale, messages[locale], key, host, interpolateMode, args)
  if (!isNull(res)) return res

  if (locale.indexOf('-') !== -1)
    return this._translate(messages, locale.split('-', 1)[0], fallback, key, host, interpolateMode, args)

  res = this._interpolate(fallback, messages[fallback], key, host, interpolateMode, args)
  if (!isNull(res)) {
    if (process.env.NODE_ENV !== 'production' && !this._silentTranslationWarn) {
      console.warn(`[vue-i18n] Fall back to translate the keypath '${key}' with '${fallback}' locale.`)
    }
    return res
  } else {
    return null
  }
}

Object.getPrototypeOf(i18n)._translate = _translate
