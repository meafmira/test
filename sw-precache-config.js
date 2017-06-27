module.exports = {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/mymesta\.com\/api\/v1/,
      handler: 'networkFirst',
      options: {
        debug: true,
        networkTimeoutSeconds: 1,
        cache: {
          maxEntries: 100,
          name: 'api-cache',
        },
      },
    },
  ],
}
