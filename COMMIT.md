Switching variants is recognized
- Yey that was rough but now the user can click on the swatches and the theme actually recognizes the variant-switch
- This was some weird bootstrapping, where we're injecting JSON straight into the HTML, and then the variant-swatch.js script fetches that data so it can process it at the client level to react to the input changes
- To test that it's working well, the images are now changing as expected
- The injection itself also required some finagling, as there's no way to inject product.variants WITH the metafields, which is so dumb, so I had to make it so that each product.variants instance has the metafields included, at least just the .custom.image_hover