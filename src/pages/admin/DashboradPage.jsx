import { useState } from 'react';
import { FaUser, FaChartPie, FaUsers, FaBox, FaCog, FaCalendar, FaComment } from 'react-icons/fa';
import AdminSidebar from '../../component/admin/AdminSidebar';

const AdminDashboard = () => {
    const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }));

    // Sample data for dashboard metrics
    const metrics = [
        { title: "Total Users", value: "1,249", icon: <FaUsers className="text-white" size={20} /> },
        { title: "Sales", value: "$12,984", icon: <FaChartPie className="text-white" size={20} /> },
        { title: "Orders", value: "384", icon: <FaBox className="text-white" size={20} /> },
        { title: "Events", value: "12", icon: <FaCalendar className="text-white" size={20} /> }
    ];

    // Sample data for recent activities
    const activities = [
        { user: "John Doe", action: "created a new account", time: "2 minutes ago" },
        { user: "Sarah Smith", action: "placed an order #4829", time: "1 hour ago" },
        { user: "Mike Johnson", action: "updated their profile", time: "3 hours ago" },
        { user: "Emily Brown", action: "left a new review", time: "5 hours ago" }
    ];

    return (
        <div className="flex h-screen ">   
            <AdminSidebar />
            
            <div className="flex-1 overflow-y-auto">
                {/* Top Navigation Bar */}
                <div className=" shadow-sm">
                    <div className="flex justify-between items-center px-6 py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                            <p className="text-white">{currentDate}</p>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                                    <FaUser size={18} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="p-6">
                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {metrics.map((metric, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div style={{backgroundColor: 'var(--color-purple-medium)'}} className="p-4 flex justify-between items-center">
                                    <h3 className="text-white font-medium">{metric.title}</h3>
                                    {metric.icon}
                                </div>
                                <div className="p-6">
                                    <p className="text-2xl font-bold">{metric.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Activities */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
                                <button style={{color: 'var(--color-purple-dark)'}} className="text-sm font-medium">View All</button>
                            </div>
                            <div className="space-y-4">
                                {activities.map((activity, index) => (
                                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-start">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                <FaUser size={18} className="text-gray-600" />
                                            </div>
                                            <div>
                                                <p><span className="font-medium">{activity.user}</span> {activity.action}</p>
                                                <p className="text-sm text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Quick Links */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Links</h2>
                            <div className="space-y-3">
                                <div style={{backgroundColor: 'var(--color-navy-charcoal)'}} className="rounded-lg p-4 text-white flex items-center cursor-pointer">
                                    <FaCog className="mr-3" size={20} />
                                    <span>Settings</span>
                                </div>
                                <div style={{backgroundColor: 'var(--color-blue-dark)'}} className="rounded-lg p-4 text-white flex items-center cursor-pointer">
                                    <FaUsers className="mr-3" size={20} />
                                    <span>User Management</span>
                                </div>
                                <div style={{backgroundColor: 'var(--color-purple-dark)'}} className="rounded-lg p-4 text-white flex items-center cursor-pointer">
                                    <FaComment className="mr-3" size={20} />
                                    <span>Messages</span>
                                </div>
                                <div style={{backgroundColor: 'var(--color-purple-medium)'}} className="rounded-lg p-4 text-white flex items-center cursor-pointer">
                                    <FaChartPie className="mr-3" size={20} />
                                    <span>Analytics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;