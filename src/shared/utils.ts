import dayjs from 'dayjs'

export function timestampToDateString(time: number) {
  return dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss')
}

export function createLocalStorage<T>(name: string) {
  function set(data: T) {
    localStorage.setItem(name, JSON.stringify(data))
  }

  function get(): T | null {
    const data = localStorage.getItem(name)
    if (data) {
      try {
        return JSON.parse(data)
      } catch (e) {
        remove()
        return null
      }
    }
    return null
  }

  function remove() {
    localStorage.removeItem(name)
  }

  return { set, get, remove }
}
