# Repo Map: Price Display Modules, Owners, and Coupling

## Modules Overview
- **Primary Module: PriceTable.tsx** (Owner: Frontend Components)
  - Handles rendering of service prices in both desktop table and mobile card views.
  - Directly accesses `service.price` (string) from props.
  - Location: `src/components/PriceTable.tsx`
  - Coupling: High coupling to `services.ts` for data fetching and type definitions.

- **Data Module: services.ts** (Owner: Backend/Data Layer)
  - Provides `Service` type with `price: string` field.
  - Loads price data from `public/swbeauty-procedury.csv`.
  - Parses and caches services, including price strings.
  - Location: `src/lib/services.ts`
  - Coupling: Low direct coupling; used by components like PriceTable.tsx and pages like `cenik/page.tsx`.

- **Type Definitions: types/index.ts** (Owner: Shared Types)
  - Defines `PriceItem` and `Service` types (note: conflicting `Service` types between here and services.ts).
  - Location: `src/types/index.ts`
  - Coupling: Referenced in services.ts for `PriceItem`.

## Owners and Responsibilities
- **Frontend Owner:** Components like PriceTable.tsx are owned by the UI team (assumed based on structure).
- **Data Owner:** services.ts owned by backend/data team.
- **No clear ownership for price formatting logic** – currently handled ad-hoc in display components.

## Coupling Analysis
- **High Coupling:** PriceTable.tsx tightly coupled to services.ts for price data.
- **Medium Coupling:** Pages like `cenik/page.tsx` depend on PriceTable for rendering.
- **Low Coupling:** No external dependencies; all internal.
- **Potential Issues:** If price format changes in CSV, it affects display without validation.

## Recommendations
- Centralize price formatting in a utility function to reduce coupling and improve maintainability.
- Resolve conflicting `Service` types between `types/index.ts` and `services.ts`.