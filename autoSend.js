const {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
  } = require('@solana/web3.js');
  
  const connection = new Connection('https://mantis-testnet-rollup.composable-shared-artifacts.composablenodes.tech/rpc', 'confirmed');
  
  // Replace with your sender's secret key
  const fromSecretKey = Uint8Array.from([/* your secret key array here */]);
  const fromWallet = Keypair.fromSecretKey(fromSecretKey);
  
  // List of recipient addresses
  const recipientAddresses = [
    'EAmKoRk8ao2TqwtaDop3CXT1igf6xqXU68eXVqUnwMmq',
    // Add 99 more addresses here
  ];
  
  const sendSol = async (toPubkey) => {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromWallet.publicKey,
        toPubkey,
        lamports: 0.001 * LAMPORTS_PER_SOL,
      })
    );
  
    try {
      const signature = await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
      console.log(`Transaction successful with signature: ${signature}`);
    } catch (error) {
      console.error(`Failed to send SOL to ${toPubkey}:`, error);
    }
  };
  
  (async () => {
    for (const address of recipientAddresses) {
      await sendSol(address);
    }
  })();
  