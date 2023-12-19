// ! main CRUD variable
let productList = [];

// ?====== Inputs ======
const productNameInput = document.querySelector("#productName");
const productPriceInput = document.querySelector("#productPrice");
const productCategorySelector = document.querySelector("#productCategory");
const productSaleCheck = document.querySelector("#productSale");
const productDescriptionInput = document.querySelector("#productDescription");
const searchInput = document.querySelector("#search");

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
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
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
  showData();
});

// ?====== clearing the inputs ======
clearFormBtn.addEventListener("click", function () {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategorySelector.value = "Select Category";
  productSaleCheck.checked = false;
  productDescriptionInput.value = "";
});

// ?====== Searching for specific product name or category ======
searchInput.addEventListener("keyup", function () {
  // * m3 kol harf hay3ml search wa yzhrle el result fe table
  // * hashuf el productName be includes el searchValue
  // * mahma katbt el name lowerCase aw upperCase lazm a7wlo wa a3ml replace

  let serachValue = searchInput.value.toLowerCase();
  let searchResult = "";
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].productName.toLowerCase().includes(serachValue) == true ||
      productList[i].productCategory.toLowerCase().includes(serachValue) == true
    ) {
      searchResult += `<tr>
            <td>${i}</td>
            <td>${productList[i].productName
              .toLowerCase()
              .replace(
                serachValue,
                `<span class='bg-info'>${serachValue}</span>`
              )}</td>
            <td>${productList[i].productPrice}</td>
            <td>${productList[i].productCategory}</td>
            <td>${productList[i].productIsOnSale}</td>
            <td>${productList[i].productDescription}</td>
            <td><button class="btn btn-warning">update</button></td>
            <td><button class="btn btn-danger">delete</button></td>
          </tr>`;
    }
  }
  tableBodyData.innerHTML = searchResult;
});


// ?====== Remove Product from the table ======
function deleteProduct(deletedIndex){
  productList.splice(deletedIndex ,1);
  showData()
}