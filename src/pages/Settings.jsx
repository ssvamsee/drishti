import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Switch } from '../components/ui/Switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';
import { USER_ROLES } from '../utils/constants';
import { hasPermission, PERMISSIONS } from '../utils/permissions';

// Form schemas
const profileSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const organizationSchema = yup.object({
  name: yup.string().required('Organization name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  website: yup.string().url('Invalid URL'),
});

const Settings = () => {
  const { user, updateUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  
  // Settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    systemAlerts: true,
    maintenanceUpdates: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    showEmail: false,
    showPhone: false,
    allowDataExport: true,
    enableTwoFactor: false,
  });

  const [systemSettings, setSystemSettings] = useState({
    autoLogout: 30, // minutes
    sessionTimeout: 120, // minutes
    defaultLanguage: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
  });

  // Form configurations
  const profileForm = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.profile?.firstName || '',
      lastName: user?.profile?.lastName || '',
      email: user?.email || '',
      phone: user?.profile?.phone || '',
    },
  });

  const passwordForm = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const organizationForm = useForm({
    resolver: yupResolver(organizationSchema),
    defaultValues: {
      name: 'ABC School Group',
      email: 'admin@abcschool.edu',
      phone: '+1-555-0123',
      address: '123 Education Street, Learning City, LC 12345',
      website: 'https://abcschool.edu',
    },
  });

  // Available tabs based on user role
  const getAvailableTabs = () => {
    const baseTabs = [
      { id: 'profile', label: 'Profile', icon: 'User' },
      { id: 'security', label: 'Security', icon: 'Shield' },
      { id: 'notifications', label: 'Notifications', icon: 'Bell' },
      { id: 'preferences', label: 'Preferences', icon: 'Settings' },
    ];

    const roleTabs = [];
    
    if (hasPermission(user?.role, PERMISSIONS.MANAGE_ORGANIZATIONS)) {
      roleTabs.push({ id: 'organization', label: 'Organization', icon: 'Building2' });
    }
    
    if (hasPermission(user?.role, PERMISSIONS.MANAGE_SETTINGS)) {
      roleTabs.push({ id: 'system', label: 'System', icon: 'Server' });
    }

    return [...baseTabs, ...roleTabs];
  };

  // Handle form submissions
  const onProfileSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser({
        email: data.email,
        profile: {
          ...user.profile,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        },
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully');
      passwordForm.reset();
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const onOrganizationSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Organization settings updated successfully');
    } catch (error) {
      toast.error('Failed to update organization settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value,
    }));
    toast.success('Notification settings updated');
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value,
    }));
    toast.success('Privacy settings updated');
  };

  const handleSystemChange = (key, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value,
    }));
    toast.success('System settings updated');
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  const exportData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Data export initiated. You will receive an email when ready.');
    } catch (error) {
      toast.error('Failed to export data');
    } finally {
      setIsLoading(false);
    }
  };

  const availableTabs = getAvailableTabs();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="pb-4">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 gap-1">
              {availableTabs.map((tab) => {
                const IconComponent = Icons[tab.icon];
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icons.User className="h-5 w-5 mr-2" />
                  Profile Information
                </h3>
                
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...profileForm.register('firstName')}
                        error={profileForm.formState.errors.firstName?.message}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...profileForm.register('lastName')}
                        error={profileForm.formState.errors.lastName?.message}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...profileForm.register('email')}
                      error={profileForm.formState.errors.email?.message}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...profileForm.register('phone')}
                      error={profileForm.formState.errors.phone?.message}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      Role: {user?.role?.replace('_', ' ').toUpperCase()}
                    </Badge>
                    {user?.tenantId && (
                      <Badge variant="outline">
                        Tenant: {user.tenantId}
                      </Badge>
                    )}
                    {user?.branchId && (
                      <Badge variant="outline">
                        Branch: {user.branchId}
                      </Badge>
                    )}
                  </div>
                  
                  <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                    {isLoading ? <Icons.Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Icons.Save className="h-4 w-4 mr-2" />}
                    Update Profile
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icons.Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </h3>
                
                {/* Change Password */}
                <div className="bg-muted/20 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-foreground mb-3">Change Password</h4>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        {...passwordForm.register('currentPassword')}
                        error={passwordForm.formState.errors.currentPassword?.message}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...passwordForm.register('newPassword')}
                        error={passwordForm.formState.errors.newPassword?.message}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...passwordForm.register('confirmPassword')}
                        error={passwordForm.formState.errors.confirmPassword?.message}
                      />
                    </div>
                    
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? <Icons.Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Icons.Key className="h-4 w-4 mr-2" />}
                      Update Password
                    </Button>
                  </form>
                </div>

                {/* Privacy Settings */}
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-3">Privacy & Security</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Switch
                        checked={privacySettings.enableTwoFactor}
                        onCheckedChange={(checked) => handlePrivacyChange('enableTwoFactor', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Email in Profile</Label>
                        <p className="text-sm text-muted-foreground">Make email visible to other users</p>
                      </div>
                      <Switch
                        checked={privacySettings.showEmail}
                        onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Phone in Profile</Label>
                        <p className="text-sm text-muted-foreground">Make phone number visible to other users</p>
                      </div>
                      <Switch
                        checked={privacySettings.showPhone}
                        onCheckedChange={(checked) => handlePrivacyChange('showPhone', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icons.Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">Communication</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                        </div>
                        <Switch
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
                        </div>
                        <Switch
                          checked={notificationSettings.smsNotifications}
                          onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">System Alerts</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Weekly Reports</Label>
                          <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                        </div>
                        <Switch
                          checked={notificationSettings.weeklyReports}
                          onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>System Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get notified about system issues</p>
                        </div>
                        <Switch
                          checked={notificationSettings.systemAlerts}
                          onCheckedChange={(checked) => handleNotificationChange('systemAlerts', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Maintenance Updates</Label>
                          <p className="text-sm text-muted-foreground">Be informed about scheduled maintenance</p>
                        </div>
                        <Switch
                          checked={notificationSettings.maintenanceUpdates}
                          onCheckedChange={(checked) => handleNotificationChange('maintenanceUpdates', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Icons.Settings className="h-5 w-5 mr-2" />
                  System Preferences
                </h3>
                
                <div className="space-y-6">
                  {/* Theme Settings */}
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">Appearance</h4>
                    <div className="space-y-4">
                      <div>
                        <Label>Theme</Label>
                        <div className="flex space-x-2 mt-2">
                          <Button
                            variant={theme === 'light' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleThemeChange('light')}
                          >
                            <Icons.Sun className="h-4 w-4 mr-2" />
                            Light
                          </Button>
                          <Button
                            variant={theme === 'dark' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleThemeChange('dark')}
                          >
                            <Icons.Moon className="h-4 w-4 mr-2" />
                            Dark
                          </Button>
                          <Button
                            variant={theme === 'system' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleThemeChange('system')}
                          >
                            <Icons.Monitor className="h-4 w-4 mr-2" />
                            System
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Regional Settings */}
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">Regional Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="w-full mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
                          value={systemSettings.defaultLanguage}
                          onChange={(e) => handleSystemChange('defaultLanguage', e.target.value)}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                          id="timezone"
                          className="w-full mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
                          value={systemSettings.timezone}
                          onChange={(e) => handleSystemChange('timezone', e.target.value)}
                        >
                          <option value="UTC">UTC</option>
                          <option value="EST">Eastern Time</option>
                          <option value="PST">Pacific Time</option>
                          <option value="CST">Central Time</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <select
                          id="dateFormat"
                          className="w-full mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
                          value={systemSettings.dateFormat}
                          onChange={(e) => handleSystemChange('dateFormat', e.target.value)}
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <select
                          id="currency"
                          className="w-full mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
                          value={systemSettings.currency}
                          onChange={(e) => handleSystemChange('currency', e.target.value)}
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="INR">INR (₹)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Session Settings */}
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">Session Management</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="autoLogout">Auto Logout (minutes)</Label>
                        <Input
                          id="autoLogout"
                          type="number"
                          min="5"
                          max="120"
                          value={systemSettings.autoLogout}
                          onChange={(e) => handleSystemChange('autoLogout', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          min="30"
                          max="480"
                          value={systemSettings.sessionTimeout}
                          onChange={(e) => handleSystemChange('sessionTimeout', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Organization Settings (for authorized roles) */}
            {hasPermission(user?.role, PERMISSIONS.MANAGE_ORGANIZATIONS) && (
              <TabsContent value="organization" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                    <Icons.Building2 className="h-5 w-5 mr-2" />
                    Organization Settings
                  </h3>
                  
                  <form onSubmit={organizationForm.handleSubmit(onOrganizationSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input
                        id="orgName"
                        {...organizationForm.register('name')}
                        error={organizationForm.formState.errors.name?.message}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="orgEmail">Contact Email</Label>
                        <Input
                          id="orgEmail"
                          type="email"
                          {...organizationForm.register('email')}
                          error={organizationForm.formState.errors.email?.message}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="orgPhone">Phone Number</Label>
                        <Input
                          id="orgPhone"
                          {...organizationForm.register('phone')}
                          error={organizationForm.formState.errors.phone?.message}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="orgAddress">Address</Label>
                      <Input
                        id="orgAddress"
                        {...organizationForm.register('address')}
                        error={organizationForm.formState.errors.address?.message}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="orgWebsite">Website</Label>
                      <Input
                        id="orgWebsite"
                        {...organizationForm.register('website')}
                        error={organizationForm.formState.errors.website?.message}
                      />
                    </div>
                    
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? <Icons.Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Icons.Save className="h-4 w-4 mr-2" />}
                      Update Organization
                    </Button>
                  </form>
                </div>
              </TabsContent>
            )}

            {/* System Settings (for superadmin) */}
            {hasPermission(user?.role, PERMISSIONS.MANAGE_SETTINGS) && user?.role === USER_ROLES.SUPERADMIN && (
              <TabsContent value="system" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                    <Icons.Server className="h-5 w-5 mr-2" />
                    System Configuration
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Platform Settings */}
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-3">Platform Configuration</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Maintenance Mode</Label>
                            <p className="text-sm text-muted-foreground">Enable maintenance mode for the platform</p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>New User Registration</Label>
                            <p className="text-sm text-muted-foreground">Allow new organizations to register</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Email Verification Required</Label>
                            <p className="text-sm text-muted-foreground">Require email verification for new users</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    {/* Backup & Recovery */}
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-3">Backup & Recovery</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Automatic Backups</Label>
                            <p className="text-sm text-muted-foreground">Enable daily automatic backups</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Button variant="outline">
                            <Icons.Download className="h-4 w-4 mr-2" />
                            Create Backup
                          </Button>
                          <Button variant="outline">
                            <Icons.Upload className="h-4 w-4 mr-2" />
                            Restore Backup
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Data Management */}
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-3">Data Management</h4>
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          onClick={exportData}
                          disabled={isLoading}
                        >
                          {isLoading ? <Icons.Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Icons.Download className="h-4 w-4 mr-2" />}
                          Export All Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
          </CardContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default Settings; 