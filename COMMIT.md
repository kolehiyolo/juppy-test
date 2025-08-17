variant-swatches show only if variants exist
- This is the last thing needed to replace all placeholders with actual live product data
- I was concerned that if the product doesn't have variants, some renders will break, namely everything that relies on active_variant
- Apparently, products will always have the minimum of 1 variant, which is then just the product itself, so that's good
- Even the custom fields are then brought to the product level customization