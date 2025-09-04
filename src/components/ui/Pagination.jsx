import React, { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showTotalItems = true,
  showFirstLast = true,
  className = '',
  size = 'default' // 'sm', 'default', 'lg'
}) => {
  const pageOptions = [5, 10, 20, 50, 100];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const sizeClasses = {
    sm: {
      button: 'h-8 w-8 text-xs',
      select: 'h-8 text-xs px-2',
      text: 'text-xs'
    },
    default: {
      button: 'h-10 w-10 text-sm',
      select: 'h-10 text-sm px-3',
      text: 'text-sm'
    },
    lg: {
      button: 'h-12 w-12 text-base',
      select: 'h-12 text-base px-4',
      text: 'text-base'
    }
  };

  const currentSizeClasses = sizeClasses[size];

  // Calculate range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Maximum visible page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end pages
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      // Adjust start if we're near the end
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      // Add ellipsis and first page if needed
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis and last page if needed
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    const newTotalPages = Math.ceil(totalItems / newItemsPerPage);
    const newCurrentPage = Math.min(currentPage, newTotalPages);
    
    onItemsPerPageChange?.(newItemsPerPage, newCurrentPage);
    setIsDropdownOpen(false);
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  if (totalItems < 5 && !showTotalItems && !showItemsPerPage) {
    return null;
  }

  return (
    <div className={cn(
      'flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0',
      className
    )}>
      {/* Items info and per-page selector */}
      <div className="flex items-center space-x-4">
        {showTotalItems && (
          <div className={cn('text-muted-foreground', currentSizeClasses.text)}>
            {totalItems > 0 ? (
              <>
                Showing <span className="font-medium text-foreground">{startItem}</span> to{' '}
                <span className="font-medium text-foreground">{endItem}</span> of{' '}
                <span className="font-medium text-foreground">{totalItems}</span> results
              </>
            ) : (
              'No results found'
            )}
          </div>
        )}
        
        {showItemsPerPage && totalItems > 0 && (
          <div className="flex items-center space-x-2">
            <label className={cn('text-muted-foreground', currentSizeClasses.text)}>
              Show:
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={cn(
                  'flex items-center justify-between rounded-md border border-border bg-card text-card-foreground ring-offset-background',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  'hover:bg-accent hover:text-accent-foreground transition-colors',
                  currentSizeClasses.select
                )}
              >
                <span>{itemsPerPage}</span>
                <Icons.ChevronDown className={cn(
                  "h-4 w-4 ml-2 transition-transform duration-200",
                  isDropdownOpen && "rotate-180"
                )} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-1 w-full bg-card border border-border rounded-md shadow-lg z-50">
                  {pageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleItemsPerPageChange(option)}
                      className={cn(
                        'w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-md last:rounded-b-md',
                        option === itemsPerPage && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className={cn('text-muted-foreground', currentSizeClasses.text)}>
              per page
            </span>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {totalItems >= 5 && (
        <div className="flex items-center space-x-1">
          {/* First page */}
          {showFirstLast && totalPages > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageClick(1)}
              disabled={currentPage === 1}
              className={currentSizeClasses.button}
              aria-label="Go to first page"
            >
              <Icons.ChevronsLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Previous page */}
          {totalPages > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className={currentSizeClasses.button}
              aria-label="Go to previous page"
            >
              <Icons.ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Page numbers */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              {pageNumbers.map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <div className={cn(
                      'flex items-center justify-center text-muted-foreground',
                      currentSizeClasses.button
                    )}>
                      <Icons.MoreHorizontal className="h-4 w-4" />
                    </div>
                  ) : (
                    <Button
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => handlePageClick(page)}
                      className={cn(
                        currentSizeClasses.button,
                        page === currentPage && 'font-semibold'
                      )}
                      aria-label={`Go to page ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Next page */}
          {totalPages > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={currentSizeClasses.button}
              aria-label="Go to next page"
            >
              <Icons.ChevronRight className="h-4 w-4" />
            </Button>
          )}

          {/* Last page */}
          {showFirstLast && totalPages > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageClick(totalPages)}
              disabled={currentPage === totalPages}
              className={currentSizeClasses.button}
              aria-label="Go to last page"
            >
              <Icons.ChevronsRight className="h-4 w-4" />
            </Button>
          )}

          {/* Show page info when single page */}
          {totalPages === 1 && (
            <div className={cn('text-muted-foreground', currentSizeClasses.text)}>
              Page 1 of 1
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination; 