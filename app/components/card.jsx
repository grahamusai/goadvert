import { MapPin, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { FC } from 'react'



const ListingCard = ({
  imageUrl,
  category,
  title,
  location,
  price,
  className,
}) => {
  return (
    <Card className={`${className} w-full max-w-sm overflow-hidden`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          // src={imageUrl}
          src="/images/property.png"
          alt="House model with keys"
          className="object-cover w-full h-50%"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <GraduationCap className="w-4 h-4" />
          <span className="text-sm">{category}</span>
        </div>
        <h3 className="font-medium leading-none">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
          <span className="text-lg font-semibold text-red-500">${price}.00</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default ListingCard
