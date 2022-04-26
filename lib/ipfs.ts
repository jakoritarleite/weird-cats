import fs from 'fs';
import path from 'path';
import { NFTStorage, File } from 'nft.storage';
import 'dotenv/config';

export async function uploadToIpfs(tokenId: number): Promise<string> {
  const client = new NFTStorage({
    token: process.env.NFT_STORAGE_KEY!
  });

  let file: Buffer;

  try {
    file = await fs.promises.readFile(
      path.join(process.env.FILES_FOLDER!, `${tokenId}.png`)
    );
  } catch (err) {
    throw Error(`Error reading file ${err}`);
  }

  const metadata = await client.store({
    name: `Weird Pixel #${tokenId}`,
    description: 'Collection of 8888 weird pixels',
    image: new File([file], `${tokenId}.png`, { type: 'image/png' })
  });

  return metadata.url;
}
