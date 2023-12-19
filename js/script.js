// ! main CRUD variable
let productList = [];

// ?====== Inputs ======
const productNameInput = document.querySelector("#productName");
const productPriceInput = document.querySelector("#productPrice");
const productCategorySelector = document.querySelector("#productCategory");
const productSaleCheck = document.querySelector("#productSale");
const productDescriptionInput = document.querySelector("#productDescription");

// ?====== buttons ======
const addProductBtn = document.querySelector("#addProduct");
const clearFormBtn = document.querySelector("#clearForm");

// ?====== Table Body ======
const tableBodyData = document.querySelector("#tableData");


// ! ================ Functions ================

// ?====== Display Data ======
function showData() {
  // * harg3 kol el data el fel table ala shakl string
  let temp = "";
  for (let i = 0; i < productList.length; i++) {
    temp += `<tr>
            <td>${i}</td>
            <td>${productList[i].productName}</td>
            <td>${productList[i].productPrice}</td>
            <td>${productList[i].productCategory}</td>
            <td>${productList[i].productIsOnSale}</td>
            <td>${productList[i].productDescription}</td>
            <td><button class="btn btn-warning">update</button></td>
            <td><button class="btn btn-danger">delete</button></td>
          </tr>`;
  }
  tableBodyData.innerHTML = temp;
}

// ?====== Add Product to the table ======
addProductBtn.addEventListener("click", function () {
  // * kol mara h3ml add hazawed object gded ala el productList
  product = {
    productName: productNameInput.value,
    // Number() 3shan ay haga btrg3 mn el HTML btkon String
    productPrice: Number(productPriceInput.value),
    productCategory: productCategorySelector.value,
    // Boolean Value
    productIsOnSale: productSaleCheck.checked,
    productDescription: productDescriptionInput.value,
  };
  productList.push(product);
  showData()
});
