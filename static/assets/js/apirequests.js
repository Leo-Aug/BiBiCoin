var baseapi = "https://toia3r.deta.dev";

function getBlockChainInfo(){
    var responsedata = {};
    $.ajax({
        url: baseapi + "/getchain",
        type: "GET",
        async: false,
        dataType: "json",
        success: function(data){
            responsedata = data;
        }
    });
    return responsedata;
}

function getTrades(){
    var responsedata = {};
    $.ajax({
        url: baseapi + "/gettrades",
        type: "GET",
        async: false,
        success: function(data){
            responsedata = data;
        }
    });
    return responsedata;
}

function getBalance(user){
    var responsedata = {};
    $.ajax({
        url: baseapi + "/getbalance?user=" + user,
        type: "GET",
        async: false,
        success: function(data){
            responsedata = data;
        }
    });
    return responsedata;
}

function getPrice(){
    var responsedata = {};
    $.ajax({
        url: baseapi + "/getprice",
        type: "GET",
        async: false,
        success: function(data){
            responsedata = data;
        }
    });
    return responsedata;
}

function doTrade(from, to, amount)
{
    // 向 /dotrade 发送post请求
    $.ajax({
        url: baseapi + "/dotrade",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            sender: from,
            receiver: to,
            amount: amount
        }),
        success: function(data){
            if(data.status == "ok"){
                alert("交易完成");
            }
        }
    });
}

function mine(){
    $.ajax({
        url: baseapi + "/mine",
        type: "GET",
        success: function(data){
            if(data.status == "ok"){
                // 1秒后显示弹窗
                setTimeout(function(){
                    alert("挖到一个区块，奖励一个BiBiCoin");
                });
            }
        }
    });
}