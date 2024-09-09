import AsyncStorage from '@react-native-async-storage/async-storage'

export async function save(key: string, value: Record<string, any> | string | number | any[]) {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value))
  }
  catch (error) {
    console.error(error)
  }
}

export async function fetch(key: string) {
  try {
    const getValue = await AsyncStorage.getItem(key)

    return getValue ? JSON.parse(getValue) : null
  }
  catch (error) {
    console.error(error)
    return null
  }
}

export async function remove(key: string) {
  try {
    return await AsyncStorage.removeItem(key)
  }
  catch (error) {
    console.error(error)
  }
}
