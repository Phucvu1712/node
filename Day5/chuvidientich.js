function calculatePerimeter(length, width, callback) {
    const perimeter = 2 * (length + width);
    callback(perimeter);
}

function calculateArea(length, width, callback) {
    const area = length * width;
    callback(area);
}

function handlePerimeterResult(perimeter) {
    document.getElementById('perimeterResult').innerText = `Chu vi của hình chữ nhật là: ${perimeter}`;
}
function handleAreaResult(area) {
    document.getElementById('areaResult').innerText = `Diện tích của hình chữ nhật là: ${area}`;
}

function tinhToan() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    calculatePerimeter(length, width, handlePerimeterResult);
    calculateArea(length, width, handleAreaResult);
}