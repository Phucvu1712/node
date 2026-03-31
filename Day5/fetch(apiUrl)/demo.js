function fetchDataFromAPI(callback) {
    // Giả sử đây là URL của API
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Gọi callback với dữ liệu nhận được
            callback(null, data);
        })
        .catch(error => {
            callback(error, null);
        });
}
function handleAPIData(error, data) {
    if (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu từ API:', error);
    } else {
        console.log('Dữ liệu từ API:', data);
    }
}
// Gọi hàm để lấy dữ liệu từ API và truyền hàm callback để xử lý dữ liệu
fetchDataFromAPI(handleAPIData);