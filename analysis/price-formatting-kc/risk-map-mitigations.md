# Risk Map and Mitigations: Adding "Kč" to Prices

## Identified Risks
1. **Duplicate Units:** If prices in CSV already include "Kč" or other units, appending could result in "1500 Kč Kč".
   - Likelihood: Medium (depends on CSV data).
   - Impact: High (user confusion, unprofessional display).

2. **Inconsistent Formatting:** Prices might have varying formats (e.g., "1 500" vs "1500"), and adding "Kč" could break alignment or styling.
   - Likelihood: Medium.
   - Impact: Medium (affects UI consistency).

3. **Performance Impact:** Adding string manipulation in render could slow down large lists if not optimized.
   - Likelihood: Low (simple operation).
   - Impact: Low.

4. **Internationalization Issues:** Hardcoding "Kč" assumes Czech locale; if app expands, might need i18n.
   - Likelihood: Low for now.
   - Impact: Medium (future scalability).

5. **Testing Gaps:** No existing tests for price display; changes could introduce bugs undetected.
   - Likelihood: High.
   - Impact: Medium.

## Mitigations
1. **For Duplicate Units:** Implement a check: if price ends with "Kč" (case-insensitive), don't append; else, append " Kč".
2. **For Formatting:** Use a utility function to handle trimming and appending consistently.
3. **For Performance:** Memoize the formatting function or compute in data layer.
4. **For I18n:** Use a constant for "Kč" that can be easily replaced.
5. **For Testing:** Add unit tests for the formatting function and integration tests for PriceTable.
6. **Rollback Plan:** If issues arise, revert to original display and fix in CSV source.

## Overall Risk Level: Medium
- With mitigations, can proceed safely.