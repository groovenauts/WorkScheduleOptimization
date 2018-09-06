import _ from 'lodash'

export const offset = (date, offset=0) => {
  let utc = date.getTime() + (date.getTimezoneOffset() * 60000)
  return new Date(utc + (3600000 * offset))
}

export const formatDate = (year, month, day) => {
  const yyyy = _.padStart(year, 4, '0')
  const mm = _.padStart(month, 2, '0')
  const dd = _.padStart(day, 2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const blue400 = '#42A5F5'
const pinkA100 = '#FF80AB'
const grey500 = '#9E9E9E'

const COLOR = {
  'M': blue400, //M (Male)
  'F': pinkA100, //F (Female)
  'U': grey500, //U (Unknown)
  'B': grey500, //B (Both)
}

export const getColor = gender => {
  if (_.isBoolean(gender)) {
    if (gender) {
      return COLOR.M
    } else {
      return COLOR.F
    }
  } else if (_.isInteger(gender)) {
    if (gender === 0) {
      return COLOR.F
    } else {
      return COLOR.M
    }
  } else if (_.isString(gender)) {
    if (/M|男/i.test(gender[0])) {
      return COLOR.M
    } else if (/F|女/i.test(gender[0])) {
      return COLOR.F
    }
  }
  return COLOR.U
}


export const randomString = (length, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
