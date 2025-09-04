import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import useAuthStore from '../store/authStore';
import { ROLE_NAMES } from '../utils/constants';
import { getStudentProfile, STUDENT_MOCK_DATA } from '../utils/studentMockData';

const StudentProfile = () => {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadStudentProfile();
  }, []);

  const loadStudentProfile = async () => {
    try {
      setLoading(true);
      const response = await getStudentProfile();
      setProfileData(response.data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  if (!profileData) return null;

  const PersonalInfo = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">First Name</label>
                <Input value={profileData.firstName} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                <Input value={profileData.lastName} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <Input value={profileData.email} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <Input value={profileData.phone} disabled={!isEditing} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                <Input value={profileData.dateOfBirth} disabled={!isEditing} type="date" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
                <Input value={profileData.bloodGroup} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <Input value={profileData.gender} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                <Input value={profileData.studentId} disabled />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.MapPin className="h-5 w-5" />
            <span>Address</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Street Address</label>
              <Input value={profileData.address.street} disabled={!isEditing} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">City</label>
              <Input value={profileData.address.city} disabled={!isEditing} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">State</label>
              <Input value={profileData.address.state} disabled={!isEditing} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">ZIP Code</label>
              <Input value={profileData.address.zipCode} disabled={!isEditing} />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Country</label>
              <Input value={profileData.address.country} disabled={!isEditing} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guardian Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.Users className="h-5 w-5" />
            <span>Guardian Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Father */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Father's Details</h4>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <Input value={profileData.guardian.father.name} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <Input value={profileData.guardian.father.phone} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input value={profileData.guardian.father.email} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Occupation</label>
                <Input value={profileData.guardian.father.occupation} disabled={!isEditing} />
              </div>
            </div>

            {/* Mother */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Mother's Details</h4>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <Input value={profileData.guardian.mother.name} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <Input value={profileData.guardian.mother.phone} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input value={profileData.guardian.mother.email} disabled={!isEditing} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Occupation</label>
                <Input value={profileData.guardian.mother.occupation} disabled={!isEditing} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AcademicInfo = () => (
    <div className="space-y-6">
      {/* Academic Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.GraduationCap className="h-5 w-5" />
            <span>Academic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Admission Number</label>
              <Input value={profileData.admissionNumber} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Roll Number</label>
              <Input value={profileData.rollNumber} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
              <Input value={profileData.academicYear} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Class</label>
              <Input value={profileData.class.name} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Section</label>
              <Input value={profileData.class.section} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Class Teacher</label>
              <Input value={profileData.class.classTeacher} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Admission Date</label>
              <Input value={profileData.admissionDate} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profileData.status === 'active' 
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'text-red-600 bg-red-50 dark:bg-red-900/20'
                }`}>
                  {profileData.status.charAt(0).toUpperCase() + profileData.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Subjects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.BookOpen className="h-5 w-5" />
            <span>Current Subjects</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {STUDENT_MOCK_DATA.subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{subject.name}</h4>
                  <span className="text-sm text-muted-foreground">{subject.code}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Teacher: {subject.teacher}</p>
                <p className="text-sm text-muted-foreground">Credits: {subject.credits}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Achievements = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.Trophy className="h-5 w-5" />
            <span>Achievements & Awards</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {STUDENT_MOCK_DATA.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icons.Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span>{new Date(achievement.date).toLocaleDateString()}</span>
                    <span className="capitalize">{achievement.type}</span>
                    <span className="capitalize">{achievement.level}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Library Books */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.Book className="h-5 w-5" />
            <span>Library Books</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {STUDENT_MOCK_DATA.library.booksIssued.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{book.title}</h4>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                  <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Due: {new Date(book.dueDate).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">Renewed: {book.renewCount} times</p>
                </div>
              </motion.div>
            ))}
            
            {STUDENT_MOCK_DATA.library.finesDue > 0 && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icons.AlertTriangle className="h-5 w-5 text-red-600" />
                  <p className="font-medium text-red-600">Outstanding Fine: ${STUDENT_MOCK_DATA.library.finesDue}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icons.User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="text-muted-foreground">
              {profileData.class.name} - {profileData.class.section} • Roll No: {profileData.rollNumber}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Icons.Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Icons.Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={selectedTab === 'personal' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedTab('personal')}
          className="rounded-md"
        >
          <Icons.User className="h-4 w-4 mr-2" />
          Personal Info
        </Button>
        <Button
          variant={selectedTab === 'academic' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedTab('academic')}
          className="rounded-md"
        >
          <Icons.GraduationCap className="h-4 w-4 mr-2" />
          Academic Info
        </Button>
        <Button
          variant={selectedTab === 'achievements' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedTab('achievements')}
          className="rounded-md"
        >
          <Icons.Trophy className="h-4 w-4 mr-2" />
          Achievements
        </Button>
      </div>

      {/* Tab Content */}
      {selectedTab === 'personal' && <PersonalInfo />}
      {selectedTab === 'academic' && <AcademicInfo />}
      {selectedTab === 'achievements' && <Achievements />}
    </motion.div>
  );
};

export default StudentProfile; 