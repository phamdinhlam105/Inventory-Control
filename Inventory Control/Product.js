function Product (Id, ProductName, IdCategory, PriceInput) {
    this.Id= Id;
    this.ProductName = ProductName;
    this.IdCategory = IdCategory;
    this.PriceInput = +PriceInput;
    this.PriceOutput = Math.round(this.PriceInput + (this.PriceInput * 0.1) + (this.PriceInput*0.3))
}

var ProductList = [
    new Product("SP01","Pepsi","Water", 9000),
    new Product("SP02","Coca","Water", 9000),
    new Product("SP03","Trà xanh C2","Water", 7000),
    new Product("SP04","Snack Khoai tây","Food", 5000),
    new Product("SP05","Bánh tráng","Food", 6000),
]

var classnameproduct = document.querySelector('.div-product');
function CheckClassProduct(){
    classnameproduct.classList.toggle("open")
    if(classnameproduct.classList.contains("open")){
        productTable("#table-product")
        classnameproduct.style.display = 'block';

    } else {
        classnameproduct.style.display = 'none';
    }
    console.log(classnameproduct);
    return classnameproduct
}

function productTable(id) {
    var table = document.querySelector(id);
    table.innerHTML =
    `<tr>
        <th>No</th>
        <th>IdProduct</th>
        <th>NameProduct</th>
        <th>Category</th>
        <th>PriceInput</th>
        <th>PriceOutput</th>
        <th>Actions</th>
    </tr>`;
    for (let i = 0; i < ProductList.length; i++) {
        table.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>${ProductList[i].Id}</td>
            <td>${ProductList[i].ProductName}</td>
            <td>${ProductList[i].IdCategory}</td>
            <td>${ProductList[i].PriceInput}</td>
            <td>${ProductList[i].PriceOutput}</td>
            <td><button onclick = "deleteItem('${ProductList[i].Id}')">Delete</button>
            <button onclick = "editItem('${ProductList[i].Id}')">Edit</button></td>
        </tr>`;
    }
}

function deleteItem(id){
    for(let i = 0 ; i < ProductList.length; i++){
        if(ProductList[i].Id === id){
            ProductList.splice(i, 1);
            productTable()
        }
    }
}

function editBtn () {
    var x = document.querySelector('#btn-action')
    x.style.backgroundColor = "yellow"
    x.style.color = "black"
    x.textContent = "Product Updates"
}

var flag = false;
function editItem(ID) { 
    editBtn()
    for (let i = 0; i < ProductList.length; i++) {
        if (ProductList[i].Id === ID) {
            document.querySelector('.productId').value = ProductList[i].Id;
            document.querySelector('.productName').value = ProductList[i].ProductName;
            document.querySelector('.productCategory').value = ProductList[i].IdCategory;
            document.querySelector('.productPrice').value = ProductList[i].PriceInput;

            var categoryChoose = document.getElementById('CategoryID');
            categoryChoose.value = ProductList[i].IdCategory;
        }
    }
    flag = true;
}

function addProduct() {
    var productId = document.querySelector('.productId').value;
    var productName = document.querySelector('.productName').value;
    var productPrice = document.querySelector('.productPrice').value;
    var productCategory = document.getElementById('CategoryID').value;

    var errorMessageAdd = document.getElementById('error-message-add');
    var ProductIndex = ProductList.findIndex(product => product.Id === productId);
    if (!flag) {
        if (ProductIndex !== -1) {
            errorMessageAdd.style.color = "red";
            errorMessageAdd.textContent = 'Product ID already exists. Please choose a different ID.';
            return; 
        }
    }
    if (productPrice.indexOf('e') !== -1 || productPrice === "" ||
        productCategory === "" || productId === "" || productName === "") {
        errorMessageAdd.style.color = "red";
        errorMessageAdd.textContent = 'Please fill in all information';
    } else {
        if (flag) {
            if (ProductIndex == -1) {
                errorMessageAdd.style.color = "red";
                errorMessageAdd.textContent = 'ID cannot be changed';
                return;
            }
            ProductList[ProductIndex].ProductName = productName;
            ProductList[ProductIndex].IdCategory = productCategory;
            ProductList[ProductIndex].PriceInput = +productPrice;
            ProductList[ProductIndex].PriceOutput = Math.round(ProductList[ProductIndex].PriceInput + (ProductList[ProductIndex].PriceInput * 0.1) + (ProductList[ProductIndex].PriceInput * 0.3));
            errorMessageAdd.style.color = 'Yellow';
            errorMessageAdd.textContent = 'Edited successfully';
            flag = false;

        } else {
            var newProduct = new Product(productId, productName, productCategory, +productPrice);
            ProductList.push(newProduct);
            errorMessageAdd.style.color = 'green';
            errorMessageAdd.textContent = 'More success';
        }
        productTable();
        document.querySelector('.productId').value = '';
        document.querySelector('.productName').value = '';
        document.querySelector('.productPrice').value = '';
    }
}


