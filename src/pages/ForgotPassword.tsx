import React, { useState } from "react";
import { SafeAreaView, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import Fonts from "../constants/Fonts";
import API from "../data/API";
import { SCREENS } from "../constants/Screen";
import { useNavigation } from "@react-navigation/native";


const ForgotPassword = () => {
    const navigation = useNavigation<any>();
    const [email,setEmail] = useState('');

    const handleSubmit = () => {
        let flag = true;

        if(email == ''){
            Alert.alert('Vui long nhap email');
            flag = false;
        }
        if(flag){
            const data = {email};
            API.post('check/mail',data)
            .then(response => {        
                if(response.data.status){
                    navigation.navigate(SCREENS.OTPSCREEN, { email: email });
                }else{
                    Alert.alert("Email khong ton tai");
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Logo/>
                <View style={styles.contentBody}>
                    <View>
                        <Text style={styles.titleForgot}>Forgot Password</Text>
                        <Text style={styles.titleEnter}>Enter your email.</Text>
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
                                onChangeText={(text)=>setEmail(text)}
                            />
                        </View>
                        <View>
                            <TouchableOpacity 
                                style={styles.btnLogin}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.textLogin}>Continue</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.btnBack}
                                onPress={navigation.goBack}
                            >
                                <Text style={styles.textBack}>❮</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        textAlign:'center',
        backgroundColor:'#F5FBFD',
        height:'100%'
    },
    contentBody:{
        marginTop:53,
        marginLeft:45,
        marginRight:45
    },
    titleForgot:{
        fontFamily:Fonts.ROBOTO_MEDIUM,
        fontSize:20,
        fontWeight:'500',
        color:'#404040'
    },
    titleEnter:{
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
    btnLogin:{
        width:299,
        height:58,
        borderRadius:8,
        marginTop:46,
        backgroundColor:'#4FA0AB',
        justifyContent:'center',
        alignItems:'center'
    },
    textLogin:{
        fontFamily:Fonts.INTER_MEDIUM,
        fontWeight:'500',
        fontSize:20,
        color:'#FFFFFF',
    },
    btnBack:{
        marginTop:44,
        marginLeft:120,
        height:59,
        width:59,
        borderRadius:30,
        backgroundColor:'#E1F1F5',
        justifyContent:'center',
        alignItems:'center'
    },
    textBack:{
        fontSize:25,
        marginTop:18,
        marginLeft:18,
        color:'#F5FBFD',
        position: 'absolute',
    }
});
export default ForgotPassword;