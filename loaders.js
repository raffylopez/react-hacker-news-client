/*
 * loaders.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
const JSLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader'
  }]
}

const CSSLoaders = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader', {
    loader: 'postcss-loader'
  }]
}

const MiscLoaders = {
  test: /\.(png|jpg|jpeg|gif|svg)$/, use: [{loader: "file-loader", options:{}} ]
};

module.exports = {
  JSLoader,
  CSSLoaders,
  MiscLoaders,
}
