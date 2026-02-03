import { Badge } from "@/components/ui/badge";
import type { ComputedPrice } from "@/lib/types";
import { STATE_NAMES } from "@/lib/types";
import { formatCurrency, formatPercentage } from "@/lib/price-calculator";

interface PriceBreakdownProps {
  price: ComputedPrice;
}

export function PriceBreakdown({ price }: PriceBreakdownProps) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-emerald-900">
          Price for {STATE_NAMES[price.stateCode] || price.stateCode}
        </span>
        <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
          Tax Included
        </Badge>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-emerald-700">Base Price</span>
          <span className="font-medium text-emerald-900">
            {formatCurrency(price.basePrice)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-emerald-700">
            Tax ({formatPercentage(price.taxRate)})
          </span>
          <span className="font-medium text-emerald-900">
            +{formatCurrency(price.taxAmount)}
          </span>
        </div>
        <div className="border-t border-emerald-200 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-emerald-900">
              Final Price
            </span>
            <span className="text-2xl font-bold text-emerald-900">
              {formatCurrency(price.finalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
