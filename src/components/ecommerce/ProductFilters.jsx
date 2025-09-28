'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/core/button'
import { Card } from '@/components/core/card'
import { Input } from '@/components/core/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <Card className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {/* Search */}
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10' size={20} />
          <Input
            type='text'
            placeholder='Ürün ara...'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className='pl-10'
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder='Kategori seçin' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'Tüm Kategoriler' : category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder='Sıralama seçin' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='default'>Varsayılan Sıralama</SelectItem>
            <SelectItem value='name'>İsme Göre (A-Z)</SelectItem>
            <SelectItem value='price-low'>Fiyata Göre (Düşük → Yüksek)</SelectItem>
            <SelectItem value='price-high'>Fiyata Göre (Yüksek → Düşük)</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        <Button
          onClick={() => {
            onCategoryChange('all')
            onSortChange('default')
            onSearchChange('')
          }}
          variant='outline'
        >
          Filtreleri Temizle
        </Button>
      </div>
    </Card>
  )
}
