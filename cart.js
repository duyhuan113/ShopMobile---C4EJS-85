//function này cập nhật số product đc chọn có trong cart
function loadNumberInCart() {
    let productNumberInCarts = localStorage.getItem('CartNumbers');
    productNumberInCarts = parseInt(productNumberInCarts);
    if (productNumberInCarts) {
        document.getElementById('cartNumbers').textContent = productNumberInCarts;
    }
}
//function này gọi ra những product đã đc chọn
function loadListCartProduct() {
    let cartContent = document.getElementById('content');
    let cartTotal = localStorage.getItem('totalCart');
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    cartItems = (Object.values(cartItems));
    //console.log(cartItems[1]);
    if (cartItems && cartContent) {
        cartContent.innnerHTML = '';
        Object.values(cartItems).map(item => {
            cartContent.innerHTML += `
        <div class="listCartProduct">
            <img src="" alt="">
          Name Product:  <span>${item.productName}</span>
        </div>
        <div class="productPrice">
          Price: <span> ${item.price}</span>
        </div>
        <div claas="productQuantity">
        Product Quantity:
        <span>${item.inCart}</span>
        </div>
        <div class="total">
           Total: <span> ${item.inCart * item.price}</span>
        </div>
        </br></br>
        `
        });
        cartContent.innerHTML += `
        <div class ="totalCart">
            Total Bill: ${cartTotal}
        </div>`
    }
    hiddenDivUserInfor()
    const btnPayment = document.getElementById('btnPayment');
    btnPayment.addEventListener('click', () => {
        showDivUserInfor();
    })


}
// function này để ẩn form nhập thông tin giao hàng
function hiddenDivUserInfor() {
    const userInfor = document.getElementById('userInfor');
    userInfor.style.display = 'none';
}
function hiddenDivUserEnter() {
    const userInfor = document.getElementById('userInfor');
    userInfor.style.display = 'none';
}
//function này dùgn để hiện hiện form nhập thông tin và ẩn luôn nút payment
function showDivUserInfor() {
    payment.style.display = 'none';
    const userInfor = document.getElementById('userInfor');
    userInfor.style.display = 'block';
    const btnBuy = document.getElementById('btnBuy');
    btnBuy.addEventListener('click', () => {

        creatBill();
    })
}
//function này tạo bill và lưu vào local, việc lưu vào mocal giúp sau này lấy lại đc thông tin từ bill chuyển đến mangae bill của admin
function creatBill() {
    let inName = document.getElementById('inName');
    let inPhone = document.getElementById('inPhone');
    let inAdd = document.getElementById('inAdd');
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    cartItems = (Object.values(cartItems));
    let bill = localStorage.getItem('bill');
    bill = JSON.parse(bill);
    if (bill = null) {
        bill = {
            
            product: cartItems,
            name: inName.value,
            phone: inPhone.value,
            add: inAdd.value
        }
    } else {        
        bill = {
            ...bill,
            product: cartItems,
            name: inName.value,
            phone: inPhone.value,
            add: inAdd.value
        };        
    };
    localStorage.setItem('bill', JSON.stringify(bill));
    let btnBuy = document.getElementById('btnBuy');
    btnBuy.addEventListener('click',()=>{
        showBill();
    })

    
function showBill(bill){
    alert('ok')
}
}

loadNumberInCart();
loadListCartProduct();