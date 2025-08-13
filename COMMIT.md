variant-swatches is radio selection
- these are now radio selection, and I even made it so that it loops through 1 to 6, for now, just for better DX
- problem is, the radio selection spans through all instances of the product-card block, which means they all share the same radio ID and that selecting a swatch in product 1 will deselect the swatches in both product 2 and 3
- will of course need to fix this by adding the unique product-card block identifier as the input id, but not sure yet how to do this