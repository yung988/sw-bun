# Research Notes & Sources: Czech Currency Formatting

## Key Findings
- **Standard Symbol:** "Kč" is the official symbol for Czech Koruna (CZK). It's common to append it to prices in Czech contexts (e.g., "1500 Kč").
- **Best Practices:** 
  - Always include the symbol for clarity in e-commerce/salon sites.
  - Place symbol after the number with a space (e.g., "1500 Kč", not "Kč 1500").
  - Handle cases where symbol is already present to avoid duplication.
- **Dynamic Appending:** In web apps, it's standard to format prices client-side or in data processing for flexibility.
- **Sources:**
  - Czech National Bank (CNB) guidelines: https://www.cnb.cz/en/ (confirms "Kč" as standard).
  - Web development best practices: MDN Web Docs on currency formatting (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) – suggests using Intl for locale-specific formatting, but for simple append, string manipulation is fine.
  - Similar implementations: Czech e-commerce sites (e.g., Alza.cz) append "Kč" dynamically.

## Recommendations for Implementation
- Use a simple function: `formatPrice(price: string) => price.endsWith('Kč') ? price : `${price.trim()} Kč``
- Consider future i18n with libraries like `react-intl` for full localization.