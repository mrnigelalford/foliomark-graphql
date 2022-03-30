import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import * as fs from 'fs';
import {
  address,
  createOffChainTokenMetadata,
  Transfer,
} from '@oxheadalpha/fa2-interfaces';
import { createStorage } from './NFT/NFT';
import {
  BurnProps,
  MintProps,
  OriginationProps,
  TransferProps,
} from './resolvers';

export interface Attribute {
  name: string;
  value: string;
}

export type FA2Receipt = {
  message: string;
  source?: string;
  fee?: string;
  counter?: string;
  gas_limit?: string;
  storage_limit?: string;
  amount?: string;
  destination?: string;
};

export type OriginationReceipt = {
  address: string;
  rpc: {
    url: string;
    chain: string;
  };
};

const testKey = 'edsk47JmoRXUujaKZTRp7P1AVpdUaQE2nTBzWhd85gPjeFgPWaXpUJ'; // local testing only. in prod use wallet to retrieve this info from the user

export class TezosNode {
  private tezos: TezosToolkit;

  private nftTransfer(from_: address, to_: address, tokenId: number): Transfer {
    return {
      from_,
      txs: [{ to_, token_id: tokenId, amount: 1 }],
    };
  }
  private signer = new InMemorySigner(testKey);

  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl);
    this.tezos.setSignerProvider(this.signer);
  }

  public async originate(args: OriginationProps): Promise<OriginationReceipt> {
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

  public async mint(args: MintProps): Promise<FA2Receipt> {
    const balance = await this.tezos.tz.getBalance(args.ownerAddress);
    const contract = await this.tezos.contract.at(args.contractAddress);
    const proccessedTokens = [];

    if (balance.lt(0.2)) {
      return {
        message: `${args.ownerAddress} has Insufficient funds`,
      };
    }
    args.tokens.forEach(({ id, uri }) =>
      proccessedTokens.push(createOffChainTokenMetadata(id, uri))
    );

    if (proccessedTokens.length) {
      const mint = await contract.methods
        .mint([
          {
            owner: 'tz1WuzBwPCGewc6vc5NYJuAsPmkSD58oAqGH', // only valid for testing in prod use user wallet info
            tokens: proccessedTokens,
          },
        ])
        .send();

      if (mint.errors.length) return { message: mint.errors[0]['message'] };

      const receipt = mint.results[0];
      return {
        message: 'Success',
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
  }

  public async burn(args: BurnProps): Promise<FA2Receipt> {
    console.log('args: ', args);
    const contract = await this.tezos.contract.at(args.contractAddress);

    const burn = await contract.methods
      .burn([{ owner: args.ownerAddress, tokens: [args.tokenId], amount: 1 }])
      .send();

    const receipt = burn.results;

    if (burn.errors.length) {
      const message = burn.errors[0]['message'];
      console.log('problem here: ', message);
      return { message };
    }
    return {
      message: 'Success',
      source: receipt['source'],
      fee: receipt['fee'],
      counter: receipt['counter'],
      gas_limit: receipt['gas_limit'],
      storage_limit: receipt['storage_limit'],
      amount: receipt['amount'],
      destination: receipt['destination'],
    };
  }

  public async transfer(args: TransferProps): Promise<FA2Receipt> {
    const from = await this.tezos.tz.getBalance(args.from);
    const to = await this.tezos.tz.getBalance(args.to);
    console.log('from: balance: ', args.from, from.gt(0));
    console.log('to: balance: ', args.to, to.gt(0));

    const contract = await this.tezos.contract.at(args.contractAddress);

    if (from.gt(0)) {
      const transfer = await contract.methods
        .transfer([this.nftTransfer(args.from, args.to, args.tokenId)])
        .send();

      if (transfer.errors.length) {
        return { message: transfer.errors[0]['message'] };
      }
      const receipt = transfer.results;
      return {
        message: 'Success',
        source: receipt['source'],
        fee: receipt['fee'],
        counter: receipt['counter'],
        gas_limit: receipt['gas_limit'],
        storage_limit: receipt['storage_limit'],
        amount: receipt['amount'],
        destination: receipt['destination'],
      };
    } else {
      console.log('Insufficient funds');
      return { message: `${from} has Insufficient funds` };
    }
  }
}
