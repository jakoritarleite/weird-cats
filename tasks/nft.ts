import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import { Contract } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { getContract } from '../lib/contract';
import { uploadToIpfs } from '../lib/ipfs';

task('mint-remaining', 'Mint remaining NFTs').setAction(async (_, hre) => {
  const contractFactory = await getContract('NFT', hre);
  const currentTokenId = await contractFactory.getCurrentTokenId();

  for (let i = currentTokenId; i <= 8888; i++) {
    let tokenId = await contractFactory.getCurrentTokenId();
    let tokenUri = await uploadToIpfs(tokenId);

    const tr = await contractFactory.mintNFT(tokenUri, {
      gasLimit: 500_000
    });

    await tr.wait();

    process.stdout.write(
      `Minted token #${tokenId} with tokenUri: ${tokenUri} and tx hash: ${tr.hash}\n`
    );
  }
});

task('mint-nft', 'Mint an NFT').setAction(async (_, hre) => {
  return getContract('NFT', hre)
    .then(async (contract: Contract) => {
      const tokenId = await contract.getCurrentTokenId();
      const tokenUri = await uploadToIpfs(tokenId);

      process.stdout.write(
        `Minting token #${tokenId} with tokenUri: ${tokenUri}`
      );

      return contract.mintNFT(tokenUri, {
        gasLimit: 500_000
      });
    })
    .then((tr: TransactionResponse) => {
      process.stdout.write(`\nTX hash: ${tr.hash}`);
    });
});
