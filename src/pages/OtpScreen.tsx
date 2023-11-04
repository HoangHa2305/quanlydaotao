import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import Logo from "../components/Logo";
import Fonts from "../constants/Fonts";
import API from "../data/API";
import { Route, useNavigation, useRoute } from "@react-navigation/native";
import { SCREENS } from "../constants/Screen";

const OtpScreen = () => {
    const navigation = useNavigation<any>();
    const [seconds,setSeconds] = useState(120);
    const [status,setStatus] = useState(false);
    const [pin,setPin] = useState(['','','','','','']);
    const inputRefs = [
        useRef<TextInput | null>(null),
        useRef<TextInput | null>(null),
        useRef<TextInput | null>(null),
        useRef<TextInput | null>(null),
        useRef<TextInput | null>(null),
        useRef<TextInput | null>(null),
    ];
    const route = useRoute();
    const { email } = route.params as { email: string };
    const data = {email};

    useEffect(() => {
        const interval = setInterval(()=> {
            setSeconds((prevSconds) => (prevSconds === 0 ? 120 : prevSconds - 1));
        },1000);

        return () => {
            clearInterval(interval);
        };
    },[seconds]);

    useEffect(() => {
        if(!status){
            API.post('sendmail',data)
            .then(response=>{
                console.log(response.data);
            });

            const interval = setInterval(()=>{
                API.post('sendmail',data)
                .then(response=>{
                    console.log(response.data);
                });
            },118000);
    
            return () => {
                clearInterval(interval)
            };
        }
    },[status]);

    const handlePinInput = (text:string,index:number) => {
        if(text.length === 1 && index < 5) {
            if(inputRefs[index+1] && inputRefs[index+1].current !== null){
                inputRefs[index + 1].current?.focus();
            }
        }

        const newPin = [...pin];
        newPin[index] = text;
        setPin(newPin);
    };

    const hanldePress = () => {
        API.post('sendmail',data)
        .then(response=>{
            console.log(response.data);
        });
    }

    const handleSubmit = () => {
        let otp_pin = pin.join("");
        let data = {email,otp_pin};
        
        API.post('check/otp',data)
        .then(response=>{
            console.log(response.data);
            if(response.data.status){
                setStatus(true);
                navigation.navigate(SCREENS.NEWPASSWORD,{email:email});
            }      
        });
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Logo/>
                <View style={styles.contentBody}>
                    <View style={styles.title}>
                        <Text style={styles.titleOtp}>ENTER OTP</Text>
                        <Text style={styles.titlePlease}>Please enter the 6-digit OTP code sent to your email</Text>
                    </View>
                    <View style={styles.contentOtp}>
                        <Text style={styles.setTime}>{seconds+'s'}</Text>
                    </View>
                    <View style={styles.contentPin}>
                        {
                            pin.map((value,index)=>(
                                <TextInput 
                                    style={styles.inputPin}
                                    key={index}
                                    ref={inputRefs[index]}
                                    value={value}
                                    onChangeText={(text) => handlePinInput(text,index)}
                                    maxLength={1}
                                    keyboardType="numeric"
                                />
                            )) 

                        }
                    </View>
                    <View style={styles.noteContent}>
                        <Text style={styles.textNote}>You haven't received OTP yet? <Text style={styles.textResend} onPress={hanldePress}>Resend code</Text></Text>
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
                            onPress={()=>navigation.goBack()}
                        >
                            <Text style={styles.textBack}>❮</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};
export default OtpScreen;

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
    title:{
        width:276,
        height:73
    },
    titleOtp:{
        fontFamily:Fonts.ROBOTO_MEDIUM,
        fontSize:20,
        fontWeight:'500',
        color:'#404040'
    },
    titlePlease:{
        fontFamily: Fonts.ROBOTO_REGULAR,
        fontSize:16,
        fontWeight:'400',
        color:'#7F7F7F',
        marginTop:12
    },
    contentOtp:{
        marginTop:37,
    },
    setTime:{
        textAlign:'right',
        fontFamily: Fonts.ROBOTO_REGULAR,
        fontSize:16
    },
    contentPin:{
        width:300,
        height:40,
        marginTop:16,
        marginLeft:5,
        flexDirection:'row',
    },
    inputPin:{
        width:40,
        height:40,
        backgroundColor: 'rgba(191, 191, 191, 0.5)',
        marginRight:12,
        fontFamily:Fonts.INTER_MEDIUM,
        fontWeight:'bold',
        borderRadius:8,
        textAlign:'center'
    },
    noteContent:{
        width:308,
        height:19,
        marginTop:16
    },
    textNote:{
        fontFamily:Fonts.ROBOTO_REGULAR,
        fontSize:16
    },
    textResend:{
        color: '#4FA0AB',
        textDecorationLine:'underline'
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