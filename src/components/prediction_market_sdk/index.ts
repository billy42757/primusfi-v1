import { LAMPORTS_PER_SOL, PublicKey, SYSVAR_RENT_PUBKEY, TransactionMessage, ComputeBudgetProgram, AddressLookupTableProgram, Connection } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  PREDICTION_ID,
  GLOBAL_SEED,
  MARKET_SEED,
  MINT_SEED_B,
  TOKEN_METADATA_PROGRAM_ID,
  METADATA_SEED,
  MINT_SEED_A,
  SOL_USDC_FEED,
  feeAuthority
} from "./constants";
import { GlobalSettingType, CreateMarketType, DepositeLiquidityType, BetType, OracleType } from "../../types/type";
import { SystemProgram, Transaction, VersionedTransaction } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { getAssociatedTokenAccount, getOrCreateATAInstruction } from "./util";
import idl  from "./idl/prediction.json";
import { BN } from 'bn.js';

let solConnection = new Connection("https://api.devnet.solana.com", {
  commitment: "confirmed",
});
// let provider: anchor.Provider = new anchor.AnchorProvider(solConnection, wallet!, {});
// anchor.setProvider(provider);
// let program: anchor.Program = new anchor.Program(IDL as anchor.Idl, PREDICTION_ID);

let globalPDA: PublicKey = PublicKey.findProgramAddressSync(
  [Buffer.from(GLOBAL_SEED)], 
  PREDICTION_ID
)[0];
let program: anchor.Program = new anchor.Program(idl as anchor.Idl, PREDICTION_ID, { connection: solConnection });

