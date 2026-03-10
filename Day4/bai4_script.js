function saveData() {
    var fullname = document.getElementById("fullname").value;
    var idPro = document.getElementById("idPro").value;
    var namePro = document.getElementById("namePro").value;
    var quantity = Number(document.getElementById("quantity").value);
    var price = Number(document.getElementById("price").value);
    var amount = quantity * price;
    var discount = amount * 0.1;
    var total = amount - discount;

    var item = {
        id: autoId++,
        fullname,
        idPro,
        namePro,
        quantity,
        price,
        discount,
        amount,
        total
    };

    dataList.push(item);
    alert("Saved!");
}

function showData() {
    var tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    dataList.forEach(item => {
        var row = `
        <tr>
            <td>${item.id}</td>
            <td>${item.fullname}</td>
            <td>${item.idPro}</td>
            <td>${item.namePro}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.discount.toFixed(1)}</td>
            <td>${item.amount}</td>
            <td>${item.total.toFixed(1)}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function resetForm() {
    document.getElementById("fullname").value = "";
    document.getElementById("idPro").value = "";
    document.getElementById("namePro").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}
