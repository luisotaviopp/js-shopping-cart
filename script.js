fetch("products.json")
.then(function(response){
	return response.json();
})
.then(function(data){

	console.table(data.products)

	localStorage.setItem("products", JSON.stringify(data.products));

	console.log(localStorage.getItem("cart"));
	
	if(!localStorage.getItem("cart")){
		localStorage.setItem("cart", "[]");
	}
});

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

function addItemToCart(productId){
	
	let product = products.find(function(product){
		return product.id == productId;	
	});

	if(cart.length == 0){
		cart.push(product);
	}else{
		let res = cart.find(element => element.id == productId);
		if(res === undefined){
			cart.push(product);
		}
	}
	
	localStorage.setItem("cart", JSON.stringify(cart));
}

addItemToCart(1);
addItemToCart(2);
addItemToCart(3);

function removeItemFromCart(productId){
	let temp = cart.filter(item => item.id != productId); 
	localStorage.setItem("cart", JSON.stringify(temp));
}

function updateQuantity(productId, quantity){
	cart.forEach(product => {
		if(product.id == productId){
			product.quantity = quantity;
			product.amount = product.amount * quantity;
		}
	});

	localStorage.setItem("cart", JSON.stringify(cart));
}
updateQuantity(1, 2);

function getTotal(){
	let total = 0;
	cart.forEach(product => {
		console.log(product.quantity +"x " + ((product.amount/product.quantity)/100) + " - " +product.name + " - $" + (product.amount/100))
		total += product.amount;
	});

	console.log("Total: R$" + (total/100))
}
getTotal();
