import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import { useNavigation } from '@react-navigation/native'

const GoBackHead = ({title}: {title:string}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <MaterialIcons 
                    name="keyboard-arrow-left"
                    size={32}
                    color={Colors.DARK_GRAY}
                    style={{position: 'absolute', left: 0}}
                />
            </TouchableWithoutFeedback>
            <Text style={styles.textHeader}>{title}</Text>
        </View>
    )
}

export default GoBackHead;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    textHeader: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 24,
        color: Colors.DARK_GRAY,
    },
})