import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageConstants from "../Constants/MessageConstants";

class AsyncStorageUtil{

    /**
    * @param {*} key
    * @param {*} value
    * @returns
    */
    static async setString(key, value){
        let returnValue = false;
        try{
            await AsyncStorage.setItem(key,value);
            returnValue = true;
        }catch(e){
            
        }
        return returnValue;
    }

    /**
    * @param {*} key
    * @param {*} value
    * @returns
    */
    static async setObject(key, object){
        let returnValue = false;
        try{
            const jsonString = JSON.stringify(object)
            returnValue=await AsyncStorage.setItem(key,jsonString);
        }catch(e){
            console.error(MessageConstants.MSG_INCOMPLETE_FIELDS, e)
        }
        return returnValue;
    }

    /**
    * @param {*} key
    * @param {*} value
    * @returns
    */
    static async getString(key, defaultValue){
        let returnValue = defaultValue;
        try{
            returnValue= await AsyncStorage.getItem(key);
        }catch(e){
            
        }
        return returnValue;
    }

    /**
    * @param {*} key
    * @param {*} value
    * @returns
    */
    static async getObject(key, defaultValue){
        let returnValue = defaultValue;
        try{
            const jsonString = await AsyncStorageUtil.getString(key);
            if (jsonString !== null) {
                try {
                    // Attempt to parse the retrieved data
                    const parsedValue = JSON.parse(jsonString);
                    
                    if (typeof parsedValue === 'object' && parsedValue !== null) {
                        returnValue = parsedValue;
                    } else {
                        console.error('Retrieved value is not a valid JSON object.');
                    }
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    console.log('Received JSON string:', jsonString);
                }
            }
        }catch(e){
            console.error(MessageConstants.MSG_INCOMPLETE_FIELDS, e)
        }
        return returnValue;
    }

    /**
    * @param {*} key
    * @param {*} value
    * @returns
    */
    static async removeKey(key){
        let returnValue = true;
        try{
            await AsyncStorage.removeItem(key);
            returnValue = true;
        }catch(e){
            
        }
        return returnValue;
    }
}
export default AsyncStorageUtil;