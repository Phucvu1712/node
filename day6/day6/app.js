var API = "http://localhost:3000";
function hienThiSanPham(danhSach) {

    var grid = document.getElementById("product-grid");

    for (var i = 0; i < danhSach.length; i++) {
        var sp = danhSach[i];
        var card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML =
            '<img src="' + sp.image + '" alt="' + sp.name + '">' +
            '<div class="product-name">' + sp.name + "</div>" +
            '<div class="price-wrapper">' +
            '<span class="sale-price">' + sp.price + "đ</span>" +
            '<span class="old-price">' + sp.oldPrice + "đ</span>" +
            "</div>" +
            '<button class="btn-buy">Đặt Mua</button>';

        grid.appendChild(card);
    }
}

function laySanPham() {
    fetch(API + "/products")
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {
            hienThiSanPham(data);
        })
        .catch(function (error) {
            console.log("Lỗi:", error);
            document.getElementById("product-grid").innerHTML =
                '<p style="padding:20px;color:red;">Lỗi! Hãy chạy JSON Server trước.</p>';
        });
}

function layDanhMuc() {
    fetch(API + "/categories")
        .then(function (response) {
            return response.json();
        })
        .then(function (danhMuc) {
            var select = document.getElementById("category-select");
            for (var i = 0; i < danhMuc.length; i++) {
                var option = document.createElement("option");
                option.value = danhMuc[i].slug;
                option.textContent = danhMuc[i].name;
                select.appendChild(option);
            }
        })
        .catch(function (error) {
            console.log("Lỗi tải danh mục:", error);
        });
}

function themSanPham(event) {
    event.preventDefault();
    var ten = document.getElementById("product-name").value;
    var gia = document.getElementById("product-price").value;
    var giaCu = document.getElementById("product-old-price").value;
    var danhMuc = document.getElementById("category-select").value;
    var noiBat = document.getElementById("featured-select").value;

    if (!ten || !gia || !giaCu) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    var sanPhamMoi = {
        name: ten,
        category: danhMuc,
        price: Number(gia),
        oldPrice: Number(giaCu),
        image: "https://orient-watch.vn/wp-content/uploads/2022/10/ra-ac0f08g10b_1620716035.png",
        featured: noiBat === "true"
    };
    fetch(API + "/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanPhamMoi)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            alert("Thêm sản phẩm thành công!");
            document.getElementById("add-product-form").reset();
            laySanPham();
        })
        .catch(function (error) {
            console.log("Lỗi thêm sản phẩm:", error);
            alert("Lỗi! Không thêm được.");
        });
}

function scrollLenDau() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function scrollXuongCuoi() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
    laySanPham();
    layDanhMuc();
    var form = document.getElementById("add-product-form");
    form.addEventListener("submit", themSanPham);
});
