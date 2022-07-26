module.exports = {
  images: {
    domains: ['images.unsplash.com', 'images.reactbricks.com', 'static.coingecko.com', 'ipfs.io', 'ipfs.infura.io', 'ipfs.cloud.ipfs.services', 
    'ipfs.eth.aragon.network', 'ipfs.eth.aragon.network.s3.amazonaws.com', 
    's2.coinmarketcap.com', 'assets.coingecko.com', 'raw.githubusercontent.com',
    'cdn.furucombo.app', 'i.postimg.cc', 'lh3.googleusercontent.com']
  },
  i18n: {
    locales: ['en'], // Add your languages here
    defaultLocale: 'en',
    localeDetection: false,
  },
  env: {
    infuraId: process.env.INFURA_ID,
    alchemyApiKey: process.env.ALCHEMY_API_KEY,
  }
}
