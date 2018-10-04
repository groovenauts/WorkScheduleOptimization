import _ from 'lodash'
import ja from './ja';
import en from './en';

const DEFAULT_LANG = 'ja'

const i18n = {
  ja: ja,
  en: en,
}

let currentLang = (function() {
  let laungage = _.get(location.search.match(/hl=(.*?)(&|$)/), 1)
  // if (!laungage) {
  //   laungage = (
  //     (window.navigator.languages && window.navigator.languages[0]) ||
  //     window.navigator.language ||
  //     window.navigator.userLanguage ||
  //     window.navigator.browserLanguage
  //   )
  //   // For 'window.navigator.browserLanguage'
  //   laungage = (laungage || "").substr(0, 2)
  // }
  return laungage || DEFAULT_LANG
}());

const getLanguage = () => currentLang;

const setLanguage = (language=DEFAULT_LANG) => {
  console.info("set language: ", language)
  currentLang = language
}

const t = (key, templateParams={}) => {
  if (i18n[currentLang]) {
    const message = _.get(i18n[currentLang], key)
    // Support template string using _.template
    if (_.isFunction(message)) {
      return message(templateParams)
    } else {
      return message
    }
  } else {
    return key
  }
}

export {
  getLanguage,
  setLanguage,
  t as default,
}