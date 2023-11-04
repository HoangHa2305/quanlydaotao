import React, { useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import Fonts from "../constants/Fonts";
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from "../constants/Screen";
import API from "../data/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = () => {
    const navigation = useNavigation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isPasswordvesible,setPasswordvesible] = useState(true);

    const togglePassword = () => {
        setPasswordvesible(!isPasswordvesible);
    }

    const handleSubmit = async() => {
        let flag = true;

        if(email == ''){
            Alert.alert( "Vui long nhap email");
            flag = false;
        }
        if(password == ''){
            Alert.alert("Vui long nhap password");
            flag = false;
        }
        if(flag){
            const data = {email,password};
            API.post('student/login',data)
            .then(response => {
                if(response.data.student){
                    setEmail('');
                    setPassword('');
                    AsyncStorage.setItem("student",JSON.stringify(response.data.student));
                    navigation.navigate(SCREENS.INDEX as never);
                }
            }) 
            .catch(error => {
                console.log(error);
            });

            API.get('semester')
            .then(response => {
                console.log(response.data.semester);  
                AsyncStorage.setItem("semester",JSON.stringify(response.data.semester));      
            })
            .catch(error => {
                console.log(error);
            }); 
        }
    }
    return (
        <View style={styles.container}>
           <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent}>        
                <Logo/>
                <View style={styles.contentBody}>
                    <View>
                        <Text style={styles.titleSign}>Sign In</Text>
                        <Text style={styles.titleHello}>Hi there! Nice to meet you again.</Text>
                    </View>
                    <View style={styles.memberRole}>
                        <View style={styles.roleStudent}>
                            <TouchableOpacity style={styles.checkbox}>
                                <View style={styles.checkCicle}/>
                            </TouchableOpacity>
                            <Text>Student</Text>
                        </View>
                        <View style={styles.roleTeacher}>
                            <TouchableOpacity style={styles.checkbox}>
                                <View style={styles.checkCicle}/>
                            </TouchableOpacity>
                            <Text>Teacher</Text>
                        </View>
                    </View>
                    <View style={styles.inputContent}>
                        <View>
                            <Text style={styles.textEmail}>Email</Text>
                            <TextInput 
                                style={styles.inputEmail}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={styles.layoutPassword}>
                            <Text style={styles.textEmail}>Password</Text>
                            <View style={styles.noteEye}>
                                <TextInput 
                                    style={styles.inputPassword} 
                                    secureTextEntry={isPasswordvesible}
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <TouchableOpacity onPress={togglePassword}>
                                    <Image source={require('../assets/images/eye.png')} style={styles.eyes}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View >
                            <Text style={styles.forgotPass} onPress={()=>navigation.navigate(SCREENS.FORGOT as never)}>Forgot Password?</Text>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style={styles.btnLogin}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.textLogin}>Login In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>  
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FBFD',
        height:768
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    contentBody:{
        marginTop:53,
        marginLeft:45,
        marginRight:45
    },
    titleSign:{
        fontFamily:Fonts.ROBOTO_MEDIUM,
        fontSize:20,
        fontWeight:'500',
        color:'#404040'
    },
    titleHello:{
        fontFamily: Fonts.ROBOTO_REGULAR,
        fontSize:16,
        fontWeight:'400',
        color:'#7F7F7F',
        marginTop:12
    },
    memberRole:{
        height:19,
        width:218,
        marginTop:52,
        marginLeft:41,
        flexDirection:'row',
        justifyContent:'center'
    },
    roleStudent:{
        fontFamily:Fonts.ROBOTO_MEDIUM,
        marginRight:45,
        flexDirection:'row'
    },
    roleTeacher:{
        fontFamily:Fonts.ROBOTO_MEDIUM,
        flexDirection:'row'
    },
    checkbox: {
        width: 15,
        height: 15,
        marginRight: 12,
        borderRadius: 15, 
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkCicle:{
        width: 7,
        height: 7,
        borderRadius: 10,
        backgroundColor: '#7F7F7F',
    },
    inputContent:{
        width:300,
        height:157,
        marginTop:52
    },
    textEmail:{
        fontFamily: Fonts.ROBOTO_MEDIUM,
        color:'#4FA0AB',
        fontSize:16,
    },
    inputEmail:{
        fontFamily:Fonts.ROBOTO_REGULAR,
        fontSize:16,
        width:299,
        borderBottomWidth:1,
        borderColor:'#BFBFBF',
        color:'#404040'
    },
    inputPassword:{
        fontFamily:Fonts.ROBOTO_REGULAR,
        fontSize:16,
        width:299,
        borderBottomWidth:1,
        borderColor:'#BFBFBF'
    },
    noteEye:{
        flexDirection:'row',
        display:'flex'
    },
    eyes:{
        height:15,
        width:22,
        position:'absolute',
        right:10,
        bottom:12
    },
    layoutPassword:{
        marginTop:28,
    },
    forgotPass:{
        marginTop:23,
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize:16,
        color:'#7F7F7F'
    },
    textLogin:{
        fontFamily:Fonts.INTER_MEDIUM,
        fontWeight:'500',
        fontSize:20,
        color:'#FFFFFF',
    },
    btnLogin:{
        width:298,
        height:60,
        borderRadius:8,
        marginTop:46,
        backgroundColor:'#4FA0AB',
        justifyContent:'center',
        alignItems:'center'
    },
});
export default Login;
