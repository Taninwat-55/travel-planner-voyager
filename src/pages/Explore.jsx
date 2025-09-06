import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Filter, ArrowLeft } from "lucide-react";

const Explore = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // filter states
  const [priceRange, setPriceRange] = useState([30, 1500]); // [min, max]
  const [selectedRating, setSelectedRating] = useState("Any"); // "Any" | 1..5
  const [selectedAmenities, setSelectedAmenities] = useState([]); // array of strings

  const scrollContainerRef1 = useRef(null);
  const scrollContainerRef2 = useRef(null);

  const destinations = [
    // First row (6 countries)
    {
      id: 1,
      name: "France",
      price: 1200,
      rating: 5,
      amenities: ["Wi-Fi", "Kitchen", "Swimming Pool", "Parking"],
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
        "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> France, a cultural and historical powerhouse in Western Europe, is renowned for its rich heritage, art, and cuisine.</p>
        <p><strong>Landmarks:</strong> Eiffel Tower, Louvre Museum, Notre-Dame Cathedral, Palace of Versailles.</p>
        <p><strong>Culture:</strong> French culture is synonymous with elegance, from haute couture to world-class cuisine.</p>
        <p><strong>Cuisine:</strong> Baguettes, cheeses like Brie and Camembert, wines from Bordeaux.</p>
        <p><strong>Travel Tips:</strong> Visit in spring or fall, explore beyond Paris, learn basic French phrases.</p>
        <p><strong>Average cost (per night):</strong> $$$$ (expensive)</p>
        <p><strong>Did you know?</strong> France is the most visited country in the world with over 89 million tourists annually.</p>
      `,
    },
    {
      id: 2,
      name: "Japan",
      price: 1000,
      rating: 4,
      amenities: ["Wi-Fi", "Kitchen", "Parking"],
      image: "https://images.pexels.com/photos/2086748/pexels-photo-2086748.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/2086748/pexels-photo-2086748.jpeg",
        "https://images.pexels.com/photos/3035998/pexels-photo-3035998.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Japan, an island nation in East Asia, seamlessly blends ancient traditions with modernity.</p>
        <p><strong>Landmarks:</strong> Shibuya Crossing, Kyoto's Fushimi Inari Shrine, Mount Fuji, Hiroshima Peace Memorial.</p>
        <p><strong>Culture:</strong> Tea ceremonies, calligraphy, festivals like Hanami, anime, and J-pop.</p>
        <p><strong>Cuisine:</strong> Sushi, ramen, tempura, matcha desserts.</p>
        <p><strong>Average cost (per night):</strong> $$$ (high)</p>
        <p><strong>Did you know?</strong> Japan has over 3,000 active hot springs and more than 200 volcanoes.</p>
      `,
    },
    {
      id: 3,
      name: "Italy",
      price: 950,
      rating: 5,
      amenities: ["Wi-Fi", "Swimming Pool", "Kitchen"],
      image: "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/804954/pexels-photo-804954.jpeg",
        "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Italy, in Southern Europe, is famed for its history, art, and culinary delights.</p>
        <p><strong>Landmarks:</strong> Colosseum, Venice Canals, Florence Cathedral, Amalfi Coast.</p>
        <p><strong>Culture:</strong> Renaissance art, opera, vibrant festivals, and family-centric traditions.</p>
        <p><strong>Cuisine:</strong> Pasta, pizza, gelato, espresso, and regional wines.</p>
        <p><strong>Average cost (per night):</strong> $$$ (high)</p>
        <p><strong>Did you know?</strong> Italy has more UNESCO World Heritage Sites than any other country.</p>
      `,
    },
    {
      id: 4,
      name: "Spain",
      price: 700,
      rating: 4,
      amenities: ["Wi-Fi", "Swimming Pool"],
      image: "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg",
        "https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Spain is known for its vibrant culture, historic cities, and diverse landscapes.</p>
        <p><strong>Landmarks:</strong> Sagrada Familia, Alhambra, Prado Museum, Park Güell.</p>
        <p><strong>Cuisine:</strong> Paella, tapas, churros, sangria.</p>
        <p><strong>Average cost (per night):</strong> $$ (moderate)</p>
        <p><strong>Did you know?</strong> Spain produces over 40% of the world's olive oil.</p>
      `,
    },
    {
      id: 5,
      name: "Brazil",
      price: 500,
      rating: 3,
      amenities: ["Wi-Fi", "Parking"],
      image: "https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg",
        "https://images.pexels.com/photos/5472372/pexels-photo-5472372.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Brazil, South America's largest country, is known for its vibrant culture and natural wonders.</p>
        <p><strong>Landmarks:</strong> Christ the Redeemer, Amazon Rainforest, Iguazu Falls, Copacabana Beach.</p>
        <p><strong>Average cost (per night):</strong> $ (affordable)</p>
        <p><strong>Did you know?</strong> The Amazon Rainforest produces about 20% of the world's oxygen.</p>
      `,
    },
    {
      id: 6,
      name: "Australia",
      price: 1400,
      rating: 5,
      amenities: ["Wi-Fi", "Kitchen", "Swimming Pool", "Parking"],
      image: "https://images.pexels.com/photos/534028/pexels-photo-534028.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/534028/pexels-photo-534028.jpeg",
        "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Australia is renowned for its unique wildlife, stunning landscapes, and laid-back culture.</p>
        <p><strong>Landmarks:</strong> Sydney Opera House, Great Barrier Reef, Uluru, Bondi Beach.</p>
        <p><strong>Average cost (per night):</strong> $$$$ (expensive)</p>
        <p><strong>Did you know?</strong> Australia is home to the world's largest coral reef system.</p>
      `,
    },
    // Second row (6 countries)
    {
      id: 7,
      name: "Canada",
      price: 800,
      rating: 4,
      amenities: ["Wi-Fi", "Kitchen", "Parking"],
      image: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg",
        "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Canada is known for its vast wilderness, multicultural cities, and friendly locals.</p>
        <p><strong>Average cost (per night):</strong> $$$ (high)</p>
        <p><strong>Did you know?</strong> Canada has the longest coastline in the world.</p>
      `,
    },
    {
      id: 8,
      name: "India",
      price: 450,
      rating: 3,
      amenities: ["Wi-Fi", "Kitchen"],
      image: "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
        "https://images.pexels.com/photos/1601504/pexels-photo-1601504.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> India is a vibrant country with diverse cultures, history, and landscapes.</p>
        <p><strong>Average cost (per night):</strong> $ (affordable)</p>
        <p><strong>Did you know?</strong> India is home to the world's largest film industry by volume.</p>
      `,
    },
    {
      id: 9,
      name: "Thailand",
      price: 600,
      rating: 4,
      amenities: ["Wi-Fi", "Swimming Pool"],
      image: "https://images.pexels.com/photos/3581363/pexels-photo-3581363.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/3581363/pexels-photo-3581363.jpeg",
        "https://images.pexels.com/photos/352905/pexels-photo-352905.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Thailand is known for its tropical beaches, temples, and vibrant street markets.</p>
        <p><strong>Average cost (per night):</strong> $$ (moderate)</p>
        <p><strong>Did you know?</strong> Thailand is nicknamed the "Land of Smiles."</p>
      `,
    },
    {
      id: 10,
      name: "Greece",
      price: 750,
      rating: 5,
      amenities: ["Wi-Fi", "Swimming Pool", "Parking"],
      image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg",
        "https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Greece is famous for its ancient history, stunning islands, and Mediterranean charm.</p>
        <p><strong>Average cost (per night):</strong> $$$ (high)</p>
        <p><strong>Did you know?</strong> Greece has over 6,000 islands and islets.</p>
      `,
    },
    {
      id: 11,
      name: "Mexico",
      price: 550,
      rating: 3,
      amenities: ["Wi-Fi", "Kitchen", "Parking"],
      image: "https://images.pexels.com/photos/12046436/pexels-photo-12046436.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/6563919/pexels-photo-6563919.jpeg",
        "https://images.pexels.com/photos/12046436/pexels-photo-12046436.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Mexico is known for its vibrant culture, ancient ruins, and beautiful beaches.</p>
        <p><strong>Average cost (per night):</strong> $$ (moderate)</p>
        <p><strong>Did you know?</strong> Mexico is home to 35 UNESCO World Heritage Sites.</p>
      `,
    },
    {
      id: 12,
      name: "Egypt",
      price: 400,
      rating: 4,
      amenities: ["Wi-Fi", "Parking"],
      image: "https://images.pexels.com/photos/2765869/pexels-photo-2765869.jpeg",
      extraImages: [
        "https://images.pexels.com/photos/2765869/pexels-photo-2765869.jpeg",
        "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg",
      ],
      info: `
        <p><strong>Overview:</strong> Egypt is famous for its ancient civilization and monumental landmarks.</p>
        <p><strong>Average cost (per night):</strong> $ (affordable)</p>
        <p><strong>Did you know?</strong> The Great Pyramid is one of the Seven Wonders of the Ancient World.</p>
      `,
    },
  ];

  // filtering logic (applies to all destinations)
  const filteredDestinations = destinations.filter((d) => {
    const priceMatch = d.price >= priceRange[0] && d.price <= priceRange[1];
    const ratingMatch = selectedRating === "Any" || d.rating === Number(selectedRating);
    const amenitiesMatch =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => d.amenities.includes(a));
    return priceMatch && ratingMatch && amenitiesMatch;
  });

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]));
  };

  const clearFilters = () => {
    setPriceRange([30, 1500]);
    setSelectedRating("Any");
    setSelectedAmenities([]);
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const container = ref.current;
      const scrollAmount = 400;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (direction === 'right') {
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      } else {
        if (container.scrollLeft <= 10) {
          container.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      }
    }
  };

  const min = 30;
  const max = 1500;
  const leftPercent = ((priceRange[0] - min) / (max - min)) * 100;
  const rightPercent = ((priceRange[1] - min) / (max - min)) * 100;

  if (selectedDestination) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 md:px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <button onClick={() => setSelectedDestination(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold">
              <ArrowLeft size={20} />
              <span>Tillbaka</span>
            </button>
            <h1 className="text-2xl font-bold">{selectedDestination.name}</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 md:p-8">
          {selectedDestination.extraImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${selectedDestination.name} view ${index + 1}`}
              className="w-full h-56 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
        <div className="px-4 md:px-8 pb-8">
          <h2 className="text-xl font-bold mb-3">Om {selectedDestination.name}</h2>
          <div className="text-gray-600 text-lg prose" dangerouslySetInnerHTML={{ __html: selectedDestination.info }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .snap-x { scroll-snap-type: x mandatory; }
        .snap-x > div { scroll-snap-align: start; }

        .price-range-container { position: relative; height: 56px; }
        .price-range-container .track {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: #000;
          transform: translateY(-50%);
          border-radius: 999px;
          z-index: 1;
        }
        .price-range-container .filled {
          position: absolute;
          top: 50%;
          height: 4px;
          background: #F7941D;
          transform: translateY(-50%);
          border-radius: 999px;
          z-index: 2;
        }
        .price-range-container input[type=range]{
          -webkit-appearance: none;
          appearance: none;
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          margin: 0;
          background: transparent;
          pointer-events: auto;
        }
        .price-range-container input[type=range]::-webkit-slider-runnable-track { background: transparent; height: 4px; }
        .price-range-container input[type=range]::-moz-range-track { background: transparent; height: 4px; }
        .price-range-container input[type=range]::-webkit-slider-thumb{
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #F7941D;
          border: 3px solid #ffffff;
          box-shadow: 0 3px 8px rgba(0,0,0,0.18);
          margin-top: -7px;
          cursor: pointer;
          z-index: 4;
          position: relative;
        }
        .price-range-container input[type=range]::-moz-range-thumb{
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #F7941D;
          border: 3px solid #ffffff;
          box-shadow: 0 3px 8px rgba(0,0,0,0.18);
          cursor: pointer;
          z-index: 4;
        }
        .price-range-container input[type=range]:focus { outline: none; }
      `}</style>

      <div className="flex justify-between items-center px-4 md:px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Utvalda Destinationer</h1>
        <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-bold">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full h-full md:w-[92%] md:max-w-[900px] md:h-auto rounded-2xl bg-gray-200 shadow-2xl p-4 md:p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="px-3 py-1 rounded-full bg-white shadow font-bold">Close</button>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <p className="text-lg font-bold mb-3">Prisklass</p>

              <div className="price-range-container mb-4">
                <div className="track" />
                <div
                  className="filled"
                  style={{ left: `${leftPercent}%`, width: `${Math.max(0, rightPercent - leftPercent)}%` }}
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  step="10"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newMin = Number(e.target.value);
                    if (newMin > priceRange[1]) {
                      setPriceRange([priceRange[1], priceRange[1]]);
                    } else {
                      setPriceRange([newMin, priceRange[1]]);
                    }
                  }}
                  style={{ zIndex: 4, top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = Number(e.target.value);
                    if (newMax < priceRange[0]) {
                      setPriceRange([priceRange[0], priceRange[0]]);
                    } else {
                      setPriceRange([priceRange[0], newMax]);
                    }
                  }}
                  style={{ zIndex: 3, top: "50%", transform: "translateY(-50%)" }}
                />
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <div className="w-full flex justify-between text-sm text-gray-700 font-bold">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <p className="text-lg font-bold mb-3">Rating</p>
              <div className="flex gap-3 flex-wrap">
                {["Any", 1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRating(r)}
                    className={`px-4 py-2 rounded-lg border transition font-bold ${selectedRating === r ? "bg-orange-500 text-white" : "bg-white text-gray-700"}`}
                  >
                    {r === "Any" ? "Any" : `${r} Star${r > 1 ? "s" : ""}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <p className="text-lg font-bold mb-3">Amenities</p>
              <div className="flex gap-3 flex-wrap">
                {["Wi-Fi", "Kitchen", "Swimming Pool", "Parking"].map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`px-4 py-2 rounded-lg border transition font-bold ${selectedAmenities.includes(a) ? "bg-orange-500 text-white" : "bg-white text-gray-700"}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
              <button onClick={clearFilters} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white border hover:bg-gray-50 font-bold">Clear All</button>
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <div className="px-4 py-2 rounded-lg bg-white border text-gray-700 flex items-center gap-2 font-bold flex-1">Showing <span className="font-bold">{filteredDestinations.length}</span></div>
                <button onClick={() => setIsFilterOpen(false)} className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 font-bold">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* First Row */}
      <div className="relative px-4 md:px-8 py-8">
        <button onClick={() => scroll(scrollContainerRef1, 'left')} className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <button onClick={() => scroll(scrollContainerRef1, 'right')} className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
        <div ref={scrollContainerRef1} className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
          {filteredDestinations.slice(0, 6).map((destination) => (
            <div key={destination.id} className="w-80 flex-shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full aspect-video object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <h3 className="text-lg font-bold">{destination.name}</h3>
                <button onClick={() => setSelectedDestination(destination)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 group">
                  <span className="text-sm font-bold">Utforska</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row */}
      <div className="relative px-4 md:px-8 py-8">
        <button onClick={() => scroll(scrollContainerRef2, 'left')} className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <button onClick={() => scroll(scrollContainerRef2, 'right')} className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
        <div ref={scrollContainerRef2} className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
          {filteredDestinations.slice(6, 12).map((destination) => (
            <div key={destination.id} className="w-80 flex-shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full aspect-video object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <h3 className="text-lg font-bold">{destination.name}</h3>
                <button onClick={() => setSelectedDestination(destination)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 group">
                  <span className="text-sm font-bold">Utforska</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;