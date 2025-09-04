import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import useAuthStore from '../store/authStore';
import { ROLE_NAMES } from '../utils/constants';
import { getStudentMarks } from '../utils/studentMockData';
import { hasPermission, PERMISSIONS } from '../utils/permissions';

const Marks = () => {
  const { user } = useAuthStore();
  const [marksData, setMarksData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('current');

  useEffect(() => {
    if (user?.role === 'student') {
      loadStudentMarks();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadStudentMarks = async () => {
    try {
      setLoading(true);
      const response = await getStudentMarks();
      setMarksData(response.data);
    } catch (error) {
      console.error('Error loading marks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'A-':
      case 'B+':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'B':
      case 'B-':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'C+':
      case 'C':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
    }
  };

  const getPerformanceIcon = (percentage) => {
    if (percentage >= 90) return Icons.Trophy;
    if (percentage >= 80) return Icons.Award;
    if (percentage >= 70) return Icons.Star;
    if (percentage >= 60) return Icons.ThumbsUp;
    return Icons.AlertCircle;
  };

  // Student View
  const StudentMarksView = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading marks data...</span>
        </div>
      );
    }

    if (!marksData) return null;

    return (
      <div className="space-y-6">
        {/* Academic Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current GPA</p>
                  <p className="text-2xl font-bold text-primary">{marksData.currentAcademics.gpa}</p>
                  <p className="text-xs text-muted-foreground">Out of 4.0</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icons.TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Class Rank</p>
                  <p className="text-2xl font-bold text-green-600">#{marksData.currentAcademics.rank}</p>
                  <p className="text-xs text-muted-foreground">Out of {marksData.currentAcademics.totalStudents}</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                  <Icons.Trophy className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Grade</p>
                  <p className="text-2xl font-bold text-blue-600">{marksData.currentAcademics.overallGrade}</p>
                  <p className="text-xs text-muted-foreground">Current Performance</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <Icons.Award className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                  <p className="text-2xl font-bold text-purple-600">{marksData.currentAcademics.attendancePercentage}%</p>
                  <p className="text-xs text-muted-foreground">This Semester</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                  <Icons.CheckSquare className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={selectedTab === 'current' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('current')}
            className="rounded-md"
          >
            Current Subjects
          </Button>
          <Button
            variant={selectedTab === 'exams' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('exams')}
            className="rounded-md"
          >
            Exam Results
          </Button>
        </div>

        {/* Current Subjects */}
        {selectedTab === 'current' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {marksData.subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.currentGrade)}`}>
                        {subject.currentGrade}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Score</span>
                        <span className="font-medium">{subject.currentMarks}/{subject.maxMarks}</span>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(subject.currentMarks / subject.maxMarks) * 100}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Credits: {subject.credits}</span>
                        <span className="font-medium">{((subject.currentMarks / subject.maxMarks) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Exam Results */}
        {selectedTab === 'exams' && (
          <div className="space-y-6">
            {marksData.examResults.map((exam, index) => {
              const PerformanceIcon = getPerformanceIcon(exam.percentage);
              
              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <PerformanceIcon className="h-5 w-5 text-primary" />
                            <span>{exam.examName}</span>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(exam.date).toLocaleDateString()} • {exam.examType}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(exam.grade)}`}>
                            {exam.grade}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Rank #{exam.rank}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Overall Score */}
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">Overall Score</p>
                            <p className="text-sm text-muted-foreground">{exam.obtainedMarks} out of {exam.totalMarks}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{exam.percentage}%</p>
                          </div>
                        </div>

                        {/* Subject-wise Breakdown */}
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {exam.subjects.map((subject, subIndex) => (
                            <div
                              key={subIndex}
                              className="p-3 border border-border rounded-lg hover:bg-accent transition-colors"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{subject.name}</span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(subject.grade)}`}>
                                  {subject.grade}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{subject.obtainedMarks}/{subject.maxMarks}</span>
                                <span>{((subject.obtainedMarks / subject.maxMarks) * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Teacher/Admin View
  const TeacherMarksView = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.Award className="h-5 w-5" />
              <span>Marks & Grade Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icons.TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Grade Management System
              </h3>
              <p className="text-muted-foreground mb-4">
                Enter marks, generate report cards, and manage student grades.
              </p>
              <div className="flex justify-center space-x-4">
                <Button>
                  <Icons.Plus className="h-4 w-4 mr-2" />
                  Enter Marks
                </Button>
                <Button variant="outline">
                  <Icons.FileText className="h-4 w-4 mr-2" />
                  Generate Reports
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
          <h1 className="text-3xl font-bold text-foreground">Marks & Grades</h1>
          <p className="text-muted-foreground">
            {user?.role === 'student' 
              ? 'View your academic performance and exam results'
              : 'Manage student marks and generate academic reports'
            }
          </p>
        </div>
        
        {user?.role === 'student' && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icons.Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" size="sm">
              <Icons.Share className="h-4 w-4 mr-2" />
              Share Progress
            </Button>
          </div>
        )}
      </div>

      {/* Role-based Content */}
      {user?.role === 'student' ? (
        <StudentMarksView />
      ) : (
        <TeacherMarksView />
      )}
    </motion.div>
  );
};

export default Marks; 