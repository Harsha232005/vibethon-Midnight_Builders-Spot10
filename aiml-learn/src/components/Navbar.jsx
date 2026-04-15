import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import React, { useContext, useState } from "react";
import { Brain, Menu, X, Search, User } from "lucide-react";

function Navbar() {
    const { loginStatus, setLoginStatus } = useContext(LoginContext);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const userEmail = sessionStorage.getItem('email');
    const userRole = sessionStorage.getItem('role');

    const onLogout = () => {
        setLoginStatus(false);
        navigate('/login');
    };

    return (
        <>
            <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* ── Logo ── */}
                        <Link to="/" className="flex items-center gap-2 no-underline">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow">
                                <Brain size={16} className="text-white" />
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Sunbeam Portal
                            </span>
                        </Link>

                        {/* ── Desktop Links ── */}
                        <div className="hidden md:flex items-center gap-6">

                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 no-underline ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 no-underline ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`
                                }
                            >
                                About Sunbeam
                            </NavLink>

                            {/* Student Only: My Courses */}
                            {loginStatus && userRole === 'Student' && (
                                <NavLink
                                    to="/my-courses"
                                    className={({ isActive }) =>
                                        `text-sm font-semibold transition-colors duration-200 no-underline ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`
                                    }
                                >
                                    My Courses
                                </NavLink>
                            )}

                            {/* Admin Only: Dropdown */}
                            {loginStatus && userRole === 'Admin' && (
                                <div className="relative group">
                                    <button className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
                                        Admin Panel
                                        <svg className="w-3.5 h-3.5 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {/* Dropdown */}
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <NavLink
                                            to="/enrolled-students"
                                            className={({ isActive }) =>
                                                `block px-4 py-2.5 text-sm rounded-xl transition-colors duration-150 no-underline ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`
                                            }
                                        >
                                            Enrolled Students
                                        </NavLink>
                                    </div>
                                </div>
                            )}

                            {/* Search Bar */}
                            <div className="relative">
                                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search Courses"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-1.5 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all w-44"
                                />
                            </div>
                        </div>

                        {/* ── Right Side: User Info + Login/Logout ── */}
                        <div className="hidden md:flex items-center gap-3">
                            {loginStatus && (
                                <button
                                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors border-r border-gray-200 pr-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#userProfileModal"
                                >
                                    <User size={15} />
                                    <span><strong>{userRole}:</strong> {userEmail}</span>
                                </button>
                            )}

                            {!loginStatus ? (
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-200 no-underline"
                                >
                                    Login
                                </Link>
                            ) : (
                                <button
                                    onClick={onLogout}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:border-red-400 hover:text-red-500 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            )}
                        </div>

                        {/* ── Mobile Hamburger ── */}
                        <button
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* ── Mobile Dropdown Menu ── */}
                {menuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 shadow-lg">
                        <NavLink to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 no-underline" onClick={() => setMenuOpen(false)}>
                            Home
                        </NavLink>
                        <NavLink to="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 no-underline" onClick={() => setMenuOpen(false)}>
                            About Sunbeam
                        </NavLink>

                        {loginStatus && userRole === 'Student' && (
                            <NavLink to="/my-courses" className="text-sm font-semibold text-gray-700 hover:text-blue-600 no-underline" onClick={() => setMenuOpen(false)}>
                                My Courses
                            </NavLink>
                        )}

                        {loginStatus && userRole === 'Admin' && (
                            <NavLink to="/enrolled-students" className="text-sm font-semibold text-gray-700 hover:text-blue-600 no-underline" onClick={() => setMenuOpen(false)}>
                                Enrolled Students
                            </NavLink>
                        )}

                        {/* Mobile Search */}
                        <div className="relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search Courses"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                            />
                        </div>

                        {loginStatus && (
                            <p className="text-xs text-gray-500 border-t pt-2">
                                <strong>{userRole}:</strong> {userEmail}
                            </p>
                        )}

                        <div className="flex gap-2 mt-1">
                            {!loginStatus ? (
                                <Link
                                    to="/login"
                                    className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold no-underline"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            ) : (
                                <button
                                    onClick={() => { onLogout(); setMenuOpen(false); }}
                                    className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:border-red-400 hover:text-red-500 transition-all"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* ── User Profile Modal (Bootstrap) ── */}
            <div className="modal fade" id="userProfileModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-xl rounded-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="modal-header bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                            <h5 className="modal-title font-semibold">User Profile</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        {/* Modal Body */}
                        <div className="modal-body text-center p-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                                <User size={30} className="text-blue-500" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">{userRole} Profile</h4>
                            <p className="text-sm text-gray-500 mb-5">{userEmail}</p>

                            <div className="text-left border border-gray-100 rounded-xl overflow-hidden mb-5">
                                <div className="flex justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                                    <span className="text-sm text-gray-500 font-medium">Email</span>
                                    <span className="text-sm text-gray-800">{userEmail}</span>
                                </div>
                                <div className="flex justify-between px-4 py-3">
                                    <span className="text-sm text-gray-500 font-medium">Role</span>
                                    <span className="text-sm font-semibold text-blue-600">{userRole}</span>
                                </div>
                            </div>

                            {userRole === 'Student' && (
                                <button
                                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-sm hover:scale-105 transition-all shadow"
                                    data-bs-dismiss="modal"
                                    onClick={() => navigate('/change-password')}
                                >
                                    Change Password
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;