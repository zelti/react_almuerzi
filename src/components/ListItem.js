import React from 'react'
import {TouchableOpacity, Text} from 'react-native'

export default ({ name, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Text>{name}</Text>
    </TouchableOpacity>
)