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
// import { useQuery } from '@tanstack/react-query';
// import { fetchCategories } from '@/lib/api';

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
  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: fetchCategories,
  // });

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

    const min = urlMinPrice ? Math.max(0, Number(urlMinPrice)) : 0;
    const max = urlMaxPrice ? Math.min(1000, Number(urlMaxPrice)) : 1000;

    if (min !== minPrice || max !== maxPrice) {
      setPriceRange(min, max);
      setPriceRangeLocal([min, max]);
    }

    if (urlStatus && urlStatus !== status) {
      setStatus(urlStatus);
    }

    if (urlSortBy && urlSortBy !== sortBy) {
      setSortBy(urlSortBy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    // Ensure values are within bounds
    const min = Math.max(0, Math.min(value[0], value[1]));
    const max = Math.max(value[0], Math.min(1000, value[1]));
    setPriceRangeLocal([min, max]);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      const min = Math.max(0, Math.min(value, priceRange[1]));
      setPriceRangeLocal([min, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      const max = Math.max(priceRange[0], Math.min(1000, value));
      setPriceRangeLocal([priceRange[0], max]);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', value);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', value);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  // Apply filters
  const applyFilters = () => {
    // Update the Zustand store
    setPriceRange(priceRange[0], priceRange[1]);

    // Build URL with all current filters
    const params = new URLSearchParams(searchParams.toString());

    // Clean up existing parameters
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('status');
    params.delete('sortBy');
    params.delete('page');

    // Set new filter parameters
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 1000) params.set('maxPrice', priceRange[1].toString());
    if (status !== 'all') params.set('status', status);
    if (sortBy !== 'all') params.set('sortBy', sortBy);
    params.set('page', '1'); // Reset to first page

    // Update URL with filters
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);
  };

  const resetAllFilters = () => {
    setPriceRange(0, 1000);
    setStatus('all');
    setSortBy('all');
    setPriceRangeLocal([0, 1000]);

    // Clear URL parameters
    // const params = new URLSearchParams();
    router.push(pathname);
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
            <RadioGroup value={status} onValueChange={handleStatusChange}>
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
            <div className="rounded-md border bg-gray-50 p-4">
              <p className="font-medium">{category.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">Currently browsing: {subcategory}</p>
            </div>
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
            <RadioGroup value={sortBy} onValueChange={handleSortChange}>
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

      <div className="mt-6 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={resetAllFilters}>
          Reset
        </Button>
        <Button className="flex-1" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
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
