import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Logo from './Logo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import LogoSmall from './LogoSmall';

interface ScheduleItemProps {
    name: string,
    room: string,
    time: string
  }

const ScheduleItem = ({name,room,time}: ScheduleItemProps) => {
  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback>
            <View style={styles.button}>
                <LogoSmall/>
                <View style={styles.contentSchedule}>
                    <Text style={styles.textHeader}>{name}</Text>
                    <Text style={styles.textContent}>{room} _<Text style={styles.textContent}>{time}</Text></Text>
                </View>
                <MaterialIcons 
                    name="keyboard-arrow-right"
                    size={20}
                    color={Colors.LOGO_GREEN}
                    style={{position: 'absolute', right: 8}}
                />
            </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

export default ScheduleItem

const styles = StyleSheet.create({
    container: {
        
    },
    button: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_WHITE,
        shadowColor: Colors.LOGO_GREEN,
        shadowOpacity: 0.25,
        elevation: 4,
        borderRadius: 8,
        marginBottom: 32,
    },
    logo: {
        marginLeft: 16,
        marginRight: 20,
    },
    contentSchedule: {

    },
    textHeader: {
        color: Colors.LOGO_GREEN,
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 16,
    },
    textContent: {
        color: Colors.LOGO_GREEN,
        fontFamily: Fonts.ROBOTO_REGULAR,
        fontSize: 14,
    },
})