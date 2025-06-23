import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "..", "..", "react", "dist");
console.log(distPath);
const PORT = 4321;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(distPath));
interface ClassType {
  id: number;
  name: string;
  desc: string;
  remainAmount: number;
  price: number;
  features: string[];
}

interface UserInfo {
  [key: string]: any;
}

interface OrderInfo {
  [key: string]: any;
}

interface DB {
  classTypeList: ClassType[];
}

const db: DB = {
  classTypeList: [
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
  ],
};

function getAllData(): Record<string, any> {
  try {
    const data = fs.readFileSync("data.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return {};
  }
}

function saveData(newData: Record<string, any>): void {
  fs.writeFileSync("data.json", JSON.stringify(newData, null, 2));
}

function updateUserInfo(userInfo: UserInfo): void {
  const data = getAllData();
  const newData = { ...data, userInfo };
  saveData(newData);
}

function updateOrderInfo(orderInfo: OrderInfo): void {
  const data = getAllData();
  const newData = { ...data, orderInfo };
  saveData(newData);
}

app.post("/api/userInfo", (req: Request, res: Response) => {
  const data: UserInfo = req.body;
  updateUserInfo(data);
  res.json({ status: "ok", message: "User info updated successfully" });
});

app.post("/api/orderInfo", (req: Request, res: Response) => {
  const data: OrderInfo = req.body;
  updateOrderInfo(data);
  res.json({ status: "ok", message: "Order info updated successfully" });
});

app.post("/admin/login", (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  if (username === "admin" && password === "admin123") {
    res.json({ status: "ok", message: "Login successful" });
  } else {
    res.json({ status: "error", message: "Invalid credentials" });
  }
});

app.get("*", (req: Request, res: Response) => {
  res.send({ status: 404 });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
