import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import API from '../data/API';
import { SCREENS } from '../constants/Screen';

interface OutcomeItemProps {
    id: number,
    name: string,
    sum_t4_score:string
}
const OutcomeItem = ({id,name,sum_t4_score}:OutcomeItemProps) => {
    let textColor;
    const navigation = useNavigation<any>();

    const hanldeDetail = () => {
        navigation.navigate(SCREENS.OUTCOMEDETAIL,{id:id, name:name, char:sum_t4_score});
    }

    switch (sum_t4_score) {
        case 'A':
        textColor = Colors.LOGO_GREEN;
        break;
        case 'B':
        textColor = Colors.DEFAULT_PURPLE;
        break;
        case 'C':
        textColor = Colors.GRAY;
        break;
        case 'D':
        textColor = Colors.LOGO_YELLOW;
        break;
        case 'F':
        textColor = Colors.LOGO_RED;
        break;
        default:
        textColor = Colors.DEFAULT_BLACK;
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={hanldeDetail}>
                <View style={styles.button}>
                    <Text style={styles.textHeader}>{name}</Text>
                    <Text 
                        style={[
                            styles.textContent, 
                            styles.move,
                            {color: textColor}
                        ]}>
                        {sum_t4_score}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default OutcomeItem

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
        paddingHorizontal: 20,
    },
    textHeader: {
        width: 240,
        color: Colors.DARK_GRAY,
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 16,
    },
    textContent: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 16,

    },
    move: {
        position: 'absolute',
        right: 20,
    },
})