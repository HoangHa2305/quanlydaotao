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
import React, {useState, useEffect} from 'react'
import Colors from '../constants/Colors'
import Separator from '../components/Separator'
import { useNavigation } from '@react-navigation/native'
import Fonts from '../constants/Fonts'
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../data/API'
import GoBackHead from '../components/GoBackHead'
import OutcomeItem from '../components/OutcomeItem'

const Outcome = () => {
    const navigation = useNavigation();
    const [CourseName, setCourseName] = useState<ItemType[]>([]);
    const [semester,setSemester] = useState({name:'',code:''});

    type Student = {
        name: string,
        id: number
    }

    type ItemType = {
        id:number,
        name: string,
        sum_t4_score: string
    }

    useEffect(()=>{
        async function getStudent() {
            let student: Student | null = null;
            try{
                let studentData = await AsyncStorage.getItem("student");
                if(studentData !== null){
                    student = JSON.parse(studentData);
                    if(student){
                        API.get('student/list/'+student.id)
                        .then(response=>{
                            setCourseName(response.data.subject);
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

        async function getSemester() {
            try {
                let semester = await AsyncStorage.getItem("semester");
                if(semester !== null){
                    setSemester(JSON.parse(semester));
                }
            }catch(error){
                console.log(error);
            }
        }
        getSemester();
        
    },[]);

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar 
            barStyle={'dark-content'}
            backgroundColor={Colors.DEFAULT_WHITE}
            translucent
        />

        <Separator height={StatusBar.currentHeight} />
        <Separator height={16} />

        <View style={styles.headerContainer}>
            <Text style={styles.textHeader}>Learning outcomes</Text>
        </View>

        <Separator height={16} />

            <View style={styles.title}>
                <TouchableWithoutFeedback>
                    <View style={styles.button}>
                        <Text style={styles.textTitle}>{semester.name}</Text>
                        <Text style={[styles.textTitle, styles.move]}>{semester.code}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <Separator height={44} />

            <FlatList 
                data={CourseName}
                keyExtractor={(item:ItemType) => item.name}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                overScrollMode='never'
                nestedScrollEnabled={true}
                renderItem={({item}) => <OutcomeItem id={item.id} name={item.name} sum_t4_score={item.sum_t4_score}/>}
            />
    </SafeAreaView>
  )
}

export default Outcome;

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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    textHeader: {
        fontFamily: Fonts.ROBOTO_MEDIUM,
        fontSize: 24,
        color: Colors.DARK_GRAY,
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
    move: {
        position: 'absolute',
        right: 20,
    },

})