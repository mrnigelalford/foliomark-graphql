import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import * as fs from 'fs';
import { TokenMetadataInternal } from '@oxheadalpha/fa2-interfaces';
import { createStorage } from './NFT';

export interface Attribute {
  name: string;
  value: string;
}

const testKey = 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq';

export class TezosNode {
  private tezos: TezosToolkit;

  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl);
    this.tezos.setProvider({
      signer: new InMemorySigner(testKey),
    });
  }

  public async originate(
    jsonMetadata: any,
    ownerAddress: string
  ): Promise<void> {
    const storage = createStorage({
      metadata: jsonMetadata,
      owner: ownerAddress,
    });

    const code = fs.readFileSync(
      '/Users/nigelalford/projects/tezos/ligo-smart-contract/src/fm-NFT.tz',
      {
        encoding: 'utf8',
        flag: 'r',
      }
    );

    const originationOp = this.tezos.contract.originate({ code, storage });

    const contract = (await originationOp)
      .contract()
      .catch((e) => console.log(`Error: ${JSON.stringify(e, null, 2)}`));

    contract.then((e) => console.log('contract completed: ', e));
  }

  public async mint(
    ownerAddress: string,
    tokens: TokenMetadataInternal[]
  ): Promise<void> {
    const balance = await this.tezos.tz.getBalance(ownerAddress);
    console.log(`Balance: ${balance}`);

    const contract = await this.tezos.contract.at(
      'KT1G7XLcXRpK2sVzctaCW1EAGzTzVhepetLj'
    );

    const mint = await contract.methods
      .mint([{ owner: ownerAddress, tokens }])
      .send();

    const receipt = mint.results;
    console.log('Mint Receipt: ', receipt);
  }

  public async pause(contractAddress: string): Promise<void> {
    const contract = await this.tezos.contract.at(contractAddress);

    const pause = await contract.methods.pause().send();

    const receipt = pause.results;
    console.log('Pause Receipt: ', receipt);
  }

  public async burn(contractAddress: string, tokenId: number): Promise<void> {
    const contract = await this.tezos.contract.at(contractAddress);

    const burn = await contract.methods.burn(tokenId).send();

    const receipt = burn.results;
    console.log('Burn Receipt: ', receipt);
  }

  public async transferToken(
    contractAddress: string,
    tokenId: number,
    to: string
  ): Promise<void> {
    const contract = await this.tezos.contract.at(contractAddress);

    const transfer = await contract.methods.transfer(tokenId, to).send();

    const receipt = transfer.results;
    console.log('Transfer Receipt: ', receipt);
  }
}
