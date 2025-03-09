import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy Property Data
const dummyProperty = {
  title: "Luxury Villa in LA",
  type: "Villa",
  address: "123 Beverly Hills, Los Angeles, CA",
  price: "2,500,000",
  measurementValue: "5000",
  measurementUnit: "Sq Ft",
  status: "Selling",
  propertyFor: "Sell",
  description:
    "A beautiful luxury villa with modern amenities and a stunning view of the city.",
};

const dummyImages = [
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s",
  "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=2048x2048&w=is&k=20&c=KTpY1O4d7-EuX-R_GR_44Upc-n9esJOZFpcqvA4CM0E=",
];

export default function PropertyDetails({
  property = dummyProperty,
  images = dummyImages,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-center">{property.title}</h1>

      {/* Image Slider */}
      <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden flex justify-center items-center">
        <div className="relative w-full h-full flex">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentImageIndex}
              className="absolute w-full h-full flex"
              initial={{ x: direction > 0 ? "100%" : "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: direction > 0 ? "-100%" : "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
            >
              <img
                src={images[currentImageIndex]}
                alt="Property"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={prevImage}
          className="absolute left-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Property Details */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
        <p className="text-lg font-semibold">Type: {property.type}</p>
        <p className="text-lg">Address: {property.address}</p>
        <p className="text-lg">Price: ${property.price}</p>
        <p className="text-lg">
          Measurement: {property.measurementValue} {property.measurementUnit}
        </p>
        <p className="text-lg">Status: {property.status}</p>
        <p className="text-lg">Property For: {property.propertyFor}</p>
        <p className="text-lg">Description: {property.description}</p>
      </div>
    </div>
  );
}
