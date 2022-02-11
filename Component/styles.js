import {  StyleSheet } from 'react-native'

const styles= () => {

 StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#123456"
     
    },
    title: {
      marginTop: 100,
      //paddingVertical: 8,
     //borderWidth: 4,
      //borderColor: "#20232a",
     // borderRadius: 6,
      //backgroundColor: "#61dafb",
      color: "#61dafb",
      textAlign: "center",
      fontSize: 50,
      fontStyle:'italic',
      fontWeight: 'bold'
    },
 
    fname: {
     
      marginTop: 45,
   
      padding: 1,
      width:300,  // SHAZA LOOK
     // borderWidth: 4,
      //borderColor: "#20232a",
      borderRadius: 500,
      backgroundColor: "#61dafb",
      color: "#123456",
      textAlign: "center",
      fontSize: 20,
      fontStyle:'italic',
      fontWeight: 'bold',
      textTransform: "uppercase"
    },
},
)
};
export default styles;