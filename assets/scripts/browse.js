function browseAll() {
  document.querySelector('#product-container').innerHTML = displayProducts(getAll());
}

function browseMen() {
  document.querySelector('#product-container').innerHTML = displayTable(getMen());
}

function browseWomen() {
  document.querySelector('#product-container').innerHTML = displayTable(getWomen());
}

function browseKid() {
  document.querySelector('#product-container').innerHTML = displayTable(getKid());
}

function loadInformation() {
  let arg = "";
  if (window.location.search.length != 0) {
    arg = window.location.search.substring(1);
  }
  updatePage(arg);
}

function updatePage(browse) {
  if (browse == "browseWomen") {
    browseWomen();
  } else if (browse == "browseMen") {
    browseMen();
  } else if (browse == "browseKid") {
    browseKid();
  } else {
    browseAll();
  }
}

loadInformation();