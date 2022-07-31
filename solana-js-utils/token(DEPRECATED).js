import { createMint } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

const payer = {
  publicKey: new PublicKey("AAKJNZoux1rufC2FbThhTHQEmLtN6avio2Z3tgBrECZs"),
  secretKey: "",
}

const mintAuthority = Keypair.generate();
const freezeAuthority = Keypair.generate();

console.log('payer.publicKey.toString()', payer.publicKey.toString());
console.log('payer.publicKey.toString()', payer.secretKey.toString());

const connection = new Connection(
  clusterApiUrl('testnet'),
  'confirmed'
);

const mint = await createMint(
  connection,
  payer,
  payer.publicKey,
  payer.publicKey,
  9 // We are using 9 to match the CLI decimal default exactly
);

console.log(mint.toBase58());
// AQoKYV7tYpTrFZN6P5oUufbQKAUr9mNYGe1TTJC9wajM