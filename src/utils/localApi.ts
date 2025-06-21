import axios from "axios";
export function getLocalData(name: string): object | null |string{
    const data = localStorage.getItem(name);
    if (data) {
        try {
        return JSON.parse(data) as object;
        } catch (error) {
            console.log(`error: ${error}`,'data is not a valid JSON, returning as string:', data);
       return data as string; // 如果解析失败，返回原始字符串
        }
    }
    return null;
}
export function setLocalData(name: string, data: object|string): void {
    try{
        if (typeof data === 'object') {
            localStorage.setItem(name, JSON.stringify(data));
        } else {
            localStorage.setItem(name, data);
        }
        if(name==='orderInfo'){
            // console.log('Order info set:', data);
            postOrderInfo(data as object)
        }
        if(name==='userInfo'){
            // console.log('User info set:', data);
            postUserInfo(data as object)
        }
    }catch (error) {
        console.error(`Error setting localStorage data for ${name}:`, error);
    }
}
export function removeLocalData(name: string): void {
    try {
        localStorage.removeItem(name);
    } catch (error) {
        console.error(`Error removing localStorage data for ${name}:`, error);
    }
}
export async function postUserInfo(data: object): Promise<unknown>  {
    return await axios.post('http://localhost:4000/api/userInfo', data)
        .then(response => console.log(response))
        .catch(error => {
            console.error('Error posting user info:', error);
            throw error;
        });
}
export async function getUserInfo(): Promise<unknown> {
    return await axios.get('http://localhost:4000/api/userInfo')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching user info:', error);
            throw error;
        });
}
export  function postOrderInfo(data: object): Promise<unknown> {
    return  axios.post('http://localhost:4000/api/orderInfo', data)
        .then(response => console.log(response))
        .catch(error => {
            console.error('Error posting order info:', error);
            throw error;
        });
}