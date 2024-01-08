
function AddNewProduct() {
    RemoveStorageTable();
    control.currentPage = -1;
    $("#product").append("<div id='addproduct'></div>");
    $("#addproduct").append("<h2>ADD NEW PRODUCT</h2>");
    $("#addproduct").append(" Name: <input type='text' id='productname'>");
    $("#addproduct").append(" catName: <input type='text' id='catName'>");
    $("#addproduct").append(" priceInput: <input type='number' id='productprice'>");
    $("#addproduct").append("<button class='btn btn-primary' onclick='NewProductClick()'>ADD PRODUCT</button>");
    $("#addproduct").append("<button class='btn btn-primary' onclick='CancelAddProduct()'>Cancel</button>");

}


function NewProductClick() {
    var newproduct = { ID: "", Name: "", catName: "", priceInput: "", priceOutput: "" };
    //set auto ID 
    if (data.product.length < 9)
        newproduct.ID = "SP0" + (data.product.length + 1);
    else
        newproduct.ID = "SP" + (data.product.length + 1);
    //input condition
    let valid = true;
    if ($("#productname").val() === "") {
        alert("Need a product name");
        valid = false;
    }
    if ($("#catName").val() === "") {
        alert("Need a category name");
        valid = false;
    }
    if (isNaN(parseInt($("#productprice").val()))) {
        alert("Need a input price");
        valid = false;
    }
    if (valid == true) {
        //get input
        newproduct.Name = $("#productname").val();
        newproduct.catName = $("#catName").val();
        newproduct.priceInput = $("#productprice").val();
        newproduct.priceOutput = (parseFloat(newproduct.priceInput) * 1.3).toString();
        //push input to data
        data.product.push(newproduct);
        data.ProductInStock.push({ No: data.ProductInStock.length + 1, ID: newproduct.ID, Stock: 0 });
        //back to storage
        CancelAddProduct();
    }
}

function CancelAddProduct() {
    $("#addproduct").remove();
    StorageTable();
    control.currentPage = 0;
}