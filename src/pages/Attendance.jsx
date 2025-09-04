import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import useAuthStore from '../store/authStore';
import { ROLE_NAMES } from '../utils/constants';
import { getStudentAttendance } from '../utils/studentMockData';
import { hasPermission, PERMISSIONS } from '../utils/permissions';
import AttendanceOrgHead from './orghead/AttendanceOrgHead';

const Attendance = () => {
  const { user } = useAuthStore();
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');

  useEffect(() => {
    if (user?.role === 'student') {
      loadStudentAttendance();
    } else {
      // For other roles, we'll add their specific attendance management later
      setLoading(false);
    }
  }, [user, selectedPeriod]);

  // Role-based component rendering
  if (user?.role === 'organization_head') {
    return <AttendanceOrgHead />;
  }

  const loadStudentAttendance = async () => {
    try {
      setLoading(true);
      const response = await getStudentAttendance(selectedPeriod);
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error loading attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'absent':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'late':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'excused':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'present':
        return Icons.CheckCircle;
      case 'absent':
        return Icons.XCircle;
      case 'late':
        return Icons.Clock;
      case 'excused':
        return Icons.Info;
      default:
        return Icons.HelpCircle;
    }
  };

  // Student View
  const StudentAttendanceView = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading attendance data...</span>
        </div>
      );
    }

    if (!attendanceData) return null;

    return (
      <div className="space-y-6">
        {/* Attendance Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Days</p>
                  <p className="text-2xl font-bold">{attendanceData.currentMonth.totalDays}</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <Icons.Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Present Days</p>
                  <p className="text-2xl font-bold text-green-600">{attendanceData.currentMonth.presentDays}</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                  <Icons.CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Absent Days</p>
                  <p className="text-2xl font-bold text-red-600">{attendanceData.currentMonth.absentDays}</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full">
                  <Icons.XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                  <p className="text-2xl font-bold text-primary">{attendanceData.currentMonth.percentage}%</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icons.TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icons.Clock className="h-5 w-5" />
                <span>Recent Attendance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceData.last30Days.map((record, index) => {
                  const StatusIcon = getAttendanceIcon(record.status);
                  return (
                    <motion.div
                      key={record.date}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${getAttendanceStatusColor(record.status)}`}>
                          <StatusIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground capitalize">{record.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {record.timeIn && (
                          <p className="text-sm font-medium">{record.timeIn}</p>
                        )}
                        {record.reason && (
                          <p className="text-xs text-muted-foreground">{record.reason}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icons.BarChart3 className="h-5 w-5" />
                <span>Monthly Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.monthlyTrend.map((month, index) => (
                  <motion.div
                    key={month.month}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{month.month}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${month.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{month.percentage}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Teacher/Admin View
  const TeacherAttendanceView = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.Users className="h-5 w-5" />
              <span>Class Attendance Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icons.CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Attendance Management
              </h3>
              <p className="text-muted-foreground mb-4">
                Mark attendance for your classes and view detailed reports.
              </p>
              <div className="flex justify-center space-x-4">
                <Button>
                  <Icons.Plus className="h-4 w-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button variant="outline">
                  <Icons.FileText className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">
            {user?.role === 'student' 
              ? 'Track your attendance and view detailed reports'
              : 'Manage student attendance and generate reports'
            }
          </p>
        </div>
        
        {user?.role === 'student' && (
          <div className="flex items-center space-x-2">
            <Button
              variant={selectedPeriod === 'current_month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('current_month')}
            >
              This Month
            </Button>
            <Button
              variant={selectedPeriod === 'last_3_months' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('last_3_months')}
            >
              Last 3 Months
            </Button>
          </div>
        )}
      </div>

      {/* Role-based Content */}
      {user?.role === 'student' ? (
        <StudentAttendanceView />
      ) : (
        <TeacherAttendanceView />
      )}
    </motion.div>
  );
};

export default Attendance; 