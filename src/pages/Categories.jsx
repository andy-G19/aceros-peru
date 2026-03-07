import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';

const Categories = () => {
  const navigate = useNavigate();
  const { searchQuery } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({}); // ← NUEVO
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Toggle expandir/colapsar categoría
  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // Manejar selección de categoría
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubcategory(null); // Resetear subcategoría
    
    // Auto-expandir si tiene subcategorías
    const category = categories.find(c => c.name === categoryName);
    if (category && category.subcategories && category.subcategories.length > 0) {
      setExpandedCategories(prev => ({
        ...prev,
        [categoryName]: true
      }));
    }
  };

  // Manejar selección de subcategoría
  const handleSubcategoryClick = (categoryName, subcategoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubcategory(subcategoryName);
  };

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    // Filtro de búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        (product.brand != null && product.brand.toLowerCase().includes(query)) ||
        product.category.toLowerCase().includes(query) ||
        (product.subcategory != null && product.subcategory.toLowerCase().includes(query)) ||
        (product.description != null && product.description.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }

    // Filtro de categoría
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Filtro de subcategoría
    if (selectedSubcategory && product.subcategory !== selectedSubcategory) {
      return false;
    }

    // Filtro de precio
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    return true;
  });

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'discount':
        return b.discount - a.discount;
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-orange-600">
            Inicio
          </button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-white font-medium">Categorías</span>
          {selectedCategory !== 'all' && (
            <>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-white font-medium">{selectedCategory}</span>
            </>
          )}
          {selectedSubcategory && (
            <>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-orange-600 font-medium">{selectedSubcategory}</span>
            </>
          )}
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {searchQuery 
                ? `Resultados para "${searchQuery}"` 
                : selectedSubcategory 
                  ? `${selectedCategory} - ${selectedSubcategory}`
                  : selectedCategory !== 'all'
                    ? selectedCategory
                    : 'Todas las Herramientas'
              }
            </h1>
            <p className="text-gray-400">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          </div>

          {/* Ordenar */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="text-sm text-gray-400">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name">Nombre A-Z</option>
              <option value="discount">Mayor Descuento</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-slate-900 rounded-xl border border-gray-700 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">tune</span>
                Filtros
              </h3>

              {/* Búsqueda activa */}
              {searchQuery && (
                <div className="mb-6 p-3 bg-orange-900/20 border border-orange-600 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-orange-400 uppercase">
                      Búsqueda activa
                    </span>
                  </div>
                  <p className="text-sm text-white font-medium">
                    "{searchQuery}"
                  </p>
                </div>
              )}

              {/* Categorías con Subcategorías */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Categorías
                </h4>
                <div className="space-y-1">
                  {/* Todas las categorías */}
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-orange-900/30 text-orange-600 font-medium'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    Todas las categorías
                  </button>

                  {/* Categorías individuales */}
                  {categories.map((category) => (
                    <div key={category.id}>
                      {/* Categoría principal */}
                      <div className="flex items-center">
                        <button
                          onClick={() => handleCategoryClick(category.name)}
                          className={`flex-1 text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                            selectedCategory === category.name && !selectedSubcategory
                              ? 'bg-orange-900/30 text-orange-600 font-medium'
                              : 'text-gray-400 hover:bg-gray-800'
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs">({category.count})</span>
                        </button>

                        {/* Botón expandir/colapsar si tiene subcategorías */}
                        {category.subcategories && category.subcategories.length > 0 && (
                          <button
                            onClick={() => toggleCategory(category.name)}
                            className="px-2 py-2 text-gray-400 hover:text-orange-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">
                              {expandedCategories[category.name] ? 'expand_less' : 'expand_more'}
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Subcategorías (expandibles) */}
                      {category.subcategories && 
                       category.subcategories.length > 0 && 
                       expandedCategories[category.name] && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-700 pl-2">
                          {category.subcategories.map((subcategory) => (
                            <button
                              key={subcategory.id}
                              onClick={() => handleSubcategoryClick(category.name, subcategory.name)}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                                selectedSubcategory === subcategory.name
                                  ? 'bg-orange-900/30 text-orange-600 font-medium'
                                  : 'text-gray-400 hover:bg-gray-800'
                              }`}
                            >
                              <span>{subcategory.name}</span>
                              <span className="text-[10px]">({subcategory.count})</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rango de Precio */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Rango de Precio
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                      placeholder="Mínimo"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                      placeholder="Máximo"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>S/ 0</span>
                    <span>S/ 500</span>
                  </div>
                </div>
              </div>

              {/* Limpiar filtros */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory(null);
                  setPriceRange([0, 500]);
                  setSortBy('featured');
                  setExpandedCategories({});
                }}
                className="w-full bg-gray-800 text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          </aside>

          {/* Grid de Productos */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">
                  search_off
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery 
                    ? `No hay resultados para "${searchQuery}"`
                    : selectedSubcategory
                      ? `No hay productos en ${selectedSubcategory}`
                      : 'Intenta ajustar los filtros de búsqueda'
                  }
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory(null);
                    setPriceRange([0, 500]);
                    setExpandedCategories({});
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Categories;