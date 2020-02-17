import { AsyncStorage } from 'react-native'

export const userToken = async () => await AsyncStorage.getItem('userToken')
export const setUserToken = async (token) => await AsyncStorage.setItem('userToken', token)

