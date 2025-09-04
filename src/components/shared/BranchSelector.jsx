import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

const BranchSelector = ({ 
  branches = [], 
  selectedBranches = [], 
  onSelectionChange,
  mode = 'single', // 'single', 'multiple', 'all'
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState(selectedBranches);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelection(selectedBranches);
  }, [selectedBranches]);

  // Handle click outside to close dropdown
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

  const handleBranchToggle = (branchId) => {
    if (mode === 'single') {
      const newSelection = [branchId];
      setSelection(newSelection);
      onSelectionChange?.(newSelection);
      setIsOpen(false);
    } else {
      const newSelection = selection.includes(branchId)
        ? selection.filter(id => id !== branchId)
        : [...selection, branchId];
      setSelection(newSelection);
      onSelectionChange?.(newSelection);
    }
  };

  const handleSelectAll = () => {
    if (selection.length === branches.length) {
      // Deselect all
      setSelection([]);
      onSelectionChange?.([]);
    } else {
      // Select all
      const allIds = branches.map(b => b.id);
      setSelection(allIds);
      onSelectionChange?.(allIds);
    }
  };

  const getDisplayText = () => {
    if (selection.length === 0) {
      return 'Select Branch(es)';
    }
    
    if (selection.length === 1) {
      const branch = branches.find(b => b.id === selection[0]);
      return branch?.name || 'Unknown Branch';
    }
    
    if (selection.length === branches.length) {
      return 'All Branches';
    }
    
    return `${selection.length} Branches Selected`;
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Selector Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-10 px-3"
      >
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{getDisplayText()}</span>
        </div>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform text-muted-foreground",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-3">
              {/* Select All Option (for multiple mode) */}
              {mode === 'multiple' && (
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 cursor-pointer mb-2 border-b">
                  <div 
                    className="flex items-center space-x-2 flex-1"
                    onClick={handleSelectAll}
                  >
                    <div className={cn(
                      "w-4 h-4 border-2 rounded flex items-center justify-center",
                      selection.length === branches.length 
                        ? "bg-primary border-primary" 
                        : selection.length > 0 
                          ? "bg-primary/20 border-primary" 
                          : "border-muted-foreground"
                    )}>
                      {selection.length === branches.length && (
                        <div className="w-2 h-2 bg-white rounded-sm" />
                      )}
                      {selection.length > 0 && selection.length < branches.length && (
                        <div className="w-2 h-1 bg-primary rounded-sm" />
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {selection.length === branches.length ? 'Deselect All' : 'Select All'}
                    </span>
                  </div>
                </div>
              )}

              {/* Branch Options */}
              <div className="space-y-1">
                {branches.map((branch) => {
                  const isSelected = selection.includes(branch.id);
                  
                  return (
                    <div
                      key={branch.id}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-colors",
                        isSelected 
                          ? "bg-primary/10 border border-primary/20" 
                          : "hover:bg-accent/50"
                      )}
                      onClick={() => handleBranchToggle(branch.id)}
                    >
                      {mode === 'multiple' && (
                        <div className={cn(
                          "w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0",
                          isSelected 
                            ? "bg-primary border-primary" 
                            : "border-muted-foreground"
                        )}>
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-sm" />
                          )}
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-foreground">
                          {branch.name}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Action Buttons */}
              {mode === 'multiple' && (
                <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Apply ({selection.length})
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BranchSelector;
