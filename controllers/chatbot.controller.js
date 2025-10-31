const asyncHandler = require("express-async-handler")
const ExcelJS = require("exceljs")
const ChatBot = require("../models/ChatBot")

exports.createChatbotEntry = asyncHandler(async (req, res) => {
    const { userType, name, contact, address, megawatt } = req.body

    if (!userType || !name || !contact || !address || !megawatt) {
        return res.status(400).json({ message: "All fields are required" })
    }

    await ChatBot.create({
        userType,
        name,
        contact,
        address,
        megawatt,
    })

    res.status(201).json({ message: "Chatbot entry saved successfully" })
})


exports.getAllChatbotEntries = asyncHandler(async (req, res) => {
    const entries = await ChatBot.find().sort({ createdAt: -1 })

    if (!entries || entries.length === 0) {
        return res.status(404).json({ message: "No chatbot entries found" })
    }

    res.status(200).json(entries)
})


exports.downloadChatbotExcel = asyncHandler(async (req, res) => {
    const entries = await ChatBot.find().sort({ createdAt: -1 })

    if (!entries || entries.length === 0) {
        return res.status(404).json({ message: "No chatbot entries to export" })
    }

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Chatbot Data")

    worksheet.columns = [
        { header: "User Type", key: "userType", width: 15 },
        { header: "Name", key: "name", width: 20 },
        { header: "Contact", key: "contact", width: 20 },
        { header: "Address", key: "address", width: 25 },
        { header: "MegaWatt", key: "megawatt", width: 15 },
        { header: "Date", key: "createdAt", width: 20 },
    ]

    entries.forEach((entry) => {
        worksheet.addRow({
            userType: entry.userType,
            name: entry.name,
            contact: entry.contact,
            address: entry.address,
            megawatt: entry.megawatt,
            createdAt: new Date(entry.createdAt).toLocaleString(),
        })
    })

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } }
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E293B" } }
        cell.alignment = { vertical: "middle", horizontal: "center" }
    })

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    res.setHeader(
        "Content-Disposition",
        "attachment filename=chatbot_data.xlsx"
    )

    await workbook.xlsx.write(res)
    res.end()
})
