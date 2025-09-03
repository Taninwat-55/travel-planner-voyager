
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
                  ? "border-b-2 border-orange-500 text-black font-extrabold"
                  : "text-gray-600 font-extrabold"
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
              <h2 className="text-xl font-extrabold mb-3">Find Your Perfect Stay</h2>
              <p className="text-gray-700 leading-relaxed mb-6 font-extrabold">
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
                <p className="text-gray-500 italic font-extrabold">
                  Enter a city and select check-in & check-out dates to search for hotels.
                </p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h2 className="text-xl font-extrabold">Reviews</h2>
              {selectedHotel ? (
                <div className="mt-2">
                  {selectedHotel.reviews && selectedHotel.reviews.length > 0 ? (
                    selectedHotel.reviews.map((review, index) => (
                      <p key={index} className="text-gray-600 mb-2 font-extrabold">
                        {review}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600 font-extrabold">No reviews available for this hotel yet.</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 mt-2 font-extrabold">Select a hotel to see reviews.</p>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div>
              <h2 className="text-xl font-extrabold">About Voyager</h2>
              <p className="text-gray-600 mt-2 font-extrabold">
                <span className="font-extrabold">Voyager</span> helps you discover the best stays, flights, and car rentals with ease. Our platform is designed to provide you with comprehensive information to make your travel planning seamless and enjoyable.
              </p>
              <p className="text-gray-600 mt-4 font-extrabold">
                <span className="font-extrabold">Our Mission:</span> To simplify the travel booking process by offering a one-stop solution for all your needs.
              </p>
              <p className="text-gray-600 mt-4 font-extrabold">
                <span className="font-extrabold">Contact Us:</span> For support or inquiries, please visit our help center or contact our customer service team.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
