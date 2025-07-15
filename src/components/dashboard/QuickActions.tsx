import React from 'react';
import { Plus, FileText, Users, DollarSign, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const QuickActions: React.FC = () => {
  const { user } = useAuth();

  const actions = [
    { 
      icon: Plus, 
      label: 'Add Employee', 
      color: 'bg-blue-600 hover:bg-blue-700',
      roles: ['admin', 'hr_manager']
    },
    { 
      icon: FileText, 
      label: 'Generate Report', 
      color: 'bg-green-600 hover:bg-green-700',
      roles: ['admin', 'hr_manager', 'finance_manager']
    },
    { 
      icon: Users, 
      label: 'Schedule Meeting', 
      color: 'bg-purple-600 hover:bg-purple-700',
      roles: ['admin', 'hr_manager', 'finance_manager', 'academic_manager']
    },
    { 
      icon: DollarSign, 
      label: 'Process Payroll', 
      color: 'bg-orange-600 hover:bg-orange-700',
      roles: ['admin', 'finance_manager']
    },
    { 
      icon: Calendar, 
      label: 'View Schedule', 
      color: 'bg-indigo-600 hover:bg-indigo-700',
      roles: ['admin', 'hr_manager', 'finance_manager', 'academic_manager']
    }
  ];

  const filteredActions = actions.filter(action => 
    action.roles.includes(user?.role || '')
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {filteredActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white transition-colors ${action.color}`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};