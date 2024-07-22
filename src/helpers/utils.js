// import cryptoRandomString from 'crypto-random-string';
// import isURL from 'validator/lib/isURL'
// import countries from './countries'

export function allPreviousStepsAreValid (activeStep, programAllSteps) {
  let invalidValidationStep
  let isOk = true
  const temp = programAllSteps.find(s => s.reference === activeStep.reference)
  const activeStepIndex = programAllSteps.indexOf(temp)
  for (let i = activeStepIndex - 1; i >= 0; i--) {
    if (programAllSteps[i].type === 'validation' && programAllSteps[i].status === "validated") {
      isOk = true
    } else if(programAllSteps[i].type === 'validation' && programAllSteps[i].status !== "validated") {
      isOk = false
      invalidValidationStep = programAllSteps[i]
      break;
    }
  }
  // console.log({ isOk, invalidValidationStepTitle: invalidValidationStep?.title ?? '' })
  return { isOk, invalidValidationStepTitle: invalidValidationStep?.title ?? '' }
}
// export function isActivePayPalOnboarding (activeUrl) {
//     const hasPermissionGranted = activeUrl.searchParams.has('permissionsGranted')
//     const merchantId = activeUrl.searchParams.has('merchantId')
//     const merchantIdInPayPal = activeUrl.searchParams.has('merchantIdInPayPal')

//   // return hasPermissionGranted && merchantId && merchantIdInPayPal;
//   return merchantId && merchantIdInPayPal;

// }
export const validSubDomain = (organizer = {}) => {
  if (Array.isArray(organizer.subDomains) && organizer.subDomains.length > 0) {
    return organizer.subDomains[0]
  }
  return organizer.defaultSubDomain
}

export const  randomColor = function () {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const hexToRgb = function (hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export const lightOrDark = function (color = '#FFFFFF') {

  // Variables for red, green, blue values
  let r, g, b

  // Check the format of the color, HEX or RGB?
  if (color.startsWith('rgb')) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)

    r = color[1]
    g = color[2]
    b = color[3]
  } else {
    const rgb = hexToRgb(color)
    if (!rgb) {
      throw new Error('Not valid color')
    }

    r = rgb.r
    g = rgb.g
    b = rgb.b
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  )

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 186) {
    return '#000000'
  } else {
    return '#FFFFFF'
  }
}

export const textToHtml = (text='') => {
  return String(text).replace(/\n/g,'<br/>').replace(/\r/,'<br/>')
}

// export const appendStyle = (styleContent, id) => {
//   const styleId = id || cryptoRandomString({ length: 10 })
//   const prev = document.querySelector(`#${styleId}`)

//   if (prev) {
//     prev.innerHTML = styleContent
//   } else {
//     const style = document.createElement('style')
//     style.type = 'text/css'
//     style.id = styleId
//     style.innerHTML = styleContent
//     document.getElementsByTagName('head')[0].appendChild(style)
//   }
// }

// export const buildAndGenerateStyle = (selector, design, deep = true) => {
//   const styleContent = generateStyle(selector, design, deep)
//   appendStyle(styleContent, '__auto-generated-style-' + selector.replace('.', '-').replace('#', '-'))
// }

export const symetricAssign = (obj1, obj2) => {
  const obj3 = { ...obj1, ...obj2 }

  for (const obj in obj3) {
    if (typeof obj3[obj] === 'string' && obj3[obj].trim().length === 0) {
      obj3[obj] = obj2[obj]
    }
  }

  return obj3
}

export const isObject = (x) => {
  if (x == null || typeof x !== 'object' || Array.isArray(x)) {
    return false
  }
  return true
}

export const isEmpty =(x) => {
  if (x == null || typeof x !== 'string' || x.trim() === "") {
    return true;
  }

  return false;
};

// export const isOauthAuthorizationQuery = (q) => {
//   return (
//     !isEmpty(q.client_id) &&
//     !isEmpty(q.state) &&
//     isURL(q.redirect_uri || '')
//   )
// }

export const isPdf = (url = '') => {
  const tab = url.split('?')[0].split('.')
  const _extension = tab[tab.length - 1]
  return ['pdf'].includes(
    _extension.toLowerCase()
  )
}

export const isAudio = (url = '') => {
  const tab = url.split('?')[0].split('.')
  const _extension = tab[tab.length - 1]
  return ["mp3", "wav", "aac", "m4a"].includes(
    _extension.toLowerCase()
  )
}

export const isVideo = (extension = '') => {
  const tab = extension.split('?')[0].split('.')
  const _extension = tab[tab.length - 1]
  return [
    'mp4',
    'avi',
    'mov',
    'qt',
    'wmv',
    'webm',
    'ogg',
    'flv'
  ].includes(_extension.toLowerCase())
}

// export function countriesByCode(code, lang = "fr") {

//   const countryMap = countries.reduce((acc, c) => ({
//     [c.cca2.toLowerCase()]: c,
//     ...acc,
//   }), {})
//   return countryMap[code]?.trans[lang]
// }

// export function allCountriesByCode(lang = "fr") {
//   const countryMap = countries.map((c) => {
//     return {name: countriesByCode(c.cca2.toLowerCase(), lang), code: c.cca2.toLowerCase()}
//   })
//   return countryMap
// }

export function addUrlProtocol(url) {
  if(url && url.indexOf('https://') == -1 && url.indexOf('http://') == -1){
    return 'https://' + url
  }
  return url
}

export function sleep(seconde) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, seconde * 1000)
  })
}

//size en byte
export function sizeConverter(size) {
  if (size < 1024) {
    return size +'bytes'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) +'KB'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) +'MB'
  } else {
    return (size / 1024 / 1024 / 1024).toFixed(2) +'GB'
  }
}

