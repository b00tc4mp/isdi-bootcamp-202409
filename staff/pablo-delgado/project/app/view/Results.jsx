import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InstantSearch, Hits, Configure, Pagination } from 'react-instantsearch-dom';
import { liteClient as algoliasearch } from "algoliasearch/lite";
import ResultPreview from './ResultsPreview.jsx';
import ResultsHeader from './components/ResultsHeader.jsx';
import { Footer } from './components/Footer.jsx';
import CustomSearchBox from './CustomSearchBox.jsx'
import { SearchBarResults } from './components/SearchBarResults.jsx';
import { ArrowLeft } from 'phosphor-react';

const searchClient = algoliasearch('9GI1BXXS9U', '48b4039a348ad4cfed6c45a07c4cc4c7');

const Hit = ({ hit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/partner/${hit.objectID}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <ResultPreview
        imageUrl={hit.image}
        name={hit.name}
        category={hit.category}
        address={hit.address}
        objectID={hit.objectID}
      />
    </div>
  );
};

const useQuery = () => new URLSearchParams(useLocation().search);

function ResultsPage() {
  const queryParams = useQuery();
  const navigate = useNavigate();

  const [query, setQuery] = useState(queryParams.get('query') || '');
  const [category, setCategory] = useState(queryParams.get('category') || '');
  const [city, setCity] = useState(queryParams.get('city') || '');

  useEffect(() => {
    setQuery(queryParams.get('query') || '');
    setCategory(queryParams.get('category') || '');
    setCity(queryParams.get('city') || '');
  }, [queryParams]);

 // When the text changes in the SearchBox input
  const onSearchChange = (e) => {
    const newQuery = e.currentTarget.value;
    setQuery(newQuery);
    // Update the URL and clear category since you're searching text
    navigate(`/results?query=${encodeURIComponent(newQuery)}&category=&city=${encodeURIComponent(city)}`);
    setCategory('');
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setQuery('');
    navigate(`/results?query=&category=${encodeURIComponent(newCategory)}&city=${encodeURIComponent(city)}`);
  };

  const handleCityChange = (newCity) => {
    setCity(newCity);
    navigate(`/results?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}&city=${encodeURIComponent(newCity)}`);
  };

  // We build filters using only category and city, NOT query
  const filters = [
    category ? `category:${category}` : '',
    city ? `city:"${city}"` : ''
  ].filter(Boolean).join(' AND ');

  const t = { backAria: 'Volver atrás' };

  return (
    <div className="results-container bg-white max-w-6xl mx-auto px-4 relative">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-yellow-600 text-white shadow-md z-10"
        aria-label={t.backAria}
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      <div className="scale-90">
        <SearchBarResults />
      </div>

      <h1 className="text-2xl md:text-4xl font-bold text-center text-white mb-6">
        {query && !category && `Resultados para: "${query}"`}
        {category && !query && `Resultados en "${category}"`}
        {query && category && `Resultados para: "${query}" en "${category}"`}
      </h1>

      <InstantSearch searchClient={searchClient} indexName="searchengine">
        <Configure hitsPerPage={12} filters={filters} />

        <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto mt-6">
          <Hits hitComponent={Hit} />
          <Pagination showLast className="mt-8 flex justify-center" />
        </div>
        
      </InstantSearch>

      <Footer />
    </div>
  );
}

export default ResultsPage;
