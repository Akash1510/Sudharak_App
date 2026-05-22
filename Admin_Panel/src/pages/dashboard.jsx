import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ListFilter,
  LogOut,
  User,
  MapPin,
  Calendar,
  ChevronRight,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { getDepartmentName } from '../utils/mappings';
import Statistics from './statistics';
import Skeleton from '../components/Skeleton';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));

    if (!token || !adminData) {
      navigate('/login');
      return;
    }

    setAdmin(adminData);
    fetchDashboardData(token);
  }, []);

  const fetchDashboardData = async (token) => {
    setLoading(true);
    try {
      // Fetch Stats
      const statsRes = await fetch('http://65.2.186.163/panel/dashboard/stats/report', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      // Fetch Reports
      const reportsRes = await fetch('http://65.2.186.163/panel/dashboard/report', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const reportsData = await reportsRes.json();
      if (reportsData.success) {
        setReports(reportsData.data);
        setFilteredReports(reportsData.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedStatus === 'All') {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter(r => r.status === selectedStatus));
    }
  }, [selectedStatus, reports]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const statusOptions = [
    { id: 'All', icon: <ListFilter className="w-4 h-4" /> },
    { id: 'Pending', icon: <Clock className="w-4 h-4" /> },
    { id: 'In_Progress', label: 'Progress', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'Resolved', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'Rejected', icon: <XCircle className="w-4 h-4" /> },
  ];

  // Don't return early with a full-page spinner anymore
  // if (loading) { ... }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      {/* Header / Profile Corner */}
      <header className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">{getDepartmentName(admin?.department)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md cursor-pointer hover:bg-white/10 hover:border-indigo-500/50 transition-all shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">{admin?.username}</p>
              <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">Administrator</p>
            </div>
          </motion.div>
          <button
            onClick={handleLogout}
            className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-10">
        {/* Statistics Section (Auto-refreshes) */}
        <Statistics />

        {/* Status Filter Slider */}
        <div className="bg-white/5 p-2 rounded-3xl border border-white/10 inline-flex gap-1 backdrop-blur-sm">
          {statusOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedStatus(opt.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${selectedStatus === opt.id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              {selectedStatus === opt.id && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-indigo-600 rounded-2xl -z-10 shadow-lg shadow-indigo-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {opt.icon}
              {opt.label || opt.id.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Reports Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {selectedStatus.replace('_', ' ')} Reports
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs rounded-full">
                {loading ? '...' : filteredReports.length}
              </span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[420px]" variant="card" />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredReports.map((report) => (
                  <ReportCard
                    key={report.report_id}
                    report={report}
                    onClick={() => navigate(`/report/${report.report_id}`)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && filteredReports.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
              <p className="text-gray-500 font-medium">No reports found for this status.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const ReportCard = ({ report, onClick }) => {
  const statusColors = {
    Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    In_Progress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Resolved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const severityColors = {
    Low: "bg-gray-500/20 text-gray-400",
    Medium: "bg-orange-500/20 text-orange-400",
    High: "bg-red-500/20 text-red-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={report.unresolved_image}
          alt="Issue"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusColors[report.status] || statusColors.Pending}`}>
            {report.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${severityColors[report.severity]}`}>
            {report.severity} Priority
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span className="capitalize">{report.location}</span>
          <span className="mx-1">•</span>
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(report.created_at).toLocaleDateString()}</span>
        </div>

        <h3 className="font-bold mb-3 line-clamp-2 min-h-[3rem]">
          {report.description}
        </h3>

        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-indigo-400 uppercase tracking-widest group-hover:text-indigo-300 transition-colors">
          View Details
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
