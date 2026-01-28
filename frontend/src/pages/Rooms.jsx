import { ChevronLeft, ChevronRight, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../utils/api";
import { API_ENDPOINTS } from "../utils/constants";

const Rooms = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [rooms, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(API_ENDPOINTS.GET_ALL_AVAILABLE_ROOMS);
      // Handle both response structures: { success: true, rooms } or { rooms }
      const result = response.data.rooms || response.data || [];
      setRoom(Array.isArray(result) ? result : []);
      if (!Array.isArray(result) || result.length === 0) {
        setError("No available rooms found.");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRoom([]); // Set empty array on error
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load rooms. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    if (filter === "all") return true;
    return room.type === filter;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleNextImage = (roomId, totalImages, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrevImage = (roomId, totalImages, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover your perfect accommodation
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
            <button
              onClick={fetchRooms}
              className="bg-gold-600 text-white px-6 py-2 rounded-lg hover:bg-gold-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex flex-wrap gap-2">
                {["all", "single", "deluxe", "suite", "double"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      filter === type
                        ? "bg-gold-500 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            {/* Room Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedRooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative group">
                    {room.images && room.images.length > 0 ? (
                      <>
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/uploads/rooms/${
                            room.images[currentImageIndex[room._id] || 0]
                          }`}
                          alt="Room"
                          className="object-cover h-64 w-full transition-opacity duration-300"
                        />
                        {/* Navigation Arrows - Show on hover */}
                        {room.images.length > 1 && (
                          <>
                            <button
                              onClick={(e) =>
                                handlePrevImage(room._id, room.images.length, e)
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) =>
                                handleNextImage(room._id, room.images.length, e)
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            {/* Image Indicators */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                              {room.images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setCurrentImageIndex((prev) => ({
                                      ...prev,
                                      [room._id]: index,
                                    }));
                                  }}
                                  className={`h-2 rounded-full transition-all ${
                                    (currentImageIndex[room._id] || 0) === index
                                      ? "bg-gold-500 w-6"
                                      : "bg-white/50 w-2 hover:bg-white/70"
                                  }`}
                                  aria-label={`Go to image ${index + 1}`}
                                />
                              ))}
                            </div>
                            {/* Image Counter */}
                            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs z-10">
                              {(currentImageIndex[room._id] || 0) + 1} /{" "}
                              {room.images.length}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500">
                          No Image
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {room.type}
                      </span>
                    </div>
                    {room.originalPrice > room.price && (
                      <div className="absolute top-4 right-16 z-10">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Save ${room.originalPrice - room.price}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {room.title}
                    </h3>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                          {room.rating} ({room.reviews} reviews)
                        </span>
                      </div>
                      <div className="ml-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-1" />2 guests
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features?.[0]
                        ?.split(",")
                        .slice(0, 3)
                        .map((feature, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
                          >
                            {feature.trim()}
                          </span>
                        ))}

                      {room.features?.[0]?.split(",").length > 3 && (
                        <span
                          title={room.features[0]
                            .split(",")
                            .slice(3)
                            .map((f) => f.trim())
                            .join(", ")}
                          className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md text-xs cursor-pointer"
                        >
                          +{room.features[0].split(",").length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {room.originalPrice > room.price && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through mr-2">
                            ${room.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${room.price}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          /night
                        </span>
                      </div>
                      <Link
                        to={`/room/${room._id}`}
                        className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {sortedRooms.length === 0 && !loading && !error && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No rooms found matching your criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;