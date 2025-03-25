'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

interface CategoryData {
  name: string;
  slug: string;
  productCount: number;
  subcategories?: string[];
}

export default function ProductFilters({ category }: { category: CategoryData; subcategory: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get filter values from URL or use defaults
  const [openSections, setOpenSections] = useState({
    minimum: true,
    types: true,
    price: true,
    sustainability: true,
    sort: true,
  });

  // Initialize state from URL parameters
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '0');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '200');
  const [priceRange, setPriceRange] = useState([
    Number.parseInt(searchParams.get('minPrice') || '0'),
    Number.parseInt(searchParams.get('maxPrice') || '200'),
  ]);
  const [minimum, setMinimum] = useState(searchParams.get('minimum') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [sustainability, setSustainability] = useState(searchParams.get('sustainability') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'all');

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setMinPrice(value[0].toString());
    setMaxPrice(value[1].toString());
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
    if (value && !isNaN(Number(value))) {
      setPriceRange([Number(value), priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
    if (value && !isNaN(Number(value))) {
      setPriceRange([priceRange[0], Number(value)]);
    }
  };

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Set filter parameters
    params.set('minPrice', minPrice);
    params.set('maxPrice', maxPrice);
    params.set('minimum', minimum);
    params.set('type', type);
    params.set('sustainability', sustainability);
    params.set('sortBy', sortBy);

    // Reset to page 1 when filters change
    params.set('page', '1');

    // Update URL with filters
    router.push(`?${params.toString()}`);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Shop By Minimum */}
      <div className="border-b pb-4">
        <button
          className="flex w-full items-center justify-between font-medium"
          onClick={() => toggleSection('minimum')}
        >
          Shop By Minimum
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.minimum ? 'rotate-180' : ''}`} />
        </button>
        {openSections.minimum && (
          <div className="mt-4 space-y-2">
            <RadioGroup value={minimum} onValueChange={setMinimum}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-minimum" />
                <Label htmlFor="all-minimum">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="41-or-more" id="41-or-more" />
                <Label htmlFor="41-or-more">41 or More</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="40-or-less" id="40-or-less" />
                <Label htmlFor="40-or-less">40 or Less</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30-or-less" id="30-or-less" />
                <Label htmlFor="30-or-less">30 or Less</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20-or-less" id="20-or-less" />
                <Label htmlFor="20-or-less">20 or Less</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10-or-less" id="10-or-less" />
                <Label htmlFor="10-or-less">10 or Less</Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      {/* T-Shirts Types */}
      <div className="border-b pb-4">
        <button className="flex w-full items-center justify-between font-medium" onClick={() => toggleSection('types')}>
          {category.name}
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.types ? 'rotate-180' : ''}`} />
        </button>
        {openSections.types && (
          <div className="mt-4 space-y-2">
            <RadioGroup value={type} onValueChange={setType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-types" />
                <Label htmlFor="all-types">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casual" id="casual" />
                <Label htmlFor="casual">Casual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fleece" id="fleece" />
                <Label htmlFor="fleece">Fleece</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="popular" id="popular" />
                <Label htmlFor="popular">Popular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newest" id="newest" />
                <Label htmlFor="newest">Newest</Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      {/* Shop By Price */}
      <div className="border-b pb-4">
        <button className="flex w-full items-center justify-between font-medium" onClick={() => toggleSection('price')}>
          Shop By Price
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
        </button>
        {openSections.price && (
          <div className="mt-4 space-y-4">
            <Slider
              value={priceRange}
              min={0}
              max={200}
              step={1}
              onValueChange={handlePriceRangeChange}
              className="py-4"
            />
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3">
                <span className="text-sm text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3">
                <span className="text-sm text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            <Button className="w-full" onClick={applyFilters}>
              Apply
            </Button>
          </div>
        )}
      </div>

      {/* Sustainability */}
      <div className="border-b pb-4">
        <button
          className="flex w-full items-center justify-between font-medium"
          onClick={() => toggleSection('sustainability')}
        >
          Sustainability
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.sustainability ? 'rotate-180' : ''}`} />
        </button>
        {openSections.sustainability && (
          <div className="mt-4 space-y-2">
            <RadioGroup value={sustainability} onValueChange={setSustainability}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-sustainability" />
                <Label htmlFor="all-sustainability">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1-for-planet" id="1-for-planet" />
                <Label htmlFor="1-for-planet">1% for the Planet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b-corp" id="b-corp" />
                <Label htmlFor="b-corp">B Corp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="climate-neutral" id="climate-neutral" />
                <Label htmlFor="climate-neutral">Climate Neutral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sustainable" id="sustainable" />
                <Label htmlFor="sustainable">Sustainable</Label>
              </div>
            </RadioGroup>
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
                <Label htmlFor="all-sort">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recommended" id="recommended" />
                <Label htmlFor="recommended">Recommended</Label>
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
              <Button
                className="mt-6 w-full"
                onClick={() => {
                  applyFilters();
                  document
                    .querySelector('[data-radix-collection-item]')
                    ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                }}
              >
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block">
        <FilterContent />
        <Button className="mt-6 w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </>
  );
}
