import React, { useState, useEffect } from 'react';
import {
    ListFilter,
    Clock,
    BarChart3,
    CheckCircle2,
    XCircle,
    RefreshCcw,
    TrendingUp,
    TrendingDown,
    Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '../components/Skeleton';

const Statistics = () => {
    const [stats, setStats] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchStats = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        setIsRefreshing(true);
        try {
            const response = await fetch('http://65.2.186.163/panel/dashboard/stats/report', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 429) {
                console.warn('Rate limit exceeded (429). Reducing polling frequency.');
                return;
            }

            const data = await response.json();
            if (data.success) {
                setStats(data.data);
                setLastUpdated(new Date());
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setTimeout(() => setIsRefreshing(false), 1000);
        }
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 45000); // Increased to 45s to avoid 429 errors
        return () => clearInterval(interval);
    }, []);

    if (!stats) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-[210px]" variant="card" />
                    ))}
                </div>
            </div>
        );
    }

    const statItems = [
        { title: "Total Reports", value: stats.total, icon: <ListFilter />, color: "indigo", trend: "+12%", up: true, total: stats.total },
        { title: "Pending", value: stats.pending, icon: <Clock />, color: "yellow", trend: "-5%", up: false, total: stats.total },
        { title: "In Progress", value: stats.in_progress, icon: <Activity />, color: "blue", trend: "+8%", up: true, total: stats.total },
        { title: "Resolved", value: stats.resolved, icon: <CheckCircle2 />, color: "emerald", trend: "+24%", up: true, total: stats.total },
        { title: "Rejected", value: stats.rejected, icon: <XCircle />, color: "red", trend: "+2%", up: false, total: stats.total },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                        Real-time Analytics
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse delay-150"></span>
                        </div>
                    </h2>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Live monitoring system active</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        {isRefreshing ? <RefreshCcw className="w-3 h-3 animate-spin" /> : <Activity className="w-3 h-3" />}
                        Syncing...
                    </div>
                    <span className="text-[10px] text-gray-600 font-medium tracking-wider">
                        Last update: {lastUpdated.toLocaleTimeString()}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {statItems.map((item, idx) => (
                    <AnalyticalCard key={idx} {...item} />
                ))}
            </div>
        </div>
    );
};

const AnalyticalCard = ({ title, value, icon, color, trend, up, total }) => {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

    const themes = {
        indigo: "from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20",
        yellow: "from-yellow-500/20 to-yellow-600/5 text-yellow-400 border-yellow-500/20",
        blue: "from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20",
        emerald: "from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20",
        red: "from-red-500/20 to-red-600/5 text-red-400 border-red-500/20",
    };

    const progressColors = {
        indigo: "bg-indigo-500",
        yellow: "bg-yellow-500",
        blue: "bg-blue-500",
        emerald: "bg-emerald-500",
        red: "bg-red-500",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`group relative p-6 bg-linear-to-br border rounded-[2.5rem] backdrop-blur-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-${color}-500/10 ${themes[color]}`}
        >
            {/* Background Decor */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-20 rounded-full ${progressColors[color]}`}></div>

            <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                        {React.cloneElement(icon, { className: "w-5 h-5" })}
                    </div>
                    {/* <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg bg-white/5 ${up ? 'text-emerald-400' : 'text-red-400'}`}> */}
                    {/* {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {trend}
                    </div> */}
                </div>

                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={value}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-black text-white"
                            >
                                {value}
                            </motion.span>
                        </AnimatePresence>
                        {/* <span className="text-xs font-bold opacity-40">units</span> */}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                        <span>Capacity</span>
                        <span>{percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${progressColors[color]} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Statistics;
