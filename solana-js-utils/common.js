import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'
import bs58 from 'bs58'

// const payer = Keypair.generate();
export const payer = Keypair.fromSecretKey(bs58.decode("2QxoAcbpYWqSM4LeSuzFnS4mJKHdcqPD6Wq7NjyXkrCFx7hthxHVDqzasuYLF5poLKUVJR1CTZiYfVmFbFNt2ioM"));

export const connection = new Connection(
  clusterApiUrl('devnet'),
  'confirmed'
);