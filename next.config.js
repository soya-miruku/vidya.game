module.exports = {
  images: {
    domains: ['images.unsplash.com', 'images.reactbricks.com', 'static.coingecko.com', 'ipfs.io', 'ipfs.infura.io', 'ipfs.cloud.ipfs.services', 
    'ipfs.eth.aragon.network', 'ipfs.eth.aragon.network.s3.amazonaws.com', 
    's2.coinmarketcap.com', 'assets.coingecko.com', 'raw.githubusercontent.com',
    'cdn.furucombo.app', 'i.postimg.cc', 'team3d.io', 'vidya.infura-ipfs.io']
  },
  i18n: {
    locales: ['en'], // Add your languages here
    defaultLocale: 'en',
    localeDetection: false,
  },
  env: {
    infuraId: process.env.INFURA_ID,
    alchemyApiKey: process.env.ALCHEMY_API_KEY,
    ipfs_infura_id: process.env.IPFS_INFURA_ID,
    ipfs_infura_secret: process.env.IPFS_INFURA_SECRET,
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
}
