import React, {useState, useEffect} from 'react' 
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, Button } from 'react-native';
import Fonts from '../constants/Fonts';
import IMAGE_URL from '../data/Image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from "react-native-vector-icons/AntDesign";
import Colors from '../constants/Colors';
import { Modal } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../constants/Screen';

const Profile = () => {
    const navigation = useNavigation();
    const [student,setStudent] = useState({ name: '',avatar:'' });

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

    const handleLogout = async() => {
        console.log(123);
        
        await AsyncStorage.removeItem("student");
        navigation.navigate(SCREENS.LOGIN as never);
    }

    const handleAccount = () => {
        navigation.navigate(SCREENS.ACCOUNT as never);
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
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
                <View style={styles.content}>
                    <View style={styles.title}>
                        <View style={styles.section}>
                            <Image 
                                alt="avatar"
                                source={{uri:IMAGE_URL+'/student/'+student.avatar}}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.information}>
                            <Text style={styles.welcome}>Welcome</Text>
                            <Text style={styles.name}>{student.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.setting}>
                    <View style={styles.task} onTouchStart={handleAccount}>
                        <MaterialCommunityIcons style={styles.item} name='account-circle-outline'/>
                        <Text style={styles.text}>Profile</Text>
                        <AntIcon style={styles.right} name='right'/>
                    </View>
                    <View style={styles.task}>
                        <AntIcon style={styles.item} name='setting'/>
                        <Text style={styles.text}>About</Text>
                        <AntIcon style={styles.right} name='right'/>
                    </View>
                    <View style={styles.task} onTouchStart={handleLogout}>
                        <MaterialCommunityIcons style={styles.item}  name="logout"/>
                        <Text style={styles.text}>Logout</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Profile;

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        textAlign:'center',
        height:'100%',
        backgroundColor:Colors.LIGHT_WHITE
    },
    logo:{
        width:103,
        height:25,
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'center',
        marginLeft:143,
        marginTop:64
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
    content:{
        marginTop:15,
        marginLeft:24,
        width:342,
        height:94,
        borderTopWidth:1,
        borderTopColor:'#E1F1F5',
        borderTopStyle:'solid',
        borderBottomWidth:1,
        borderBottomColor:'#E1F1F5',
        borderBottomStyle:'solid'
    },
    title:{
        width:279,
        height:58,
        marginTop:18,
        marginBottom:18,
        flexDirection:'row',
        alignSelf:'stretch'
    },
    section:{
        width:58,
        height:58,
        borderRadius:100,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_WHITE,
        shadowColor: Colors.LOGO_GREEN,
        shadowOpacity: 0.25,
        elevation: 4,
    },
    avatar:{
        width:52,
        height:52,
        borderRadius:100
    },
    information:{
        marginLeft:24
    },
    welcome:{
        color:'#4FA0AB',
        fontSize:20,
        fontFamily:Fonts.ROBOTO_REGULAR
    },
    name:{
        fontFamily:Fonts.ROBOTO_MEDIUM,
        fontSize:20,
        color:'#4FA0AB'
    },
    setting:{
        marginTop:51,
        marginLeft:24,
        width:342
    },
    task:{
        flexDirection:'row',
        marginBottom:32
    },
    item:{
        fontSize:20,
        color:'#4FA0AB',
        marginTop:5
    },
    text:{
        fontFamily:Fonts.ROBOTO_MEDIUM,
        fontSize:20,
        color:'#4FA0AB',
        marginLeft:24
    },
    right:{
        width:24,
        height:24,
        fontSize:20,
        color:'#4FA0AB',
        marginTop:5,
        marginLeft:'auto'
    },
    
});