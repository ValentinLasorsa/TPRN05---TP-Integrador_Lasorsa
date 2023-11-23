import MessageConstants from "../Constants/MessageConstants";
import Profile from "../models/Profile";
import AsyncStorageUtil from "../Utils/AsyncStorageUtil";

//npm i @react-native-async-storage/async-storage 
//Definicionesdeconstantes. 
const USER_PROFILE = "USER_PROFILE";

export default class DataService{ 
    //Elimina las credenciales almacenadas al cerrar sesión 
    deleteData = async() => { 
        try{
            await AsyncStorageUtil.removeKey(USER_PROFILE)
        }catch(e){

        }
    }; 

    saveData = async(profile) => { 
            let success = false;
            try {
                console.log(JSON.stringify(profile))
                console.log(USER_PROFILE)
                await AsyncStorageUtil.setObject(USER_PROFILE, profile);
                success = true; // Mark success if AsyncStorageUtil.setObject succeeds
            } catch(e) {
                // Handle any potential errors
                console.error("Error saving data:", e);
            }
            return success; // Return success status
    }; 

    /*saveBackground = async(background) => { 
        //Almacena las credenciales en el asyncStorage
        try {    
            await AsyncStorage.setItem(BACKGROUND_KEY, background);  
            return true;
        } catch(e) {    
            console.log(e);
            return false;
        }
    }; 

    getBackground = async() => { 
        let storedBackground = await AsyncStorage.getItem(BACKGROUND_KEY);
        const returnValue = storedBackground; 
        return returnValue; 
    }; */

    getData = async () => { 
        let profile = new Profile();
        try {
            profile = await AsyncStorageUtil.getObject(USER_PROFILE, profile);
        } catch (error) {
            console.error('Error fetching profile from AsyncStorage:', error);
        }
        return profile; 
    };
} 