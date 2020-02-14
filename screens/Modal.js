import React from 'react'
import {Text, Button} from 'react-native'
import useFetch from '../hooks/useFetch'


export default ({ route, navigation }) => {
    const order = () => {
        fetch('https://serverless-5fu310drj.now.sh/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: route.params.id,
                user_id: 'yostin',
            })
        }).then( () => {
            alert('Su orden ha sido generada exitosamente!')
            navigation.navigate('Meals')
        })
    }

    const {loading, data} = useFetch(`https://serverless-5fu310drj.now.sh/api/meals/${route.params.id}`)
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