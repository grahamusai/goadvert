import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { BsHouseDoor } from "react-icons/bs"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer"

function PropertyCard(props) {
  const {
    name,
    description,
    city,
    country,
    type,
    term,
    image_url,
    price,
  } = props

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <div className="relative w-full h-48">
          {image_url ? (
            <Image
              src={image_url}
              alt={name}
              fill
              className="object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-t-lg">
              <BsHouseDoor className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <CardTitle className="mt-4 text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary" className="text-base mb-2">
          ${parseFloat(price).toLocaleString()}
        </Badge>
        <div className="flex justify-between items-center mb-4">


          <div className="flex gap-2">
            <Badge>{type}</Badge>
            <Badge variant="outline">{term}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <BsHouseDoor className="text-gray-500" />
          <span>{city}, {country}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Drawer>
          <DrawerTrigger asChild>
            <span className="underline cursor-pointer">View Details</span>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{name}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="relative w-full h-96 mx-auto p-6">
              {image_url ? (
                <Image
                  src={image_url}
                  alt={name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex items-center justify-center text-center">
                  No image available
                </div>
              )}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button className="bg	-blue-600">Contact Agent</Button>
      </CardFooter>
    </Card>
  )
}

export default PropertyCard