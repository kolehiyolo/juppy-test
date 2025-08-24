document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".buttons .add").forEach(button => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();

      // Fetch variantId IF there are variant-swatches
      const card = button.closest(".bottom"); 
      const selectedInput = card.querySelector("input[type=radio]:checked");
      const variantId = selectedInput ? selectedInput.value : null;

      if (!variantId) {
        const wrapper = button.closest(".product");
        const variantsData = JSON.parse(wrapper.querySelector("[data-variants]").textContent);
        variantId = variantsData[0].id;
        console.log(variantId);
      }

      try {
        const res = await fetch("/cart/add.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: variantId,
            quantity: 1
          }),
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        // Example feedback (replace with your cart UI update)
        console.log("Added to cart:", data);
        button.textContent = `Added ${variantId}`;
        setTimeout(() => (button.textContent = "Add to Cart"), 2000);

        // Optionally: trigger a custom event so global cart drawer updates
        document.dispatchEvent(new CustomEvent("cart:updated", { detail: data }));

      } catch (err) {
        console.error("Add to cart failed", err);
        alert("Something went wrong adding to cart.");
      }
    });
  });
});
