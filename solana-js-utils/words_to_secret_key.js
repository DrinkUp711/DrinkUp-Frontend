const { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const bs58 = require('bs58')
const bip39 = require('bip39')
const ed25519 = require('ed25519-hd-key')
const derivePath = "m/44'/501'/0'/0'" // old  "m/44'/501'/0'" 
let pharseWord =
'once album erode away tag kitchen innocent battle fold tongue before hard'
let fromSeedArray = new TextEncoder().encode(pharseWord)
bip39.mnemonicToSeed(pharseWord).then(seed => {
    const derivedSeed = ed25519.derivePath(derivePath, seed.toString('hex')).key
    let account = Keypair.fromSeed(derivedSeed)
    let address = account.publicKey.toBase58()
    let secretKey = account.secretKey
    console.log(address)
    console.log(secretKey)
    console.log(bs58.encode(account.secretKey))

    const connection = new Connection(
        clusterApiUrl('devnet'),
        'confirmed'
      );
      
    connection.requestAirdrop(
        account.publicKey,
        LAMPORTS_PER_SOL,
    ).then(data => {
        connection.confirmTransaction(data);
    });
           
})
