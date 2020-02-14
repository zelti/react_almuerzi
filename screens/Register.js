import React from 'react'
import {Text,TextInput, View, StyleSheet, Button, Alert} from 'react-native'
import useForm from '../hooks/useForm'

export default ({ navigation }) => {
    
    const initialState = {
        email:'',
        password:''
    }

    const onSubmit = (values) => {
        fetch('https://serverless.yostinv.now.sh/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.text())
        .then(res => {
            if( res === 'usuario creado con éxito'){
                return Alert.alert(
                    'Exito', 
                    res, 
                    [
                        { text: 'Ir al inicio', onPress: () => navigation.navigate('Login') }
                    ]
                    
                )
            }

            Alert.alert('Error', res)
        })
    }

    const { subscribe, handleSubmit, inputs } = useForm(initialState, onSubmit)


    return (
        <View style={styles.container}>
            <Text style={styles.title} >Registro</Text>
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
                    <Button  title='Enviar' onPress={handleSubmit} />
                </View>
                <View style={styles.button}>
                    <Button title='Volver al inicio' onPress={() => navigation.navigate('Login') } />
                </View>
            </View>
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