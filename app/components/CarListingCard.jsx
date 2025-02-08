import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

 function CarListingCard(props) {
  const {
    make,
    model,
    year,
    price,
    mileage,
    fuelType,
    transmission,
    imageUrl,
  } = props

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`${year} ${make} ${model}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-bold mb-2">
          {year} {make} {model}
        </CardTitle>
        <p className="text-2xl font-semibold text-primary mb-4">
          ${price.toLocaleString()}
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Badge variant="secondary" className="justify-center">
            {mileage.toLocaleString()} miles
          </Badge>
          <Badge variant="secondary" className="justify-center">
            {fuelType}
          </Badge>
          <Badge variant="secondary" className="justify-center">
            {transmission}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}
export default CarListingCard