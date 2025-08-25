import { useState } from "react";
import SearchForm from "../components/SearchForm";
import HotelList from "../components/HotelList";

export default function StaysPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchParams, setSearchParams] = useState({
    city: "",
    checkIn: null,
    checkOut: null,
  });
  const [selectedHotel, setSelectedHotel] = useState(null); // Track selected hotel

  const handleSearch = ({ city, checkIn, checkOut }) => {
    setSearchParams({ city, checkIn, checkOut });
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel); // Set hotel when user clicks Review
    setActiveTab("reviews"); // Automatically switch to Reviews tab
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />

      <div className="bg-white text-black px-20 py-20 w-full h-screen">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-300 mb-6">
          {["overview", "reviews", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-orange-500 text-black font-semibold"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Find Your Perfect Stay</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Search for hotels in any city and discover amazing places to stay.
              </p>

              {/* Hotel List */}
              {searchParams.city && searchParams.checkIn && searchParams.checkOut ? (
                <HotelList
                  city={searchParams.city}
                  check_in_date={searchParams.checkIn}
                  check_out_date={searchParams.checkOut}
                  onReviewClick={handleHotelSelect} // Pass callback
                />
              ) : (
                <p className="text-gray-500 italic">
                  Enter a city and select check-in & check-out dates to search for hotels.
                </p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h2 className="text-xl font-semibold">Reviews</h2>
              {selectedHotel ? (
                <div className="mt-2">
                  {selectedHotel.reviews && selectedHotel.reviews.length > 0 ? (
                    selectedHotel.reviews.map((review, index) => (
                      <p key={index} className="text-gray-600 mb-2">
                        {review}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600">No reviews available for this hotel yet.</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 mt-2">Select a hotel to see reviews.</p>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div>
              <h2 className="text-xl font-semibold">About</h2>
              <p className="text-gray-600 mt-2">
                Voyager helps you discover the best stays, flights, and car rentals with ease.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
