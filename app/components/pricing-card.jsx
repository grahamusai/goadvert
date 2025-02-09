"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Check } from "lucide-react"
import { PaymentModal } from "./payment-modal"



export function PricingCard({ name, price, period, features, featured }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  return (
    <>
      <div className="relative p-6 bg-zinc-200 rounded-lg border border-zinc-800">
        {featured && (
          <div className="absolute -top-2 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-slate-500">{name}</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-5xl font-bold tracking-tight text-slate-700">€{price}</span>
              <span className="ml-1 text-sm font-medium text-zinc-400">/{period}</span>
            </div>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setShowPaymentModal(true)}>
            Get {name}
          </Button>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-zinc-700" />
                <span className="text-sm text-zinc-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={{ name, price, period }}
      />
    </>
  )
}

