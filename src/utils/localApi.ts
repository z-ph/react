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