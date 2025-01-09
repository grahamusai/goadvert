import { MapPin, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ListingCard() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src="/images/image.png"
          alt="House model with keys"
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <GraduationCap className="w-4 h-4" />
          <span className="text-sm">Education</span>
        </div>
        <h3 className="font-medium leading-none">
          Apple iPhone 7 Plus (32 GB) Hot...
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">United States</span>
          </div>
          <span className="text-lg font-semibold text-red-500">$2,300.00</span>
        </div>
      </CardContent>
    </Card>
  )
}

