import { InMemorySigner } from '@taquito/signer';
import { DefaultContractType, TezosToolkit } from '@taquito/taquito';
import * as fs from 'fs';
import { createOffChainTokenMetadata } from '@oxheadalpha/fa2-interfaces';
import { createStorage } from './NFT/NFT';

export interface Attribute {
  name: string;
  value: string;
}

type MintReceipt = {
  source: string;
  fee: string;
  counter: string;
  gas_limit: string;
  storage_limit: string;
  amount: string;
  destination: string;
};

type OriginationReceipt = {
  address: string;
  rpc: {
    url: string;
    chain: string;
  };
};

const testKey = 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq';

export class TezosNode {
  private tezos: TezosToolkit;

  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl);
    this.tezos.setProvider({
      signer: new InMemorySigner(testKey),
    });
  }

  public async originate(args: {
    jsonMetadata: any;
    ownerAddress: string;
  }): Promise<OriginationReceipt> {
    const storage = createStorage({
      metadata: JSON.stringify(args.jsonMetadata),
      owner: args.ownerAddress,
    });

    const code = fs.readFileSync(
      '/Users/nigelalford/projects/tezos/ligo-smart-contract/src/fm-NFT.tz',
      {
        encoding: 'utf8',
        flag: 'r',
      }
    );

    const originationOp = (
      await this.tezos.contract.originate({ code, storage })
    ).contract();

    const receipt = await originationOp.then((o) => o);

    return {
      address: receipt['address'],
      rpc: {
        url: receipt['rpc']['url'],
        chain: receipt['rpc']['chain'],
      },
    };
  }

  public async mint(
    ownerAddress: string,
    contractAddress: string,
    tokens: { id: number; uri: string }[]
  ): Promise<any> {
    // const balance = await this.tezos.tz.getBalance(ownerAddress);

    const contract = await this.tezos.contract.at(contractAddress);
    const proccessedTokens = [];
    tokens.forEach(({ id, uri }) =>
      proccessedTokens.push(createOffChainTokenMetadata(id, uri))
    );

    if (proccessedTokens.length) {
      const mint = await contract.methods
        .mint([{ owner: ownerAddress, tokens: proccessedTokens }])
        .send();

      const receipt = mint.results[0];

      return {
        kind: receipt['kind'],
        source: receipt['source'],
        fee: receipt['fee'],
        counter: receipt['counter'],
        gas_limit: receipt['gas_limit'],
        storage_limit: receipt['storage_limit'],
        amount: receipt['amount'],
        destination: receipt['destination'],
      };
    }
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
