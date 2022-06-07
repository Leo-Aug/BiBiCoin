from blockchain.block import Trade, Block, BlockChain
from random import randint

# 生成奖励交易
def generate_trade():
    users = ['Mike', 'John', 'Bob', 'Alice', 'Tom', 'Jerry', 'Jack', 'Lily', 'Lucy', 'Lily']
    return Trade(sender='god', receiver=users[randint(0, 9)], amount=1)


def generate_blockchain(n):
    # 生成10个用户
    users = ['Mike', 'John', 'Bob', 'Alice', 'Tom', 'Jerry', 'Jack', 'Lily', 'Lucy', 'Lily']

    # 创建一个区块链
    chain = BlockChain(blocks=[])

    # 加入创世区块
    chain.blocks.append(
        Block(id=1, previous_hash='0', 
            trades=[Trade(sender='god', receiver=users[randint(0, 9)], amount=1)])
    )
    # 创建20个区块
    for i in range(2, n):
        block = Block(id=i, previous_hash=hash(chain.blocks[-1].json()), trades=[])
        # 将每个区块的第一条交易信息设为奖励
        block.trades.append(Trade(sender='god', receiver=users[randint(0, 9)], amount=1))
        # 向区块中加入若干条交易信息
        for j in range(randint(1, 10)):
            block.trades.append(
                Trade(sender=users[randint(0, 9)], receiver=users[randint(0, 9)], amount=randint(1, 10))
            )
        chain.blocks.append(block)
    return chain

if __name__ == '__main__':
    bibicoinchain = generate_blockchain(20)
    print(bibicoinchain.dict())