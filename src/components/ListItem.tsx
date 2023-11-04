import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import LogoSmall from './LogoSmall';

interface ScheduleItemProps {
    name: string,
    room: string,
    teacher: string,
    week:string,
    sections:string[],
}

const ListItem = ({name,room,teacher,week,sections}: ScheduleItemProps) => {
  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback>
            <View style={styles.button}>
                <LogoSmall/>
                <View style={styles.contentSchedule}>
                    <Text style={styles.textHeader}>{name}</Text>
                    <Text style={styles.textContent}>{"Giảng viên: "+teacher}</Text>
                    <Text style={styles.textContent}>{"Phòng: "+room}</Text>
                    <Text style={styles.textContent}>{"Tuần: "+week}</Text>
                    <Text style={styles.textContent}>Lịch trình:</Text>
                    {
                        sections.map((item,index)=>(
                            <Text style={styles.textContent} key={index}>{"Thứ "+item}</Text>
                        ))
                    }
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

export default ListItem

const styles = StyleSheet.create({
    container: {
        
    },
    button: {
        height: 150,
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