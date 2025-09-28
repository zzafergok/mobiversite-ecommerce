'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'

import {
  Filter,
  Search,
  Download,
  Settings,
  ChevronUp,
  RefreshCw,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/core/dropdown'
import { Badge } from '@/components/core/badge'
import { Input } from '@/components/core/input'
import { Button } from '@/components/core/button'
import { Checkbox } from '@/components/core/checkbox'
import { DataLoader } from '@/components/ui/EcommerceLoader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'

import { cn } from '@/lib/utils'

export function DataGrid({
  data,
  columns,
  loading = false,
  error = null,

  enablePagination = true,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],

  enableGlobalFilter = true,
  enableColumnFilters = true,
  globalFilterPlaceholder = 'Ara...',

  enableSorting = true,
  defaultSorting = [],

  enableRowSelection = false,
  enableMultiRowSelection = true,
  onRowSelectionChange,

  enableColumnVisibility = true,
  enableColumnResizing = false,

  enableExport = false,
  exportFormats = ['csv', 'excel'],
  onExport,

  enableVirtualization = false,
  rowHeight = 50,
  maxHeight = 600,

  className,
  striped = true,
  bordered = true,
  hover = true,

  onRowClick,
  onRowDoubleClick,
  onRefresh,

  enableGrouping: _enableGrouping = false,
  enableExpanding: _enableExpanding = false,
  enablePinning: _enablePinning = false,
}) {
  // State management
  const [sorting, setSorting] = useState(defaultSorting)
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  })

  // Refs for virtualization
  const tableContainerRef = useRef(null)

  // Table configuration
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination: enablePagination ? pagination : undefined,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: enablePagination ? setPagination : undefined,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,

    enableRowSelection: enableRowSelection,
    enableMultiRowSelection: enableMultiRowSelection,
    enableSorting: enableSorting,
    enableColumnFilters: enableColumnFilters,
    enableGlobalFilter: enableGlobalFilter,
  })

  // Selection change handler
  useEffect(() => {
    if (onRowSelectionChange && enableRowSelection) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original)
      onRowSelectionChange(selectedRows)
    }
  }, [rowSelection, onRowSelectionChange, enableRowSelection, table])

  // Export handlers
  const handleExport = useCallback(
    (format) => {
      if (onExport) {
        const selectedRows = table.getFilteredSelectedRowModel().rows
        const exportData =
          selectedRows.length > 0
            ? selectedRows.map((row) => row.original)
            : table.getFilteredRowModel().rows.map((row) => row.original)
        onExport(format, exportData)
      }
    },
    [onExport, table],
  )

  // Loading state
  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <DataLoader size='lg' />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='flex items-center justify-center p-8 text-red-600 dark:text-red-400'>
        <div className='text-center'>
          <p className='mb-4'>{error}</p>
          {onRefresh && (
            <Button onClick={onRefresh} variant='outline' size='sm'>
              <RefreshCw className='w-4 h-4 mr-2' />
              Tekrar Dene
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Toolbar */}
      <div className='flex items-center justify-between gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
        {/* Left section - Search and filters */}
        <div className='flex items-center gap-2 flex-1'>
          {enableGlobalFilter && (
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400' />
              <Input
                placeholder={globalFilterPlaceholder}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className='pl-10 w-64'
              />
            </div>
          )}

          {enableColumnFilters && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <Filter className='w-4 h-4 mr-2' />
                  Filtreler
                  {columnFilters.length > 0 && (
                    <Badge variant='secondary' className='ml-2'>
                      {columnFilters.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='w-48'>
                <DropdownMenuLabel>Sütun Filtreleri</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanFilter())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Right section - Actions */}
        <div className='flex items-center gap-2'>
          {enableRowSelection && (
            <div className='text-sm text-neutral-600 dark:text-neutral-400'>
              {table.getFilteredSelectedRowModel().rows.length} / {table.getFilteredRowModel().rows.length} seçili
            </div>
          )}

          {onRefresh && (
            <Button variant='outline' size='sm' onClick={onRefresh}>
              <RefreshCw className='w-4 h-4' />
            </Button>
          )}

          {enableExport && exportFormats.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <Download className='w-4 h-4 mr-2' />
                  Dışa Aktar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {exportFormats.map((format) => (
                  <DropdownMenuItem key={format} onClick={() => handleExport(format)}>
                    {format.toUpperCase()}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <Settings className='w-4 h-4 mr-2' />
                  Sütunlar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuLabel>Sütun Görünürlüğü</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div
        ref={tableContainerRef}
        className={cn(
          'relative border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden',
          enableVirtualization && `max-h-[${maxHeight}px]`,
        )}
        style={enableVirtualization ? { maxHeight: `${maxHeight}px` } : {}}
      >
        <div className='overflow-auto'>
          <table className='w-full'>
            {/* Header */}
            <thead className='bg-neutral-50 dark:bg-neutral-800 sticky top-0 z-10'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className={cn(bordered && 'border-b border-neutral-200 dark:border-neutral-700')}
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 text-left text-sm font-medium text-neutral-900 dark:text-neutral-100',
                        header.column.getCanSort() && 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700',
                        enableColumnResizing && header.column.getCanResize() && 'resize-x',
                      )}
                      style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className='flex items-center gap-2'>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className='ml-auto'>
                            {{
                              asc: <ChevronUp className='w-4 h-4' />,
                              desc: <ChevronDown className='w-4 h-4' />,
                            }[header.column.getIsSorted()] ?? (
                              <div className='w-4 h-4 opacity-0 group-hover:opacity-50'>
                                <ChevronDown className='w-4 h-4' />
                              </div>
                            )}
                          </span>
                        )}
                      </div>

                      {/* Column Resizer */}
                      {enableColumnResizing && header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className='absolute right-0 top-0 h-full w-1 bg-neutral-300 dark:bg-neutral-600 cursor-col-resize opacity-0 hover:opacity-100'
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Body */}
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    'transition-colors',
                    striped && index % 2 === 0 && 'bg-neutral-50/50 dark:bg-neutral-800/50',
                    hover && 'hover:bg-neutral-100 dark:hover:bg-neutral-700',
                    bordered && 'border-b border-neutral-200 dark:border-neutral-700',
                    row.getIsSelected() && 'bg-primary-50 dark:bg-primary-900/20',
                    onRowClick && 'cursor-pointer',
                  )}
                  onClick={() => onRowClick?.(row.original, index)}
                  onDoubleClick={() => onRowDoubleClick?.(row.original, index)}
                  style={enableVirtualization ? { height: `${rowHeight}px` } : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className='px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100'
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {table.getRowModel().rows.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-neutral-500 dark:text-neutral-400'>Veri bulunamadı</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className='flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg'>
          {/* Page size selector */}
          <div className='flex items-center gap-2'>
            <span className='text-sm text-neutral-600 dark:text-neutral-400'>Sayfa başına:</span>
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className='w-20 h-8'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page info */}
          <div className='text-sm text-neutral-600 dark:text-neutral-400'>
            Sayfa {table.getState().pagination.pageIndex + 1} / {table.getPageCount()} (Toplam{' '}
            {table.getFilteredRowModel().rows.length} kayıt)
          </div>

          {/* Navigation */}
          <div className='flex items-center gap-1'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className='h-8 w-8 p-0'
            >
              <ChevronsLeft className='w-4 h-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='h-8 w-8 p-0'
            >
              <ChevronLeft className='w-4 h-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='h-8 w-8 p-0'
            >
              <ChevronRight className='w-4 h-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className='h-8 w-8 p-0'
            >
              <ChevronsRight className='w-4 h-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function for creating selection column
export function createSelectionColumn() {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Tümünü seç'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Satırı seç'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}

// Helper function for creating actions column
export function createActionsColumn(actions) {
  return {
    id: 'actions',
    header: 'İşlemler',
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || 'ghost'}
            size='sm'
            onClick={() => action.onClick(row.original)}
            className='h-8 px-2'
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }
}
