
//temporary receipt
const AddReceipt = {
    Receipt: { ID: "", UserName: "", Quantity: 0, Total: "0", CreatedAt: "" },
    ReceiptDetail: []
}

//Create new receipt ( only input username. ID and createdAt is automatically)
function AddAReceipt() {
    control.currentPage=2;
    $("#receipt").append("<div class='container' id='receiptInput'></div>");
    //reset temporary receipt
    AddReceipt.Receipt = { ID: "", UserName: "", Quantity: 0, Total: "0", CreatedAt: "" };
    AddReceipt.ReceiptDetail = [];
    //auto set ID
    if (data.Receipt.length < 9)
        AddReceipt.Receipt.ID = "PNK0" + (data.Receipt.length + 1).toString();
    else
        AddReceipt.Receipt.ID = "PNK" + (data.Receipt.length + 1).toString();
    //get dat of created at
    var curDate = new Date();
    var curTime = "";
    if (curDate.getHours() < 12)
        curTime = curDate.getHours().toString() + ":" + curDate.getMinutes().toString() + " AM";
    else
        curTime = (curDate.getHours() - 12).toString() + ":" + curDate.getMinutes().toString() + " PM";
    AddReceipt.Receipt.CreatedAt = curDate.toLocaleDateString("en-GB") + " " + curTime;
    //form
    $("#receiptInput").append("<div class='createReceipt'><p class='h2'>CREATE NEW RECEIPT</p></div");
    $(".createReceipt").append("New Receipt ID: " + AddReceipt.Receipt.ID + "</br>");
    $(".createReceipt").append("UserName: ");
    $(".createReceipt").append("<input class='form-control-lg' type='text' id='inputUserName'>" + "</br>");
    $(".createReceipt").append("Created At: " + curDate.toLocaleDateString("en-GB") + " " + curTime + "</br>");
    $(".createReceipt").append("<button class='btn btn-primary' onclick='AddAProduct()'>Create</button>");
    $(".createReceipt").append("<button class='btn btn-primary' onclick='CancelReceipt()'>Cancel</button>");
}

function CancelReceipt() {
    control.currentPage = 0;
    $("#receiptInput").remove();
    StorageTable();
}

