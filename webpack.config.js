// loaders: [
//   {
//     json: /\.json$/,
//     loader: "json-loader",
//   },
// ];

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: [
              {
                json: /\.json$/,
                loader: "json-loader",
              },
            ],
          },
        ],
      },
    ],
  },
};
