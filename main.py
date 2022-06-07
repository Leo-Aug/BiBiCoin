from copy import deepcopy
import pickle
from random import randint
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from blockchain.block import Trade, Block
from generateblockchain import generate_trade

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


with open("bibicoinchain.pkl", "rb") as f:
    BiBiCoinChain = pickle.load(f)

trades = []
# 在trades中加入挖到区块的奖励交易
trades.append(generate_trade())

price = randint(90, 110)/100

@app.get("/getchain")
def get_blockchain():
    '''
    获取区块链
    '''
    return BiBiCoinChain.dict()

@app.get("/gettrades")
def get_trades():
    '''
    获取交易信息
    '''
    return trades

@app.post("/dotrade")
def do_trade(trade: Trade):
    '''
    执行交易
    '''
    trades.append(trade)
    return {"status": "ok"}

@app.get("/getbalance")
def get_balance(user: str):
    '''
    获取用户余额
    '''
    balance = 0

    # 遍历所有区块，计算余额
    for block in BiBiCoinChain.blocks:
        for trade in block.trades:
            if trade.sender == user:
                balance -= trade.amount
            if trade.receiver == user:
                balance += trade.amount
    # 遍历所有未入链交易，计算余额
    for trade in trades:
        if trade.sender == user:
            balance -= trade.amount
        if trade.receiver == user:
            balance += trade.amount
    return {"balance": balance}

@app.get("/getprice")
def get_price():
    '''
    获取当前价格
    '''
    return {"price": price}

@app.get("/mine")
def mine():
    '''
    挖矿
    '''
    # 创建一个区块
    block = Block(
        id=len(BiBiCoinChain.blocks)+1, 
        previous_hash=hash(BiBiCoinChain.blocks[-1].json()), 
        trades=deepcopy(trades)
    )
    # 将区块入链
    BiBiCoinChain.blocks.append(block)
    # 清空交易信息
    trades.clear()
    # 将挖到的奖励交易加入交易信息
    trades.append(Trade(sender="god", receiver="Mike", amount=1))
    return {"status": "ok"}

# @app.get("/blockchain")
# def get_blockchain():
#     return bibicoinchain.dict()

app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
