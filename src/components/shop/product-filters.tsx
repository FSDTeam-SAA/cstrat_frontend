'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 200]);

  const categories = [
    { id: 'clothing', label: 'Clothing' },
    { id: 'bags', label: 'Bags' },
    { id: 'writing', label: 'Writing Items' },
    { id: 'tech', label: 'Tech Products' },
    { id: 'drinkware', label: 'Drinkware' },
  ];

  const brands = [
    { id: 'nike', label: 'Nike' },
    { id: 'adidas', label: 'Adidas' },
    { id: 'puma', label: 'Puma' },
    { id: 'newbalance', label: 'New Balance' },
    { id: 'underarmour', label: 'Under Armour' },
  ];

  const colors = [
    { id: 'black', label: 'Black', color: 'bg-black' },
    { id: 'white', label: 'White', color: 'bg-white border' },
    { id: 'red', label: 'Red', color: 'bg-red-500' },
    { id: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { id: 'green', label: 'Green', color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-bold">Filters</h3>
        <Button variant="outline" className="w-full">
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'price', 'brands', 'colors']}>
        <AccordionItem value="categories">
          <AccordionTrigger className="font-bold">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category.id}`} />
                  <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="font-bold">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 200]} max={500} step={1} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger className="font-bold">Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand.id}`} />
                  <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger className="font-bold">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <div key={color.id} className="flex flex-col items-center gap-1">
                  <button className={`h-8 w-8 rounded-full ${color.color}`} title={color.label} />
                  <span className="text-xs">{color.label}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
