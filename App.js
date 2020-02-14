import React, {useMemo, useReducer} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import MealsScreen from './screens/Meals'
import ModalScreen from './screens/Modal' 
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register' 
import AuthContext from './context/AuthContext'


export default () => {
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const isAutenticated = false;

const [state, dispatch] = useReducer((prevState, action) => {

})

const authContext = useMemo(() => ({
  signIn: async data => {
    
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
        component={ isAutenticated ? MainStackScreen : AuthStackScreen}
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
