'''
block 模块
'''
from typing import List
from pydantic import BaseModel


class Trade(BaseModel):
    '''
    交易类
    '''
    sender: str
    receiver: str
    amount: int

class Block(BaseModel):
    '''
    区块类
    '''
    id: int
    previous_hash: str
    trades: List[Trade]

class BlockChain(BaseModel):
    '''
    区块链类
    '''
    blocks: List[Block]

if __name__ == '__main__':
    t = Trade(sender='a', receiver='b', amount=1)
    b = Block(id=1, previous_hash='0', trades=[t])
    bc = BlockChain(blocks=[b])
    print(len(bc.blocks))
