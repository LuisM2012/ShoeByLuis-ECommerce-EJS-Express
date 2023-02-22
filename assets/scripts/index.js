function getPopular() {
  let data = getAll();
  const popularScroll = document.getElementById("popular-items-scroll");
  if (data.length != 0) {
    popularScroll.innerHTML = "";
    data.forEach((item) => {
      if (!(item.sku%5)) {
        popularScroll.innerHTML += popularItemDisplay(item);
      }
    })
  }
}

function popularItemDisplay(item) {
  return `<a href="/assets/src/details.html?sku=${item.sku}">
            <img src="${item.image}">
          </a>`;
}

getPopular();
