function Receipt(Id, UserName, TotalQuantity, TotalPrice, CreatedAt) {
    this.Id = Id;
    this.UserName = UserName;
    this.TotalQuantity = TotalQuantity;
    this.TotalPrice = TotalPrice;
    this.CreatedAt = CreatedAt;
}

function ReceiptDetail(IdReceipt, IdProductRPT, NameRPT, IdCategory, PriceInput, PriceOutput, Quantity) {
    this.IdReceipt = IdReceipt;
    this.IdProductRPT = IdProductRPT;
    this.NameRPT = NameRPT;
    this.IdCategory = IdCategory;
    this.PriceInput = +PriceInput;
    this.PriceOutput = +PriceOutput;
    this.Quantity = +Quantity;
}

var classnamereceipt = document.querySelector('.div-receipt');
function CheckClassReceipt() {
    classnamereceipt.classList.toggle("open");
    if (classnamereceipt.classList.contains("open")) {
        productTable("#table-prod")
        showsReceipt();
        showsReceiptDetail();
        classnamereceipt.style.display = 'block';
    } else {
        classnamereceipt.style.display = 'none';
    }
    return classnamereceipt;
}

var ReceiptList = [];
var ReceiptDetailList = [];

function showsReceipt() {
    var tableReceipt = document.querySelector('.table-receipt');
    tableReceipt.innerHTML =
        `<tr>
            <th>No</th>
            <th>IdReceipt</th>
            <th>UserName</th>
            <th>TotalQuantity</th>
            <th>Total</th>
            <th>CreatedAt</th>
            <th>Action</th>
        </tr>`;
            
    for (let i = 0; i < ReceiptList.length; i++) {
        tableReceipt.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${ReceiptList[i].Id}</td>
                <td>${ReceiptList[i].UserName}</td>
                <td>${ReceiptList[i].TotalQuantity}</td>
                <td>${ReceiptList[i].TotalPrice}</td>
                <td>${ReceiptList[i].CreatedAt}</td>
                <td><button onclick="showsReceiptDetail('${ReceiptList[i].Id}')">Detail</button></td>
            </tr>`;
    }
}
function showsReceiptDetail(id) {
    var tableReceiptDetail = document.querySelector('.table-receiptdetail');
    tableReceiptDetail.innerHTML = `
        <tr>
            <th>Id</th>
            <th>IdReceipt</th>
            <th>Name</th>
            <th>IdProduct</th>
            <th>IdCategory</th>
            <th>PriceInput</th>
            <th>PriceOutput</th>
            <th>Quantity</th>
        </tr>`;
    var productdetails = ProductDetail(id);
    for (let i = 0; i < productdetails.length; i++) {
        tableReceiptDetail.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${productdetails[i].IdReceipt}</td>
            <td>${productdetails[i].IdProductRPT}</td>
            <td>${productdetails[i].NameRPT}</td>
            <td>${productdetails[i].IdCategory}</td>
            <td>${productdetails[i].PriceInput}</td>
            <td>${productdetails[i].PriceOutput}</td>
            <td>${productdetails[i].Quantity}</td>
        </tr>`;
    }
}

function ProductDetail(id) {
    var arrproductdetails = [];
    var findProducts = {};
    ReceiptDetailList.forEach(detail => {
        if (detail.IdReceipt === id) {
            var productId = detail.IdProductRPT;
            if (findProducts[productId]) {
                findProducts[productId].Quantity += detail.Quantity;
            } else {
                findProducts[productId] = {...detail};
                arrproductdetails.push(findProducts[productId]);
            }
        }
    });
    return arrproductdetails;
}

function totalQuantity(idRPT) {
    var result = 0;
    for (let i = 0; i < ReceiptDetailList.length; i++) {
        if (ReceiptDetailList[i].IdReceipt === idRPT) {
            result += ReceiptDetailList[i].Quantity;
        }
    }
    return result;
}

function totalPrice(idRPT) {
    var result = 0;
    for (let i = 0; i < ReceiptDetailList.length; i++) {
        if (ReceiptDetailList[i].IdReceipt === idRPT) {
            result += ReceiptDetailList[i].Quantity * ReceiptDetailList[i].PriceInput;
        }
    }
    return result;
}

function createdReceipt() {
    var receiptId = document.getElementById('receiptid').value;
    var userName = document.getElementById('username').value;
    var createdAt = document.getElementById('createdat').value;
    var quantity = document.getElementById('quantity').value;
    var productIDRPT = document.querySelector('.productid-rpt').value;
    var errorcrreceipt = document.getElementById('error-message-crreceipt');

    var existingRecord = ReceiptList.find(
        receipt => receipt.Id === receiptId && receipt.CreatedAt !== createdAt
    );
    if (existingRecord || quantity < 1) {
        errorcrreceipt.style.color = "red";
        errorcrreceipt.textContent = 'ID already exists or Quantity not available';
    } else {
        for (let i = 0; i < ProductList.length; i++) {
            if (ProductList[i].Id === productIDRPT)   {
                var receiptDetail = new ReceiptDetail(
                    receiptId,
                    productIDRPT,
                    ProductList[i].ProductName,
                    ProductList[i].IdCategory,
                    ProductList[i].PriceInput,
                    ProductList[i].PriceOutput,
                    quantity
                );
                ReceiptDetailList.push(receiptDetail);

                var q = totalQuantity(receiptId);
                var t = totalPrice(receiptId);
                var receipt = new Receipt(receiptId, userName, q, t, createdAt);
                
                var index = ReceiptList.findIndex(
                    receipt => receipt.Id === receiptId && receipt.CreatedAt === createdAt
                );
                if (index !== -1) {
                    ReceiptList[index] = receipt;
                } else {
                    ReceiptList.push(receipt);
                }

                errorcrreceipt.style.color = "green";
                errorcrreceipt.textContent = 'Created successfully';
                showsReceipt();
            } else {
                errorcrreceipt.style.color = "red";
                errorcrreceipt.textContent = 'Product id does not exist';
            }
        }
    }
}