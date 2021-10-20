const shopItems = {
  1: "Kurta",
  2: "Nighty",
  3: "Lower",
  4: "Shorts",
  5: "T. Shirt",
  6: "Capri",
  7: "Under G",
  8: "Night Suit",
  9: "Towel",
  10: "Hankey",
  11: "Socks",
  12: "Dhoti",
  13: "Jacket",
  14: "Thermal",
  15: "Track Suit",
};
function resetMySale() {
  //alert("YES");
  n = 1;
  m = 0;
  localStorage.setItem("on_load_counter", n);
  localStorage.setItem("total_sale", m);
  localStorage.setItem("ltrs", "");

  document.getElementById("lucky-draw-number").innerHTML = n;
  document.getElementById("nichod").innerHTML = m;
  document.getElementById("last-transaction").innerHTML =
    localStorage.getItem("ltrs");
}
window.onload = function () {
  var n = localStorage.getItem("on_load_counter");
  var m = localStorage.getItem("total_sale");
  if (n === null) {
    n = 0;
  }
  if (m === null) {
    m = 0;
  }
  //n++;
  // GET THE RECIPT NUMBER FROM LOCAL STORAGE
  localStorage.setItem("on_load_counter", n);
  localStorage.setItem("total_sale", m);
  document.getElementById("lucky-draw-number").innerHTML = n;
  document.getElementById("nichod").innerHTML = m;
  document.getElementById("last-transaction").innerHTML =
    localStorage.getItem("ltrs");

  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  document.getElementById("page-date").innerText = datetime;

  var inputPair = document.querySelectorAll(".input-pair");
  inputPair[0].addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      inputPair[1].focus();
    }
  });
  inputPair[1].addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      inputPair[2].focus();
    }
  });
  inputPair[2].addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      inputPair[0].focus();
    }
  });

  for (let key in shopItems) {
    if (shopItems.hasOwnProperty(key)) {
      // console.log(key, shopItems[key]);
      var element = `<div>${key + " " + shopItems[key]}</div>`;
      document.getElementById("map-list").innerHTML += element;
    }
  }

  document.getElementById("download").addEventListener("click", () => {
    var transactionSum = document.getElementById(
      "paget-total-netTotal"
    ).innerText;
    transactionSum = parseInt(transactionSum);
    var deleteButtons = document.getElementsByClassName("item-delete");
    for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].style = "display: none";
    }

    const invoice = this.document.getElementById("invoice");
    console.log("------->>> ", invoice);
    var keypads = document.getElementById("input-and-mapping-containing-div");
    keypads.remove();
    window.print();
    window.location.reload();

    //////////////////////////////////////////////////////////////////////////

    var n = localStorage.getItem("on_load_counter");
    var m = localStorage.getItem("total_sale");

    if (n === null) {
      n = 0;
    }
    if (m === null) {
      m = 0;
    }
    n++;
    localStorage.setItem("on_load_counter", n); // increased recipt counter

    localStorage.setItem("ltrs", "added " + transactionSum + " to " + m);

    m = parseInt(m) + parseInt(transactionSum);
    m = parseInt(m);
    localStorage.setItem("total_sale", m);

    // document.getElementById("nichod").innerHTML = m;
    // document.getElementById("lucky-draw-number").innerHTML = n;

    //console.log(window);
    // var opt = {
    //   margin: 1,
    //   filename: "perfectCollectionTotalEstimate.pdf",
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    // };
    // html2pdf().from(invoice).set(opt).save();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 5000);
  });

  document.addEventListener(
    "keyup",
    (event) => {
      var name = event.key;
      var code = event.code;
      // Alert the key name and key code on keydown
      if (name == "Shift")
        //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
        document.getElementById("download").click();
    },
    false
  );
};

