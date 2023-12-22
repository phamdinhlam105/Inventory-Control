function Inventory(IdProduct, Name, TotalQuantityReccent, TotalPriceReccent, IdCategory, TotalQuantityInventory, TotalPriceInventory) {
    this.IdProduct = IdProduct;
    this.Name = Name;
    this.TotalQuantityReccent = TotalQuantityReccent;
    this.TotalPriceReccent = TotalPriceReccent;
    this.IdCategory = IdCategory;
    this.TotalQuantityInventory = TotalQuantityInventory;
    this.TotalPriceInventory = TotalPriceInventory;
}

var InventoryList = [];

var classnameinventory = document.querySelector('.div-inventory');
function CheckClassInventory() {
    classnameinventory.classList.toggle("open");
    if (classnameinventory.classList.contains("open")) {
        showInventory()
        classnameinventory.style.display = 'block';
    } else {
        classnameinventory.style.display = 'none';
    }
    return classnameinventory;
}


function showInventory() {
    var tableInventory = document.querySelector('.table-inventory');
    tableInventory.innerHTML = `
    <tr>
        <th>No</th>
        <th>IdProduct</th>
        <th>NameProduct</th>
        <th>TQuantityReccent</th>
        <th>TPriceReccent</th>
        <th>IdCategory</th>
        <th>TQuantityInventory</th>
        <th>TPriceInventory</th>
    </tr>`;









    

    for (let i = 0; i < ReceiptDetailList.length; i++) {
        var productDetail = ReceiptDetailList[i];
        var product = ProductList.find(Product => Product.Id === productDetail.IdProductRPT);
        if (product){
            var existingProduct = InventoryList.find(inventory => inventory.IdProduct === productDetail.IdProductRPT);
            if (!existingProduct) {
                InventoryList.push({
                    IdProduct: productDetail.IdProductRPT,
                    Name: productDetail.NameRPT,
                    TotalQuantityReccent: 0,
                    TotalPriceReccent: 0,
                    IdCategory: productDetail.IdCategory,
                    TotalQuantityInventory: 0,
                    TotalPriceInventory: 0
                });
                existingProduct = InventoryList[InventoryList.length - 1];
            }

            existingProduct.TotalQuantityReccent += productDetail.TotalQuantityReccent;
            existingProduct.TotalPriceReccent += productDetail.TotalPriceReccent;

            existingProduct.TotalQuantityInventory += productDetail.Quantity;
            existingProduct.TotalPriceInventory += productDetail.Quantity * product.PriceInput;
        }
    }

    for (let i = 0; i < InventoryList.length; i++) {
        tableInventory.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${InventoryList[i].IdProduct}</td>
            <td>${InventoryList[i].Name}</td>
            <td>${InventoryList[i].TotalQuantityReccent}</td>
            <td>${InventoryList[i].TotalPriceReccent}</td>
            <td>${InventoryList[i].IdCategory}</td>
            <td>${InventoryList[i].TotalQuantityInventory}</td>
            <td>${InventoryList[i].TotalPriceInventory}</td>
        </tr>`;
    }
}
