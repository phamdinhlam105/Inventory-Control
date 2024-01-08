//base data

const data = {
    product: [
        { ID: "SP01", Name: "Pepsi", catName: "Water", priceInput: "9000", priceOutput: "" },
        { ID: "SP02", Name: "Coca", catName: "Water", priceInput: "8500", priceOutput: "" },
        { ID: "SP03", Name: "Trà Xanh C2", catName: "Water", priceInput: "7000", priceOutput: "" },
        { ID: "SP04", Name: "Snack Khoai Tây", catName: "Food", priceInput: "5000", priceOutput: "" },
        { ID: "SP05", Name: "Bánh tráng", catName: "Food", priceInput: "6000", priceOutput: "", }
    ],
    Receipt: [
        { ID: "PNK01", UserName: "Trần Văn A", Quantity: 154, Total: 0, CreatedAt: "10/02/2022 2:30PM" },
        { ID: "PNK02", UserName: "Nguyễn Thị Leo", Quantity: 22, Total: 0, CreatedAt: "15/02/2023 8:30PM" }
    ],
    ReceiptDetail: [
        { DetailID: "1", ReceiptID: "PNK01", IdProduct: "SP01", Name: "Pepsi", catName: "Water", priceInput: "9000", priceOutput: "", Quantity: 5 },
        { DetailID: "2", ReceiptID: "PNK01", IdProduct: "SP02", Name: "Coca", catName: "Water", priceInput: "9000", priceOutput: "", Quantity: 7 },
        { DetailID: "3", ReceiptID: "PNK01", IdProduct: "SP03", Name: "Trà xanh C2", catName: "Water", priceInput: "7000", priceOutput: "", Quantity: 3 },
        { DetailID: "4", ReceiptID: "PNK01", IdProduct: "SP04", Name: "Snack Khoai Tây", catName: "Food", priceInput: "5000", priceOutput: "", Quantity: 9 },
        { DetailID: "5", ReceiptID: "PNK01", IdProduct: "SP05", Name: "Bánh tráng", catName: "Food", priceInput: "6000", priceOutput: "", Quantity: 100 },
        { DetailID: "6", ReceiptID: "PNK01", IdProduct: "SP03", Name: "Trà xanh C2", catName: "Water", priceInput: "7000", priceOutput: "", Quantity: 30 },
        { DetailID: "7", ReceiptID: "PNK02", IdProduct: "SP01", Name: "Pepsi", catName: "Water", priceInput: "10000", priceOutput: "", Quantity: 10 },
        { DetailID: "8", ReceiptID: "PNK02", IdProduct: "SP02", Name: "Coca", catName: "Water", priceInput: "12000", priceOutput: "", Quantity: 12 },
    ],
    ProductInStock: [
        { No: 1, ID: "SP01", Stock: 15 },
        { No: 2, ID: "SP02", Stock: 19 },
        { No: 3, ID: "SP03", Stock: 33 },
        { No: 4, ID: "SP04", Stock: 9 },
        { No: 5, ID: "SP05", Stock: 100 }
    ]
}

//Calculate Total of each receipt
function EachReceiptTotal(IDofRecei) {
    let total = 0;
    for (let i = 0; i < data.ReceiptDetail.length; i++) {
        if (data.ReceiptDetail[i].ReceiptID === IDofRecei)
            total += parseInt(data.ReceiptDetail[i].priceInput) * parseInt(data.ReceiptDetail[i].Quantity);
    }
    for (let i = 0; i < data.Receipt.length; i++)
        if (data.Receipt[i].ID === IDofRecei)
            data.Receipt[i].Total = total.toString();
}

function AddStock(id, num) {
    for (let i = 0; i < data.ProductInStock.length; i++)
        if (data.ProductInStock[i].ID === id)
            data.ProductInStock[i].Stock += num;
}

function calculateOutputPrice() {
    for (let i = 0; i < data.product.length; i++)
        data.product[i].priceOutput = (parseFloat(data.product[i].priceInput) * 1.3).toString();
}

calculateOutputPrice();

function calculateReceiptOutput() {
    for (let i = 0; i < data.ReceiptDetail.length; i++){
        let input=parseFloat(data.ReceiptDetail[i].priceInput);
        let output=input*data.ReceiptDetail[i].Quantity;
        data.ReceiptDetail[i].priceOutput = output.toString();
    }
}
calculateReceiptOutput();