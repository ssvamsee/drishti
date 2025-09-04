import React, { useState } from 'react';
import Pagination from '../ui/Pagination';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

/**
 * Example component demonstrating standalone Pagination usage
 * This is for reference - not used in the main application
 */
const PaginationExample = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock data
  const totalItems = 247;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  const handleItemsPerPageChange = (newItemsPerPage, newCurrentPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(newCurrentPage);
    console.log('Items per page changed to:', newItemsPerPage, 'Current page:', newCurrentPage);
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Pagination Component Examples</h2>
      
      {/* Default Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Default Pagination</CardTitle>
        </CardHeader>
        <CardContent>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </CardContent>
      </Card>

      {/* Small Size Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Small Size Pagination</CardTitle>
        </CardHeader>
        <CardContent>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            size="sm"
          />
        </CardContent>
      </Card>

      {/* Large Size Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Large Size Pagination</CardTitle>
        </CardHeader>
        <CardContent>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            size="lg"
          />
        </CardContent>
      </Card>

      {/* Minimal Pagination (no first/last, no items per page) */}
      <Card>
        <CardHeader>
          <CardTitle>Minimal Pagination</CardTitle>
        </CardHeader>
        <CardContent>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            showFirstLast={false}
            showItemsPerPage={false}
            showTotalItems={false}
          />
        </CardContent>
      </Card>

      {/* Current State Display */}
      <Card>
        <CardHeader>
          <CardTitle>Current State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Current Page:</strong> {currentPage}</p>
            <p><strong>Items Per Page:</strong> {itemsPerPage}</p>
            <p><strong>Total Items:</strong> {totalItems}</p>
            <p><strong>Total Pages:</strong> {totalPages}</p>
            <p><strong>Showing Items:</strong> {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaginationExample; 