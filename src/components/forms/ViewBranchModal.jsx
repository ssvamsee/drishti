import React from 'react';
import { X, MapPin, Building2, Phone, Mail, User, Globe, Calendar, Users, Target } from 'lucide-react';

import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

const ViewBranchModal = ({ isOpen, onClose, branch }) => {
  if (!branch) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Branch Details" size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              {branch.name}
            </h2>
            <p className="text-muted-foreground mt-1">Code: {branch.code}</p>
          </div>
          {getStatusBadge(branch.status)}
        </div>

        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Branch Name</label>
                <p className="text-foreground font-medium">{branch.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Branch Code</label>
                <p className="text-foreground font-medium">{branch.code}</p>
              </div>
              
              {branch.establishedYear && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Established Year</label>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {branch.establishedYear}
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {branch.principal && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Principal</label>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {branch.principal}
                  </p>
                </div>
              )}
              
              {branch.capacity && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Student Capacity</label>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {branch.capacity} students
                  </p>
                </div>
              )}
              
              {branch.totalStudents !== undefined && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Students</label>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {branch.totalStudents} students
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Address Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Address Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Street Address</label>
              <p className="text-foreground">{branch.address}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">City</label>
                <p className="text-foreground font-medium">{branch.city}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">State</label>
                <p className="text-foreground font-medium">{branch.state}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Country</label>
                <p className="text-foreground font-medium">{branch.country}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Postal Code</label>
                <p className="text-foreground font-medium">{branch.postalCode}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <p className="text-foreground font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${branch.phone}`} className="hover:text-primary transition-colors">
                    {branch.phone}
                  </a>
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <p className="text-foreground font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${branch.email}`} className="hover:text-primary transition-colors">
                    {branch.email}
                  </a>
                </p>
              </div>
            </div>
            
            {branch.website && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Website</label>
                <p className="text-foreground font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a 
                    href={branch.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {branch.website}
                  </a>
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Timestamps */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Timeline
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created At</label>
              <p className="text-foreground font-medium">
                {new Date(branch.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            {branch.updatedAt && branch.updatedAt !== branch.createdAt && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                <p className="text-foreground font-medium">
                  {new Date(branch.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default ViewBranchModal;
