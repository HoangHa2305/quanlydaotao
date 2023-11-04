import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import Fonts from "../constants/Fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import API from "../data/API";
import { SCREENS } from "../constants/Screen";

const NewPassword = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params as { email: string };
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isPasswordvesible,setPasswordvesible] = useState(true);
    const [isConfirmVesible,setIsConfirmVesible] = useState(true)

    const togglePassword = () => {
        setPasswordvesible(!isPasswordvesible);
    }
    const toggleConfirm = () => {
        setIsConfirmVesible(!isConfirmVesible);
    }

    const handleSubmit = () => {
        let flag = true;
        
        if(password == ''){
            Alert.alert("Vui long nhap password");
            flag = false;
        }
        if(confirmPassword == ''){
            Alert.alert("Vui long xac nhan password");
            flag = false;
        }
        if(flag){
            if(password == confirmPassword){
                const data = {new_password:password,email:email}
                API.post('password/new',data)  
                .then(response=>{
                    console.log(response);
                    if(response.data.status){
                        navigation.navigate(SCREENS.LOGIN as never);
                    }
                });
            }else{
                Alert.alert("Xac nhan mat khau khong trung khop");
            }
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Logo/>
                <View style={styles.contentBody}>
                    <View>
                        <Text style={styles.titlePassword}>Password</Text>
                        <Text style={styles.titleEnter}>Enter a new password</Text>
                    </View>
                    <View style={styles.inputContent}>
                        <View>
                            <Text style={styles.textpassword}>New Password</Text>
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
                        <View style={styles.layoutPassword}>
                            <Text style={styles.textpassword}>Confirm Password</Text>
                            <View style={styles.noteEye}>
                                <TextInput style={styles.inputPassword}
                                    secureTextEntry={isConfirmVesible}
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                />
                                <TouchableOpacity onPress={toggleConfirm}>
                                    <Image source={require('../assets/images/eye.png')} style={styles.eyes}/>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style={styles.btnLogin}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.textLogin}>Reset Password</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style={styles.btnBack}
                                onPress={()=>navigation.goBack()}
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
export default NewPassword;

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
    titlePassword:{
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
    inputContent:{
        width:300,
        height:157,
        marginTop:52
    },
    textpassword:{
        fontFamily: Fonts.ROBOTO_MEDIUM,
        color:'#4FA0AB',
        fontSize:16,
    },
    inputPassword:{
        fontFamily:Fonts.ROBOTO_REGULAR,
        fontSize:16,
        width:299,
        borderBottomWidth:1,
        borderColor:'#BFBFBF',
        color:'#404040'
    },
    layoutPassword:{
        marginTop:28,
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
    textLogin:{
        fontFamily:Fonts.INTER_MEDIUM,
        fontWeight:'500',
        fontSize:20,
        color:'#FFFFFF',
        textAlign:'center'
    },
    btnLogin:{
        width:300,
        height:60,
        borderRadius:8,
        marginTop:46,
        backgroundColor:'#4FA0AB',
        justifyContent:'center',
        alignItems:'center'
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