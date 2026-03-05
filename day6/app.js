// ============================================
// app.js - Code JavaScript lấy dữ liệu từ API
// ============================================

// Địa chỉ API (JSON Server chạy ở port 3000)
var API = "http://localhost:3000";

// ===== HÀM HIỂN THỊ SẢN PHẨM =====
// Nhận vào mảng sản phẩm, tạo HTML và đưa lên trang
function hienThiSanPham(danhSach) {
    // Lấy thẻ div có id="product-grid" để chèn sản phẩm vào
    var grid = document.getElementById("product-grid");

    // Xóa nội dung cũ (nếu có)
    grid.innerHTML = "";

    // Duyệt qua từng sản phẩm trong mảng
    for (var i = 0; i < danhSach.length; i++) {
        var sp = danhSach[i]; // sp = sản phẩm hiện tại

        // Tạo 1 thẻ div cho mỗi sản phẩm
        var card = document.createElement("div");
        card.className = "product-card";

        // Đặt nội dung HTML bên trong card
        card.innerHTML =
            '<img src="' + sp.image + '" alt="' + sp.name + '">' +
            '<div class="product-name">' + sp.name + "</div>" +
            '<div class="price-wrapper">' +
            '<span class="sale-price">' + sp.price + "đ</span>" +
            '<span class="old-price">' + sp.oldPrice + "đ</span>" +
            "</div>" +
            '<button class="btn-buy">Đặt Mua</button>';

        // Thêm card vào grid
        grid.appendChild(card);
    }
}

// ===== HÀM LẤY SẢN PHẨM TỪ API =====
// Gọi API để lấy danh sách sản phẩm
function laySanPham() {
    fetch(API + "/products")
        .then(function (response) {
            // Chuyển response thành JSON
            return response.json();
        })
        .then(function (data) {
            // data = mảng sản phẩm từ API
            // Gọi hàm hiển thị
            hienThiSanPham(data);
        })
        .catch(function (error) {
            // Nếu lỗi (ví dụ: server chưa chạy)
            console.log("Lỗi:", error);
            document.getElementById("product-grid").innerHTML =
                '<p style="padding:20px;color:red;">Lỗi! Hãy chạy JSON Server trước.</p>';
        });
}

// ===== HÀM LẤY DANH MỤC TỪ API =====
function layDanhMuc() {
    fetch(API + "/categories")
        .then(function (response) {
            return response.json();
        })
        .then(function (danhMuc) {
            // Lấy thẻ select danh mục
            var select = document.getElementById("category-select");

            // Duyệt qua từng danh mục, tạo option
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

// ===== HÀM THÊM SẢN PHẨM MỚI =====
function themSanPham(event) {
    // Ngăn form reload trang
    event.preventDefault();

    // Lấy giá trị từ các input
    var ten = document.getElementById("product-name").value;
    var gia = document.getElementById("product-price").value;
    var giaCu = document.getElementById("product-old-price").value;
    var danhMuc = document.getElementById("category-select").value;
    var noiBat = document.getElementById("featured-select").value;

    // Kiểm tra đã nhập đủ chưa
    if (!ten || !gia || !giaCu) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Tạo object sản phẩm mới
    var sanPhamMoi = {
        name: ten,
        category: danhMuc,
        price: Number(gia),
        oldPrice: Number(giaCu),
        image: "https://via.placeholder.com/150",
        featured: noiBat === "true"
    };

    // Gửi POST request lên API để thêm sản phẩm
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
            // Reset form
            document.getElementById("add-product-form").reset();
            // Load lại danh sách sản phẩm
            laySanPham();
        })
        .catch(function (error) {
            console.log("Lỗi thêm sản phẩm:", error);
            alert("Lỗi! Không thêm được.");
        });
}

// ===== HÀM SCROLL =====
function scrollLenDau() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function scrollXuongCuoi() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// ===== KHỞI CHẠY KHI TRANG LOAD XONG =====
document.addEventListener("DOMContentLoaded", function () {
    laySanPham();   // Lấy sản phẩm từ API
    layDanhMuc();   // Lấy danh mục từ API

    // Gắn sự kiện submit cho form
    var form = document.getElementById("add-product-form");
    form.addEventListener("submit", themSanPham);
});
