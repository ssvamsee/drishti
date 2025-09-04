import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X, MapPin, Building2, Phone, Mail, User, Globe } from 'lucide-react';

import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { cn } from '../../utils/cn';

const branchSchema = yup.object().shape({
  name: yup.string().required('Branch name is required').min(2, 'Name must be at least 2 characters'),
  code: yup.string().required('Branch code is required').min(2, 'Code must be at least 2 characters').max(10, 'Code must be at most 10 characters'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  postalCode: yup.string().required('Postal code is required'),
  phone: yup.string().required('Phone number is required').matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  website: yup.string().url('Invalid website URL').nullable(),
  principal: yup.string().nullable(),
  capacity: yup.number().positive('Capacity must be positive').integer('Capacity must be a whole number').nullable(),
  establishedYear: yup.number().min(1900, 'Year must be after 1900').max(new Date().getFullYear(), 'Year cannot be in the future').nullable(),
  status: yup.string().oneOf(['active', 'inactive', 'pending'], 'Invalid status').required('Status is required'),
});

const EditBranchForm = ({ isOpen, onClose, onSubmit, branch }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(branchSchema),
  });

  useEffect(() => {
    if (branch && isOpen) {
      // Populate form with branch data
      Object.keys(branch).forEach(key => {
        if (key === 'capacity' || key === 'establishedYear') {
          setValue(key, branch[key] || '');
        } else {
          setValue(key, branch[key] || '');
        }
      });
    }
  }, [branch, isOpen, setValue]);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Convert numeric fields
      const formattedData = {
        ...data,
        capacity: data.capacity ? parseInt(data.capacity) : null,
        establishedYear: data.establishedYear ? parseInt(data.establishedYear) : null,
        website: data.website || null,
        principal: data.principal || null,
      };
      
      await onSubmit(formattedData);
      reset();
    } catch (error) {
      console.error('Error updating branch:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Branch" size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Branch Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter branch name"
                className={cn(errors.name && "border-destructive")}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="code">Branch Code *</Label>
              <Input
                id="code"
                {...register('code')}
                placeholder="Enter branch code"
                className={cn(errors.code && "border-destructive")}
              />
              {errors.code && (
                <p className="text-sm text-destructive mt-1">{errors.code.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Address Information
          </h3>
          
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="Enter street address"
              className={cn(errors.address && "border-destructive")}
            />
            {errors.address && (
              <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="Enter city"
                className={cn(errors.city && "border-destructive")}
              />
              {errors.city && (
                <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                {...register('state')}
                placeholder="Enter state"
                className={cn(errors.state && "border-destructive")}
              />
              {errors.state && (
                <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                {...register('country')}
                placeholder="Enter country"
                className={cn(errors.country && "border-destructive")}
              />
              {errors.country && (
                <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input
                id="postalCode"
                {...register('postalCode')}
                placeholder="Enter postal code"
                className={cn(errors.postalCode && "border-destructive")}
              />
              {errors.postalCode && (
                <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="Enter phone number"
                className={cn(errors.phone && "border-destructive")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter email address"
                className={cn(errors.email && "border-destructive")}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              {...register('website')}
              placeholder="Enter website URL (optional)"
              className={cn(errors.website && "border-destructive")}
            />
            {errors.website && (
              <p className="text-sm text-destructive mt-1">{errors.website.message}</p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <User className="h-5 w-5" />
            Additional Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="principal">Principal Name</Label>
              <Input
                id="principal"
                {...register('principal')}
                placeholder="Enter principal name (optional)"
                className={cn(errors.principal && "border-destructive")}
              />
              {errors.principal && (
                <p className="text-sm text-destructive mt-1">{errors.principal.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="capacity">Student Capacity</Label>
              <Input
                id="capacity"
                type="number"
                {...register('capacity')}
                placeholder="Enter student capacity (optional)"
                className={cn(errors.capacity && "border-destructive")}
              />
              {errors.capacity && (
                <p className="text-sm text-destructive mt-1">{errors.capacity.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="establishedYear">Established Year</Label>
              <Input
                id="establishedYear"
                type="number"
                {...register('establishedYear')}
                placeholder="Enter established year (optional)"
                className={cn(errors.establishedYear && "border-destructive")}
              />
              {errors.establishedYear && (
                <p className="text-sm text-destructive mt-1">{errors.establishedYear.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                {...register('status')}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.status && "border-destructive"
                )}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              {errors.status && (
                <p className="text-sm text-destructive mt-1">{errors.status.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating Branch...' : 'Update Branch'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBranchForm;
