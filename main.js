// đây làm array object chứa data product
var productData = [
    {
        productID: "P001",
        productName: "iPhone 5",
        productBrand: "Apple",
        price: 399,
        quantity: 10,
        inCart: 0,
        description: "lorem 1",
        provider: "FPT Telecom",
    },
    {
        productID: "P002",
        productName: "iPhone 6",
        productBrand: "Apple",
        price: 599,
        quantity: 10,
        inCart: 0,
        description: "lorem 2",
        provider: "Viettel",
    },
    {
        productID: "P003",
        productName: "iPhone 7",
        productBrand: "Apple",
        price: 699,
        quantity: 10,
        inCart: 0,
        description: "lorem 3",
        provider: "Thegioididong",
    },
    {
        productID: "P004",
        productName: "iPhone 8",
        productBrand: "Apple",
        price: 799,
        quantity: 10,
        inCart: 0,
        description: "lorem 4",
        provider: "FPT Telecom",
    },
    {
        productID: "P005",
        productName: "iPhone X",
        productBrand: "Apple",
        price: 999,
        quantity: 10,
        inCart: 0,
        description: "lorem 5",
        provider: "FPT Telecom",
    },
    {
        productID: "P006",
        productName: "Samsung galaxy S10",
        productBrand: "Samsung",
        price: 1500,
        quantity: 10,
        inCart: 0,
        description: "lorem 6",
        provider: "Thegioididong",
    },
    {
        productID: "P007",
        productName: "Samsung galaxy A71",
        productBrand: "Samsung",
        price: 400,
        quantity: 10,
        inCart: 0,
        description: "lorem 7",
        provider: "FPT Telecom",
    },
    {
        productID: "P008",
        productName: "OPPO Reno3",
        productBrand: "OPPO",
        price: 199,
        quantity: 10,
        inCart: 0,
        description: "lorem 8",
        provider: "Viettel",
    },
    {
        productID: "P009",
        productName: "OPPO A92",
        productBrand: "OPPO",
        price: 299,
        quantity: 10,
        inCart: 0,
        description: "lorem 9",
        provider: "FPT Telecom",
    },
    {
        productID: "P010",
        productName: "Samsung galaxy note 9",
        productBrand: "Samsung",
        price: 399,
        quantity: 10,
        inCart: 0,
        description: "lorem 10",
        provider: "Thegioididong",
    }
];
const storageProductData = 'productData';
localStorage.setItem(storageProductData, JSON.stringify(productData)); //đoạn này là tạo localStỏage, đưa toàn bộ Product Data vào.
const productDataString = localStorage.getItem(storageProductData);
//đoạn điều kiện check xem data sản phẩm ban đầu có chưa thông tin hay chưa
if (productDataString) {
    productData = JSON.parse(productDataString);
} else {
    productData = [];
}
const listProduct = document.getElementById('listProduct');
// function này đọc dữ liệu từ array data ra và show ra html (màn hình)
function loadListProduct() {
    for (let i = 0; i < productData.length; i++) {
        listProduct.insertAdjacentHTML('beforeend', `<li style="background-color: darkgrey; height: 150px;width: 150px;" >
        <div class="product-show" >
            <a class="reletive" href="" onclick="">
                <img src="" alt="">
                <p>${productData[i].productName}</p>
                <p>${productData[i].price}</p>
            </a>
        </div>
        <div class="info-box">
        <a href="Main.html" ></a>
        <button class="btnAddCart" >Add to Cart</button>
        <button class="btnDetail" onclick="showDivDetail()">Detail</button>
        </div>
    </li>` )
    };
    const btnDetail = document.getElementsByClassName('btnDetail');
    const btnAddCart = document.getElementsByClassName('btnAddCart');
    for (let i = 0; i < btnAddCart.length; i++) {
        btnAddCart[i].addEventListener('click', () => {
            cartNumber(productData[i]);
            cartTotal(productData[i]);
        })
    }


    for (let i = 0; i < btnDetail.length; i++) {
        btnDetail[i].addEventListener('click', () => {
            // cartNumber(productData[i]);
            // cartTotal(productData[i]);
            showDetailProduct(productData[i]);
        })
    }
};
const detailProduct = document.getElementById('detailProduct');

