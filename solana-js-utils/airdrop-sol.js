import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import bs58 from 'bs58';
// const payer = Keypair.generate();
const payer = Keypair.fromSecretKey(bs58.decode("2QxoAcbpYWqSM4LeSuzFnS4mJKHdcqPD6Wq7NjyXkrCFx7hthxHVDqzasuYLF5poLKUVJR1CTZiYfVmFbFNt2ioM"));

const connection = new Connection(
  clusterApiUrl('devnet'),
  'confirmed'
);

let address = payer.publicKey.toBase58();
let secret = bs58.encode(payer.secretKey);
console.log('address', address);
console.log('secret', secret);

const airdropSignature = connection.requestAirdrop(
  payer.publicKey,
  LAMPORTS_PER_SOL,
).then(data => {
    connection.confirmTransaction(data);
});

