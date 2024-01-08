//each row of storage
function eachrowReceipt(No, id, UserName, Quantity, Total, CreatedAt) {
    const eachrowreceipt = $("<tr id='row" + No + "'><td >" + No + "</td><td>" + id + "</td><td>" + UserName + "</td><td>" + Quantity + "</td><td>" + Total + "</td><td>" + CreatedAt + "</td><td><button class='btn btn-primary' onclick=OneReceiptDetail(this.parentNode.parentNode.id)>Detail</button></td></tr>");
    return eachrowreceipt;
}
function ReceiptTable() {
    //init table
    $("#receipt").append("<div id='receiptlist'></div>");
    $("#receiptlist").append("<h2>Receipt List</h2>");

    const receiptTable = $("<table class='table table-striped'><tr class='tb-label'><th>No.</th><th>ID </th><th>UserName</th><th>Quantity</th><th>Total</th><th>CreatedAt</th><th></th></tr></table>");
    $("#receiptlist").append(receiptTable);
    //add each row
    for (let i = 0; i < data.Receipt.length; i++) {
        //add total
        EachReceiptTotal(data.Receipt[i].ID);
        $("#receiptlist table").append(eachrowReceipt((i + 1), data.Receipt[i].ID, data.Receipt[i].UserName, data.Receipt[i].Quantity, data.Receipt[i].Total, data.Receipt[i].CreatedAt));
    }
    $("#receiptlist").append("<button class='btn btn-primary'onclick='AllReceiptDetail()'>All Receip Detail</button>");
}
function RemoveReceiptTable() {
    $("#receiptlist").remove();
}


function OneReceiptDetail(id) {
    control.currentPage=-1;
    RemoveReceiptTable();
    var id = parseInt(id.slice(3, id.length)) - 1;
    let no = 0
    $("#receipt").append("<div id='AllReceiptDetail'></div>");
    const onereceipt = $("<table id='receiptdetail' class='table table-striped'><tr class='tb-label'><th>No.</th><th>Detail ID</th><th>Receipt ID</th><th>Product ID</th><th> Product Name</th><th> Category Name</th><th>Input price</th><th>Output price</th><th>Quantity</th></tr></table>");
    $("#AllReceiptDetail").append(onereceipt);
    for (let i = 0; i < data.ReceiptDetail.length; i++)
        if (data.Receipt[id].ID == data.ReceiptDetail[i].ReceiptID) {
            no++;
            $("#receiptdetail").append(EachRowDetail(no, data.ReceiptDetail[i].DetailID, data.ReceiptDetail[i].ReceiptID, data.ReceiptDetail[i].IdProduct, data.ReceiptDetail[i].Name, data.ReceiptDetail[i].catName, data.ReceiptDetail[i].priceInput, data.ReceiptDetail[i].priceOutput, data.ReceiptDetail[i].Quantity));
        }
    $("#AllReceiptDetail").append("<button class='btn btn-primary' onclick='AllReceiptBack()'>Back</button>");
}
function EachRowDetail(No, iddetail, idreceipt, IDproduct, Name, catName, priceInput, priceOutput, quantity) {
    const eachrowdetail = $("<tr id='row" + No + "'><td >" + No + "</td><td >" + iddetail + "</td><td >" + idreceipt + "</td><td >" + IDproduct + "</td><td>" + Name + "</td><td>" + catName + "</td><td>" + priceInput + "</td><td>" + priceOutput + "</td><td>" + quantity + "</td></tr>");
    return eachrowdetail;
}

function AllReceiptDetail() {
    control.currentPage=-1;
    RemoveReceiptTable();
    let no = 0;
    $("#receipt").append("<div id='AllReceiptDetail'></div>");
    $("#AllReceiptDetail").append("<h2>ALL RECEIPT DETAIL</h2>");
    const allreceipt = $("<table class='table table-striped' id='receiptdetail'><tr class='tb-label'><th>No.</th><th>Detail ID</th><th>Receipt ID</th><th>Product ID</th><th> Product Name</th><th> Category Name</th><th>Input price</th><th>Output price</th><th>Quantity</th><th>DateAdded</th></tr></table>");
    $("#AllReceiptDetail").append(allreceipt);
    for (let i = 0; i < data.ReceiptDetail.length; i++) {
        no++;
        $("#receiptdetail").append(EachRowDetail(no, data.ReceiptDetail[i].DetailID, data.ReceiptDetail[i].ReceiptID, data.ReceiptDetail[i].IdProduct, data.ReceiptDetail[i].Name, data.ReceiptDetail[i].catName, data.ReceiptDetail[i].priceInput, data.ReceiptDetail[i].priceOutput, data.ReceiptDetail[i].Quantity));
        for (let j = 0; j < data.Receipt.length; j++)
            if (data.ReceiptDetail[i].ReceiptID == data.Receipt[j].ID) 
                $("#AllReceiptDetail #row" + no).append("<td>" + data.Receipt[j].CreatedAt + "</td>");     
    }
    $("#AllReceiptDetail").append("<button class='btn btn-primary' onclick='AllReceiptBack()'>Back</button>");
}

function AllReceiptBack() {
    $("#AllReceiptDetail").remove();
    ReceiptTable();
    control.currentPage=1;
}
