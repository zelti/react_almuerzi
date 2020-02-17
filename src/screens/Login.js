import React,{useContext, useState} from 'react'
import {Text,TextInput, View, StyleSheet, Button, Alert, ActivityIndicator} from 'react-native'
import useForm from '../hooks/useForm'
import AuthContext from '../context/AuthContext'

export default ({ navigation }) => {

    const initialState = {
        email:'',
        password:''
    }
    const [loading, setLoading] = useState(false)

    const { signIn } = useContext(AuthContext)

    const onSubmit = (values) => {
        setLoading(true)
        fetch('https://serverless.yostinv.now.sh/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.text())
        .then(res => {
            if( res === 'usuario y/o contraseña incorrecta'){
                Alert.alert('Error', res)
                setLoading(false)
            }else{
                signIn(JSON.parse(res).token)             
            }
        })
    }

    const { subscribe, handleSubmit, inputs } = useForm(initialState, onSubmit)

    return (
        <View style={styles.container}>
            {loading 
            ? <>
                <Text style={styles.title}> Validando...</Text> 
                <ActivityIndicator size="large" color="#0000ff" />
             </>
            
            : <>
                <Text style={styles.title} >Inicie Sesion</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Email' 
                    textContentType='emailAddress' 
                    value={inputs.email}
                    onChangeText={subscribe('email')}
                    autoCapitalize="characters"
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Contraseña'
                    textContentType='password'
                    secureTextEntry={true}
                    value={inputs.password}
                    onChangeText={subscribe('password')}
                    autoCapitalize="none"
                />
                <View style={styles.button_wrap}>
                    <View style={styles.button}>
                        <Button  title='Iniciar' onPress={handleSubmit} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Registrar' onPress={() => navigation.navigate('Register') } />
                    </View>
                </View>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        alignSelf: 'stretch',
        marginBottom: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 28,
        marginBottom: 40
    },
    button_wrap: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '40%',
    }
})