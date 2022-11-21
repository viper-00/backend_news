/*
    Name: Dogecoin / Dogecoin Blockchain
    Link: https://apidoc.tatum.io/tag/Dogecoin
    * Mainnet - a regular live chain
    * Testnet - a chain used for testing purposes. Coins on the test chain have no value and can be obtained from a faucet, e.g. https://testnet-faucet.com/doge-testnet/
*/

import axios from "axios"

const TESTNET_KEY = "7c27c4f3-b4e0-4133-abc3-414ee54a1eb7"
const MAINNET_KEY = "558dd767-1600-4c97-9f11-d0a974c8073f"

const DOGE_API = "https://api.tatum.io/v3/dogecoin/"

const headers = {
    "x-api-key": TESTNET_KEY
}

let obj = {}

// Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase.
async function CreateWallet() {
    const url = DOGE_API + "wallet"
    axios.get(url, { headers }).then(res => {
        if (res.status === 200 && res.data) {
            const xpub = res.data.xpub
            const mnemonic = res.data.mnemonic
            if (xpub && xpub != "" && mnemonic && mnemonic != "") {
                obj = {
                    xpub,
                    mnemonic,
                }
                console.log(obj)
                return obj
            }
        }
        console.log(res)
        return res.data
    }).catch(err => {
        console.log(err)
        return null
    })
}

// Generate Dogecoin deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate up to 2^31 addresses starting from index 0 until 2^31 - 1.
async function GenerateDepositAddressFromExtendedPublicKey(xpub, index) {
    if (xpub && xpub != "" && index && parseInt(index) >= 0) {
        const url = DOGE_API + "address/" + xpub + "/" + index
        axios.get(url, { headers }).then(res => {
            if (res.status === 200 && res.data) {
                console.log(res.data.address)
                return res.data.address
            }
            console.log(res)
            return ""
        }).catch(err => {
            console.log(err)
            return ""
        })
    } else {
        return ""
    }
}

async function GeneratePrivateKey(mnemonic, index) {
    if (mnemonic && mnemonic != "" && index && parseInt(index) >= 0) {
        const url = DOGE_API + "wallet/priv"
        axios.post(url, {
            index,
            mnemonic
        }, { headers }).then(res => {
            if (res.status === 200 && res.data) {
                console.log(res.data.key)
                return res.data.key
            }
            return ""
        }).catch(err => {
            console.log(err)
            return ""
        })
    } else {
        console.log(err)
        return ""
    }
}

// Send DOGE to blockchain addresses.
// fromUTXO: 
// - txHash: @string The transaction hash of the UTXO to be spent 
// - value: @string The amount to send (in DOGE)
// - address: @string The blockchain address to receive the assets
// - index: @number The index of the UTXO to be spent
// - privateKey: @string The private key of the blockchain address that holds the UTXO to be spent
// to
// - address: @string The blockchain address to receive the assets
// - value: @number The amount to receive (in DOGE)
async function SendDOGEToDogecoinAddresses(fromUTXO, to) {
    if (fromUTXO && to) {
        const url = DOGE_API + "transaction"
        axios.post(url, { fromUTXO, to }, { headers }).then(res => {
            if (res.status === 200 && res.data) {
                console.log(res.data.txid)
                return res.data.txid
            }
        }).catch(err => {
            console.log(err)
            return ""
        })
    } else {
        console.log(err)
        return ""
    }
}

// Get Dogecoin Blockchain Information. Obtain basic info like testnet / mainnet version of the chain, current block number and it's hash.
async function GetBlockchainInformation() {
    const url = DOGE_API + "info"
    axios.get(url, { headers }).then(res => {
        if (res.status === 200 && res.data) {
            const chain = res.data.chain
            const blocks = res.data.blocks
            const headers = res.data.headers
            const bestblockhash = res.data.bestblockhash
            const difficulty = res.data.difficulty
            obj = {
                chain,
                blocks,
                headers,
                bestblockhash,
                difficulty
            }
            return obj
        }
        console.log(res)
        return null
    }).catch(err => {
        console.log(err)
        return null
    })
}

// Get Dogecoin Block hash. Returns hash of the block to get the block detail.
// Parameter: i -> The number of blocks preceding a particular block on a block chain.
async function GetBlockHash(i) {
    if (i && parseInt(i) > 0) {
        const url = DOGE_API + "block/hash/" + i
        axios.get(url, { headers }).then(res => {
            if (res.status === 200 && res.data) {
                const hash = res.data.hash
                return hash
            }
            console.log(res)
            return ""
        }).catch(err => {
            console.log(err)
            return ""
        })
    } else {
        return ""
    }
}

// Get Dogecoin Block detail by block hash or height.
async function GetBlockByHashOrHeight(hash) {
    if (hash && hash != "") {
        const url = DOGE_API + "block/" + hash
        axios.get(url, { headers }).then(res => {
            if (res.status === 200 && res.data) {
                console.log(res.data)
                return res.data
            }
            console.log(res)
            return null
        }).catch(err => {
            console.log(err)
            return null
        })
    } else {
        return null
    }
}

async function GetTransactionByHash(hash) {
    if (hash && hash != "") {
        const url = DOGE_API + "transaction/" + hash
        axios.get(url, { headers }).then(res => {
            if (res.status === 200 && res.data) {
                console.log(res.data)
                return res.data
            }
            console.log(res)
            return null
        }).catch(err => {
            console.log(err)
            return null
        })
    } else {
        return null
    }
}

// const data = CreateWallet()
// const data = GeneratePrivateKey("parrot brave column clown finish dawn sense corn faculty buzz trash strike monitor prize struggle rib hat jewel say taste beach bubble near ocean", 1)
const fromUTXO = {
    txHash: "",
    value: 100,
    address: "",
    index: 0,
    privateKey: "",
}

const to = {
    address: "",
    value: "",
}

const data = SendDOGEToDogecoinAddresses(fromUTXO, to)
console.log(data)