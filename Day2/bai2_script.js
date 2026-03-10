function calculate() {
    var s1 = parseFloat(document.getElementById("s1").value);
    var s2 = parseFloat(document.getElementById("s2").value);
    var year = parseInt(document.getElementById("year").value);

    let k;
    switch (year) {
        case 1: {
            k = parseFloat((s1+(s2*2))/3);
            document.getElementById("avg").value = k;
            break;
        }
        case 2: {
            k = parseFloat(((s1*2)+(s2*3))/5);
            document.getElementById("avg").value = k;
            break;
        }
        case 3: {
            k = parseFloat(((s1*3)+(s2*4))/7);
            document.getElementById("avg").value = k;
            break;
        }
    }

    if (k>=9) {
        document.getElementById('rank').innerText = "Hoc sinh gioi";
        document.getElementById('rank').style.color = "red";
    }
    else if (k>=7 && k<9) {
        document.getElementById('rank').innerText = "Hoc sinh kha";
        document.getElementById('rank').style.color = "blue";
    }
    else {
        document.getElementById('rank').innerText = "Hoc sinh trung binh";
        document.getElementById('rank').style.color = "yellow";
    }
}