function setBalance(balance) {
    document.getElementById("balance").innerText = balance;
}

function setPrice(price) {
    document.getElementById("bibicoin-price").innerText = price;
}

// 以弹窗的方式显示图片
function showImage(number) {
    // 隐藏 #recharge-buttons
    $("#recharge-buttons").hide();
    // 设置 #recharge-amount
    $("#recharge-amount").text(number*getPrice().price);
    // 显示 #qr-code
    $("#qr-code").show();

    // 5秒后隐藏 #qr-code
    setTimeout(function () {
        $("#qr-code").hide();
        // 显示 #recharge-buttons
        $("#recharge-buttons").show();
        alert("支付成功！");
        doTrade("god", "Mike", number);
        setBalance(getBalance("Mike").balance);
    }, 5000);
}


$(document).ready(function(){
    setBalance(getBalance("Mike").balance);
    setPrice(getPrice().price);
    $("#buy-1-bc").click(function(){
        showImage(1);
    });
    $("#buy-2-bc").click(function(){
        showImage(2);
    });
    $("#buy-5-bc").click(function(){
        showImage(5);
    });
});