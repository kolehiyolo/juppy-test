document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".variant-swatch-input").forEach(input => {
    input.addEventListener("change", event => {
      // * Setup
      const radio = event.target;

      // Find the closest .product parent, therefore only affecting the radio group of the parent product-card
      const wrapper = radio.closest(".product");
      if (!wrapper) return;

      // Fetching product.variants JSON data
      const variantsData = JSON.parse(wrapper.querySelector("[data-variants]").textContent);
      
      // Find matching variant data from JSON injected in Liquid
      const variantId = radio.value;
      const selectedVariant = variantsData.find(v => v.id == variantId);
      if (!selectedVariant) return;

      // * Update content on input change
      // Update .product-image-default
      const defaultImg = wrapper.querySelector(".product-image-default");
      if (selectedVariant.featured_image) {
        const featured = selectedVariant.featured_image;

        defaultImg.src = `${featured}&width=600`; // main fallback
        defaultImg.srcset = `
          ${featured}&width=300 300w,
          ${featured}&width=600 600w,
          ${featured}&width=800 800w
        `;
        defaultImg.sizes = "(max-width: 640px) 100vw, 300px";
      }
      else {
        defaultImg.src = "";
        defaultImg.srcset = "";
      }

      // Update .product-image-hover
      const hoverImg = wrapper.querySelector(".product-image-hover");
      if (selectedVariant.metafields?.custom?.image_hover) {
        const hover = selectedVariant.metafields.custom.image_hover;

        hoverImg.src = `${hover}&width=600`; // main fallback
        hoverImg.srcset = `
          ${hover}&width=300 300w,
          ${hover}&width=600 600w,
          ${hover}&width=800 800w
        `;
        hoverImg.sizes = "(max-width: 640px) 100vw, 300px";
      }
      else {
        hoverImg.src = "";
        hoverImg.srcset = "";
      }

      // Update price
      const comparePrice = selectedVariant.compare_at_price;
      const actualPrice = selectedVariant.price;
      const priceOriginal = wrapper.querySelector(".price-original");
      const priceDiscounted = wrapper.querySelector(".price-discounted");
      const priceDiscountedPercentage = wrapper.querySelector(".price-discounted-percentage");
      const badgeSale = wrapper.querySelector(".badge-sale");

      if (comparePrice > actualPrice) {
        // Update prices
        priceOriginal.innerHTML = `${formatMoney(comparePrice)}`;
        priceOriginal.classList.add("line-through");
        badgeSale.classList.remove("hidden");

        priceDiscounted.innerHTML = `${formatMoney(actualPrice)}`;

        // Calculate discountPercentage
        const savings = comparePrice - actualPrice;
        const discountPercentage = Math.round((savings * 100) / comparePrice);
        priceDiscountedPercentage.innerHTML = `${discountPercentage}% off`;
      } else {
        // No discount, just show actual
        priceOriginal.innerHTML = `${formatMoney(actualPrice)}`;
        priceOriginal.classList.remove("line-through");
        badgeSale.classList.add("hidden");
        
        // Clear discounted values if they exist
        priceDiscounted.innerHTML = "";
        priceDiscountedPercentage.innerHTML = "";
      }
    });
  });
});
