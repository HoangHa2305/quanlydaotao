import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    TextInput,
    Button,
    Modal,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../constants/Colors';
import Separator from '../components/Separator';
import GoBackHead from '../components/GoBackHead';
import Fonts from '../constants/Fonts';
import Display from '../utils/Display';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IMAGE_URL from '../data/Image';

const Account = () => {
    const [student,setStudent] = useState({avatar:'',name:'',branch:'',class:'',code:'',sex:'',birth:'',country:'',email:'',phone:''});

    useEffect(()=>{
        async function getStudent() {
            try{
                let studentData = await AsyncStorage.getItem("student");
                if(studentData !== null){
                    setStudent(JSON.parse(studentData));
                }
            }catch(error){
                console.log(error);
            } 
        }
        getStudent();
    },[]);

    return (
        <SafeAreaView  style={styles.container}>
            <StatusBar 
                barStyle={'dark-content'}
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />

            <Separator height={StatusBar.currentHeight} />
            <Separator height={16} />

            <GoBackHead title={"Profile"}/>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                style={{paddingHorizontal: 20}}
            >

                <Separator height={16} />

                <View>
                    <View style={styles.button}>
                        <View style={styles.avaContainer}>
                            <Image style={styles.avatar}
                            source={{uri:IMAGE_URL+'/student/'+student.avatar}}
                            resizeMode='contain'
                            />
                        </View>
                        <Text style={[styles.textTitle]}>{student.name}</Text> 
                        <Text style={[styles.role]}>chuyên ngành {student.branch}</Text> 
                        <Text style={[styles.role]}>lớp {student.class} msv {student.code}</Text> 
                    </View>
                </View>

                <View style={styles.logo}>
                    <View>
                        <Text style={styles.itemLogoV}>
                            <Text style={styles.mainLogo}>V</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.itemLogoK}>
                            <Text style={styles.mainLogo}>K</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.itemLogoU}>
                            <Text style={styles.mainLogo}>U</Text>
                        </Text>
                    </View>
                </View>
                <Separator height={40} />

                <View style={styles.contentContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>FULL NAME</Text>
                        <TextInput 
                            style={styles.contentItem} 
                            defaultValue={student.name}
                            editable={false}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>GENDER</Text>
                        <TextInput 
                            style={styles.contentItem} 
                            defaultValue={student.sex}
                            editable={false}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>BIRTHDAY</Text>
                        <TextInput 
                            style={styles.contentItem} 
                            defaultValue={student.birth}
                            editable={false}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>LOCATION</Text>
                        <TextInput 
                            style={styles.contentItem} 
                            defaultValue={student.country}
                            editable={false}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>EMAIL</Text>
                        <TextInput 
                            style={styles.contentItem} 
                            defaultValue={student.email}
                            editable={false}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>PHONE</Text>
                        <TextInput 
                            style={styles.contentItem} 
                            defaultValue={'0'+student.phone}
                            editable={false}
                        />
                    </View>
                </View>     
            </ScrollView>
        </SafeAreaView>
    )
}

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LIGHT_WHITE,
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo:{
        width:103,
        height:25,
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'center',
        marginLeft:128,
        marginTop:10
    },
    itemLogoV:{
        textAlign:'center',
        color:'#FC6461'
    },
    itemLogoK:{
        textAlign:'center',
        color:'#FFBB71'
    },
    itemLogoU:{
        textAlign:'center',
        color:'#4FA0AB'
    },
    mainLogo:{
        fontWeight:'bold',
        fontSize:20,
        fontFamily:Fonts.RIGHTEOUS
    },
    textTitle: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 20,
        color: Colors.DARK_GRAY,
        marginLeft: 20,
        marginBottom: 12,
    },
    role: {
        fontFamily: Fonts.ROBOTO_REGULAR,
        color: Colors.LOGO_GREEN,
        fontSize: 16,
        textTransform: 'uppercase',
    },
    avaContainer: {
      width: 120,
      height: 120,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.LIGHT_WHITE,
      shadowColor: Colors.LOGO_GREEN,
      shadowOpacity: 0.25,
      elevation: 4,
      borderRadius: 180,
    },
    avatar: {
      width: 108,
      height: 108,
      borderRadius: 180,
    },
    contentContainer: {
        flexDirection: 'column',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8,
        marginBottom: 24,
        borderWidth: 1,
        borderTopColor: Colors.DEFAULT_WHITE,
        borderBottomColor: Colors.LIGHT_GREEN,
        borderStartColor: Colors.DEFAULT_WHITE,
        borderEndColor: Colors.DEFAULT_WHITE,
    },
    titleItem: {
        width: Display.setWidth(32),
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 16,
        color: Colors.SECONDARY_GRAY,
    },
    contentItem: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 16,
        color: Colors.DARK_GRAY,
    },
})