function loadInformation() {
  if (window.location.search.length != 0) {
    var arg = window.location.search.substring(1);
    if (arg.match(/sku=[0-9]+/)) {
      displayItem(getItem(arg.substring(4)));
    }
  }
}

function displayItem(item) {
  if (item) {
    document.getElementById("item-rating").textContent = item.rating+" 100 ratings";
    document.getElementById("item-name").textContent = item.brand;
    document.getElementById("item-type").textContent = `${capitalizeFirst(item.type)}'s Shoes`;
    document.getElementById("item-price").textContent = `$${item.price}`;
    document.getElementById("item-image").setAttribute("src", item.image);
    document.getElementById("skuNumber").value = item.sku;
  }
}

loadInformation();