export const createMarket = async (param: CreateMarketType) => {
  
  if (!param.wallet.publicKey || !param.wallet.signTransaction || !param.wallet) {
    return
  }
  
  let provider: anchor.Provider = new anchor.AnchorProvider(solConnection, param.anchorWallet, {
    skipPreflight: true,
    commitment: "confirmed",
  });
  console.log("here start");

  const creator = param.wallet.publicKey;
  console.log("creator:", param.wallet.publicKey);
  
  let market = PublicKey.findProgramAddressSync(
    [Buffer.from(MARKET_SEED), Buffer.from(param.marketID)],
    // [Buffer.from(MARKET_SEED), creator.toBuffer()],
    PREDICTION_ID
  )[0];
  const tokenA = PublicKey.findProgramAddressSync(
    [Buffer.from(MINT_SEED_A), market.toBuffer()],
    PREDICTION_ID
  )[0];
  const tokenB = PublicKey.findProgramAddressSync(
    [Buffer.from(MINT_SEED_B), market.toBuffer()],
    PREDICTION_ID
  )[0];

  let pdaTokenAAccount = await getAssociatedTokenAccount(market, tokenA);
  let pdaTokenBAccount = await getAssociatedTokenAccount(market, tokenB);

  const metadata_a = PublicKey.findProgramAddressSync(
    [
      Buffer.from(METADATA_SEED),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      tokenA.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0];
  const metadata_b = PublicKey.findProgramAddressSync(
    [
      Buffer.from(METADATA_SEED),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      tokenB.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0];
  console.log("first transaction:");
  let militime =  new Date(param.date as string).getTime();
  const initTx = await program.methods
    .initMarket({
      value: new BN(param.value),
      marketId: param.marketID,
      range: param.range,
      tokenAmount: new BN(param.tokenAmount),
      tokenPrice: new BN(param.tokenPrice * LAMPORTS_PER_SOL),
      nameA: param.nameA,
      nameB: param.nameB,
      symbolA: param.symbolA,
      symbolB: param.symbolB,
      urlA: param.urlA,
      urlB: param.urlB,
      date: new BN(militime/1000),
    })
    .accounts({
      user: param.wallet.publicKey,
      feeAuthority: new PublicKey(feeAuthority),
      market,
      globalPda: globalPDA,
      feed: param.feed.publicKey,
      metadataA: metadata_a,
      metadataB: metadata_b,
      tokenMintA: tokenA,
      tokenMintB: tokenB,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
    })
    .transaction();
  console.log("second transaction:");

  const mintTx = await program.methods
    .mintToken(param.marketID)
    .accounts({
      pdaTokenAAccount,
      pdaTokenBAccount,
      user: param.wallet.publicKey,
      feeAuthority: new PublicKey(feeAuthority),
      market,
      global: globalPDA,
      metadataA: metadata_a,
      metadataB: metadata_b,
      tokenMintA: tokenA,
      tokenMintB: tokenB,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
    })
    .transaction();

  let latestBlockHash = await solConnection.getLatestBlockhash(
    solConnection.commitment
  );

  const creatTx = new Transaction({
    feePayer: param.wallet.publicKey,
    ...latestBlockHash,
  });
  creatTx.add(initTx).add(mintTx);
  
  const addressesMain: PublicKey[] = [];
  creatTx.instructions.forEach((ixn) => {
    ixn.keys.forEach((key) => {
      addressesMain.push(key.pubkey);
    });
  });
  
  const messageV0 = new TransactionMessage({
    payerKey: param.wallet.publicKey,
    recentBlockhash: latestBlockHash.blockhash,
    instructions: creatTx.instructions,
  }).compileToV0Message();
  console.log("building transaction:");
  
  const vtx = new VersionedTransaction(messageV0);
  const sim = await solConnection.simulateTransaction(vtx);
  
  const signedTx = await param.wallet.signTransaction(vtx);

  if (sim.value.err) {
    console.log("🤖Simulation error🤖:", sim.value.err);
    throw new Error("🤖Transaction simulation failed when creating market🤖.");
  }
  const createV0Tx = await solConnection.sendTransaction(signedTx);
  console.log("🤖tx🤖:", createV0Tx);
  
  const vTxSig = await solConnection.confirmTransaction(createV0Tx, 'finalized');
  console.log("🤖confirmation🤖:", vTxSig);
  
  // const preInxSim = await solConnection.simulateTransaction(creatTx);
  // console.log("🎫create market preInxSim 🎫", preInxSim);

  // const sig = await solConnection.sendTransaction(creatTx, [param.creator], {
  //   skipPreflight: true,
  // });

  // const confirm = await solConnection.confirmTransaction(sig, "confirmed");
  // console.log("🤖create market transaction signature 🤖", sig);
  return {
    tokenA,
    tokenB,
    market,
  };
};

export const depositLiquidity = async (param: DepositeLiquidityType) => {
  console.log(param.amount, param.market_id, param.wallet.publicKey?.toBase58());
  
  if ( !param.wallet || !param.wallet.publicKey || !param.wallet.signTransaction) {
    return
  }
  
  const investerPubkey = param.wallet.publicKey;
  let market = new PublicKey(param.market_id)

  let tx = await program.methods.addLiquidity(new BN(param.amount * LAMPORTS_PER_SOL))
    .accounts({
      user: investerPubkey,
      feeAuthority: feeAuthority,
      market,
      global: globalPDA,
      systemProgram: SystemProgram.programId,
    }).instruction();

  const setBudgetInx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 200_000,
  });

  let latestBlockHash = await solConnection.getLatestBlockhash(
    solConnection.commitment
  );

  const messageV0 = new TransactionMessage({
    payerKey: investerPubkey,
    recentBlockhash: latestBlockHash.blockhash,
    instructions: [setBudgetInx, tx],
  }).compileToV0Message();

  const vtx = new VersionedTransaction(messageV0);

  const sim = await solConnection.simulateTransaction(vtx);
  console.log("sim:", sim);
  
  const signedTx = await param.wallet.signTransaction(vtx);

  if (sim.value.err) {
    console.log("🤖Simulation error🤖:", sim.value.err);
    throw new Error("🤖Transaction simulation failed when deploy liquidity.🤖");
  }
  const createV0Tx = await solConnection.sendTransaction(signedTx);
  console.log("🤖liqudity tx🤖:", createV0Tx);
  
  const vTxSig = await solConnection.confirmTransaction(createV0Tx, 'finalized');
  console.log("🤖confirmation🤖", vTxSig);

  const status = await fetchMarketInfo(market);
  return status;
}

