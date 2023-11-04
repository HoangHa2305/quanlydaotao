import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

interface OptionMenuItemProps {
    name: string,
    icon: string,
    color:string
}

const OptionMenuItem = ({name, icon, color}: OptionMenuItemProps) => { 
  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback>
            <View style={[styles.button, {backgroundColor: color}]}>
                <MaterialCommunityIcons 
                    name={icon}
                    size={28}
                    color={Colors.DEFAULT_WHITE}
                />
            </View>
        </TouchableWithoutFeedback>
        <Text style={styles.textOption}>{name}</Text>
    </View>
  )
}

export default OptionMenuItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        width: 48,
        height: 48,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textOption: {
        fontSize: 14,
        fontFamily: Fonts.ROBOTO_MEDIUM,
        color: Colors.GRAY,
        marginTop: 12,
    },
})