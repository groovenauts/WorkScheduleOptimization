import _ from 'lodash'

export const formatDate = (year, month, day) => {
  const yyyy = _.padStart(year, 4, '0')
  const mm = _.padStart(month, 2, '0')
  const dd = _.padStart(day, 2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export const randomString = (length, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
