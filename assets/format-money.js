// Minimal formatMoney utility
function formatMoney(cents, format = "${{amount}}") {
  if (typeof cents === "string") cents = cents.replace(".", "");
  let value = "";
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

  function formatWithDelimiters(number, precision = 2, thousands = ",", decimal = ".") {
    if (isNaN(number) || number == null) return 0;

    number = (number / 100.0).toFixed(precision);

    const parts = number.split(".");
    const dollars = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1" + thousands
    );
    const cents = parts[1] ? decimal + parts[1] : "";

    return dollars + cents;
  }

  switch (format.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
  }

  return format.replace(placeholderRegex, value);
}
