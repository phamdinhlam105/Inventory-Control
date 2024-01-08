//each row of storage
function eachrowstorage(No, name, stock) {
    const eachrowStorage = $("<tr id='row" + No + "'><td>" + No + "</td><td>" + name + "</td><td>" + stock + "</td><td><button class='btn btn-primary' onclick='DetailProduct(this.parentNode.parentNode.id)'>Detail</button></td</tr>");
    return eachrowStorage;
}
function StorageTable() {
    //init table
    $("#storage").append("<div id='mainpage' class='col-center'><p class='h2'>Product In Stock</p></div>");
    const storagetable = $("<table class='table table-striped' id='storagetable'><tr class='tb-label'><th>No.</th><th>Name</th><th>Stock</th><th></th></tr></table>");
    $("#mainpage").append(storagetable);
    //add each row
    for (let i = 0; i < data.ProductInStock.length; i++) {
        $("#storage table").append(eachrowstorage(data.ProductInStock[i].No, data.product[i].Name, data.ProductInStock[i].Stock));
    }
    $("#mainpage").append("<button class='btn btn-primary' onclick='AddNewProduct()'>ADD NEW PRODUCT</button>");
}

function RemoveStorageTable() {
    $("#mainpage").remove();
}

function DetailProduct(id) {
    control.currentPage=-1;
    var rownum = parseInt(id.slice(3, id.length));
    //one product detail
    RemoveStorageTable();
    const Detailtable = $("<table><tr class='tb-label'><th>ID Product</th><th>Name</th><th>Category Name</th><th>PriceInput</th><th>PriceOutput</th><th> </th></tr></table>");
    $("#storage").append("<div id='detail'></div>");
    $("#detail").append("<p ='h2'>Product detail</p>");
    $("#detail").append(Detailtable);
    $("#detail table").append("<tr id='detailtable'><td>" + data.product[rownum - 1].ID + "</td><td>" + data.product[rownum - 1].Name + "</td><td>" + data.product[rownum - 1].catName + "</td><td>" + data.product[rownum - 1].priceInput + "</td><td>" + data.product[rownum - 1].priceOutput + "</td><td><button class='btn btn-primary' onclick='EditProduct(" + (rownum - 1) + ")'>Edit</button></td></tr>");
    $("#detail").append("</br><button class='btn btn-primary' onclick='BacktoStorage()'>Back</button>");
}

function BacktoStorage() {
    $("#detail").remove();
    StorageTable();
    control.currentPage=0;
}

function EditProduct(id) {
    //edit directly
    $("#detailtable").empty();
    $("#detailtable").append("<td>" + data.product[id].ID + "</td>");
    $("#detailtable").append("<td><input type='text' value='" + data.product[id].Name + "' id='editname'></td>");
    $("#detailtable").append("<td><input type='text' value='" + data.product[id].catName + "' id='editcatname'></td>");
    $("#detailtable").append("<td><input type='number' value='" + data.product[id].priceInput + "' id='editpriceinput'></td>");
    $("#detailtable").append("<td>" + data.product[id].priceOutput + "</td>");
    $("#detailtable").append("<td><button class='btn btn-primary' onclick='ConfirmEdit(" + id + ")'>Confirm</button></td>");
}

function ConfirmEdit(id) {
    //input condition
    let valid = true;
    if ($("#editname").val() === "") {
        alert("Need a product name");
        valid = false;
    }
    if ($("#editcatname").val() === "") {
        alert("Need a category name");
        valid = false;
    }
    if (isNaN(parseInt($("#editpriceinput").val()))) {
        alert("Need a input price");
        valid = false;
    }
    if (valid == true) {
        //edit data and back to detail
        data.product[id].Name = $("#editname").val();
        data.product[id].catName = $("#editcatname").val();
        data.product[id].priceInput = $("#editpriceinput").val();
        data.product[id].priceOutput = (parseFloat(data.product[id].priceInput) * 1.3).toString();
        var row = "row" + (id + 1);
        $("#detail").remove();
        DetailProduct(row);
    }
}