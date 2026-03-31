// Hàm thêm dữ liệu vào API từ URL và gọi callback khi hoàn thành
function addDataToAPI(url, data, callback) {
    fetch(url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
    )
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(result => {
            callback(null, result);
        })
        .catch(error => {
            callback(error, null);
        });
}
// Hàm callback để xử lý kết quả sau khi thêm dữ liệu thành công
function handleAddDataResult(error, result) {
    if (error) {
        console.error('Đã xảy ra lỗi khi thêm dữ liệu vào API:', error);
    } else {
        console.log('Dữ liệu đã được thêm vào API thành công:', result);
        // Xử lý kết quả tại đây
    }
}
// URL của API cần thêm dữ liệu
const apiUrl = 'https://656d3ffbbcc5618d3c22ee91.mockapi.io/product';

// Dữ liệu cần thêm vào API
const newData = {
    name: 'Tran Van Nhan',
    price: 23090036,
};
// Gọi hàm để thêm dữ liệu vào API và truyền hàm callback để xử lý kết quả
addDataToAPI(apiUrl, newData, handleAddDataResult);