function increaseTotalItemsCount() {
  // document.getElementById("page-total-items").innerText =
  //   document.querySelectorAll("#table-body >tr").length;
  var x = document.querySelectorAll("#table-body .item-quantity");
  var tot = 0;
  for (var i = 0; i < x.length; i++) {
    if (Number.isNaN(parseInt(x[i].innerText))) {
      tot = 0;
      break;
    }
    tot += parseInt(x[i].innerText);
  }
  if (tot >= 0) {
    document.getElementById("page-total-items").innerText = tot;
  }
}
function updatePageTotals() {
  //updating the page total
  var x = document.querySelectorAll("#table-body .item-total");
  var tot = 0;
  for (var i = 0; i < x.length; i++) {
    if (Number.isNaN(parseInt(x[i].innerText))) {
      tot = 0;
      break;
    }
    tot += parseInt(x[i].innerText);
  }

  if (tot >= 0) {
    document.getElementById("page-total-sum").innerText = tot;
    var discount = tot / 10;
    document.getElementById("page-total-discountMinus").innerText =
      "-" + discount;
    document.getElementById("paget-total-netTotal").innerText = tot - discount;
  }
}
function additemNumberToListOnEnter(event) {
  console.log(event.key);
  if (event.key === "Enter") {
    additemNumberToList();
  }
}
function additemNumberToList() {
  var newItemNumber = document.getElementById("new-item-number").value;
  var newItemPrice = document.getElementById("new-item-price-input").value;
  var newItemQuantity = document.getElementById(
    "new-item-quantity-input"
  ).value;
  //var newItemQuantity = 1;
  if (
    !(
      newItemNumber &&
      newItemPrice &&
      newItemQuantity &&
      newItemNumber > 0 &&
      newItemPrice > 0 &&
      newItemQuantity > 0
    )
  )
    return;

  document.getElementById("new-item-number").value = "";
  document.getElementById("new-item-price-input").value = "";
  document.getElementById("new-item-quantity-input").value = "";

  var newRowTotal = newItemPrice * newItemQuantity;

  //----------------------------**.   Making List Item Card
  var unqiueId = document.querySelectorAll("#table-body >tr").length;
  unqiueId = "id_" + unqiueId;
  var itemName = shopItems[newItemNumber];
  if (typeof itemName === "undefined") return;

  var listItem = `<tr id=${unqiueId} class="item-row">
   <td> <span class="item-name">${itemName}</span> </td> 
   <td> <span class="item-price">${newItemPrice}</span> </td> 
   <td><span class="item-quantity">${newItemQuantity}</span></td>
   <td> 
   <span class="font-weight-semibold item-total">${newRowTotal}</span>
    <button class="item-delete btn btn-danger" class="item-delete" style="margin-left: 1rem" onclick="handleDelete(event)" > X </button> 
    </td> 
    </tr>`;
  var msg = new SpeechSynthesisUtterance();
  msg.text = itemName + " " + newRowTotal;
  window.speechSynthesis.speak(msg);

  document.getElementById("table-body").innerHTML += listItem;
  // increase total items count
  increaseTotalItemsCount();
  updatePageTotals();
}

function handleDelete(event) {
  var changedId = event.target.parentNode.parentNode.id;
  console.log(changedId);
  document.getElementById(changedId).remove();
  increaseTotalItemsCount();
  updatePageTotals();
}

// function priceQuantityChanged(event) {
//   var changedId = event.target.parentNode.parentNode.id;
//   var changedRow = document.getElementById(changedId);

//   var price = changedRow.getElementsByClassName("item-price")[0].value;
//   var quantity = changedRow.getElementsByClassName("item-quantity")[0].value;
//   price = parseInt(price.trim());
//   quantity = parseInt(quantity.trim());

//   if (quantity && price && price > 0 && quantity > 0) {
//     console.log(parseInt(price) + "->>" + parseInt(quantity));
//     var rowPrice = parseInt(price) * parseInt(quantity);
//     changedRow.getElementsByClassName("item-total")[0].innerText = rowPrice;
//   } else {
//     changedRow.getElementsByClassName("item-total")[0].innerText = "XX";
//   }

//   updatePageTotals();
// }
var toggle = 0;
function movetoinputpairs(event) {
  if (event.key == "Enter") {
    var pairs = document.querySelectorAll(".input-pair");
    console.log(pairs);
    //pairs[0].focus();
  }
}
