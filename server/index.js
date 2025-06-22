import express from 'express';
import cors from 'cors';
import fs, { fchown } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');
const PORT = 4321
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(distPath));

const db = {
    classTypeList : [
        {
          id: 1,
          name: "包退班",
          desc: "承诺未通过考试全额退款",
          remainAmount: 10,
          price: 1000,
          features: ["专业教材", "1对1辅导"],
        },
        {
          id: 2,
          name: "非包退班",
          desc: "性价比之选，无退款承诺",
          remainAmount: 10,
          price: 1000,
          features: ["专业教材", "1对1辅导"],
        },
      ]
}

// let data = {}
function getAllData(){
    const data = fs.readFileSync('data.json', 'utf-8');
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Error parsing JSON data:', error);
        return {};
    }
    // return data;
}
function saveData(newData){
    fs.writeFileSync('data.json', JSON.stringify(newData, null, 2));
    // data = newData;
    // console.log('Data saved successfully');
    // console.log('data:', data);
}
function updateUserInfo(userInfo){
    const data = getAllData();
    const newData = {...data, userInfo};
    saveData(newData);
}
function updateOrderInfo(orderInfo){
    const data = getAllData();
    const newData = {...data, orderInfo};
    saveData(newData);
}
app.post('/api/userInfo',(req,res)=>{
    const data = req.body;
    updateUserInfo(data);
    res.json({status: 'ok', message: 'User info updated successfully'});
})
app.post('/api/orderInfo',(req,res)=>{
    const data = req.body;
    updateOrderInfo(data);
    res.json({status: 'ok', message: 'Order info updated successfully'});
})

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin123') {
        res.json({ status: 'ok', message: 'Login successful' });
    } else {
        res.json({ status: 'error', message: 'Invalid credentials' });
    }
})

app.get('*',(req,res)=>{
    res.send({status:404})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});