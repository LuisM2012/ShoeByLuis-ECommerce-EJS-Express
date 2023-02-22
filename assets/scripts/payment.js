function loadInformation() {
  if (window.location.search.length != 0) {
    var args = window.location.search.substring(1).split("&");
    args.forEach((arg) =>{
      if (arg.match(/sku=[0-9]+/)) {
        displayItem(getItem(arg.substring(4)));
      } else if (arg.match(/shoe-size=[\d]+\%2F[\d]+\.5/)) {
        document.getElementById("shoe-size").textContent = 
          `Size: ${arg.substring(10).replace("%2F", "/")}`;
      }
    })
  }
}

function displayItem(item) {
  if (item) {
    document.getElementById("item-name").textContent = item.brand;
    document.getElementById("item-type").textContent = `${capitalizeFirst(item.type)}'s Shoes`;
    document.getElementById("item-price").textContent = `$${item.price}`;
    document.getElementById("item-image").setAttribute("src", item.image);
    document.getElementById("skuNumber").value = item.sku;
  }
}

loadInformation();

function validateForm() {
  var quantity= document.getElementsByName("Quantity").item(0).value.trim().toUpperCase();
  var shipping= document.getElementsByName("shippingMethod").item(0).value.trim().toUpperCase();
  var email= document.getElementsByName("email").item(0).value.trim().toUpperCase();
  var phone= document.getElementsByName("phoneNumber").item(0).value.trim().toUpperCase();
  var city= document.getElementsByName("city").item(0).value.trim().toUpperCase();
  var address= document.getElementsByName("address").item(0).value.trim().toUpperCase();
  var lastName= document.getElementsByName("lastName").item(0).value.trim().toUpperCase();
  var firstName= document.getElementsByName("firstName").item(0).value.trim().toUpperCase();
  
  if (!firstName.match(/[A-Z'.-]+/)) {
    alert("Invalid First Name")
    return false;
  }
  if (!lastName.match(/[A-Z'.-]+/)) {
    alert("Invalid Last Name")
    return false;
  }
  if (!address.match(/[0-9]+ [A-Z]+/)) {
    alert("Invalid Address")
    return false;
  }
  if (!city.match(/[A-Z]+/)) {
    alert("Invalid City")
    return false;
  }
  if (!phone.match(/[0-9()-]{3}[0-9()-]{3}[0-9()-]{3}/)) {
    alert("Invalid Phone Number")
    return false;
  }
  if (!email.match(/.+@[\w]+\.[\w]+/)) {
    alert("Invalid Email")
    return false;
  }
  var SKU = document.getElementById("skuNumber").value;
  var shoeSize= document.getElementById("shoe-size").textContent;
  var subject = `New Purchase Order`
  var body = `Item SKU: ${SKU}%0D%0A` +
            `${shoeSize}%0D%0A` +
            `Quantity: ${quantity}%0D%0A` +
            `First Name: ${firstName}%0D%0A` +
            `Last Name: ${lastName}%0D%0A` +
            `Phone Number: ${phone}%0D%0A` +
            `Email: ${email}%0D%0A` +
            `Shipping Method: ${shipping}%0D%0A` +
            `Address: ${address}%0D%0A` +
            `City: ${city}%0D%0A`

  subject = subject.split(" ").join("%20")
  body = body.replace("\n", "").split(" ").join("%20")
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}
