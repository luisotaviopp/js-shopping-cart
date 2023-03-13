fetch("users.php",  {
	method: 'GET',
	mode: 'no-cors'
})
.then(res => res.json())
.then(data => console.table(data));


let cart_list_html = document.getElementsByClassName("cart_list")[0];
let product_list_html = document.getElementsByClassName("products_list")[0];

fetch("products.json",  {
	method: 'GET',
	mode: 'no-cors'
})
.then(res => res.json())
.then(data => {

	console.table(data.products);

	let product_list = data.products;

	localStorage.setItem("products", JSON.stringify(data.products));

	if(!localStorage.getItem("cart")) {
		localStorage.setItem("cart", "[]");
	}

	console.log(localStorage.getItem("cart"));

	product_list.forEach(
		product => {
			var p = document.createElement("p");
			p.innerHTML = product.name;
			product_list_html.appendChild(p);

			var btn_add = document.createElement("button");
			btn_add.innerText = "Adicionar ao carrinho";
			btn_add.addEventListener('click', function(){ addItemToCart(product.id); });
			p.appendChild(btn_add);

			var btn_remove = document.createElement("button");
			btn_remove.innerText = "Remover do carrinho";
			btn_remove.addEventListener('click', function(){ removeItemFromCart(product.id); });
			p.appendChild(btn_remove);
		}
	)
});

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

function addItemToCart(productId) {
	let product = products.find(function(product){
		return product.id == productId;	
	});

	if(cart.length == 0)
	{
		cart.push(product);
	}
	else
	{
		let res = cart.find(element => element.id == productId);

		if (res === undefined)
		{
			cart.push(product);
		}
	}
	
	localStorage.setItem("cart", JSON.stringify(cart));

	getTotal();
}

// addItemToCart(3);
// addItemToCart(2);
// addItemToCart(4);
// addItemToCart(1);

function removeItemFromCart(productId){
	let temp = cart.filter(item => item.id != productId); 
	cart = temp;
	localStorage.setItem("cart", "[]");
	localStorage.setItem("cart", JSON.stringify(temp));

	getTotal();
}

// removeItemFromCart(3);

function updateQuantity(productId, quantity)
{
	cart.forEach(product => 
		{
			if(product.id == productId){
				product.quantity = quantity;
				product.total = product.amount * quantity;
			}
		}
	);

	localStorage.setItem("cart", JSON.stringify(cart));

	getTotal();
}

// updateQuantity(1, 2);

function getTotal(){
	let total = 0;

	cart_list_html.innerHTML = "";

	cart.forEach(product => {
		product.total = product.amount * product.quantity;
		total += product.total;

		const item = document.createElement("div");
		item.className = "card";

		const p = document.createElement("p");
		p.innerHTML = product.name + " - " + product.quantity + " x R$" + (product.amount/100) + " = R$" + product.total/100;
		
		item.appendChild(p);

		cart_list_html.appendChild(item);
	});

	const p = document.createElement("p");
	p.innerHTML = " TOTAL: R$" + total/100
	cart_list_html.appendChild(p);

	localStorage.setItem("cart", JSON.stringify(cart));
	
	console.log("Total: R$" + (total/100))
}

getTotal();
