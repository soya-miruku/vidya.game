module.exports = {
  images: {
    domains: ['images.unsplash.com', 'images.reactbricks.com', 'static.coingecko.com']
  },
  i18n: {
    locales: ['en'], // Add your languages here
    defaultLocale: 'en',
    localeDetection: false,
  },
  env: {
    infuraId: process.env.INFURA_ID
  }
}
