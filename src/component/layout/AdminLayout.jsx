import React, { useState } from 'react';
import AdminSidebar from '../admin/AdminSidebar';

export default function AdminLayout({ children }) {
    // You'll need to manage the sidebar state here to sync with the main content
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen text-white" style={{ backgroundColor: 'var(--color-navy-dark)' }}>
            <AdminSidebar 
                isCollapsed={isSidebarCollapsed} 
                setIsCollapsed={setIsSidebarCollapsed}
            />
            <main 
                className={`p-8 overflow-y-auto min-h-screen transition-all duration-300 ${
                    isSidebarCollapsed ? 'ml-20' : 'ml-64'
                }`}
                style={{ backgroundColor: 'var(--color-navy)' }}
            >
                {children}
            </main>
        </div>
    );
}