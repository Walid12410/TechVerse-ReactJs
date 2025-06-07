import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  RiDashboardLine,
  RiUserLine,
  RiSettingsLine,
  RiTeamLine,
  RiUserHeartLine,
  RiCheckboxMultipleBlankLine,
  RiPriceTagLine,
  RiFolderLine,
  RiEyeLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiInformationLine,
  RiContactsBook2Line
} from 'react-icons/ri';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  // Remove local state since it's now managed by parent
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { title: 'Dashboard', icon: <RiDashboardLine size={24} />, path: '/admin/dashboard' },
    { title: 'Service', icon: <RiUserLine size={24} />, path: '/admin/service' },
    { title: 'Service Feature', icon: <RiCheckboxMultipleBlankLine size={24} />, path: '/admin/service-feature' },
    { title: 'Member', icon: <RiTeamLine size={24} />, path: '/admin/member' },
    { title: 'Client', icon: <RiUserHeartLine size={24} />, path: '/admin/client' },
    { title: 'Project', icon: <RiFolderLine size={24} />, path: '/admin/project' },
    { title: 'Project View', icon: <RiEyeLine size={24} />, path: '/admin/project-view' },
    { title: 'Pricing Plan', icon: <RiPriceTagLine size={24} />, path: '/admin/pricing-plan' },
    { title: 'Contact Us', icon: <RiContactsBook2Line size={24} />, path: '/admin/contact-us' },
    { title: 'About Us', icon: <RiInformationLine size={24} />, path: '/admin/about-us' },
    { title: 'Settings', icon: <RiSettingsLine size={24} />, path: '/admin/settings' },
  ];

  return (
    <div 
     style={{backgroundColor: "var(--color-navy-dark)"}}
     className={`fixed left-0 top-0 text-white h-screen transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700"
        >
          {isCollapsed ? <RiMenuUnfoldLine size={24} /> : <RiMenuFoldLine size={24} />}
        </button>
      </div>

      <nav className="mt-8 overflow-y-auto h-[calc(100vh-100px)]">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
          >
            <span className="mr-4">{item.icon}</span>
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;