import React, { useState, useMemo } from 'react';
import SearchHeader from '../components/Explore/SearchHeader';
import FilterSidebar from '../components/Explore/FilterSidebar';
import { TalentCard } from '../components/Explore/TalentCard';

const CATEGORIES_LIST = [
  "All", "Acting", "Singing", "Chanting", "Dancing", 
  "Playing Musical Instruments", "Comedy", "Painting", 
  "Storytelling", "Scriptwriting", "Running", "Swimming", 
  "Football", "Basketball", "Yoga"
];

const TALENT_DATA = [
  { id: 1, name: "Ada Vibes", category: "Singing", section: "Hireable", price: 200000, rating: 4.9, location: "Lagos, Nigeria", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", badge: "Hireable", isPro: true, description: "Soulful Afrobeat vocalist for your events" },
  { id: 2, name: "ChiFlow", category: "Dancing", section: "Sponsorship", price: 450000, rating: 4.8, location: "Abuja, Nigeria", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", badge: "Sponsorship", isPro: true, description: "Afrobeats dancer & choreographer" },
  { id: 3, name: "AminaArt", category: "Painting", section: "Sponsorship", price: 150000, rating: 4.9, location: "Kano, Nigeria", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", badge: "Sponsorship", isPro: true, description: "Contemporary African art with global appeal" },
  { id: 4, name: "SeunStory", category: "Storytelling", section: "Hireable", price: 50000, rating: 4.5, location: "Ibadan, Nigeria", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", badge: "Hireable", isPro: false, description: "Captivating storyteller for events" },
];

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All"); // Added back
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [customCategory, setCustomCategory] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const filteredTalents = useMemo(() => {
    return TALENT_DATA.filter((talent) => {
      const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            talent.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const categoryToMatch = isOtherSelected ? customCategory : selectedCategory;
      const matchesCategory = categoryToMatch === "All" || categoryToMatch === "" ||
                               talent.category.toLowerCase() === categoryToMatch.toLowerCase();
      
      // Match the "All Sections" dropdown
      const matchesSection = selectedSection === "All" || 
                              talent.section.toLowerCase() === selectedSection.toLowerCase();
      
      const matchesPrice = talent.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesSection && matchesPrice;
    });
  }, [searchQuery, selectedCategory, customCategory, isOtherSelected, selectedSection, maxPrice]);

  const handleCategoryChange = (cat) => {
    if (cat === "Other") {
      setIsOtherSelected(true);
      setSelectedCategory("Other");
    } else {
      setIsOtherSelected(false);
      setSelectedCategory(cat);
      setCustomCategory("");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SearchHeader 
        categories={CATEGORIES_LIST}
        onSearchChange={setSearchQuery} 
        onCategorySelect={handleCategoryChange} 
        onSectionSelect={setSelectedSection} // Passed handler
      />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 pb-20">
        <FilterSidebar 
          categories={CATEGORIES_LIST}
          selectedCategory={isOtherSelected ? "Other" : selectedCategory}
          onSelectCategory={handleCategoryChange}
          priceValue={maxPrice}
          onPriceChange={setMaxPrice}
          showOtherInput={isOtherSelected}
          customCategory={customCategory}
          onCustomCategoryChange={setCustomCategory}
        />
        
        <main className="flex-1">
          <div className="mb-6">
            <p className="text-gray-400 font-medium text-sm">
              Found {filteredTalents.length} talents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTalents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExplorePage;