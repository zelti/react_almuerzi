import React from 'react'
import {Text, Button} from 'react-native'
import useFetch from '../hooks/useFetch'
import {userToken} from '../utilities/storage'
export default ({ route, navigation }) => {

    const order = async () => {
        const token = await userToken()
        console.log(token)
        fetch('https://serverless.yostinv.now.sh/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization':  token
            },
            body: JSON.stringify({
                meal_id: route.params.id,
            })
        }).then( (res)  => {
            alert('Su orden ha sido generada exitosamente!')
            navigation.navigate('Meals')
        })
    }

    const {loading, data} = useFetch(`https://serverless.yostinv.now.sh/api/meals/${route.params.id}`)
    return  (
        loading ? <Text>Cargando...</Text> :
        <>
            <Text>{data.name}</Text>
            <Text>{data.desc}</Text>
            <Button title="Ordenar" onPress={ () => order() }/>
            <Button title="Cancelar" onPress={()=>navigation.navigate('Meals')}/>

        </>
    )
}