// export const marketBetting = async (param: BetType) => {
//   const creatorPubkey = new PublicKey(param.creator);
//   const playerPubkey = new PublicKey(param.player);
//   const tokenPubkey = new PublicKey(param.token);
//   const market = PublicKey.findProgramAddressSync([Buffer.from(MARKET_SEED), creatorPubkey.toBuffer()], PREDICTION_ID)[0];
//   let pdaTokenAccount = await getAssociatedTokenAccount(market, tokenPubkey);
//   let [playerTokenAccount, player_ata_instruction] = await getOrCreateATAInstruction(tokenPubkey, playerPubkey, solConnection );

//   const tx = await program.methods.createBet({
//     amount: new BN(param.amount * LAMPORTS_PER_SOL),
//     isYes: param.isYes,
//   }).accounts({
//     user: playerPubkey,
//     creator: creatorPubkey,
//     tokenMint: tokenPubkey,
//     pdaTokenAccount: pdaTokenAccount,
//     userTokenAccount: playerTokenAccount,
//     feeAuthority: feeAuthority,
//     market,
//     globalPDA,
//     tokenProgram: TOKEN_PROGRAM_ID,
//     associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//     tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
//     systemProgram: SystemProgram.programId,
//   }).transaction();

//   let latestBlockHash = await provider.connection.getLatestBlockhash(
//     provider.connection.commitment
//   );

//   const betTx = new Transaction({
//     feePayer: playerPubkey,
//     ...latestBlockHash,
//   });
//   if (player_ata_instruction) {
//     betTx.add(player_ata_instruction);
//   }

//   betTx.add(tx);
//   const messageV0 = new TransactionMessage({
//     payerKey: playerPubkey,
//     recentBlockhash: latestBlockHash.blockhash,
//     instructions: betTx.instructions,
//   }).compileToV0Message();

//   const vtx = new VersionedTransaction(messageV0);

//   const serializedTx = vtx.serialize();
//   const base64Transaction = Buffer.from(serializedTx).toString("base64");

//   return base64Transaction;
// }

// export const getOracleResult = async (params: OracleType) => {
//   const creatorPubkey = new PublicKey(params.creator);
//   const market = PublicKey.findProgramAddressSync([Buffer.from(MARKET_SEED), creatorPubkey.toBuffer()], PREDICTION_ID)[0];

//   const tx = await program.methods.getRes().accounts({
//     user: auth.publicKey,
//     market,
//     feedAggregator: new PublicKey(SOL_USDC_FEED),
//     feed: new PublicKey("5mXfTYitRFsWPhdJfp2fc8N6hK8cw6NB5jAYpronQasj"),
//     systemProgram: SystemProgram.programId,
//   }).instruction();

//   let latestBlockHash = await provider.connection.getLatestBlockhash(
//     provider.connection.commitment
//   );

//   const betTx = new Transaction({
//     feePayer: auth.publicKey,
//     ...latestBlockHash,
//   });

//   betTx.add(tx);
//   const messageV0 = new TransactionMessage({
//     payerKey: auth.publicKey,
//     recentBlockhash: latestBlockHash.blockhash,
//     instructions: betTx.instructions,
//   }).compileToV0Message();

//   const vtx = new VersionedTransaction(messageV0);
// }

function sleep(ms: number): Promise<void> { 
  return new Promise(resolve => setTimeout(resolve, ms)); 
} 

export const fetchMarketInfo = async (pda: PublicKey) => {
  try {
    const info = await program.account.market.fetch(pda, "confirmed");
    console.log("market status:", info.marketStatus);
    
    return Object.keys(info.marketStatus as object)[0]
  } catch (error) {
    return null
  }
}