import { createMint, getMint, getOrCreateAssociatedTokenAccount, getAccount, mintTo, createSetAuthorityInstruction, AuthorityType } from '@solana/spl-token'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js'
import {
    PROGRAM_ID as MPL_TOKEN_METADATA_PROGRAM_ID,
    createCreateMetadataAccountInstruction,
    createCreateMasterEditionInstruction,
  } from "@metaplex-foundation/mpl-token-metadata";
import { payer, connection } from './common.js'
import bs58 from 'bs58'

function createToken() {
    createMint(
        connection,
        payer,
        payer.publicKey,
        payer.publicKey,
        0 // [NFT won't need mint]
    ).then(data => {
        console.log(data.toBase58());
        // Hu4wUPsgYciB68iXYejnJ4vDVA3u5xXRkr94KQtY4M8D
    });
}



async function getTokenMint() {
    const mintInfo = await getMint(
        connection,
        new PublicKey("Hu4wUPsgYciB68iXYejnJ4vDVA3u5xXRkr94KQtY4M8D")
    )

    return mintInfo
}

async function associatedTokenAccount() {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        new PublicKey("Hu4wUPsgYciB68iXYejnJ4vDVA3u5xXRkr94KQtY4M8D"),
        payer.publicKey
    )
    // 6tmscwCHvmdHK6pYGrEjE6gATHFUf5V4fwSHSnaXF2tt
    console.log(tokenAccount.address.toBase58());
}


async function checkTheTokenAccount() {
    const tokenAccountInfo = await getAccount(
        connection,
        new PublicKey("6tmscwCHvmdHK6pYGrEjE6gATHFUf5V4fwSHSnaXF2tt")
    )

    console.log(tokenAccountInfo.amount);
}


async function mintToken() {
    const mint = await getTokenMint()
    await mintTo(
        connection,
        payer, // [source wallet]
        new PublicKey("Hu4wUPsgYciB68iXYejnJ4vDVA3u5xXRkr94KQtY4M8D"), // [mint account]
        new PublicKey("6tmscwCHvmdHK6pYGrEjE6gATHFUf5V4fwSHSnaXF2tt"), // [target associated token account wallet]
        payer.publicKey, // [authority wallet]
        1 // [NFT only need 1]
    )
}

// [disable NFT future minting] todo .......
async function disableFutureMinting() {
    let transaction = new Transaction()
    .add(createSetAuthorityInstruction(
      new PublicKey("Hu4wUPsgYciB68iXYejnJ4vDVA3u5xXRkr94KQtY4M8D"),
      new PublicKey("6tmscwCHvmdHK6pYGrEjE6gATHFUf5V4fwSHSnaXF2tt"),
      AuthorityType.MintTokens,
      null
    ));
  
  await sendAndConfirmTransaction(connection, transaction, [wallet]);
}

// createToken();
// associatedTokenAccount();
mintToken();
// disableFutureMinting();