//Add a product to receipt detail
function AddAProduct() {
    //get input username and date to temporary receipt
    if ($("#inputUserName").val() === "")
        alert("Need a username");
    else {
        AddReceipt.Receipt.UserName = $("#inputUserName").val();
        //remove create receipt. change to add receipt detail
        $(".createReceipt").remove();

        //New receipt information ( ID, username, quantity, total, createdAt)    
        $("#receiptInput").append("<div id='receiptInfor'></div>");
        $("#receiptInfor").append("<p class='h2'>Receipt Information</p>")
        $("#receiptInfor").append("<p>ID: " + AddReceipt.Receipt.ID + "</p>");
        $("#receiptInfor").append("<p>UserName: " + AddReceipt.Receipt.UserName + "</p>");
        $("#receiptInfor").append("<p id='receiptQuantity'>Quantity: " + AddReceipt.Receipt.Quantity + "</p>");
        $("#receiptInfor").append("<p id='receiptTotal'>Total: " + AddReceipt.Receipt.Total + "</p>");
        $("#receiptInfor").append("<p> Created At: " + AddReceipt.Receipt.CreatedAt + "</p>");
        $("#receiptInfor").append("<hr>");
        //input receipt detail (product and quantity each row)
        $("#receiptInfor").append("<div class='EachInput'></div");
        $(".EachInput").append("<label for'listproduct'>Product Name:</label>");
        ProductList();
        $(".EachInput").append("</br><label for='inputquantity' class='form-label'>Quantity:</label> <input class='form-control-lg' type='number' id='inputquantity'></p> </br>");
        $(".EachInput").append("<button class='btn btn-primary' onclick='AddProductClick()'>Add product</button>");
        $(".EachInput").append("<button class='btn btn-primary' onclick='CancelReceipt()'>Cancel</button>");
        //preview table
        $("#receiptInput").append("<div id='previewside'></div>");
        const previewtable = $("<table class='table table-striped' id='previewtable'><tr class='tb-label' id='previewreceipt'><th>No.</th><th>Detail ID</th><th>Receipt ID</th><th>Product ID</th><th> Product Name</th><th> Category Name</th><th>Input price</th><th>Output price</th><th>Quantity</th></tr></table>");
        $("#previewside").append(previewtable);
        //Confirm Receipt click
        $("#previewside").append("<button class='btn btn-primary' onclick='confirmClick()'>Confirm</button>");
    }
}
//add product list to dropdown selection
function ProductList() {
    $(".EachInput").append("<select class='form-select-lg mb-2' id='listproduct'></select>");
    for (let i = 0; i < data.product.length; i++)
        $("#listproduct").append("<option value='" + data.product[i].ID + "'>" + data.product[i].Name + "</option>");
}
//add a detail receipt to temporary receipt on click
function AddProductClick() {
    //data from input
    var selectedID = document.getElementById("listproduct").value;
    var quantity = parseInt($("#inputquantity").val());
    if (isNaN(quantity))
        alert("Need a quantity");
    else {
        //data found from database
        var ID = AddReceipt.ReceiptDetail.length + 1;
        var tempName = "";
        var tempcatName = "";
        var temppriceInput = "";
        var temppriceOutput = "";
        for (let i = 0; i < data.product.length; i++)
            if (selectedID == data.product[i].ID) {
                tempName = data.product[i].Name;
                tempcatName = data.product[i].catName;
                temppriceInput = data.product[i].priceInput;
                temppriceOutput = (parseInt(temppriceInput) * quantity).toString();
            }
        //add all information to temporary receipt detail
        AddReceipt.ReceiptDetail.push({
            DetailID: (ID + data.ReceiptDetail.length).toString(),
            ReceiptID: AddReceipt.Receipt.ID,
            IdProduct: selectedID,
            Name: tempName,
            catName: tempcatName,
            priceInput: temppriceInput,
            priceOutput: temppriceOutput,
            Quantity: quantity
        })
        //calculate total quantity and price
        AddReceipt.Receipt.Quantity += quantity;
        var oldTotal = parseInt(AddReceipt.Receipt.Total);
        var newTotal = oldTotal + parseInt(temppriceInput) * quantity;
        AddReceipt.Receipt.Total = newTotal.toString();
        document.getElementById("receiptQuantity").innerHTML = "Quantity: " + AddReceipt.Receipt.Quantity;
        document.getElementById("receiptTotal").innerText = "Total: " + AddReceipt.Receipt.Total;
        //reset quantity after add
        $("#inputquantity").val(null);
        eachrowPreview(AddReceipt.ReceiptDetail.length, ID + data.ReceiptDetail.length, AddReceipt.Receipt.ID, selectedID, tempName, tempcatName, temppriceInput, temppriceOutput, quantity);
    }
}

//Add a row to preview table
function eachrowPreview(No, iddetail, idreceipt, IDproduct, Name, catName, priceInput, priceOutput, quantity) {
    const eachrowpreview = $("<tr id='row" + No + "'><td >" + No + "</td><td >" + iddetail + "</td><td >" + idreceipt + "</td><td >" + IDproduct + "</td><td>" + Name + "</td><td>" + catName + "</td><td>" + priceInput + "</td><td>" + priceOutput + "</td><td>" + quantity + "</td></tr>");
    $("#previewtable").append(eachrowpreview);
}

//Confirm receipt click and push to database
function confirmClick() {
    //push temporary receipt to data (Receipt and ReceiptDetail)
    data.Receipt.push(AddReceipt.Receipt);
    for (let i = 0; i < AddReceipt.ReceiptDetail.length; i++) {
        data.ReceiptDetail.push(AddReceipt.ReceiptDetail[i]);
        AddStock(AddReceipt.ReceiptDetail[i].IdProduct, AddReceipt.ReceiptDetail[i].Quantity);
    }
    //remove receiptinput and back to storage
    $("#receiptInput").remove();
    StorageTable();
    control.currentPage = 0;
}