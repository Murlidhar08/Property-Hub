import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import commonFunction from "../utils/commonFunction";

export default function ImageCarousel({ images }) {
    const [current, setCurrent] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    images = images ?? [];

    useEffect(() => {
        if (images.length <= 1 || isPreviewOpen) return; // Stop auto-slide when preview is open

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length, isPreviewOpen]);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const openPreview = () => setIsPreviewOpen(true);
    const closePreview = () => setIsPreviewOpen(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closePreview();
        };

        if (isPreviewOpen) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        }

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPreviewOpen]);

    const showControls = images.length > 1;

    return (
        <>
            {/* Main Carousel */}
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-lg shadow-lg">
                <div className="relative h-64 sm:h-80 md:h-96">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}
                        >
                            <img
                                src={commonFunction.getDocumentPath(img)}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-contain cursor-pointer"
                                onClick={openPreview}
                            />
                        </div>
                    ))}
                </div>

                {showControls && (
                    <>
                        <motion.button
                            onClick={prevSlide}
                            whileHover={{ scale: 1.02 }}
                            className="absolute top-0 left-0 h-full w-16 flex items-center justify-start group"
                            aria-label="Previous Slide"
                        >
                            <div className="h-full w-full flex items-center justify-start px-2 bg-transparent group-hover:bg-gradient-to-r from-gray-500/40 to-transparent transition duration-300">
                                <ChevronLeft className="text-black w-6 h-6" />
                            </div>
                        </motion.button>

                        <motion.button
                            onClick={nextSlide}
                            whileHover={{ scale: 1.02 }}
                            className="absolute top-0 right-0 h-full w-16 flex items-center justify-end group"
                            aria-label="Next Slide"
                        >
                            <div className="h-full w-full flex items-center justify-end px-2 bg-transparent group-hover:bg-gradient-to-l from-gray-500/40 to-transparent transition duration-300">
                                <ChevronRight className="text-black w-6 h-6" />
                            </div>
                        </motion.button>
                    </>
                )}

                {/* Indicators */}
                {showControls && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, idx) => (
                            <motion.button
                                key={idx}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? "bg-white scale-110" : "bg-gray-400"}`}
                                onClick={() => setCurrent(idx)}
                                aria-label={`Slide ${idx + 1}`}
                                whileHover={{ scale: 1.2 }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {isPreviewOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                    >
                        {/* Full-screen container */}
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            className="relative w-full h-full"
                        >
                            {/* Close Button */}
                            <button
                                onClick={closePreview}
                                className="absolute top-4 right-4 z-50 text-white bg-gray-800/70 hover:bg-gray-700 rounded-full p-2 transition"
                            >
                                <X size={24} />
                            </button>

                            {/* Image Fullscreen */}
                            <img
                                src={commonFunction.getDocumentPath(images[current])}
                                alt="Preview"
                                className="w-full h-full object-contain"
                            />

                            {/* Modal Navigation */}
                            {showControls && (
                                <>
                                    {/* Prev */}
                                    <motion.button
                                        onClick={prevSlide}
                                        whileHover={{ scale: 1.05 }}
                                        className="absolute top-0 left-0 h-full w-20 flex items-center justify-start group z-40"
                                        aria-label="Previous"
                                    >
                                        <div className="h-full w-full flex items-center justify-start px-3 bg-transparent group-hover:bg-gradient-to-r from-gray-600/40 to-transparent">
                                            <ChevronLeft className="text-white w-7 h-7" />
                                        </div>
                                    </motion.button>

                                    {/* Next */}
                                    <motion.button
                                        onClick={nextSlide}
                                        whileHover={{ scale: 1.05 }}
                                        className="absolute top-0 right-0 h-full w-20 flex items-center justify-end group z-40"
                                        aria-label="Next"
                                    >
                                        <div className="h-full w-full flex items-center justify-end px-3 bg-transparent group-hover:bg-gradient-to-l from-gray-600/40 to-transparent">
                                            <ChevronRight className="text-white w-7 h-7" />
                                        </div>
                                    </motion.button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
}
