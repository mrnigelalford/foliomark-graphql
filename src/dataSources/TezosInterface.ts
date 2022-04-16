import { TezosToolkit } from '@taquito/taquito';
import { address, Transfer } from '@oxheadalpha/fa2-interfaces';
import { BurnProps, TransferProps } from './resolvers';
import { TezBridgeSigner } from '@taquito/tezbridge-signer';

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

export class TezosNode {
  private nftTransfer(from_: address, to_: address, tokenId: number): Transfer {
    return {
      from_,
      txs: [{ to_, token_id: tokenId, amount: 1 }],
    };
  }

  private rpcUrl = 'https://ithacanet.ecadinfra.com';

  private async setTezos(): Promise<TezosToolkit> {
    const tezos = new TezosToolkit(this.rpcUrl);
    tezos.setProvider({ signer: new TezBridgeSigner() });

    return tezos;
  }

  public async pause(contractAddress: string): Promise<{}[]> {
    const t = await this.setTezos();

    const contract = await t.contract.at(contractAddress);

    const pause = await contract.methods.pause().send();

    return pause.results;
  }

  public async burn(args: BurnProps): Promise<FA2Receipt> {
    const t = await this.setTezos();

    const contract = await t.contract.at(args.contractAddress);

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
    const t = await this.setTezos();

    const from = await t.tz.getBalance(args.from);
    const to = await t.tz.getBalance(args.to);
    console.log('from: balance: ', args.from, from.gt(0));
    console.log('to: balance: ', args.to, to.gt(0));

    const contract = await t.contract.at(args.contractAddress);

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