function showDivDetail() {
    detailProduct.style.display = 'block';
}

function hideDivDetail() {
    detailProduct.style.display = 'none';
}

//function này hiển thị số product đã đc chọn có sẵn trong localstr, reload trang nhưg số sản phẩm trong cart k bị mất
function loadNumberInCart() {
    let productNumberInCarts = localStorage.getItem('CartNumbers');
    productNumberInCarts = parseInt(productNumberInCarts);
    if (productNumberInCarts) {
        document.getElementById('cartNumbers').textContent = productNumberInCarts;
    }
}
//function thêm vào giỏ hàng
function cartNumber(chosenProduct) {
    let productNumberInCarts = localStorage.getItem('CartNumbers'); //lấy ra số product đag có trong cart
    productNumberInCarts = parseInt(productNumberInCarts);
    //đoạn này kiểm tra xem trong cart có product nào chưa
    if (productNumberInCarts) {
        localStorage.setItem('CartNumbers', productNumberInCarts + 1);// có rồi thì +1
        document.getElementById('cartNumbers').textContent = productNumberInCarts + 1; //đoạn này hiển thị cart numberr lên màn hình
    } else {
        localStorage.setItem('CartNumbers', 1);
        document.getElementById('cartNumbers').textContent = 1; //chưa có thì = 1
    };
    inCartProduct(chosenProduct);
};
//function này lưu lại những product đã đc chọn.
function inCartProduct(chosenProduct) {
    let productInCart = localStorage.getItem('productInCart');
    productInCart = JSON.parse(productInCart);
    
    if (productInCart != null) {
        if (productInCart[chosenProduct.productID] == undefined) {
            productInCart = {
                ...productInCart,
                [chosenProduct.productID]: chosenProduct,
            }
        }
        productInCart[chosenProduct.productID].inCart += 1;
    } else {
        chosenProduct.inCart = 1;
        productInCart = {
            [chosenProduct.productID]: chosenProduct,
        }
    }
    
    localStorage.setItem('productInCart', JSON.stringify(productInCart));
};
//fuction này tính tổng giá trị sản phẩm đc chọn
function cartTotal(chosenProduct) {
    let cartTotal = localStorage.getItem('totalCart');
    if (cartTotal != null) {
        cartTotal = parseInt(cartTotal);
        localStorage.setItem('totalCart', cartTotal + chosenProduct.price);
    } else {
        localStorage.setItem('totalCart', chosenProduct.price);
    }
}

function showDetailProduct(chosenProduct) {
    console.log(chosenProduct.productName);
    const detailProduct = document.getElementById('detailProduct');
    detailProduct.insertAdjacentHTML('beforeend', `
    <div class="detail-img">
    <div class="">
        <div class="item active">
            <a href="#"> <img src="" alt="" style="width:100%"></a>
        </div>
        <div class="item">
            <a href="#"> <img src="" alt="" style="width:100%"></a>
        </div>
        <div class="item">
            <a href="#"> <img src="" alt="" style="width:100%"></a>
        </div>
    </div>
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">‹</a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">›</a>
</div>
<div class="detail-infor">
    <h3>${chosenProduct.productName}</h3>
    <form>
        <label><span>${chosenProduct.price}$</span></label>
        <div>
            <label><span>Color</span></label>
            <div class="controls">
                <select class="span11">
                    <option>Red</option>
                    <option>Purple</option>
                    <option>Pink</option>
                    <option>Red</option>
                </select>
            </div>
        </div>
        <h4>${chosenProduct.quantity} items in stock</h4>
        <p>Nowadays the lingerie industry is one of the most successful business spheres.
            Nowadays the lingerie industry is one of ...
        <p>
            <button class="btnAddCart" <span class=" icon-shopping-cart"></span> Add to
                cart</button>
            <button class="btnClose" onclick="hideDivDetail()">Close</button>
    </form>
</div>
    `)
    const btnAddCart = document.getElementsByClassName('btnAddCart');
    for (let i = 0; i < btnAddCart.length; i++) {
        btnAddCart[i].addEventListener('click', () => {
            cartNumber(chosenProduct);
            cartTotal(chosenProduct);
        })
    }
};
loadListProduct();
loadNumberInCart();



