import React from "react";
import { useState, useEffect, useRef } from "react";

const SERVER_URL = "https://fishlrecognition.com";
const PAGE_SIZE = 50;

const UploadedImages = () => {
    const [images, setImages] = useState([]);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lets us cancel the request in flight when the page is left
    const controllerRef = useRef(null);

    const loadImages = async (offset) => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        try {
            const res = await fetch(
                `${SERVER_URL}/api/user/images?offset=${offset}&limit=${PAGE_SIZE}`,
                { signal: controller.signal }
            );
            if (!res.ok) throw new Error("Failed to load images");
            const data = await res.json();

            setImages(prev => offset === 0 ? data.images : [...prev, ...data.images]);
            setTotal(data.total);
            setHasMore(data.hasMore);
            setError(null);
        } catch (err) {
            if (err.name !== "AbortError") setError(err.message);
        } finally {
            if (controllerRef.current === controller) setLoading(false);
        }
    };

    useEffect(() => {
        loadImages(0);
        return () => controllerRef.current?.abort();
    }, []);

    return (
        <section className="px-2 pb-3 pt-2 font-sans">
            <h2 className="mb-2 ml-3 text-xl font-semibold tracking-wide text-white">UPLOADED IMAGES</h2>

            <div className="rounded-xl bg-neutral-950 px-5 pb-6 pt-5">
                {error && <p className="text-red-600">{error}</p>}
                {!error && !loading && images.length === 0 && <p className="text-white">No images found</p>}
                {images.length > 0 && (
                    <p className="mb-3 text-sm text-neutral-400">Showing {images.length} of {total}</p>
                )}

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

                {loading && <p className="mt-4 text-center text-white">Loading…</p>}
                {!loading && hasMore && (
                    <div className="mt-4 flex justify-center">
                        <button
                            type="button"
                            className="rounded-lg bg-whooshhgreen px-6 py-2 font-semibold text-black"
                            onClick={() => loadImages(images.length)}
                        >
                            Load more
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UploadedImages;
