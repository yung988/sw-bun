# Dependency Inventory: Price-Related Files and Imports

## Files Directly Importing or Using Price Data
1. **src/components/PriceTable.tsx**
   - Imports: `Service` from `@/lib/services`
   - Usage: Renders `service.price` on lines 208 and 272.
   - Impact: Primary display point; changes here affect all price views.

2. **src/app/cenik/page.tsx**
   - Imports: `getAllServices` from `@/lib/services`, `PriceTable` from `@/components/PriceTable`
   - Usage: Fetches services and passes to PriceTable.
   - Impact: Entry point for price list; no direct price manipulation.

3. **src/lib/services.ts**
   - Imports: `PriceItem` from `@/types`
   - Usage: Defines `Service` type, parses CSV for prices.
   - Impact: Source of price data; any formatting should ideally start here.

## Indirect Dependencies
- **CSV File:** `public/swbeauty-procedury.csv` (not a code file, but data source).
- **Other Potential Components:** No other components found using "price" in searches, but possible in dynamic routes like `src/app/sluzby/[kategorie]/[slug]/page.tsx` (assumed based on links in PriceTable).

## External Dependencies
- None; all internal to the Next.js app.

## Recommendations
- Add a utility function in `src/lib/services.ts` for price formatting to centralize logic.
- Scan for other price usages in dynamic pages or components to ensure consistency.