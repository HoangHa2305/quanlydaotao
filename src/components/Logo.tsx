import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Fonts from "../constants/Fonts";

const Logo = () => {
    return (
        <View style={styles.headerLogo}>
                    <View>
                        <Text style={styles.itemLogoV}>
                            <Text style={styles.mainLogo}>V</Text>{'\n'}
                            <Text style={styles.smallLogo}>VIETNAM </Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.itemLogoK}>
                            <Text style={styles.mainLogo}>K</Text>{'\n'}
                            <Text style={styles.smallLogo}>KOREA </Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.itemLogoU}>
                            <Text style={styles.mainLogo}>U</Text>{'\n'}
                            <Text style={styles.smallLogo}>UNIVERSITY</Text>
                        </Text>
                    </View>
        </View>
    )
}   
export default Logo;

const styles = StyleSheet.create({
    headerLogo:{
        width:299,
        height:98,
        marginTop:66,
        marginLeft:45,
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'center',
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
        fontSize:64,
        fontFamily:Fonts.RIGHTEOUS
    },
    smallLogo:{
        fontFamily:Fonts.RIGHTEOUS,
        fontSize:15,
    },
})