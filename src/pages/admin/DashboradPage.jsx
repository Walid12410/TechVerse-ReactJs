import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../component/layout/AdminLayout';
import { getStatus, getSummaryMember, 
    getSummaryClient, getSummaryMessage
} from '../../redux/slices/dashboardSlice';
import { FaProjectDiagram,
    FaUsers, FaUserFriends, FaEnvelope,
    FaCogs, FaArrowRight, FaPlus, 
    FaCog, FaSignOutAlt
} from 'react-icons/fa';
import { format } from 'date-fns';
import config from '../../utils/config';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';


const AdminDashboard = () => {
    const dispatch = useDispatch();
    const {
        status,
        loadingStatus,
        memberSummary,
        loadingMemberSummary,
        clientSummary,
        loadingClientSummary,
        messageSummary,
        loadingMessageSummary,
        errorStatus,
        errorMemberSummary,
        errorClientSummary,
        errorMessageSummary
    } = useSelector((state) => state.dashboard);

    const handleLogout = () => {
       dispatch(logout());
       toast.success("Logout successfully");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(getStatus()),
                    dispatch(getSummaryMember()),
                    dispatch(getSummaryClient()),
                    dispatch(getSummaryMessage())
                ]);
            } catch (error) {
                toast.warning("Something went wrong, Try again later");
            }
        };
        fetchData();
    }, [dispatch]);

    
    const stats = [
        {
            title: "Total Projects",
            value: status?.stats?.total_projects || 0,
            icon: <FaProjectDiagram className="text-2xl" />,
            color: "bg-blue-500"
        },
        {
            title: "Total Members",
            value: status?.stats?.total_members || 0,
            icon: <FaUsers className="text-2xl" />,
            color: "bg-green-500"
        },
        {
            title: "Total Clients",
            value: status?.stats?.total_clients || 0,
            icon: <FaUserFriends className="text-2xl" />,
            color: "bg-purple-500"
        },
        {
            title: "Total Services",
            value: status?.stats?.total_services || 0,
            icon: <FaCogs className="text-2xl" />,
            color: "bg-yellow-500"
        },
        {
            title: "Messages",
            value: status?.stats?.messages_count || 0,
            icon: <FaEnvelope className="text-2xl" />,
            color: "bg-red-500"
        }
    ];

    const quickLinks = [
        {
            title: "Add New Project",
            icon: <FaPlus className="text-xl" />,
            link: "/admin/project",
            color: "bg-blue-500"
        },
        {
            title: "Add New Member",
            icon: <FaUsers className="text-xl" />,
            link: "/admin/member",
            color: "bg-green-500"
        },
        {
            title: "Add New Client",
            icon: <FaUserFriends className="text-xl" />,
            link: "/admin/client",
            color: "bg-purple-500"
        },
        {
            title: "Manage Services",
            icon: <FaCog className="text-xl" />,
            link: "/admin/service",
            color: "bg-yellow-500"
        }
    ];

    if (loadingStatus || loadingMemberSummary || loadingClientSummary || loadingMessageSummary) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (errorStatus || errorMemberSummary || errorClientSummary || errorMessageSummary) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center text-red-600">
                        <p className="text-xl font-semibold">Error loading dashboard data</p>
                        <p className="mt-2 text-sm">
                            {errorStatus || errorMemberSummary || errorClientSummary || errorMessageSummary}
                        </p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <button
                        onClick={handleLogout}
                        className="text-white font-medium px-5 py-2 rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer"
                        style={{ backgroundColor: "var(--color-red)" }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#ff6b6b')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--color-red)')}
                    >
                        <FaSignOutAlt size={20} />
                        Logout
                    </button>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="rounded-lg shadow p-4"
                            style={{ backgroundColor: "var(--color-navy-dark)" }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">{stat.title}</p>
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-full text-white`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Recent Projects */}
                    <div className="rounded-lg shadow p-4"
                        style={{ backgroundColor: "var(--color-navy-dark)" }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
                            <Link to="/admin/project" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                View All <FaArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2 text-gray-400">Project</th>
                                        <th className="text-left py-2 text-gray-400">Client</th>
                                        <th className="text-left py-2 text-gray-400">Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {status?.recent_projects?.map((project) => (
                                        <tr key={project.id} className="hover:bg-gray-800 transition-colors">
                                            <td className="py-3">
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={`${config.API_BASE_URL}/${project.image_url}`}
                                                        alt={project.project_name}
                                                        className="w-8 h-8 rounded object-cover"
                                                    />
                                                    <span className="truncate max-w-[150px] text-white" title={project.project_name}>
                                                        {project.project_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 text-gray-300">{`${project.first_name} ${project.last_name}`}</td>
                                            <td className="py-3 text-gray-300">${project.project_cost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="rounded-lg shadow p-4"
                        style={{ backgroundColor: "var(--color-navy-dark)" }}
                    >
                        <h2 className="text-lg font-semibold mb-4 text-white">Quick Links</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quickLinks.map((link, index) => (
                                <Link 
                                    key={index}
                                    to={link.link}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <div className={`${link.color} p-2 rounded-lg text-white`}>
                                        {link.icon}
                                    </div>
                                    <span className="text-gray-300">{link.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Team Members */}
                    <div className="rounded-lg shadow p-4"
                        style={{ backgroundColor: "var(--color-navy-dark)" }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-white">Team Members</h2>
                            <Link to="/admin/member" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                View All <FaArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2 text-gray-400">Name</th>
                                        <th className="text-left py-2 text-gray-400">Expertise</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {memberSummary?.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-800 transition-colors">
                                            <td className="py-3 text-gray-300">{`${member.first_name} ${member.last_name}`}</td>
                                            <td className="py-3 text-gray-300">{member.field_of_expertise}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Clients */}
                    <div className="rounded-lg shadow p-4"
                        style={{ backgroundColor: "var(--color-navy-dark)" }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-white">Clients</h2>
                            <Link to="/admin/client" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                View All <FaArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2 text-gray-400">Name</th>
                                        <th className="text-left py-2 text-gray-400">Country</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {clientSummary?.map((client) => (
                                        <tr key={client.id} className="hover:bg-gray-800 transition-colors">
                                            <td className="py-3 text-gray-300">{`${client.first_name} ${client.last_name}`}</td>
                                            <td className="py-3 text-gray-300">{client.country_of_origin}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Messages Section at the bottom */}
                <div className="rounded-lg shadow p-4"
                    style={{ backgroundColor: "var(--color-navy-dark)" }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">Recent Messages</h2>
                        <Link to="/admin/message" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            View All <FaArrowRight size={12} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 text-gray-400">Name</th>
                                    <th className="text-left py-2 text-gray-400">Subject</th>
                                    <th className="text-left py-2 text-gray-400">Phone Number</th>
                                    <th className="text-left py-2 text-gray-400">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {messageSummary?.map((message) => (
                                    <tr key={message.id} className="hover:bg-gray-800 transition-colors">
                                        <td className="py-3 text-gray-300">{message.name}</td>
                                        <td className="py-3 text-gray-300 truncate max-w-[150px]" title={message.subject}>
                                            {message.subject}
                                        </td>
                                        <td className="py-3 text-gray-300">{message.phone_number}</td>
                                        <td className="py-3 text-gray-300">{format(new Date(message.created_at), 'MMM dd, yyyy')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;