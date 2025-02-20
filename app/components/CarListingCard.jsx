import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { IoIosSpeedometer } from "react-icons/io";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiGearStick } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
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
import { useState } from "react";

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
    image_urls,
    title,
    description,
  } = props;

  // Parse image_urls if it's a string
  const images = image_urls ? JSON.parse(image_urls) : (imageUrl ? [imageUrl] : []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Card className="w-full max-w-sm overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            {images.length > 0 ? (
              <>
                <Image
                  src={images[currentImageIndex] || "/images/image.png"}
                  alt={`${year} ${make} ${model}`}
                  layout="fill"
                  objectFit="cover"
                />
                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-2">
                    <button
                      onClick={previousImage}
                      className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                    >
                      →
                    </button>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {currentImageIndex + 1}/{images.length}
                </div>
              </>
            ) : (
              <Image
                src="/images/image.png"
                alt={`${year} ${make} ${model}`}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold mb-2">
            {title || `${year} ${make} ${model}`}
          </CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground mb-3"></p>
          )}
          <p className="text-2xl font-semibold text-primary mb-4">
            ${price.toLocaleString()}
          </p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Badge variant="secondary" className="justify-center">
              <IoIosSpeedometer /> &nbsp;
              {mileage.toLocaleString()} Km
            </Badge>
            <Badge variant="secondary" className="justify-center">
              <BsFillFuelPumpFill /> &nbsp;
              {fuelType}
            </Badge>
            <Badge variant="secondary" className="justify-center">
              <GiGearStick /> &nbsp;
              {transmission}
            </Badge>
            <Badge variant="secondary" className="justify-center">
              <FaCar /> &nbsp;
              {make}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {/* Drawer */}
          <Drawer>
            <DrawerTrigger className="w-full bg-blue-500 py-2 text-white rounded-sm">View Details</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Additional Car Details</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Add To Cart</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>



    </>

  )
}
export default CarListingCard