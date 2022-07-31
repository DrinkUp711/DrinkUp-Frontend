import { createMint, getMint, getOrCreateAssociatedTokenAccount, getAccount, mintTo } from '@solana/spl-token'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { payer, connection } from './common.js'
import bs58 from 'bs58'

function createToken() {
    createMint(
        connection,
        payer,
        payer.publicKey,
        payer.publicKey,
        9 // We are using 9 to match the CLI decimal default exactly
    ).then(data => {
        console.log(data.toBase58());
        // GEuigzQzayXVSuD6VLBNByuvNUfoHreprssGUycYo1v9
    });
}



async function getTokenMint() {
    const mintInfo = await getMint(
        connection,
        new PublicKey("GEuigzQzayXVSuD6VLBNByuvNUfoHreprssGUycYo1v9")
    )

    return mintInfo
}

async function associatedTokenAccount() {
    const mint = await getTokenMint()
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint.address,
        payer.publicKey
    )
    // ApyxKNkiroBr6x4EmBSPJzdG8ffVih2iAtHLjuKn9krW
    console.log(tokenAccount.address.toBase58());
}


async function checkTheTokenAccount() {
    const tokenAccountInfo = await getAccount(
        connection,
        new PublicKey("ApyxKNkiroBr6x4EmBSPJzdG8ffVih2iAtHLjuKn9krW")
    )

    console.log(tokenAccountInfo.amount);
}


async function mintToken() {
    const mint = await getTokenMint()
    await mintTo(
        connection,
        payer,
        mint.address,
        new PublicKey("ApyxKNkiroBr6x4EmBSPJzdG8ffVih2iAtHLjuKn9krW"),
        payer.publicKey,
        100 * Math.pow(10, 9) // because decimals for the mint are set to 9 
    )
}

// getTokenMint().then(data => {
//     console.log('data', data);
// })


// createToken()
// associatedTokenAccount()
// checkTheTokenAccount()

mintToken().then(data =>{
    checkTheTokenAccount();
})

