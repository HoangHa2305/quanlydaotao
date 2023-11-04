import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    SafeAreaView, 
    ScrollView, 
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useEffect, useState } from 'react';
import Display from '../utils/Display';
import Colors from '../constants/Colors';
import Mock from '../constants/Mock';
import Fonts from '../constants/Fonts';
import Separator from '../components/Separator';
import OptionMenuItem from '../components/OptionMenuItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../data/API';
import ScheduleItem from '../components/ScheduleItem';

const colorHeader = Colors.DARK_GRAY

const Index = () => {
    type Student = {
        name: string,
        id: number
    }
    type ItemType = {
        name: string,
        room: string,
        time: string
    }
    const [name,setName] = useState('');
    const [section,setSection] = useState<ItemType[]>([]);
    let id: number;
    useEffect(()=>{
        async function getStudent() {
            let student: Student | null = null;
            try{
                let studentData = await AsyncStorage.getItem("student");
                if(studentData !== null){
                    student = JSON.parse(studentData);
                    if(student){
                        setName(student.name);
                        id = student.id;
                        API.get('student/index/'+id)
                        .then(response=>{
                            setSection(response.data.section);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    }
                }
            }catch(error){
                console.log(error);
            }
        }
        getStudent();
    },[]);
    return (
        <SafeAreaView style={styles.container}>
                <StatusBar 
                    barStyle={'dark-content'}
                    backgroundColor={Colors.LIGHT_WHITE}
                    translucent
                />

                <Separator height={StatusBar.currentHeight} />

                {/* Header Container */}
                <View style={styles.backgroundPrimaryContainer}/>
                <View style={styles.headerContainer}>
                    <View style={styles.notiContainer}>
                        <View>
                            <Text style={styles.hiName}>Hi, <Text style={styles.hiName}>{name}</Text></Text>
                            <Text style={styles.textHeader}>Here is your activity today.</Text>
                        </View>
                        <MaterialCommunityIcons 
                            name="bell-outline"
                            size={36}
                            color={colorHeader}
                            style={{position: 'absolute', right: 0, top: 0}}
                        />
                        <View style={styles.alertBadge}>
                            <Text style={styles.alertBadgeText}>10</Text>
                        </View>
                    </View>

                    <View style={styles.rectangleShow}>
                        <TouchableWithoutFeedback>
                            <View style={styles.button}>
                                <Text style={[styles.textRactangleHeader, {color: Colors.LOGO_RED}]}>3.0</Text>
                                <Text style={styles.textRactangle}>GPA</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={styles.button}>
                                <Text style={[styles.textRactangleHeader, {color: Colors.LOGO_GREEN}]}>120</Text>
                                <Text style={styles.textRactangle}>Total Credit</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={styles.button}>
                                <Text style={[styles.textRactangleHeader, {color: Colors.DEFAULT_PURPLE}]}>0</Text>
                                <Text style={styles.textRactangle}>Assignments</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={styles.button}>
                                <Text style={[styles.textRactangleHeader, {color: Colors.LIGHT_PINK}]}>15</Text>
                                <Text style={styles.textRactangle}>Total Subject</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                {/* Option Container */}
                <View style={styles.optionContainer}>
                    {Mock.OPTIONS.map(({name, icon, color}, index) => (
                        <OptionMenuItem key={index} name={name} icon={icon} color={color}/>
                    ))}
                </View>

                {/* Schedule Container */}
                <View style={styles.scheduleContainer}>
                     <Text style={styles.textSchedule}>Schedule _ Mon - 13th week</Text>
                     <FlatList 
                        data={section}
                        keyExtractor={(item:ItemType) => item.name}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        overScrollMode='never'
                        nestedScrollEnabled={true}
                        renderItem={({item}) => <ScheduleItem name={item.name} room={item.room} time={item.time}/>}
                     />
                </View>

                {/* Post Container */}
                <View style={styles.postContainer}>
                    <Text style={{fontFamily: Fonts.ROBOTO_MEDIUM, color: Colors.DARK_GRAY, fontSize: 20}}>Post coming soon</Text>
                </View>
        </SafeAreaView>
    )
}

// console.log(StatusBar.currentHeight)

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    backgroundPrimaryContainer: {
        position: 'absolute',
        width: '100%',
        height: Display.setHeight(50),
        top: 0,
        backgroundColor: Colors.LIGHT_WHITE,
        alignSelf: 'center',
        zIndex: -1,
    },


    // NotiHeader
    hiName: {
        color: colorHeader,
        fontFamily: Fonts.ROBOTO_BOLD,
        fontSize: 24,
    },
    textHeader: {
        color: Colors.GRAY,
        fontFamily: Fonts.ROBOTO_REGULAR,
        fontSize: 16,
        marginTop: 12,
    },
    headerContainer: {
        justifyContent: 'space-evenly',
    },
    notiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 44,
        marginHorizontal: 44,
    },
    alertBadge: {
        width: 24,
        height: 24,
        backgroundColor: Colors.LOGO_GREEN,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -4,
        right: -4,
        shadowColor: Colors.DEFAULT_BLACK,
        elevation: 8,
    },
    alertBadgeText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 12,
        fontFamily: Fonts.ROBOTO_MEDIUM,
    },

    // Rectangle show
    rectangleShow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 20,
        justifyContent: 'space-around',
        
    },
    button: {
        width: 160,
        height: 84,
        backgroundColor: Colors.LIGHT_WHITE,
        borderRadius: 8,
        shadowColor: Colors.LOGO_GREEN,
        shadowOffset: {
            width: 24,
            height: 24,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 8,
        marginTop: 20,
        paddingTop: 8,
        paddingLeft: 24,
    },
    textRactangleHeader: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 24,
        color: Colors.GRAY,
    },
    textRactangle: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 16,
        color: Colors.GRAY,
        marginTop: 12,
    },

    // Option container
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 24,
        marginTop: 76, 
    },
    
    // Schedule Container
    scheduleContainer: {
        height: Display.setHeight(30),
        flexDirection: 'column',
        marginTop: 36,
        marginHorizontal: 24,
    },
    textSchedule: {
        fontSize: 20,
        fontFamily: Fonts.ROBOTO_MEDIUM,
        color: Colors.DARK_GRAY,
        marginBottom: 24,
    },

    // Post Container
    postContainer: {
        height: Display.setHeight(40),
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})