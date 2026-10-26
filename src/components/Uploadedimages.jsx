import React from "react";
import { useState, useEffect } from "react";

const SERVER_URL = "https://fishlrecognition.com";

const UploadedImages = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(`${SERVER_URL}/api/user/images`);
                if (!res.ok) throw new Error("Failed to load images");
                setImages(await res.json());
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchImages();
    }, []);

    return (
        <section className="px-2 pb-3 pt-2 font-sans">
            <h2 className="mb-2 ml-3 text-xl font-semibold tracking-wide text-white">UPLOADED IMAGES</h2>

            <div className="rounded-xl bg-neutral-950 px-5 pb-6 pt-5">
                {error && <p className="text-red-600">{error}</p>}
                {!error && images.length === 0 && <p className="text-white">No images found</p>}

                <div className="grid grid-cols-6 gap-4">
                    {images.map(image => (
                        <a key={image.name} href={`${SERVER_URL}${image.url}`} target="_blank" rel="noreferrer">
                            <img
                                src={`${SERVER_URL}${image.url}`}
                                alt={image.name}
                                loading="lazy"
                                className="h-20 w-full rounded object-cover"
                            />
                            <p className="mt-1 truncate text-xs text-neutral-400">{image.name}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UploadedImages;
