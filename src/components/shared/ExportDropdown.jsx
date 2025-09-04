import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import * as XLSX from 'xlsx';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { toast } from 'sonner';

const ExportDropdown = ({ 
  data = [], 
  filename = 'export', 
  columns = [],
  className = '',
  variant = 'outline',
  size = 'sm',
  disabled = false,
  onExportStart,
  onExportComplete,
  onExportError
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Export formats
  const exportFormats = [
    {
      key: 'csv',
      label: 'CSV File',
      icon: Icons.FileText,
      description: 'Comma-separated values',
      extension: '.csv'
    },
    {
      key: 'excel',
      label: 'Excel File',
      icon: Icons.FileSpreadsheet,
      description: 'Microsoft Excel (.xlsx)',
      extension: '.xlsx'
    },
    {
      key: 'json',
      label: 'JSON File',
      icon: Icons.FileCode,
      description: 'JavaScript Object Notation',
      extension: '.json'
    }
  ];

  // Prepare data for export
  const prepareData = () => {
    if (!data || data.length === 0) {
      return [];
    }

    // If columns are provided, use them to filter and order data
    if (columns && columns.length > 0) {
      return data.map(item => {
        const exportItem = {};
        columns.forEach(column => {
          // Use column label as key, fallback to column key
          const key = column.label || column.key;
          let value = item[column.key];
          
          // Handle rendered values if column has render function
          if (column.render && typeof column.render === 'function') {
            // For export, we want plain text, not JSX
            const rendered = column.render(value, item);
            if (typeof rendered === 'string' || typeof rendered === 'number') {
              value = rendered;
            } else if (rendered && rendered.props && rendered.props.children) {
              // Extract text from JSX elements
              value = extractTextFromJSX(rendered);
            }
          }
          
          exportItem[key] = value;
        });
        return exportItem;
      });
    }

    return data;
  };

  // Extract text content from JSX elements
  const extractTextFromJSX = (element) => {
    if (typeof element === 'string' || typeof element === 'number') {
      return element;
    }
    
    if (element && element.props) {
      if (typeof element.props.children === 'string') {
        return element.props.children;
      }
      
      if (Array.isArray(element.props.children)) {
        return element.props.children
          .map(child => extractTextFromJSX(child))
          .join(' ');
      }
      
      return extractTextFromJSX(element.props.children);
    }
    
    return '';
  };

  // Convert data to CSV
  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => {
      return headers.map(header => {
        let value = row[header] || '';
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""');
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            value = `"${value}"`;
          }
        }
        return value;
      }).join(',');
    });

    return [csvHeaders, ...csvRows].join('\n');
  };

  // Convert data to Excel format using xlsx library
  const convertToExcel = (data) => {
    if (!data || data.length === 0) return null;

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    
    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { 
      bookType: 'xlsx', 
      type: 'array',
      compression: true 
    });
    
    return excelBuffer;
  };

  // Download file
  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle export
  const handleExport = async (format) => {
    if (isExporting || disabled) return;

    try {
      setIsExporting(true);
      onExportStart?.(format);

      const exportData = prepareData();
      
      if (!exportData || exportData.length === 0) {
        toast.error('No data available to export');
        return;
      }

      let content, mimeType, fileExtension;
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
      
      switch (format.key) {
        case 'csv':
          content = convertToCSV(exportData);
          mimeType = 'text/csv;charset=utf-8;';
          fileExtension = '.csv';
          break;
          
        case 'excel':
          content = convertToExcel(exportData);
          if (!content) {
            throw new Error('Failed to generate Excel file');
          }
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          fileExtension = '.xlsx';
          break;
          
        case 'json':
          content = JSON.stringify(exportData, null, 2);
          mimeType = 'application/json;charset=utf-8;';
          fileExtension = '.json';
          break;
          
        default:
          throw new Error(`Unsupported export format: ${format.key}`);
      }

      const fileName = `${filename}-${timestamp}${fileExtension}`;
      downloadFile(content, fileName, mimeType);
      
      toast.success(`${format.label} exported successfully!`);
      onExportComplete?.(format, fileName);
      
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`Failed to export ${format.label}`);
      onExportError?.(error, format);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isExporting}
        className="flex items-center space-x-2"
      >
        {isExporting ? (
          <Icons.Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Icons.Download className="h-4 w-4" />
        )}
        <span>Export</span>
        <Icons.ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50"
          >
            <div className="p-2">
              <div className="text-sm font-medium text-foreground px-3 py-2 border-b border-border">
                Export Options
              </div>
              
              <div className="py-1">
                {exportFormats.map((format) => {
                  const IconComponent = format.icon;
                  
                  return (
                    <button
                      key={format.key}
                      onClick={() => handleExport(format)}
                      disabled={isExporting}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{format.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {format.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {data && data.length > 0 && (
                <div className="text-xs text-muted-foreground px-3 py-2 border-t border-border">
                  {data.length} record{data.length !== 1 ? 's' : ''} available
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportDropdown;
