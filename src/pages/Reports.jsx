import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const Reports = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Generate comprehensive reports and analytics
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Reporting System</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Advanced Analytics & Reports
            </h3>
            <p className="text-muted-foreground">
              Comprehensive reporting and data visualization coming soon...
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Reports; 