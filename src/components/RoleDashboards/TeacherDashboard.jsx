import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const TeacherDashboard = ({ data }) => {
  if (!data) return null;

  const { profile, classes, students, assignments, exams, todaySchedule } = data;

  const stats = [
    {
      title: 'My Classes',
      value: classes?.length || 0,
      change: '+1',
      changeType: 'positive',
      icon: 'BookOpen',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Total Students',
      value: classes?.reduce((total, cls) => total + cls.totalStudents, 0) || 0,
      change: '+5',
      changeType: 'positive',
      icon: 'Users',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Pending Assignments',
      value: assignments?.filter(a => a.status === 'active').length || 0,
      change: '-2',
      changeType: 'positive',
      icon: 'FileText',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Today\'s Classes',
      value: todaySchedule?.length || 0,
      change: '0',
      changeType: 'neutral',
      icon: 'Calendar',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

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
                  {stat.change && stat.change !== '0' && (
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

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.Clock className="h-5 w-5" />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule?.map((schedule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icons.BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{schedule.class}</p>
                      <p className="text-sm text-muted-foreground">{schedule.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{schedule.time}</p>
                    <p className="text-xs text-muted-foreground">Room {schedule.room}</p>
                  </div>
                </motion.div>
              )) || (
                <div className="text-center py-8 text-muted-foreground">
                  <Icons.Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No classes scheduled for today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.Users className="h-5 w-5" />
              <span>My Classes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classes?.map((classItem, index) => (
                <motion.div
                  key={classItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{classItem.name}</h4>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      {classItem.subject}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{classItem.totalStudents} students</span>
                    <span>{classItem.presentToday} present today</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(classItem.presentToday / classItem.totalStudents) * 100}%` }}
                    />
                  </div>
                </motion.div>
              )) || (
                <div className="text-center py-8 text-muted-foreground">
                  <Icons.BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No classes assigned</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.FileText className="h-5 w-5" />
              <span>Recent Assignments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assignments?.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{assignment.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {assignment.class} • {assignment.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">
                        {assignment.totalSubmissions - assignment.pendingSubmissions}/{assignment.totalSubmissions}
                      </p>
                      <p className="text-xs text-muted-foreground">submitted</p>
                    </div>
                  </div>
                </motion.div>
              )) || (
                <div className="text-center py-8 text-muted-foreground">
                  <Icons.FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No assignments created</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.Zap className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Icons.CheckSquare className="h-6 w-6" />
              <span>Mark Attendance</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Icons.Plus className="h-6 w-6" />
              <span>Create Assignment</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Icons.Award className="h-6 w-6" />
              <span>Enter Grades</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Icons.MessageCircle className="h-6 w-6" />
              <span>Message Parents</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard; 