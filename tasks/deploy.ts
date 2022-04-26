import '@nomiclabs/hardhat-ethers';
import { task } from 'hardhat/config';
import { getWallet } from '../lib/wallet';

task('deploy-contract', 'Deploy NFT contract').setAction(async (_, hre) => {
  return hre.ethers
    .getContractFactory('NFT', getWallet())
    .then(contractFactory => contractFactory.deploy(8888))
    .then(result => {
      process.stdout.write(`Contract address: ${result.address}`);
    });
});
