'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useFilterStore } from '@/store/filter-store';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/lib/api';

interface CategoryData {
  name: string;
  slug: string;
  productCount: number;
  subcategories?: string[];
}

export default function ProductFilters({ category, subcategory }: { category: CategoryData; subcategory: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get filter state from Zustand store
  const { minPrice, maxPrice, status, sortBy, setPriceRange, setStatus, setSortBy } = useFilterStore();
  console.log(subcategory);
  // Fetch categories for the filter
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Local state for UI
  const [openSections, setOpenSections] = useState({
    price: true,
    category: true,
    status: true,
    sort: true,
  });

  const [priceRange, setPriceRangeLocal] = useState([
    Number.parseInt(minPrice.toString()),
    Number.parseInt(maxPrice.toString()),
  ]);

  // Update local state when store changes
  useEffect(() => {
    setPriceRangeLocal([Number.parseInt(minPrice.toString()), Number.parseInt(maxPrice.toString())]);
  }, [minPrice, maxPrice]);

  // Initialize filter state from URL on component mount
  useEffect(() => {
    const urlMinPrice = searchParams.get('minPrice');
    const urlMaxPrice = searchParams.get('maxPrice');
    const urlStatus = searchParams.get('status');
    const urlSortBy = searchParams.get('sortBy');

    if (urlMinPrice && urlMaxPrice) {
      setPriceRange(Number(urlMinPrice), Number(urlMaxPrice));
    }

    if (urlStatus) {
      setStatus(urlStatus);
    }

    if (urlSortBy) {
      setSortBy(urlSortBy);
    }
  }, [searchParams, setPriceRange, setSortBy, setStatus]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRangeLocal(value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !isNaN(Number(value))) {
      setPriceRangeLocal([Number(value), priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !isNaN(Number(value))) {
      setPriceRangeLocal([priceRange[0], Number(value)]);
    }
  };

  // Apply filters
  const applyFilters = () => {
    // Update the Zustand store
    setPriceRange(priceRange[0], priceRange[1]);

    // Build URL with all current filters
    const params = new URLSearchParams(searchParams.toString());

    // Set filter parameters
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    params.set('status', status);
    params.set('sortBy', sortBy);

    // Reset to page 1 when filters change
    params.set('page', '1');

    // Update URL with filters
    router.push(`${pathname}?${params.toString()}`);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Shop By Price */}
      <div className="border-b pb-4">
        <button className="flex w-full items-center justify-between font-medium" onClick={() => toggleSection('price')}>
          Price Range
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
        </button>
        {openSections.price && (
          <div className="mt-4 space-y-4">
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={handlePriceRangeChange}
              className="py-4"
            />
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3">
                <span className="text-sm text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={handleMinPriceChange}
                  className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3">
                <span className="text-sm text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={handleMaxPriceChange}
                  className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Status */}
      <div className="border-b pb-4">
        <button
          className="flex w-full items-center justify-between font-medium"
          onClick={() => toggleSection('status')}
        >
          Product Status
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.status ? 'rotate-180' : ''}`} />
        </button>
        {openSections.status && (
          <div className="mt-4 space-y-2">
            <RadioGroup value={status} onValueChange={setStatus}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-status" />
                <Label htmlFor="all-status">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="published" id="published" />
                <Label htmlFor="published">Published</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="draft" />
                <Label htmlFor="draft">Draft</Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      {/* Product Categories */}
      <div className="border-b pb-4">
        <button
          className="flex w-full items-center justify-between font-medium"
          onClick={() => toggleSection('category')}
        >
          Categories
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.category ? 'rotate-180' : ''}`} />
        </button>
        {openSections.category && (
          <div className="mt-4 space-y-2">
            <RadioGroup value={category.slug}>
              {categoriesData?.data?.map((cat) => (
                <div key={cat._id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={cat.categoryName.toLowerCase().replace(/\s+/g, '-')}
                    id={`${cat._id}-category`}
                    disabled
                  />
                  <Label htmlFor={`${cat._id}-category`}>{cat.categoryName}</Label>
                </div>
              ))}
            </RadioGroup>
            <p className="mt-2 text-xs text-muted-foreground">Categories are pre-selected from the URL.</p>
          </div>
        )}
      </div>

      {/* Sort By */}
      <div>
        <button className="flex w-full items-center justify-between font-medium" onClick={() => toggleSection('sort')}>
          Sort By
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.sort ? 'rotate-180' : ''}`} />
        </button>
        {openSections.sort && (
          <div className="mt-4 space-y-2">
            <RadioGroup value={sortBy} onValueChange={setSortBy}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-sort" />
                <Label htmlFor="all-sort">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-low" id="price-low" />
                <Label htmlFor="price-low">Price: Low to High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-high" id="price-high" />
                <Label htmlFor="price-high">Price: High to Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newest" id="newest-sort" />
                <Label htmlFor="newest-sort">Newest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="popular" id="popular-sort" />
                <Label htmlFor="popular-sort">Popular</Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      <Button className="mt-6 w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  );

  // Mobile view uses a sheet
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-4 w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto sm:w-[350px]">
            <div className="py-4">
              <h2 className="mb-6 text-lg font-semibold">Filters</h2>
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block">
        <FilterContent />
      </div>
    </>
  );
}
