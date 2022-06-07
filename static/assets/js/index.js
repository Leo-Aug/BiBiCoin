function Block(id, hash, data) {
    var block = $('<div class="x-dropdown dropdown"></div>');
    // 第一个div
    block.append($('<div class="text-start x-drop-btn" aria-expanded="false" data-bs-toggle="dropdown" style="border-radius: 2px;"><span>ID: </span><span>' + id + '</span><i class="material-icons">keyboard_arrow_down</i></div>'));
    
    // 创建 head
    var h4 = $('<h4>PREVIOUS-HASH</h4>');
    var p = $('<p>' + hash + '</p>');

    // 创建 table
    var tablediv = $('<div class="table-responsive"></div>');
    var table = $('<table class="table"></table>');
    var thead = $('<thead></thead>');
    var tr = $('<tr></tr>');
    tr.append($('<th>来源</th>'));
    tr.append($('<th>去向</th>'));
    tr.append($('<th>金额</th>'));
    thead.append(tr);
    table.append(thead);
    var tbody = $('<tbody></tbody>');
    for (var i = 0; i < data.length; i++) {
        var tr = $('<tr></tr>');
        tr.append($('<td>' + data[i].sender + '</td>'));
        tr.append($('<td>' + data[i].receiver + '</td>'));
        tr.append($('<td>' + data[i].amount + '</td>'));
        tbody.append(tr);
    }
    table.append(tbody);
    tablediv.append(table);

    // 将 head p 和 table 添加到 blockdatadiv 中
    blockdatadiv = $('<div class="dropdown-menu" role="menu" style="width: 100%;min-width: 100%;"></div>');
    blockdatadiv.append(h4);
    blockdatadiv.append(p);
    blockdatadiv.append(tablediv);

    // 将 blockdatadiv 添加到 block 中
    block.append(blockdatadiv);
    return block;
}

function Trades(data) {
    var block = $('<div class="x-dropdown dropdown"></div>');
    // 第一个div
    block.append($('<div class="text-start x-drop-btn" aria-expanded="false" data-bs-toggle="dropdown" style="border-radius: 2px;"><span>未入链交易</span><i class="material-icons">keyboard_arrow_down</i></div>'));

    // 创建 table
    var tablediv = $('<div class="table-responsive"></div>');
    var table = $('<table class="table"></table>');
    var thead = $('<thead></thead>');
    var tr = $('<tr></tr>');
    tr.append($('<th>来源</th>'));
    tr.append($('<th>去向</th>'));
    tr.append($('<th>金额</th>'));
    thead.append(tr);
    table.append(thead);
    var tbody = $('<tbody></tbody>');
    for (var i = 0; i < data.length; i++) {
        var tr = $('<tr></tr>');
        tr.append($('<td>' + data[i].sender + '</td>'));
        tr.append($('<td>' + data[i].receiver + '</td>'));
        tr.append($('<td>' + data[i].amount + '</td>'));
        tbody.append(tr);
    }
    table.append(tbody);
    tablediv.append(table);

    // 将 head p 和 table 添加到 blockdatadiv 中
    blockdatadiv = $('<div class="dropdown-menu" role="menu" style="width: 100%;min-width: 100%;"></div>');
    blockdatadiv.append(tablediv);

    // 将 blockdatadiv 添加到 block 中
    block.append(blockdatadiv);
    return block;
}

function addBlock(id, hash, data) {
    $('#blockchain').append(Block(id, hash, data));
}

function addTrades(data) {
    $('#blockchain').append(Trades(data));
}

function refreshBlock() {
    let trades = getTrades();
    addTrades(trades);
    let blockChainInfo = getBlockChainInfo().blocks;
    for(let i = 0; i < blockChainInfo.length; i++) {
        addBlock(blockChainInfo[i].id, blockChainInfo[i].previous_hash, blockChainInfo[i].trades);
    }
}

$(document).ready(function(){
  refreshBlock();
});