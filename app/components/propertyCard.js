import { Card, CardContent } from "../../components/ui/card"

export default function PropertyCard() {
  return (
    <Card className="max-w-sm overflow-hidden rounded-3xl">
      <div className="relative aspect-[4/3]">
        <img
          src="/images/property.png"
          alt="Brick apartment building with large windows"
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <h2 className="font-bold text">2 Bed Duplex Apartment, Backyard</h2>
        <p className="text-sm text-muted-foreground mt-3">
          8 rooms • 2 Beds • 1 Bath
        </p>
        <p className="text-lg font-bold mt-5">750USD</p>
      </CardContent>
    </Card>
  )
}

