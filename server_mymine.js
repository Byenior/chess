const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", async (msg) => {
    // io.emit("message", msg);
    console.log("msg : ", msg);
    await addDataExcel(msg.player, msg.msg);
    // });

    // socket.on("message", (msg) => {
    await pullLastRowFromExcel().then((data) => {
      if (data) {
        console.log("data : ", data);
        io.emit("message", data);
      }
    });
  });

  // socket.on("action", (msg) => {
  //   console.log(msg);
  //   io.emit("action", msg);
  // });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "field.html"));
});

server.listen(7777, () => {
  console.log("server running at http://localhost:7777");
});

// data
const ExcelJS = require("exceljs");

async function createExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("chat"); // สร้างแผ่นข้อมูลใหม่หรือเลือกแผ่นที่มีอยู่แล้ว
  // เพิ่มข้อมูลลงในแถวแรก
  // worksheet.addRow(["Name", "Message", "Date"]);

  // บันทึกไฟล์ Excel
  await workbook.xlsx.writeFile("data/data.xlsx");
}

createExcel().catch(console.error);

async function addDataExcel(name, msg) {
  const workbook = new ExcelJS.Workbook();
  let worksheet;

  try {
    await workbook.xlsx.readFile("data/data.xlsx");
    worksheet = workbook.getWorksheet("chat");
  } catch (error) {
    worksheet = workbook.addWorksheet("chat");
  }

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0"); // Ensure 2 digits for hours
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Ensure 2 digits for minutes
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Ensure 2 digits for seconds

  const timeFormatted = `${hours}:${minutes}:${seconds}`;

  // Check if worksheet has any data
  if (worksheet.getRow(1).values.length === 0) {
    // If the first row is empty, add headers
    // worksheet.addRow(["Name", "Message", "Date"]);
  }

  // Find the last row index
  const lastRowIndex = worksheet.rowCount;

  // Add new data as the last row
  const newRow = [name, msg, timeFormatted];
  worksheet.addRow(newRow, lastRowIndex + 1); // Add row after the last row

  // Save the changes to the Excel file
  await workbook.xlsx.writeFile("data/data.xlsx");
}

async function pullLastRowFromExcel() {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile("data/data.xlsx");
    const worksheet = workbook.getWorksheet("chat");

    const lastRow = worksheet.lastRow;
    const rowData = lastRow.values;

    // Extract data from the last row
    const data = {
      name: rowData[1],
      message: rowData[2],
      date: rowData[3],
    };

    return data;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return null;
  }
}

// Usage
