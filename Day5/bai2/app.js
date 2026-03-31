function getHotels(callback) {
    fetch("https://69a9528c32e2d46caf45eaa5.mockapi.io/Hotel")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (error) {
            callback(error, null);
        });
}

function handleHotels(error, data) {
    if (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return;
    }

    const tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = "";

    data.forEach(function (hotel) {
        const row = `
            <tr>
                <td>${hotel.id}</td>
                <td>${hotel.name}</td>
                <td><img src="${hotel.img}" width="80"></td>
                <td>${hotel.description}</td>
                <td>${hotel.location}</td>
                <td>${hotel.bookingdate}</td>
                <td>${hotel.price}</td>
                <td>
                    <button onclick="deleteHotel(${hotel.id})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function addHotelToAPI(hotelData, callback) {
    fetch("https://69a9528c32e2d46caf45eaa5.mockapi.io/Hotel", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hotelData)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (error) {
            callback(error, null);
        });
}

function handleAddHotel(error, data) {
    if (error) {
        console.error("Lỗi khi thêm:", error);
        return;
    }

    getHotels(handleHotels);
}

function deleteHotelFromAPI(id, callback) {
    fetch(`https://69a9528c32e2d46caf45eaa5.mockapi.io/Hotel/${id}`, {
        method: "DELETE"
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (error) {
            callback(error, null);
        });
}

function handleDeleteHotel(error, data) {
    if (error) {
        console.error("Lỗi khi xoá:", error);
        return;
    }

    getHotels(handleHotels);
}

function deleteHotel(id) {
    if (confirm("Bạn có chắc chắn muốn xoá không?")) {
        deleteHotelFromAPI(id, handleDeleteHotel);
    }
}

document.getElementById("addHotel").addEventListener("click", function () {
    const newHotel = {
        name: document.getElementById("name").value,
        img: document.getElementById("image").value,
        description: document.getElementById("description").value,
        location: document.getElementById("location").value,
        bookingdate: document.getElementById("bookingdate").value,
        price: document.getElementById("price").value
    };

    addHotelToAPI(newHotel, handleAddHotel);
});

getHotels(handleHotels);