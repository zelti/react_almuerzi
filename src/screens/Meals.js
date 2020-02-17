import React from 'react'
import {FlatList, Text} from 'react-native'
import Listitem from '../components/ListItem'
import useFetch from '../hooks/useFetch'

export default ({ navigation }) => {
    const {loading, data} = useFetch('https://serverless.yostinv.now.sh/api/meals')
    navigation.setOptions({title:'Almuerzos disponibles'});
    
    return (
        loading ? <Text>Cargando...</Text> :
        <FlatList 
            data={data} 
            keyExtractor={ item => item._id}
            renderItem={({ item }) => (
                <Listitem 
                    name={item.name}
                    onPress={()=> navigation.navigate('Modal', {id:item._id})} 
                /> 
            )}
        />
     
    )
}