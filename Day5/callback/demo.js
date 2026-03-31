// setTimeout(xuly1 => {
//     console.log("I am the first");
// }, 2000);

// var xuly2 = () => {
//     console.log("I am the second");
// };
// xuly2();

// function dosomething(callback) {
//     console.log("Doing something...");
//     callback();
// }

// function kqua() {
//     console.log("xong viec roi.");
// }
// dosomething(kqua);

// function A(callback) {
//     const kq = 5*6;
//     callback(kq);
// }

// function B(kq) {
//     console.log("Kết quả là: " + kq);
// }
// A(B);

function calculateRectanglePerimeter(length, width, callback) {
    const perimeter = 2 * (length + width);
    callback(perimeter);
}

function calculateRectangleArea(length, width, callback) {
    const area = length * width;
    callback(area);
}

function handlePerimeterResult(perimeter) {
    console.log('Chu vi của hình chữ nhật là:', perimeter);
}

function handleAreaResult(area) {
    console.log('Diện tích của hình chữ nhật là:', area);
}

const length = 5;
const width = 3;

calculateRectanglePerimeter(length, width, handlePerimeterResult);
calculateRectangleArea(length, width, handleAreaResult);