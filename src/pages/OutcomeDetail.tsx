import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    StatusBar, 
    TouchableWithoutFeedback ,
    FlatList,
    ScrollView
} from 'react-native'
import React, { useEffect,useState } from 'react'
import Colors from '../constants/Colors'
import Separator from '../components/Separator'
import GoBackHead from '../components/GoBackHead'
import Fonts from '../constants/Fonts'
import API from '../data/API'
import { useRoute } from '@react-navigation/native'

const OutcomeDetail = () => {
    const route = useRoute();
    const {id} = route.params as {id: number};
    const {name} = route.params as {name: string};
    const {char} = route.params as {char: string};
    const [score,setScore] = useState({credit:'',session:'',diligence:'',homework:'',midterm:'',final:'',full:''});
    let textColor;

    useEffect(()=>{
        API.get('student/score/detail/'+id)
        .then(response=>{
            console.log(response.data.score);     
            setScore(response.data.score);    
        })
    },[]);

    switch (char) {
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
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle={'dark-content'}
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />

            <Separator height={StatusBar.currentHeight} />
            <Separator height={16} />

            <GoBackHead title={"Outcome Detail"}/>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                style={{paddingHorizontal: 20}}>

                <Separator height={16} />

                <View style={styles.title}>
                    <TouchableWithoutFeedback>
                        <View style={styles.button}>
                            <Text style={styles.textTitle}>{name}</Text>
                            <Text  style={[
                                styles.textContent, 
                                styles.move,
                                {color: textColor}
                            ]}>
                                {char}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <Separator height={44} />

                <View style={styles.tableContainer}>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.cellText1}>Credits</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.cellText}>{score.credit}</Text>
                        </View>
                    </View>
                    {/* Hàng 2 */}
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.cellText1}>Study Times</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.cellText}>{score.session}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.cellText1}>Diligence</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.cellText}>{score.diligence}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.cellText1}>Exercise Mark</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.cellText}>{score.homework}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.cellText1}>Midterm Mark</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.cellText}>{score.midterm}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.cellText1}>Final Mark</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.cellText}>{score.final}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.cellText1}>Full Mark</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.cellText}>{score.full}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <Text style={styles.cellText1}>Letter Mark</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={[
                                    styles.textContent, 
                                    {color: textColor}
                                ]}
                            >
                                {char}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OutcomeDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    title: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 20,
        color: Colors.DARK_GRAY,
        paddingVertical: 16,
        borderWidth: 1,
        borderTopColor: Colors.LIGHT_GREEN,
        borderBottomColor: Colors.LIGHT_GREEN,
        borderStartColor: Colors.DEFAULT_WHITE,
        borderEndColor: Colors.DEFAULT_WHITE,
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
    },
    textTitle: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 16,
        color: Colors.DARK_GRAY,
        marginLeft: 20,
    },
    textContent: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 16,

    },
    move: {
        position: 'absolute',
        right: 20,
    },

    // table
    tableContainer: {

    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 68,
      },
      cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREEN,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cellText1: {
        fontSize: 16,
        color: Colors.DARK_GRAY,
        fontFamily: Fonts.ROBOTO_MEDIUM,
      },
      cellText: {
        fontSize: 16,
        color: Colors.LOGO_GREEN,
        fontFamily: Fonts.ROBOTO_MEDIUM,
      },
})