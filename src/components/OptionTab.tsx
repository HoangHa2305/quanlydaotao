import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import Display from '../utils/Display';

const sizeIcon = 36
const colorIcon = Colors.SECONDARY_GRAY
const colorIconFocused = Colors.LOGO_GREEN

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'relative' as 'relative',
        bottom: 16,
        left:  16, 
        right: 16,
        // elevation: 0,
        height: Display.setHeight(8),
        borderRadius: 16,
        backgroundColor: Colors.DEFAULT_WHITE,
        shadowColor: Colors.LOGO_GREEN,
        elevation: 4,
    } 
}

const homeOptions = {
    tabBarIcon: ({focused}: {focused:boolean}) => {
        return (
            <View style={styles.iconTab}>
                <MaterialCommunityIcons 
                    name="view-grid-outline" 
                    size={sizeIcon} 
                    color={focused ? colorIconFocused : colorIcon}
                />
            </View>
        )
    }
}

const calenderOptions = {
    tabBarIcon: ({focused}: {focused:boolean}) => {
        return (
            <View style={styles.iconTab}>
                <MaterialCommunityIcons 
                    name="calendar-month-outline" 
                    size={sizeIcon} 
                    color={focused ? colorIconFocused : colorIcon}
                />
            </View>
        )
    }
}

const payOptions = {
    tabBarIcon: ({focused}: {focused:boolean}) => {
        return (
            <View style={styles.iconTab}>
                <MaterialCommunityIcons 
                    name="wallet-plus-outline" 
                    size={sizeIcon} 
                    color={focused ? colorIconFocused : colorIcon}
                />
            </View>
        )
    }
}

const optionOptions = {
    tabBarIcon: ({focused}: {focused:boolean}) => {
        return (
            <View style={styles.iconTab}>
                <MaterialCommunityIcons 
                    name="menu" 
                    size={sizeIcon} 
                    color={focused ? colorIconFocused : colorIcon}
                />
            </View>
        )
    }
}

export {screenOptions, homeOptions, calenderOptions, payOptions, optionOptions}

const styles = StyleSheet.create({
    iconTab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow: {
        shadowColor: Colors.LOGO_GREEN,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    }
})