import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Laptop, 
  Users, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  BarChart3
} from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';

const Dashboard: React.FC = () => {
  const { pages, data } = useCMS();

  const stats = [
    {
      name: 'Total Pages',
      value: pages.length,
      icon: FileText,
      color: 'bg-blue-500',
      href: '/admin/pages'
    },
    {
      name: 'Published Pages',
      value: pages.filter(p => p.isPublished).length,
      icon: Eye,
      color: 'bg-green-500',
      href: '/admin/pages'
    },
    {
      name: 'Products',
      value: data.laptops.length,
      icon: Laptop,
      color: 'bg-purple-500',
      href: '/admin/products'
    },
    {
      name: 'Testimonials',
      value: data.testimonials.length,
      icon: Users,
      color: 'bg-orange-500',
      href: '/admin/testimonials'
    },
  ];

  const recentPages = pages
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your RenoBook website content</p>
        </div>
        <Link
          to="/admin/pages/new"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Page</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.href}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Pages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Pages</h2>
              <Link
                to="/admin/pages"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${page.isPublished ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <div>
                      <p className="font-medium text-gray-900">{page.title}</p>
                      <p className="text-sm text-gray-500">/{page.slug}</p>
                    </div>
                  </div>
                  <Link
                    to={`/admin/pages/${page.id}/edit`}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                </div>
              ))}
              {recentPages.length === 0 && (
                <p className="text-gray-500 text-center py-4">No pages created yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <Link
                to="/admin/pages/new"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors duration-200">
                  <Plus className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Create New Page</p>
                  <p className="text-sm text-gray-500">Add a new page to your site</p>
                </div>
              </Link>
              
              <Link
                to="/admin/products"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-200">
                  <Laptop className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Manage Products</p>
                  <p className="text-sm text-gray-500">Update laptop inventory</p>
                </div>
              </Link>
              
              <Link
                to="/admin/settings"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Site Settings</p>
                  <p className="text-sm text-gray-500">Configure your website</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;