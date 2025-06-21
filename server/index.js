import express from 'express';
import cors from 'cors';
import fs, { fchown } from 'fs';
const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());
let data = {}
function getAllData(){
    // const data = fs.readFileSync('data.json', 'utf-8');
    // try {
    //     return JSON.parse(data);
    // } catch (error) {
    //     console.error('Error parsing JSON data:', error);
    //     return {};
    // }
    return data;
}
function saveData(newData){
    // fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    data = newData;
    console.log('Data saved successfully');
    console.log('data:', data);
}
function updateUserInfo(userInfo){
    const data = getAllData();
    const newData = {...data, userInfo};
    saveData(newData);
}
function updateOrderInfo(courseInfo){
    const data = getAllData();
    const newData = {...data, courseInfo};
    saveData(newData);
}
app.post('/api/userInfo',(req,res)=>{
    const data = req.body;
    updateUserInfo(data);
    res.json({status: 'success', message: 'User info updated successfully'});
})
app.post('/api/orderInfo',(req,res)=>{
    const data = req.body;
    updateOrderInfo(data);
    res.json({status: 'success', message: 'Order info updated successfully'});
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});