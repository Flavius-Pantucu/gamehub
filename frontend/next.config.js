module.exports = {
  async rewrites() {
    return [
      {
        source: "/:slug*",
        destination: "http://localhost:3001/:slug*", // Matched parameters can be used in the destination
      },
    ];
  },
};
