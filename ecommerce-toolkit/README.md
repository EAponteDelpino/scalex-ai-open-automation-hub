# ScaleX AI — Ecommerce Open Toolkit

**10 usable browser calculators** for ecommerce operators, marketers and educators. No backend, account, external APIs, cookies, telemetry or build process required.

## Quick start
Open [index.html](index.html) in a current browser. Choose a calculator, replace example inputs and click **Calcular**. All calculations run locally in your browser.

## Catalog

| Tool | What it models | Caveat |
|---|---|---|
| [Unit profit](index.html#unit-profit) | Profit, margin and ROI | Taxes and other unlisted costs are excluded |
| [ROAS](index.html#roas) | Attributed revenue / ad spend | Not a profitability indicator on its own |
| [Maximum CPA](index.html#max-cpa) | Acquisition budget available after margin target | Depends on target margin assumptions |
| [COD simulator](index.html#cod-simulator) | Expected completed/failed orders and their economics | Average outcomes, not guaranteed order counts |
| [Price builder](index.html#price-builder) | Price at a target margin on revenue | Requires margin + fee below 100% |
| [Meta Ads scenario](index.html#meta-ads-scenario) | CPM → clicks → orders → gross revenue | Entirely hypothetical; not Meta platform data |
| [Break-even](index.html#breakeven) | Minimum units needed to cover fixed costs | Assumes constant unit contribution |
| [Product evaluator](index.html#product-evaluator) | Transparent weighted score | Subjective rubric, not actual market research |
| [Logistics](index.html#logistics) | Fulfillment and return costs | Does not model compensation/insurance |
| [KPI dashboard](index.html#kpi-dashboard) | AOV, ROAS, margin and contribution | Based only on input aggregates |

**Moneda / Currency:** enter all monetary values in the same currency. The currency selector only changes how numbers are **displayed**, and DOES NOT convert between currencies. Percent inputs use 0–100; enter 2 for 2%, not 0.02.

### Formulas
- Unit profit = selling price − product − packaging − shipping − (price × fee%) − ads per sale − refund reserve.
- Margin% = unit profit / price × 100.
- ROAS = attributed revenue / ad spend; undefined if ad spend is 0.
- Maximum CPA = sale price − product costs − shipping − other costs − platform fee − target margin × price.
- COD expected profit = successful orders × (price − product − shipping − commission) − failed orders × return costs − all orders × ad cost.
- Price builder = (unit base cost + fixed per-unit cost) / (1 − target margin − fee percentage).
- Break-even units = ceil(fixed costs / (sale price − variable cost)) when contribution is positive.
- Meta Ads model: impressions = budget / CPM × 1000; clicks = impressions × CTR; orders = clicks × CVR.
- Product evaluation weights: 30% margin, 25% demand, 20% supplier reliability, 15% inverse return rate, 10% inverse competition.
- Logistics expected cost = shipments × (outbound + packaging) + shipments × failed rate × extra return fee.

## Tests

Requires **Node.js 18+**, no dependency installation:
```bash
cd ecommerce-toolkit
node --test tests/*.test.cjs
```
The calculations can be exercised from terminal, but live browser UI/accessibility requires manual verification.

## Security and limitations

No personal data is requested. Only numerical inputs are needed, stored in memory and discarded upon closing page. Inputs are validated for finite nonnegative values and percentage limits. This tool does not constitute financial, tax or legal advice, makes no claims about advertising platforms and is not affiliated with Meta. Code and tests are MIT licensed under the parent repository.
