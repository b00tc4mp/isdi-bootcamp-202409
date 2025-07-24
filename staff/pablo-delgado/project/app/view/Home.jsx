import React, { useState, useEffect } from "react";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import { useNavigate } from "react-router-dom";
import { Footer } from "./components/Footer.jsx";
import { SearchBarStacked } from "./components/SearchBarStacked.jsx";
import bannerlogo from "./lib/bannerlogo.png";
import RotatingTextComponent from "./components/RotatingText.jsx";
import ResultPreview from "./ResultsPreview.jsx";
import searchClient from "../logic/algoliawrapper.js";
import { useSettings } from "./SettingsContext.jsx";

const translations = {
  es: {
    categories: {
      Vets: "Veterinarios",
      Grooming: "Peluquería",
      Trainers: "Adiestradores",
      Boarding: "Residencias",
      Petsitter: "Cuidadores",
    },
  },
  en: {
    categories: {
      Vets: "Vets",
      Grooming: "Grooming",
      Trainers: "Trainers",
      Boarding: "Boarding",
      Petsitter: "Petsitter",
    },
  },
};

const categories = [
  {
    name: "Vets",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Grooming",
    image:
      "https://images.unsplash.com/photo-1548366086-7f1b76106622?q=80&w=3076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Trainers",
    image:
      "https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Boarding",
    image:
      "https://plus.unsplash.com/premium_photo-1681843815216-f50fc50d0b8a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHBldHN8ZW58MHx8MHx8fDA%3D0",
  },
  {
    name: "Petsitter",
    image:
      "https://plus.unsplash.com/premium_photo-1683121426817-6ccd9e6ccb41?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHBldHN8ZW58MHx8MHx8fDA%3D",
  },
];

const Hit = ({ hit }) => (
  <ResultPreview
    imageUrl={hit.image}
    name={hit.name}
    description={hit.description}
    location={hit.category}
    category={hit.address}
  />
);

function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();
  const { language } = useSettings();
  const t = translations[language];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation(`${latitude},${longitude}`);
      },
      (error) => {
        console.error("Unable to get location", error);
      }
    );
  }, []);

  return (
    <div className="home-container text-white px-4 py-10 relative overflow-x-hidden">
      <div className="w-full max-w-2xl mx-auto">
        <img
          src={bannerlogo}
          alt="PetCare Logo"
          className="w-full max-w-[240px] h-auto mx-auto"
        />

        <RotatingTextComponent />

        <InstantSearch searchClient={searchClient} indexName="searchengine">
          <SearchBarStacked />

          {userLocation && (
            <Configure
              hitsPerPage={10}
              aroundLatLng={userLocation}
              aroundRadius="all"
            />
          )}

          {/* Category horizontal scroll */}
          <div className="mt-10 overflow-x-auto">
            <div className="flex space-x-6 px-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() =>
                    navigate(
                      `/results?query=${encodeURIComponent(
                        category.name.toLowerCase()
                      )}&city=Barcelona`
                    )
                  }
                  className="cursor-pointer flex-shrink-0 flex flex-col items-center text-[#006D77] hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-20 h-20 object-cover rounded-full border-2 shadow-md"
                    style={{ borderColor: "#83C5BE" }}
                  />
                  <span className="mt-2 text-sm font-medium">
                    {t.categories[category.name] || category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </InstantSearch>

        
      </div>
      <Footer />
    </div>
  );
}

export default Home;
