const { workerData, parentPort } = require('worker_threads');
const axios = require('axios');

const generateInvoice = async (orderId) => {
  try {
    const invoiceData = {
      "qrData": "https://yourwebsite.com",
      "companyName": "Fibre Bond Industries",
      "companyAddress": "A-418, T.T.C. Industrial Area, Sector 2, Mahape, Navi Mumbai, Maharashtra 400710",
      "companyPAN": "AEJPK4753R",
      "companyGSTIN": "27AEJPK4753R1ZP",
      "invoiceNumber": "#PI225062024",
      "invoiceDate": "June 25, 2024",
      "orderNumber": "15314",
      "orderDate": "June 25, 2024",
      "billingName": "Khushi Punmiya",
      "billingAddress": "Maharashtra, Navi Mumbai, Maharashtra 400701",
      "billingEmail": "priyenmhaskar@gmail.com",
      "billingPhone": "+919191917977168289",
      "items": [
        {
          "description": "Phone Pe",
          "hsnSac": "",
          "qty": 1,
          "price": 9.52,
          "amount": 9.52,
          "discount": 0.00,
          "cgst": 0.24,
          "sgst": 0.24,
          "total": 10.00
        },
        {
          "description": "Phone Pe",
          "hsnSac": "",
          "qty": 1,
          "price": 9.52,
          "amount": 9.52,
          "discount": 0.00,
          "cgst": 0.24,
          "sgst": 0.24,
          "total": 10.00
        }
      ],
      "totals": {
        "qty": 2,
        "price": 19.04,
        "discount": 0.00,
        "cgst": 0.48,
        "sgst": 0.48,
        "grandTotal": 20.00,
        "totalInWords": "Twenty"
      },
      "uniqueId": orderId
    };

    const response = await axios.post('http://localhost:5000/api/v1/invoices/', invoiceData);
    parentPort.postMessage('Invoice generated and uploaded successfully');
  } catch (error) {
    parentPort.postMessage(`Error generating invoice: ${error.message}`);
  }
};

generateInvoice(workerData.orderId);
