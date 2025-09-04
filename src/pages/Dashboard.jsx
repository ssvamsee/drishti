import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import useAuthStore from '../store/authStore';
import { ROLE_NAMES } from '../utils/constants';
import { getDashboardData, getUpcomingEvents } from '../utils/mockData';
import { 
  getTeacherDashboard, 
  getPrincipalDashboard, 
  getFinanceDashboard, 
  getParentDashboard, 
  getOrganizationDashboard, 
  getSuperadminDashboard 
} from '../utils/allRolesMockData';
import TeacherDashboard from '../components/RoleDashboards/TeacherDashboard';
import SuperadminDashboard from '../components/RoleDashboards/SuperadminDashboard';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [roleData, setRoleData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadRoleSpecificData();
  }, [user]);

  const loadRoleSpecificData = async () => {
    if (!user?.role) return;
    
    try {
      setLoading(true);
      let response;
      
      switch (user.role) {
        case 'teacher':
          response = await getTeacherDashboard(user.userId);
          break;
        case 'branch_principal':
          response = await getPrincipalDashboard(user.userId);
          break;
        case 'finance_admin':
          response = await getFinanceDashboard(user.userId);
          break;
        case 'parent':
          response = await getParentDashboard(user.userId);
          break;
        case 'organization_head':
          response = await getOrganizationDashboard(user.userId);
          break;
        case 'superadmin':
          response = await getSuperadminDashboard(user.userId);
          break;
        default:
          // Fallback to student data
          response = { data: getDashboardData(user.role, user.userId) };
      }
      
      setRoleData(response.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Get role-specific dashboard data
  const dashboardData = roleData || getDashboardData(user?.role, user?.userId);
  const upcomingEvents = getUpcomingEvents(user?.role);

  if (loading && user?.role !== 'student') {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  const StatCard = ({ stat, index }) => {
    const IconComponent = Icons[stat.icon] || Icons.Activity;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.change && (
                    <span className={`text-xs ${
                      stat.changeType === 'positive' 
                        ? 'text-green-600' 
                        : stat.changeType === 'negative' 
                        ? 'text-red-600' 
                        : 'text-muted-foreground'
                    }`}>
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <IconComponent className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const ActivityItem = ({ activity, index }) => {
    const getActivityIcon = (type) => {
      const iconMap = {
        organization: Icons.Building2,
        system: Icons.Server,
        report: Icons.FileText,
        branch: Icons.MapPin,
        finance: Icons.CreditCard,
        enrollment: Icons.UserPlus,
        academic: Icons.GraduationCap,
        staff: Icons.Users,
        meeting: Icons.Calendar,
        grading: Icons.Award,
        attendance: Icons.CheckSquare,
        exam: Icons.BookOpen,
        result: Icons.Trophy,
        assignment: Icons.FileText,
        payment: Icons.CreditCard,
        reminder: Icons.Bell,
        default: Icons.Activity,
      };
      return iconMap[type] || iconMap.default;
    };

    const IconComponent = getActivityIcon(activity.type);

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
      >
        <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
          <IconComponent className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            {activity.message}
          </p>
          <p className="text-xs text-muted-foreground">{activity.time}</p>
        </div>
      </motion.div>
    );
  };

  const EventCard = ({ event, index }) => {
    const getEventIcon = (type) => {
      const iconMap = {
        meeting: Icons.Users,
        event: Icons.Calendar,
        exam: Icons.FileText,
        assignment: Icons.BookOpen,
        default: Icons.Calendar,
      };
      return iconMap[type] || iconMap.default;
    };

    const IconComponent = getEventIcon(event.type);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors"
      >
        <div className={`p-2 rounded-full ${
          event.type === 'exam' ? 'bg-red-50 dark:bg-red-900/20' :
          event.type === 'meeting' ? 'bg-blue-50 dark:bg-blue-900/20' :
          event.type === 'assignment' ? 'bg-orange-50 dark:bg-orange-900/20' :
          'bg-green-50 dark:bg-green-900/20'
        }`}>
          <IconComponent className={`h-4 w-4 ${
            event.type === 'exam' ? 'text-red-600' :
            event.type === 'meeting' ? 'text-blue-600' :
            event.type === 'assignment' ? 'text-orange-600' :
            'text-green-600'
          }`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{event.title}</p>
          <p className="text-xs text-muted-foreground">
            {event.date} at {event.time}
          </p>
        </div>
      </motion.div>
    );
  };

  const renderRoleSpecificDashboard = () => {
    // Return role-specific dashboard components for enhanced roles
    if (roleData) {
      switch (user?.role) {
        case 'teacher':
          return <TeacherDashboard data={roleData} />;
        case 'branch_principal':
          // Will create this next
          return <div>Principal Dashboard Coming Soon</div>;
        case 'finance_admin':
          // Will create this next
          return <div>Finance Dashboard Coming Soon</div>;
        case 'parent':
          // Will create this next
          return <div>Parent Dashboard Coming Soon</div>;
        case 'organization_head':
          // Will create this next
          return <div>Organization Head Dashboard Coming Soon</div>;
        case 'superadmin':
          return <SuperadminDashboard data={roleData} />;
      }
    }

    // Fallback to generic dashboard for other roles
    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dashboardData.stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icons.Activity className="h-5 w-5" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dashboardData.recentActivities.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} index={index} />
                  ))}
                  {dashboardData.recentActivities.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icons.Inbox className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No recent activities</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icons.Calendar className="h-5 w-5" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 5).map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                  {upcomingEvents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icons.Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No upcoming events</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions Based on Role */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.Zap className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {user?.role === 'student' && (
                <>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Icons.BookOpen className="h-6 w-6" />
                    <span>View Assignments</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Icons.CreditCard className="h-6 w-6" />
                    <span>Pay Fees</span>
                  </Button>
                </>
              )}
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Icons.Bell className="h-6 w-6" />
                <span>Notifications</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.profile?.firstName || user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            {ROLE_NAMES[user?.role]} Dashboard - Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Icons.Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Icons.Plus className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </motion.div>

      {/* Role-specific Dashboard Content */}
      {renderRoleSpecificDashboard()}
    </div>
  );
};

export default Dashboard; 