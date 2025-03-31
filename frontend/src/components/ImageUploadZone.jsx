import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Trash } from "lucide-react";

export default function ImageUploadZone() {
    const [images, setImages] = useState([]);

    // Handle file drop
    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setImages([...images, ...newImages]);
    };

    // Remove uploaded image
    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // React Dropzone Configuration
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg", ".webp", ".gif"]
        },
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
                        <div key={index} className="relative group">
                            {/* Image Preview */}
                            <img
                                src={image.preview}
                                alt={image.name}
                                className="w-full h-32 object-cover rounded-lg border"
                            />

                            {/* Remove Button (Hidden until hover) */}
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
