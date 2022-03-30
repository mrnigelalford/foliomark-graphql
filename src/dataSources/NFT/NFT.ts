import {
  contractStorage,
  multiAdminStorage,
  nftStorage,
} from '@oxheadalpha/fa2-interfaces';
import axios from 'axios';

export interface StorageProps {
  owner: string;
  metadata: string;
}

export const createStorage = contractStorage
  .with(multiAdminStorage)
  .with(nftStorage).build;

export const setPinata = async () => {
  const url = `https://api.pinata.cloud/data/testAuthentication`;
  return axios
    .get(url, {
      headers: {
        pinata_api_key: '845fb67b8da495cc90e7',
        pinata_secret_api_key:
          'b0d62e6c7c0d37bc777809021faef9926cf1af532394f1ee1b78ccdf64531657',
      },
    })
    .then(function (response) {
      console.log('success: ', response);
    })
    .catch(function (error) {
      console.log('error: ', error);
    });
};

// get pinata api key and secret key from https://pinata.cloud/dashboard
// store data in pinata and get back ipfs hash
// store ipfs hash in storage via graphql mutation
// update graphql mutation schema to include document fields (description, tags, image, etc)
// run all these steps to complete a mint flow -> create collection -> add document to ipfs -> store ipfs url on blockchain
