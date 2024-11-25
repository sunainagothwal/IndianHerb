const productsList = [
  {
    id: 0,
    productName: "Allspice",
    price: 3894,
    description:
      "Allspice is a spice made from the dried berries of a plant known as Pimenta dioica, which is a member of the myrtle family",
    image: "allspice.png",
    count: 0,
  },
  {
    id: 1,
    productName: "Anise",
    price: 950,
    description:
      "Anise also called aniseed or rarely anix, is a flowering plant in the family Apiaceae native to the eastern Mediterranean region and Southwest Asia.",
    image: "anise.png",
    count: 0,
  },
  {
    id: 2,
    productName: "Saffron",
    price: 300000,
    description:
      " Saffron is considered the most valuable, renowned and intriguing spice ",
    image: "saffron.png",
    count: 0,
  },
  {
    id: 3,
    productName: "Pepper",
    price: 893,
    description:
      "Black pepper is the worlds most traded spice, and is one of the most common spices added to cuisines around the world",
    image: "pepper.png",
    count: 0,
  },

  {
    id: 4,
    productName: "Bay Leaf",
    price: 75,
    description:
      "The bay leaf is an aromatic leaf commonly used as a herb in cooking. It can be used whole, either dried or fresh, in which case it is removed from the dish before consumption, or less commonly used in ground form",
    image: "bay leaf.png",
    count: 0,
  },
  {
    id: 5,
    productName: "Celery Seed",
    price: 240,
    description:
      "Celery seed has been used as medicine for thousands of years in the Eastern world",
    image: "celery seed.png",
    count: 0,
  },
  {
    id: 6,
    productName: "Cinnamon",
    price: 520,
    description:
      "Cinnamon is used mainly as an aromatic condiment and flavouring additive in a wide variety of cuisines, sweet and savoury dishes, breakfast cereals, snack foods, bagels, teas, hot chocolate and traditional foods",
    image: "cinnamon.png",
    count: 0,
  },
  {
    id: 7,
    productName: "Clove",
    price: 880,
    description:
      "Cloves are the aromatic flower buds of a tree in the family Myrtaceae, Syzygium aromaticum. ",
    image: "clove.png",
    count: 0,
  },
  {
    id: 8,
    productName: "Coriander",
    price: 70,
    description:
      "Coriander, also known as cilantro, is an annual herb in the family Apiaceae. All parts of the plant are edible, but the fresh leaves and the dried seeds are the parts most traditionally used in cooking",
    image: "coriander.png",
    count: 0,
  },
  {
    id: 9,
    productName: "Nutmeg",
    price: 420,
    description:
      "Nutmeg, is the ground spice or seed of some species of the genus Myristica.",
    image: "nutmeg.png",
    count: 0,
  },
  {
    id: 10,
    productName: "Ashwagandha",
    price: 697,
    description:
      "It is commonly used for Stress. There is little evidence for its use as an adaptogen ",
    image: "Ashwagandha.png",
    count: 0,
  },
  {
    id: 11,
    productName: "Green Cardamom",
    price: 2999,
    description:
      "Cardamon is a spice made from the seeds of several plants in the genera Elettaria and Amomum in the family Zingiberacea.",
    image: "Green_Cardamom.png",
    count: 0
  }
];

if (localStorage.getItem("productsList") === null) {
  localStorage.setItem("productsList", JSON.stringify(productsList));
}

function test(price) {
  var calculated_price = "";
  if (price > 1000) {
    calculated_price = (price / 10).toFixed(1) + "/gm";
  } else {
    calculated_price = price + "/Kg";
  }
  return calculated_price;
}
function showButton(singleProduct) {
  const product = JSON.parse(singleProduct);
  if (product.count == 0) {
    $("#buttonId"+product.id).html(`<button class="add_to_cart" data-sonu='${JSON.stringify(product)}'>Add to Cart</button>`
    ); 
  } else {
    $("#buttonId" + product.id).html(
      `<div class="itemQuantity">
    <button class="remove_one_item" data-remove='${JSON.stringify(
      product
    )}'>-</button>
    <p class="countitem" id="ItemsCount${product.id}">${product.count}</p>
    <button class="add_one_more_item" data-add='${JSON.stringify(
      product
    )}'>+</button>
    </div>`
    );
  }
  const productsList = JSON.parse(localStorage.getItem("productsList"));

  $("#cart_count").text(productsList.filter(singleVal=>singleVal.count>0).length);        
}
$(document).ready(function () {
  // list append function
  let productsList = JSON.parse(localStorage.getItem("productsList"));
  productsList.map((singleProduct) => {
    $("#products_list").append(`<div class="product">
            <div class="img_wrap"><img src="images/${
              singleProduct.image
            }" alt="herb"></div>
            <button class="wishlist_button" onclick="toggleWishlist()">
           <i class="fa-solid fa-heart"></i>
        </button>
            <h2 class="fill">${singleProduct.productName}
            <p class="product_price">(₹${test(singleProduct.price)})</p></h2>
            <p class="color paragraph">${singleProduct.description}</p>
            <div class="buttoncart" id="buttonId${
              singleProduct.id
            }"></div>     
        </div>`);
      showButton(JSON.stringify(singleProduct)) 
  });
 // $("#cart_count").text(itemsInCart.length);
  //updateCartDisplay();
});


