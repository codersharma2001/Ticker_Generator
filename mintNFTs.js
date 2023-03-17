const fs = require('fs');
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");

const privateKey = "4ceb13b28203c0b6947c10e92f77c772be07479b57c7b9f5d90f1510b851bf5b"; // replace with your private key
const projectId = "2341a16b09ad43e4a98d0e75607640f0"; // replace with your Infura or Alchemy project ID
const endpoint = `https://polygon-mumbai.infura.io/v3/2341a16b09ad43e4a98d0e75607640f0`;

const web3 = new Web3(new HDWalletProvider(privateKey, endpoint));
const contractAddress = "0x31924a63E6a446a233324992817050D0Ed18F5C3"; // replace with the address of your deployed smart contract

const abi = fs.readFileSync('Certificate.json', 'utf-8');
const Certificate = new web3.eth.Contract(JSON.parse(abi).abi, contractAddress);

const candidates = JSON.parse(fs.readFileSync('candidates.json', 'utf-8'));

async function mintNFT(to, tokenId, rank) {
    let tokenURI;
    switch (rank) {
        case "Gold":
            tokenURI = "ipfs://QmdLmkf5ipgjev2EvHUQ6JMY8hG8xrmgA7kQUUrLNgbrf4"; // replace with the IPFS URI for the gold token
            break;
        case "Silver":
            tokenURI = "ipfs://QmWARoJPN1QdCJMKjWPgDW77dBTLquhUdoXjvoGZCBeYT8"; // replace with the IPFS URI for the silver token
            break;
        case "Bronze":
            tokenURI = "ipfs://QmW1fiYG83xVsViJ3HLR5Mt3VsV5tnEGk2bPQYpqsCEmpU"; // replace with the IPFS URI for the bronze token
            break;
    }

    await Certificate.methods.mint(to, tokenId).send({ from: web3.eth.defaultAccount, gas: 500000, data: web3.eth.abi.encodeFunctionCall({ name: 'setTokenURI', type: 'function', inputs: [{ type: 'uint256', name: 'tokenId' }, { type: 'string', name: 'tokenURI' }] }, [tokenId, tokenURI]) });
}

async function main() {
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];

    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        const tokenId = i + 1;
        switch (candidate.rank) {
            case "Gold":
                await mintNFT(candidate.name, tokenId, "Gold");
                break;
            case "Silver":
                await mintNFT(candidate.name, tokenId, "Silver");
                break;
            case "Bronze":
                await mintNFT(candidate.name, tokenId, "Bronze");
                break;
        }
    }
}

main();
