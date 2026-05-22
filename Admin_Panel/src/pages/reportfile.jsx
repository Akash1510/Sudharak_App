import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    AlertCircle,
    Shield,
    ThumbsUp,
    MessageSquare,
    Loader2,
    Camera,
    CheckCircle2,
    XCircle,
    PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDepartmentName } from '../utils/mappings';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';

const ReportFile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [showResolveForm, setShowResolveForm] = useState(false);
    const [resolvedImage, setResolvedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchReportDetails();
    }, [id]);

    const fetchReportDetails = async () => {
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`http://65.2.186.163/panel/dashboard/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) setReport(data.data);
        } catch (error) {
            console.error('Error fetching report:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus) => {
        setUpdating(true);
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`http://65.2.186.163/panel/dashboard/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await response.json();
            if (data.success) {
                fetchReportDetails();
                toast.success(`Status updated to ${newStatus}`);
            }
        } catch (error) {
            toast.error('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    const handleResolve = async (e) => {
        e.preventDefault();
        if (!resolvedImage) {
            toast.error('Please upload a resolution image');
            return;
        }

        setUpdating(true);
        const token = localStorage.getItem('adminToken');
        const formData = new FormData();
        formData.append('resolved_image', resolvedImage);

        try {
            const response = await fetch(`http://65.2.186.163/panel/dashboard/${id}/resolve`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                setShowResolveForm(false);
                fetchReportDetails();
                toast.success('Report resolved successfully!');
            }
        } catch (error) {
            toast.error('Failed to resolve report');
        } finally {
            setUpdating(false);
        }
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResolvedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
                <div className="max-w-5xl mx-auto">
                    <Skeleton className="h-6 w-40 mb-8" />
                    <div className="grid lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <Skeleton className="h-64" variant="card" />
                            <Skeleton className="h-64" variant="card" />
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <Skeleton className="h-8 w-24 rounded-full" />
                                    <Skeleton className="h-8 w-24 rounded-full" />
                                </div>
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-3/4" />
                                <div className="flex gap-6 pt-4">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-5 w-32" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-24" variant="card" />
                                <Skeleton className="h-24" variant="card" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!report) return <div className="p-10 text-center">Report not found</div>;

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Left: Images */}
                    <div className="space-y-6">
                        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <p className="p-4 bg-white/5 text-xs font-bold uppercase tracking-widest text-indigo-400 border-b border-white/10">
                                Original Issue
                            </p>
                            <img src={report.unresolved_image} alt="Original" className="w-full aspect-video object-cover" />
                        </div>

                        {report.resolved_image && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
                            >
                                <p className="p-4 bg-emerald-500/10 text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-emerald-500/20">
                                    Resolved Proof
                                </p>
                                <img src={report.resolved_image} alt="Resolved" className="w-full aspect-video object-cover" />
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Info & Actions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${report.status === 'Pending' ? 'border-yellow-500/20 text-yellow-500 bg-yellow-500/5' :
                                        report.status === 'In_Progress' ? 'border-blue-500/20 text-blue-500 bg-blue-500/5' :
                                            'border-emerald-500/20 text-emerald-500 bg-emerald-500/5'
                                    }`}>
                                    {report.status}
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10">
                                    {report.severity} Severity
                                </span>
                            </div>
                            <h1 className="text-3xl font-black leading-tight">{report.description}</h1>

                            <div className="flex flex-wrap gap-6 pt-4 text-gray-400">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-indigo-400" />
                                    <span className="capitalize">{report.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-400" />
                                    <span>{new Date(report.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-indigo-400" />
                                    <span>{getDepartmentName(report.department)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Interaction Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                    <ThumbsUp className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold">{report.upvote_count}</p>
                                    <p className="text-[10px] uppercase font-bold text-gray-500">Upvotes</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold">{report.comments.length}</p>
                                    <p className="text-[10px] uppercase font-bold text-gray-500">Comments</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4 pt-6 border-t border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Update Report Status</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <ActionButton
                                    label="In Progress"
                                    icon={<PlayCircle className="w-4 h-4" />}
                                    onClick={() => updateStatus('In_Progress')}
                                    disabled={updating || report.status === 'In_Progress'}
                                    active={report.status === 'In_Progress'}
                                    color="blue"
                                />
                                <ActionButton
                                    label="Reject"
                                    icon={<XCircle className="w-4 h-4" />}
                                    onClick={() => updateStatus('Rejected')}
                                    disabled={updating || report.status === 'Rejected'}
                                    active={report.status === 'Rejected'}
                                    color="red"
                                />
                                <button
                                    onClick={() => setShowResolveForm(true)}
                                    disabled={updating || report.status === 'Resolved'}
                                    className="col-span-2 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                    Mark as Resolved
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resolve Modal */}
            <AnimatePresence>
                {showResolveForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowResolveForm(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden p-8 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-2">Resolve Issue</h2>
                            <p className="text-gray-400 text-sm mb-8">Please upload a photo showing the resolved work.</p>

                            <form onSubmit={handleResolve} className="space-y-6">
                                <label className="block">
                                    <div className={`aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${previewUrl ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/10 hover:border-indigo-500/50 hover:bg-white/5'
                                        }`}>
                                        {previewUrl ? (
                                            <img src={previewUrl} className="w-full h-full object-cover rounded-xl" alt="Preview" />
                                        ) : (
                                            <>
                                                <Camera className="w-10 h-10 text-gray-500 mb-2" />
                                                <span className="text-sm font-medium text-gray-400">Click to upload photo</span>
                                            </>
                                        )}
                                        <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
                                    </div>
                                </label>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowResolveForm(false)}
                                        className="flex-1 py-3 px-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={updating || !resolvedImage}
                                        className="flex-2 py-3 px-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Resolution'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ActionButton = ({ label, icon, onClick, disabled, active, color }) => {
    const colors = {
        blue: active ? "bg-blue-500 text-white" : "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20",
        red: active ? "bg-red-500 text-white" : "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${colors[color]} disabled:opacity-50`}
        >
            {icon}
            {label}
        </button>
    );
};

export default ReportFile;
