import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import useAuthStore from '../store/authStore';
import { ROLE_NAMES } from '../utils/constants';
import { getStudentAssignments, STUDENT_MOCK_DATA } from '../utils/studentMockData';

const Assignments = () => {
  const { user } = useAuthStore();
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'student') {
      loadStudentAssignments();
    } else {
      setLoading(false);
    }
  }, [user, selectedFilter]);

  const loadStudentAssignments = async () => {
    try {
      setLoading(true);
      const response = await getStudentAssignments(selectedFilter);
      setAssignmentsData(response.data);
    } catch (error) {
      console.error('Error loading assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'not_started':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'overdue':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return Icons.CheckCircle;
      case 'pending':
        return Icons.Clock;
      case 'in_progress':
        return Icons.Edit;
      case 'not_started':
        return Icons.Circle;
      case 'overdue':
        return Icons.AlertTriangle;
      default:
        return Icons.HelpCircle;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'homework':
        return Icons.BookOpen;
      case 'lab_report':
        return Icons.FlaskConical;
      case 'essay':
        return Icons.PenTool;
      case 'project':
        return Icons.FolderOpen;
      case 'quiz':
        return Icons.HelpCircle;
      default:
        return Icons.FileText;
    }
  };

  const isOverdue = (dueDate, status) => {
    return new Date(dueDate) < new Date() && status !== 'submitted';
  };

  // Student View
  const StudentAssignmentsView = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading assignments...</span>
        </div>
      );
    }

    const stats = {
      total: STUDENT_MOCK_DATA.assignments.length,
      pending: STUDENT_MOCK_DATA.assignments.filter(a => a.status === 'pending').length,
      submitted: STUDENT_MOCK_DATA.assignments.filter(a => a.status === 'submitted').length,
      overdue: STUDENT_MOCK_DATA.assignments.filter(a => isOverdue(a.dueDate, a.status)).length,
    };

    return (
      <div className="space-y-6">
        {/* Assignment Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Assignments</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <Icons.FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                  <p className="text-2xl font-bold text-green-600">{stats.submitted}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full">
                  <Icons.Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full">
                  <Icons.AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignmentsData.map((assignment, index) => {
            const StatusIcon = getStatusIcon(assignment.status);
            const TypeIcon = getTypeIcon(assignment.type);
            const overdue = isOverdue(assignment.dueDate, assignment.status);
            const actualStatus = overdue ? 'overdue' : assignment.status;
            
            return (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(actualStatus)}`}>
                              {actualStatus.replace('_', ' ').charAt(0).toUpperCase() + actualStatus.replace('_', ' ').slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Icons.BookOpen className="h-4 w-4" />
                              <span>{assignment.subject}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icons.User className="h-4 w-4" />
                              <span>{assignment.teacherName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icons.Calendar className="h-4 w-4" />
                              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                              {overdue && <Icons.AlertTriangle className="h-4 w-4 text-red-600" />}
                            </div>
                          </div>
                          
                          {assignment.description && (
                            <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm">
                              {assignment.maxMarks && (
                                <span className="text-muted-foreground">Max Marks: {assignment.maxMarks}</span>
                              )}
                              {assignment.submittedDate && (
                                <span className="text-green-600">
                                  Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {assignment.status === 'submitted' && assignment.obtainedMarks !== undefined ? (
                                <div className="text-right">
                                  <p className="text-lg font-bold text-primary">
                                    {assignment.obtainedMarks}/{assignment.maxMarks}
                                  </p>
                                  <p className="text-sm text-muted-foreground">Grade: {assignment.grade}</p>
                                </div>
                              ) : assignment.status !== 'submitted' ? (
                                <Button size="sm">
                                  {assignment.status === 'not_started' ? (
                                    <>
                                      <Icons.Play className="h-4 w-4 mr-2" />
                                      Start Assignment
                                    </>
                                  ) : (
                                    <>
                                      <Icons.Edit className="h-4 w-4 mr-2" />
                                      Continue
                                    </>
                                  )}
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm">
                                  <Icons.Eye className="h-4 w-4 mr-2" />
                                  View Submission
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {assignment.feedback && (
                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm font-medium text-foreground mb-1">Teacher Feedback:</p>
                              <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {assignmentsData.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Icons.FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No assignments found</h3>
              <p className="text-muted-foreground">
                {selectedFilter === 'all' 
                  ? 'You have no assignments at the moment.'
                  : `No assignments with status "${selectedFilter}".`
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Teacher View
  const TeacherAssignmentsView = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.FileText className="h-5 w-5" />
              <span>Assignment Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icons.PlusCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Assignment Management System
              </h3>
              <p className="text-muted-foreground mb-4">
                Create assignments, review submissions, and provide feedback to students.
              </p>
              <div className="flex justify-center space-x-4">
                <Button>
                  <Icons.Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
                <Button variant="outline">
                  <Icons.FileText className="h-4 w-4 mr-2" />
                  Review Submissions
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
          <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground">
            {user?.role === 'student' 
              ? 'View and manage your assignments and homework'
              : 'Create and manage student assignments'
            }
          </p>
        </div>
        
        {user?.role === 'student' && (
          <div className="flex items-center space-x-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
            >
              All
            </Button>
            <Button
              variant={selectedFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('pending')}
            >
              Pending
            </Button>
            <Button
              variant={selectedFilter === 'submitted' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('submitted')}
            >
              Submitted
            </Button>
            <Button
              variant={selectedFilter === 'in_progress' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('in_progress')}
            >
              In Progress
            </Button>
          </div>
        )}
      </div>

      {/* Role-based Content */}
      {user?.role === 'student' ? (
        <StudentAssignmentsView />
      ) : (
        <TeacherAssignmentsView />
      )}
    </motion.div>
  );
};

export default Assignments; 