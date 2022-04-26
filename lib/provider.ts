import { ethers } from 'ethers';

// export function getProvider(): ethers.providers.Provider {
//   return ethers.getDefaultProvider('maticmum', {
//     alchemy: process.env.API_URL
//   });
// }

export function getProvider(): ethers.providers.AlchemyProvider {
  return new ethers.providers.AlchemyProvider(
    'maticmum',
    process.env.ALCHEMY_API_KEY
  );
}
