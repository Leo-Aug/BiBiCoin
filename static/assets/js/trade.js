function getTo() {
    let to = document.getElementById("trade-to").value;
    return to;
}

function getAmount() {
    let amount = document.getElementById("trade-amount").value;
    return amount;
}

$(document).ready(function(){
    $("#trade-btn").click(function(){
        let to = getTo();
        let amount = getAmount();
        doTrade("Mike", to, amount);
    });
});