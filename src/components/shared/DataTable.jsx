import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ActionDropdown } from '../ui/DropdownMenu';
import Pagination from '../ui/Pagination';

const DataTable = ({ 
  title, 
  data = [], 
  columns = [], 
  actions = [],
  searchable = false,
  icon: IconComponent = Icons.Table,
  loading = false,
  onAdd,
  addButtonText = "Add New",
  paginated = true,
  defaultItemsPerPage = 5,
  showPaginationInfo = true,
  showItemsPerPageSelector = true,
  showHeader = false,
  searchTerm = '',
  onSearchChange
}) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // Use external search term if provided, otherwise use empty string
  const activeSearchTerm = searchTerm || '';

  // Filter data based on search term
  const filteredData = searchable && activeSearchTerm ? data.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(activeSearchTerm.toLowerCase())
    )
  ) : data;

  // Sort data
  const sortedData = sortField
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (typeof aVal === 'string') {
          return sortDirection === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        return sortDirection === 'asc' 
          ? aVal - bVal 
          : bVal - aVal;
      })
    : filteredData;

  // Pagination calculations
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = paginated ? sortedData.slice(startIndex, endIndex) : sortedData;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage, newCurrentPage = 1) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(newCurrentPage);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return Icons.ArrowUpDown;
    return sortDirection === 'asc' ? Icons.ArrowUp : Icons.ArrowDown;
  };

  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <IconComponent className="h-5 w-5" />
              <span>{title}</span>
              {!loading && (
                <span className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded">
                  {totalItems} items
                </span>
              )}
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              {onAdd && (
                <Button onClick={onAdd}>
                  <Icons.Plus className="h-4 w-4 mr-2" />
                  {addButtonText}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      )}
      
      <CardContent className={showHeader ? '' : 'pt-6'}>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading data...</span>
          </div>
        ) : totalItems === 0 ? (
          <div className="text-center py-12">
            <IconComponent className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-base font-medium text-foreground mb-2">No data found</h3>
            <p className="text-sm text-muted-foreground">
              {activeSearchTerm ? 'No items match your search criteria.' : 'No items to display.'}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {columns.map((column) => {
                      const SortIcon = getSortIcon(column.key);
                      
                      return (
                        <th 
                          key={column.key}
                          className={`text-left py-3 px-4 text-sm font-medium text-muted-foreground ${
                            column.sortable ? 'cursor-pointer hover:text-foreground' : ''
                          }`}
                          onClick={() => column.sortable && handleSort(column.key)}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{column.label}</span>
                            {column.sortable && (
                              <SortIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                      );
                    })}
                    {actions.length > 0 && (
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                
                <tbody>
                  {paginatedData.map((item, index) => (
                    <motion.tr
                      key={item.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border hover:bg-accent transition-colors"
                    >
                      {columns.map((column) => (
                        <td key={column.key} className="py-3 px-4 text-sm">
                          {column.render 
                            ? column.render(item[column.key], item)
                            : item[column.key]
                          }
                        </td>
                      ))}
                      
                      {actions.length > 0 && (
                        <td className="py-3 px-4 text-sm">
                          <div className="flex justify-end">
                            <ActionDropdown actions={actions} item={item} />
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {paginated && totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  showItemsPerPage={showItemsPerPageSelector}
                  showTotalItems={showPaginationInfo}
                  size="default"
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable; 