import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Students = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground mt-1">
            Manage student information and enrollment
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Student Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Student Management System
            </h3>
            <p className="text-muted-foreground mb-4">
              This page will contain comprehensive student management features including:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-muted-foreground">
              <li>• Student registration and profiles</li>
              <li>• Search and filter functionality</li>
              <li>• Bulk import from Excel/CSV</li>
              <li>• Document management</li>
              <li>• Parent information tracking</li>
              <li>• Academic progress monitoring</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Students; 