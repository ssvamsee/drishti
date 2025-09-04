import React from 'react';
import useAuthStore from '../store/authStore';

// Import organization head specific pages
import StudentsOrgHead from '../pages/orghead/StudentsOrgHead';
import AttendanceOrgHead from '../pages/orghead/AttendanceOrgHead';
import BranchesOrgHead from '../pages/orghead/BranchesOrgHead';

// Import default pages
import Students from '../pages/Students';
import Attendance from '../pages/Attendance';
import Marks from '../pages/Marks';
import Fees from '../pages/Fees';

const RoleBasedRoute = ({ page, children }) => {
  const { user } = useAuthStore();

  // If user is organization head, show organization head specific pages
  if (user?.role === 'organization_head') {
    switch (page) {
      case 'students':
        return <StudentsOrgHead />;
      case 'attendance':
        return <AttendanceOrgHead />;
      case 'branches':
        return <BranchesOrgHead />;
      default:
        return children;
    }
  }

  // For all other roles, show the default component
  return children;
};

export default RoleBasedRoute;
