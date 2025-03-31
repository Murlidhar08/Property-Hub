import { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Trash } from "lucide-react";

export default function ImageUploadZone() {
    const [images, setImages] = useState([]);
    const objectUrls = useRef(new Set()); // Store Object URLs to avoid memory leaks

    // Handle file drop efficiently
    const onDrop = useCallback((acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => {
            const previewUrl = URL.createObjectURL(file);
            objectUrls.current.add(previewUrl);
            return { file, preview: previewUrl };
        });

        setImages((prevImages) => [...prevImages, ...newImages]);
    }, []);

    // Handle image removal
    const handleRemoveImage = useCallback((index) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            return updatedImages;
        });

        // Delay URL revocation slightly to ensure UI updates smoothly
        setTimeout(() => {
            const removedImage = images[index];
            if (removedImage) {
                URL.revokeObjectURL(removedImage.preview);
                objectUrls.current.delete(removedImage.preview);
            }
        }, 50);
    }, [images]);

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
                            {/* Image Preview */}
                            <img
                                src={image.preview}
                                alt={`Preview-${index}`}
                                className="w-full h-32 object-cover rounded-lg border"
                                loading="lazy"
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
        </div>
    );
}
