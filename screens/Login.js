import React from 'react'
import {Text,TextInput, View, StyleSheet, Button} from 'react-native'

export default ({ navigation }) => {
    navigation.setOptions({ title:''})
    return (
        <View style={styles.container}>
            <Text style={styles.title} >Inicie Sesion</Text>
            <TextInput style={styles.input} placeholder='Email' textContentType='emailAddress' />
            <TextInput style={styles.input} placeholder='Contraseña' textContentType='password' secureTextEntry={true}/>
            
            <View style={styles.button_wrap}>
                <View style={styles.button}>
                    <Button  title='Iniciar' onPress={() => {}} />
                </View>
                <View style={styles.button}>
                    <Button title='Registrar' onPress={() => navigation.navigate('Register') } />
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