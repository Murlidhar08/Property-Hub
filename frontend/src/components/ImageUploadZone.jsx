import { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Trash, X } from "lucide-react";

export default function ImageUploadZone({ onImagesChange }) {
    const [images, setImages] = useState([]);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const objectUrls = useRef(new Set());

    // Handle file drop
    const onDrop = useCallback((acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => {
            const previewUrl = URL.createObjectURL(file);
            objectUrls.current.add(previewUrl);
            return { file, preview: previewUrl };
        });

        setImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];
            onImagesChange(updatedImages.map(img => img.file)); // Send updated file list
            return updatedImages;
        });
    }, [onImagesChange]);

    // Handle image removal
    const handleRemoveImage = useCallback((index) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            onImagesChange(updatedImages.map(img => img.file)); // Send updated file list

            // Cleanup object URL
            const removedImage = prevImages[index];
            if (removedImage) {
                URL.revokeObjectURL(removedImage.preview);
                objectUrls.current.delete(removedImage.preview);
            }
            return updatedImages;
        });
    }, [onImagesChange]);

    // Close fullscreen image on ESC key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setFullscreenImage(null);
            }
        };

        if (fullscreenImage) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [fullscreenImage]);

    // Cleanup Object URLs on unmount
    useEffect(() => {
        return () => {
            objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
            objectUrls.current.clear();
        };
    }, []);

    // React Dropzone Configuration
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpeg", ".jpg", ".webp", ".gif"] },
        multiple: true,
    });

    return (
        <div className="w-full flex flex-col">
            {/* Image Upload Dropzone */}
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 cursor-pointer flex flex-col items-center justify-center hover:bg-gray-100 transition"
            >
                <input {...getInputProps()} />
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-gray-500 text-sm">
                    Drag & drop or click to upload images
                </span>
            </div>

            {/* Display Uploaded Images */}
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div key={image.preview} className="relative group">
                            {/* Clickable Image Preview */}
                            <img
                                src={image.preview}
                                alt={`Preview-${index}`}
                                className="w-full h-32 object-cover rounded-lg border cursor-pointer"
                                loading="lazy"
                                onClick={() => setFullscreenImage(image.preview)}
                            />

                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Fullscreen Image Preview */}
            {fullscreenImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={() => setFullscreenImage(null)} // Close when clicking outside
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setFullscreenImage(null)}
                        className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Fullscreen Image - Prevent clicks from closing when clicking image */}
                    <img
                        src={fullscreenImage}
                        alt="Fullscreen Preview"
                        className="max-w-full max-h-full rounded-lg shadow-lg cursor-default"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                    />
                </div>
            )}
        </div>
    );
}
