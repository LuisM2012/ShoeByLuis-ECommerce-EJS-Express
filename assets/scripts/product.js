const PRODUCTS = getData();

function getAll()
{
  let ALL = [];
  PRODUCTS.forEach((item) => {
    ALL.push(item)
  })
  return ALL;
}

function getWomen()
{
  let ALL = [];
  PRODUCTS.forEach((item) => {
    if (item.type.match("women")) {
      ALL.push(item)
    }
  })
  return ALL;
}

function getMen()
{
  let ALL = [];
  PRODUCTS.forEach((item) => {
    if (item.type=="men") {
      ALL.push(item)
    }
  })
  return ALL;
}

function getKid()
{
  let ALL = [];
  PRODUCTS.forEach((item) => {
    if (item.type.match("kid")) {
      ALL.push(item)
    }
  })
  return ALL;
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase()+string.substring(1);
}

function getItemDisplay(item) 
{
  return `<td>
            <a href="../../assets/src/details.html?sku=${item.sku}">
              <img src="${item.image}">
              <h2>${item.brand} Shoe</h2>
              <h4>${capitalizeFirst(item.type)}</h4>
              <h3>$${item.price}</h3>
              <h5>${item.rating}</h5>
            </a>
          </td>`;
}

function displayProducts(array) {
  const table = document.createElement("table");
  const rowMen = document.createElement("tr")
  const rowKid = document.createElement("tr")
  const rowWomen = document.createElement("tr")
  for (let i = 0; i < array.length; i++) {
    if (array[i].type.match("kid")) 
    {
      rowKid.innerHTML += getItemDisplay(array[i]);
    } else if (array[i].type.match("women")) 
    {
      rowWomen.innerHTML += getItemDisplay(array[i]);
    } else if (array[i].type.match("men")) 
    {
      rowMen.innerHTML += getItemDisplay(array[i]);
    }
  }
  table.appendChild(rowKid);
  table.appendChild(rowMen);
  table.appendChild(rowWomen);
  table.classList.add("table-three")

  return table.outerHTML;
}

function displayTable(array) {
  const table = document.createElement("table");
  for (let i = 0; i < array.length; i+=2) {
    if (array[i+1] != null) {
      table.innerHTML += `<tr>${getItemDisplay(array[i])}
        ${getItemDisplay(array[i+1])}</tr>`;
    } else {
      table.innerHTML += `<tr>${getItemDisplay(array[i])}</tr>`;
    }
  }
  return table.outerHTML;
}

function getItem(sku) {
  for (let i = 0; i < PRODUCTS.length; i++)
  {
    var item = PRODUCTS[i];
    if (sku == item.sku) {
      return item;
    }
  }
  return null;
}