$(document).on("click", ".add_to_cart", function (event) {
  event.preventDefault();
  event.stopPropagation();
  let productsList = JSON.parse(localStorage.getItem("productsList"));
  const product = $(this).data("sonu");
  productsList = productsList.map((singleVal)=>{
    if(singleVal.productName===product.productName){
          product.count++
      return { ...singleVal, count: singleVal.count + 1 };
    }
    else{
      return singleVal
    }
  });  
  localStorage.setItem("productsList", JSON.stringify(productsList));
    showButton(JSON.stringify(product));
});


/* $(".add_one_more_item").on("click", function () { */
 $(document).on("click", ".add_one_more_item", function (event) {
   event.preventDefault();
   event.stopPropagation();
   const product = $(this).data("add");
   let productsList = JSON.parse(localStorage.getItem("productsList"));
   productsList = productsList.map((singleVal) => {
     if (singleVal.productName === product.productName) {
       product.count++;
       return { ...singleVal, count: singleVal.count + 1 };
     } else {
       return singleVal;
     }
   });
   //$("#ItemsCount"+product.id).text(product.count);
   localStorage.setItem("productsList", JSON.stringify(productsList));
   showButton(JSON.stringify(product));
 });


 $(document).on("click", ".remove_one_item", function (event) {
   event.preventDefault();
   event.stopPropagation();
   const product = $(this).data("remove");
   let productsList = JSON.parse(localStorage.getItem("productsList"));
   productsList = productsList.map((singleVal) => {
     if (singleVal.productName === product.productName) {
       product.count--;
       return { ...singleVal, count: singleVal.count - 1 };
     } else {
       return singleVal;
     }
   });

   localStorage.setItem("productsList", JSON.stringify(productsList));
  showButton(JSON.stringify(product));
 });
 
function showCartItems() {
    const productsList = JSON.parse(localStorage.getItem("productsList"));
    $("#cart_items").empty();
  if (productsList.filter(singleVal=>singleVal.count>0).length == 0) {
    $("#cart_items").text("Your Cart is empty");
  }
  
  productsList.forEach((product) => {
    if(product.count>0){
    $("#cart_items").append(`
      <div class="cart-item">
        <img src="images/${product.image}" alt="${product.productName}">
        <p>${product.productName}</p>
        <p>₹${test(product.price)}</p>
      </div>
    `)
    };
  });
  var totalprice = 0;
  productsList.forEach((product) => {
    if (product.count > 0) {
      totalprice = totalprice + product.price * product.count;
    }
  });
 $("#total").text("₹ "+ totalprice);  
}

function toggleCont(event) {
  event.preventDefault();
  var cont = document.querySelector(".cont");
  cont.classList.toggle("open");
  showCartItems()
}

$(document).on("mouseenter", ".product", function () {
  $(this).css({
    "box-shadow":
      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
  });
});

$(document).on("mouseleave", ".product", function () {
  $(this).css({ "box-shadow": "none" });
});

$(document).ready(function () {
  $("#myAccountLink").click(function () {
    $("#modal").fadeIn();
    $("#accountModal").fadeIn();
  });

  $("#modal").click(function () {
    $("#accountModal").fadeOut();
    $("#modal").fadeOut();
  });

  $("#showSignUp").click(function () {
    $("#loginForm").hide();
    $("#signUpForm").show();
  });

  $("#showLogin").click(function () {
    $("#signUpForm").hide();
    $("#loginForm").show();
  });

  $("#loginButton").click(function () {
    alert("Login button clicked!");
    $("#accountModal").fadeOut();
    $("#modal").fadeOut();
  });

  $("#signUpButton").click(function () {
    alert("Sign Up button clicked!");
    $("#accountModal").fadeOut();
    $("#modal").fadeOut();
  });
});
