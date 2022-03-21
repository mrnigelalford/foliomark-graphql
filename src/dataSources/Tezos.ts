import { createOffChainTokenMetadata } from '@oxheadalpha/fa2-interfaces';
import { TezosNode } from './NFT/TezosInterface';

const tezosNode = new TezosNode('http://0.0.0.0:20000');
const otherOptions = JSON.stringify({
  name: 'my_collection',
  description: 'Awesome NFT collection',
  homepage: 'https://github.com/oxheadalpha/nft-tutorial',
  authors: ['John Doe <john.doe@johndoe.com>'],
  version: '1.0.0',
  license: {
    name: 'MIT',
  },
  interfaces: ['TZIP-016', 'TZIP-012', 'TZIP-021'],
  source: {
    tools: ['LIGO'],
    location: 'https://github.com/oxheadalpha/nft-tutorial',
  },
});

export const originate = async () =>
  tezosNode.originate(otherOptions, 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

export const mint = async () => {
  const firstToken = createOffChainTokenMetadata(
    1,
    'ipfs://QmRyTc9KbD7ZSkmEf4e7fk6A44RPciW5pM4iyqRGrhbyvj'
  );
  const secondToken = createOffChainTokenMetadata(
    2,
    'ipfs://QmRyTc9KbD7ZSkmEf4e7fk6A44RPciW5pM4iyqRfrhbyvj'
  );

  return tezosNode.mint('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb', [
    firstToken,
    secondToken,
  ]);
};
