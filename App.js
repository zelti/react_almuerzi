import React, {useMemo, useReducer, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import MealsScreen from './src/screens/Meals'
import ModalScreen from './src/screens/Modal' 
import LoginScreen from './src/screens/Login'
import RegisterScreen from './src/screens/Register' 
import AuthContext from './src/context/AuthContext'
import { userToken, setUserToken } from './src/utilities/storage'

export default () => {
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const [state, dispatch] = useReducer((prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false
      }

    case 'SIGN_IN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false
      }
  }
},{
  isLoading: true,
  isSignout: false,
  userToken: null,
})

useEffect( () => {
  userToken()
    .then(token => {
      dispatch({ type: 'RESTORE_TOKEN', token: token })
    })
}, [])

const authContext = useMemo(() => ({
  signIn: token => {
    setUserToken(token)
    dispatch({ type: 'SIGN_IN', token });
  }
}), [])

const MainStackScreen = () =>(
  <MainStack.Navigator initialRouteName="Meals">
    <MainStack.Screen name="Meals" component={MealsScreen} />
  </MainStack.Navigator>
);

const AuthStackScreen = () => (
  <MainStack.Navigator initialRouteName="Login" >
    <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <MainStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  </MainStack.Navigator>
)

const RootStackScreen = () => (
  <AuthContext.Provider value={authContext}>
    <RootStack.Navigator mode="modal" >
      <RootStack.Screen
        name="Main"
        component={ state.userToken === null ? AuthStackScreen : MainStackScreen } 
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Modal" component={ModalScreen} />
    </RootStack.Navigator>
  </AuthContext.Provider>
)

  return (
    <NavigationContainer>
          {RootStackScreen()}
    </NavigationContainer>
  )
}
