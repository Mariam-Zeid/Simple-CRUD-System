// ?====== Inputs ======
const productNameInput = document.querySelector("#productName");
const productPriceInput = document.querySelector("#productPrice");
const productCategorySelector = document.querySelector("#productCategory");
const productSaleCheck = document.querySelector("#productSale");
const productDescriptionInput = document.querySelector("#productDescription");
const searchInput = document.querySelector("#search");

// ?====== buttons ======
const addProductBtn = document.querySelector("#addProduct");
const editProductBtn = document.querySelector("#editProduct");
const clearFormBtn = document.querySelector("#clearForm");

// ?====== Table Body ======
const tableBodyData = document.querySelector("#tableData");

// ?====== Other Variables ======
let currentIndex = -1;

// ?====== Validation Variables ======
let productNameValidation; // initial value
let productPriceValidation; // initial value

// ! main CRUD variable (lw el array sh fady rag3le el values ely gwah wa ezherha)
let productList = [];
if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  showData();
}

// ! ================ Functions ================

//***************************************************/
// ? main function (VALIDATION)
//***************************************************/

function validate(regex, inputElement) {
  const isValid = regex.test(inputElement.value);
  if (isValid) {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
  } else {
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
  }
  return isValid;
}

// ? Checking the validation of the product name
productNameInput.addEventListener("change", function () {
  /*
   * * [A-Z] => Lazm awel harf ykon Capitial
   * * [a-z]+ => aktr zai mana 3aiza bs horof bas
   * * [0-9]? => optional
   */
  const regexName = /^[A-Z][a-z]+[0-9]?$/;
  // const isValid = validate(regexName, productNameInput);
  // console.log(isValid);
  productNameValidation = validate(regexName, productNameInput);
});

// ? Checking the validation of the product price
productPriceInput.addEventListener("change", function () {
  /*
   * * [A-Z] => Lazm awel harf ykon Capitial
   * * [a-z]+ => aktr zai mana 3aiza bs horof bas
   * * [0-9]? => optional
   */
  const regexPrice = /^[1-9][0-9]{1,5}$/;
  // const isValid = validate(regexPrice, productPriceInput);
  // console.log(isValid);
  productPriceValidation = validate(regexPrice, productPriceInput);
});

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
            <td><button onclick="editProduct(${i})" class="btn btn-warning">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
          </tr>`;
  }
  tableBodyData.innerHTML = temp;
}

// ?====== Add Product to the table ======
addProductBtn.addEventListener("click", function () {
  if (productNameValidation && productPriceValidation) {
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

    localStorage.setItem("productList", JSON.stringify(productList));
  } else {
    alert("Enter valid values");
  }
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
function deleteProduct(deletedIndex) {
  productList.splice(deletedIndex, 1);
  showData();

  localStorage.setItem("productList", JSON.stringify(productList));
}

// ?====== Edit Product in the table ======
function editProduct(editedProduct) {
  currentIndex = editedProduct;

  // * bakhud el product values wa armeha fo2 fel inputs
  productNameInput.value = productList[editedProduct].productName;
  productPriceInput.value = productList[editedProduct].productPrice;
  productCategorySelector.value = productList[editedProduct].productCategory;
  productSaleCheck.checked = productList[editedProduct].productIsOnSale;
  productDescriptionInput.value = productList[editedProduct].productDescription;

  // ? Adding and Removing classes from HTML Document
  addProductBtn.classList.add("d-none");
  editProductBtn.classList.remove("d-none");
}

editProductBtn.addEventListener("click", function () {
  if (productNameValidation && productPriceValidation) {
    // * bakhud el product values mn el inputs wa arg3ha taht tany
    let updatedProduct = {
      productName: productNameInput.value,
      productPrice: productPriceInput.value,
      productCategory: productCategorySelector.value,
      productIsOnSale: productSaleCheck.checked,
      productDescription: productDescriptionInput.value,
    };
    productList[currentIndex] = updatedProduct;

    // ? Display the remaining Objects Properties in the table
    showData();

    // ? Storing all the new information in the local storage. (kol mara hams7 object ha set mn gded)
    localStorage.setItem("productList", JSON.stringify(productList));

    // ? Adding and Removing classes from HTML Document
    addProductBtn.classList.remove("d-none");
    editProductBtn.classList.add("d-none");
  } else {
    alert("Enter valid values");
  }
});
