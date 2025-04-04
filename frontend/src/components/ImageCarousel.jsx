import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import commonFunction from '../utils/commonFunction';

export default function ImageCarousel({ images }) {
    const [current, setCurrent] = useState(0);
    images = images ?? [];

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const showControls = images.length > 1;

    return (
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-lg shadow-lg">
            {/* Carousel Wrapper */}
            <div className="relative h-64 sm:h-80 md:h-96">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <img
                            src={commonFunction.getDocumentPath(img)}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            {showControls && (
                <>
                    {/* Previous */}
                    <motion.button
                        onClick={prevSlide}
                        whileHover={{ scale: 1.02 }}
                        className="absolute top-0 left-0 h-full w-16 z-20 flex items-center justify-start group"
                        aria-label="Previous Slide"
                    >
                        <div className="h-full w-full flex items-center justify-start px-2 bg-transparent group-hover:bg-gradient-to-r from-gray-500/40 to-transparent transition duration-300">
                            <ChevronLeft className="text-white w-6 h-6" />
                        </div>
                    </motion.button>

                    {/* Next */}
                    <motion.button
                        onClick={nextSlide}
                        whileHover={{ scale: 1.02 }}
                        className="absolute top-0 right-0 h-full w-16 z-20 flex items-center justify-end group"
                        aria-label="Next Slide"
                    >
                        <div className="h-full w-full flex items-center justify-end px-2 bg-transparent group-hover:bg-gradient-to-l from-gray-500/40 to-transparent transition duration-300">
                            <ChevronRight className="text-white w-6 h-6" />
                        </div>
                    </motion.button>
                </>
            )}

            {/* Indicators */}
            {showControls && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {images.map((_, idx) => (
                        <motion.button
                            key={idx}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? "bg-white scale-110" : "bg-gray-400"
                                }`}
                            onClick={() => setCurrent(idx)}
                            aria-label={`Slide ${idx + 1}`}
                            whileHover={{ scale: 1.2 }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
