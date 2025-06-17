
"use client";

import { useState, useEffect, useMemo } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { SearchBar } from '@/components/search/SearchBar';
import { getProducts as fetchAllProducts, getCategories, getProductsByCategory } from '@/lib/products';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Zap, Download, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Memoize allProducts to prevent SearchBar from re-fetching if not necessary
  const memoizedAllProducts = useMemo(() => allProducts, [allProducts]);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      const products = fetchAllProducts();
      const fetchedCategories = getCategories();
      setAllProducts(products);
      setDisplayedProducts(products);
      setCategories(fetchedCategories);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const productsToDisplay = getProductsByCategory(selectedCategory);
    setDisplayedProducts(productsToDisplay);
    // Reset search results when category changes, effectively showing all products in that category
    // Or, you might want to preserve search results and filter them by category
    // For simplicity, we reset to category view.
    setIsLoading(false); 
  }, [selectedCategory, allProducts]);


  const handleSearchResults = (results: Product[]) => {
    // If search results are for "All" category, or if current category is "All"
    if (selectedCategory === 'All') {
      setDisplayedProducts(results);
    } else {
      // Filter search results by the currently selected category
      const categoryFilteredResults = results.filter(p => p.category === selectedCategory);
      setDisplayedProducts(categoryFilteredResults);
    }
  };

  if (isLoading && allProducts.length === 0) { // Initial load skeleton
    return (
      <div className="space-y-8">
        <div className="flex w-full max-w-2xl items-center space-x-2 mx-auto mb-8">
          <Skeleton className="h-10 flex-grow" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-24" />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="text-center mb-16 relative">
        <div className="inline-block relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl opacity-30 animate-pulse"></div>
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-gradient-primary mb-4 flex items-center justify-center gap-3 relative float">
            <Zap className="h-12 w-12 md:h-16 md:w-16 text-primary animate-pulse" /> 
            Welcome to CommerceFlow
            <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 relative decorative-dots">
          Discover amazing digital products and services
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-6 w-6 text-accent fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        
        <div className="relative inline-block">
          <div className="absolute -inset-2 gradient-accent rounded-lg blur opacity-30 animate-pulse"></div>
          <Button asChild variant="outline" size="lg" className="relative glow-on-hover gradient-card border-2 border-primary/20">
            <Link href="#"> 
              <Download className="mr-2 h-5 w-5" />
              Download Project ZIP (Placeholder)
            </Link>
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4 opacity-80">
          (You need to replace the link above with your actual project ZIP URL after hosting it)
        </p>
      </div>

      <div className="relative">
        <SearchBar 
          onSearchResults={handleSearchResults} 
          allProducts={memoizedAllProducts} 
          onSearchStart={() => setIsLoading(true)}
          onSearchEnd={() => setIsLoading(false)}
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {categories.map((category, index) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className={`
              relative transition-all duration-300 glow-on-hover
              ${selectedCategory === category 
                ? 'gradient-primary text-white shadow-lg' 
                : 'gradient-card hover:border-primary/40'
              }
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="relative z-10">{category}</span>
            {selectedCategory === category && (
              <div className="absolute inset-0 gradient-primary rounded-md blur-sm opacity-50 -z-10"></div>
            )}
          </Button>
        ))}
      </div>
      
      {isLoading && displayedProducts.length === 0 ? ( // Loading state for search/filter
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {[...Array(4)].map((_, i) => (
           <div key={i} className="space-y-3 animate-pulse">
             <div className="h-48 w-full gradient-card rounded-lg shimmer"></div>
             <Skeleton className="h-6 w-3/4" />
             <Skeleton className="h-4 w-1/2" />
             <Skeleton className="h-10 w-full" />
           </div>
         ))}
       </div>
      ) : (
        <div className="relative">
          <ProductGrid products={displayedProducts} />
        </div>
      )}
    </div>
  );
}
