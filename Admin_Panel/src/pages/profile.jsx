import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Shield, 
  Building2, 
  Hash, 
  ArrowLeft, 
  LogOut, 
  Mail,
  Calendar,
  Lock,
  BadgeCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getDepartmentName } from '../utils/mappings';

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    if (!adminData) {
      navigate('/login');
      return;
    }
    setAdmin(adminData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="mb-10 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {/* Profile Header Card */}
          <div className="bg-linear-to-br from-indigo-600/20 to-purple-600/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl overflow-hidden mb-8">
            {/* Background Glows */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 rotate-3 group">
                  <User className="w-16 h-16 text-white -rotate-3 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-xl shadow-lg border-4 border-[#0f172a]">
                  <BadgeCheck className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-4xl font-black tracking-tight mb-2">{admin.username}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-full">
                    System Administrator
                  </span>
                  <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-full">
                    Verified Account
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard 
              icon={<Shield className="w-5 h-5 text-indigo-400" />} 
              label="Role" 
              value="ADMIN" 
            />
            <InfoCard 
              icon={<Building2 className="w-5 h-5 text-purple-400" />} 
              label="Department" 
              value={getDepartmentName(admin.department)} 
            />
            <InfoCard 
              icon={<Hash className="w-5 h-5 text-blue-400" />} 
              label="Account ID" 
              value={admin.id} 
            />
            <InfoCard 
              icon={<Lock className="w-5 h-5 text-red-400" />} 
              label="Security Level" 
              value="Tier 1 Access" 
            />
          </div>

          {/* Action Footer */}
          <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
            <div className="text-gray-500 text-sm italic">
              "Managing the systems that power our community."
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-2xl font-bold transition-all active:scale-95"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all group">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-200">{value}</p>
      </div>
    </div>
  </div>
);

export default Profile;
