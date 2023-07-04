const { ethers, network } = require('hardhat');
const fs = require('fs');

const frontEndContractsFile =
  '../12a-nextjs-nft-marketplace-thegraph/constants/networkMapping.json';
const frontEndAbiFolder = '../12a-nextjs-nft-marketplace-thegraph/constants/';

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log('Updating front end...');
    await updateContractAddresses();
    await updateAbi();
  }
};

async function updateContractAddresses() {
  const nftMarketplace = await ethers.getContract('NftMarketplace');
  const basicNft = await ethers.getContract('PromptNft');
  const chainId = network.config.chainId;

  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractsFile, 'utf8'),
  );
  if (chainId in contractAddresses) {
    if (
      !contractAddresses[chainId]['NftMarketplace'].includes(
        nftMarketplace.address,
      )
    ) {
      contractAddresses[chainId]['NftMarketplace'].push(nftMarketplace.address);
    }
    if (!contractAddresses[chainId]['BasicNft'].includes(basicNft.address)) {
      contractAddresses[chainId]['BasicNft'].push(basicNft.address);
    }
  } else {
    contractAddresses[chainId] = {
      NftMarketplace: [nftMarketplace.address],
      BasicNft: [basicNft.address],
    };
  }

  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));

  console.log('Front end updated!');
}

async function updateAbi() {
  const nftMarketplace = await ethers.getContract('NftMarketplace');
  fs.writeFileSync(
    `${frontEndAbiFolder}NftMarketplace.json`,
    nftMarketplace.interface.format(ethers.utils.FormatTypes.json),
  );

  const basicNft = await ethers.getContract('PromptNft');
  fs.writeFileSync(
    `${frontEndAbiFolder}BasicNft.json`,
    basicNft.interface.format(ethers.utils.FormatTypes.json),
  );
}

module.exports.tags = ['all', 'frontend'];
