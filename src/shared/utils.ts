import dayjs from 'dayjs'

export function timestampToDateString(time: number) {
  return dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss')
}
