import React from 'react';
import AdminSidebar from '../admin/AdminSidebar';

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen text-white" style={{ backgroundColor: 'var(--color-navy-dark)' }}>
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto" style={{ backgroundColor: 'var(--color-navy)' }}>
                {children}
            </main>
        </div>
    );
}
