import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, SlidersHorizontal, Star, Wrench, RotateCcw,
  ChevronRight, Loader2, AlertCircle, X
} from 'lucide-react';
import WebLayout from '../layouts/WebLayout';

// ── Constants ─────────────────────────────────────────────────────────────────
const DEVICE_CATEGORIES = [
  'Mobile Phones', 'Laptops & PCs', 'Tablets',
  'Home Appliances', 'Electronics', 'Mechanical',
];

const RATING_OPTIONS = [
  { value: 0,   label: 'All ratings' },
  { value: 4.5, label: '4.5+ ★' },
  { value: 4,   label: '4+ ★' },
  { value: 3.5, label: '3.5+ ★' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const StarRating = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        size={size}
        className={i <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}
      />
    ))}
  </div>
);

const TechnicianSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden animate-pulse">
    <div className="h-48 bg-slate-200 dark:bg-slate-700" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
      <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded mt-4" />
    </div>
  </div>
);

const TechnicianCard = ({ technician, onViewProfile }) => {
  const minPrice = technician.servicesOffered?.length
    ? Math.min(...technician.servicesOffered.map(s => s.price))
    : null;

  return (
    <article className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      {/* Profile image */}
      <div className="relative h-48 bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center overflow-hidden">
        {technician.profileImage ? (
          <img
            src={technician.profileImage}
            alt={`${technician.userId?.name ?? 'Technician'} profile`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <Wrench className="text-sky-300 dark:text-sky-700" size={48} />
        )}
        {technician.verificationStatus === 'verified' && (
          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            ✓ Verified
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">
            {technician.userId?.name ?? 'Technician'}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {technician.yearsExperience} years experience
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={technician.rating} />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {technician.rating?.toFixed(1)} ({technician.reviewCount} reviews)
          </span>
        </div>

        {/* Bio */}
        {technician.bio && (
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
            {technician.bio}
          </p>
        )}

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5">
          {technician.deviceCategories?.slice(0, 3).map(cat => (
            <span
              key={cat}
              className="px-2 py-0.5 bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-400 text-xs font-medium rounded-full border border-sky-100 dark:border-sky-900"
            >
              {cat}
            </span>
          ))}
          {technician.deviceCategories?.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded-full">
              +{technician.deviceCategories.length - 3}
            </span>
          )}
        </div>

        {/* Price */}
        {minPrice !== null && (
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            From <span className="text-sky-600 dark:text-sky-400">${minPrice}</span>
          </p>
        )}

        <button
          onClick={() => onViewProfile(technician._id)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors text-sm mt-2"
          aria-label={`View ${technician.userId?.name ?? 'technician'}'s profile`}
        >
          View Profile
          <ChevronRight size={15} />
        </button>
      </div>
    </article>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const FindTechnician = () => {
  const navigate = useNavigate();

  const [technicians, setTechnicians] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category:    '',
    minRating:   0,
    searchQuery: '',
    maxPrice:    '',
  });

  const fetchTechnicians = useCallback(async (activeFilters = filters) => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({ verified: 'true' });
      if (activeFilters.category)    params.set('category',  activeFilters.category);
      if (activeFilters.minRating > 0) params.set('rating',  String(activeFilters.minRating));
      if (activeFilters.searchQuery) params.set('query',     activeFilters.searchQuery);
      if (activeFilters.maxPrice)    params.set('maxPrice',  activeFilters.maxPrice);

      const res  = await fetch(`/api/v1/technicians?${params}`);
      const data = await res.json();

      if (data.status) {
        setTechnicians(data.technicians ?? []);
      } else {
        setError(data.message ?? 'Failed to load technicians');
      }
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTechnicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTechnicians(filters);
  };

  const handleReset = () => {
    const reset = { category: '', minRating: 0, searchQuery: '', maxPrice: '' };
    setFilters(reset);
    fetchTechnicians(reset);
  };

  const hasActiveFilters = filters.category || filters.minRating > 0 || filters.searchQuery || filters.maxPrice;

  return (
    <WebLayout>
      {/* Page hero */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-500 text-white py-14 px-4 -mx-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Find Expert Technicians
          </h1>
          <p className="text-sky-100 text-lg max-w-xl mx-auto">
            Connect with verified professionals for all your repair needs.
          </p>
        </div>
      </section>

      <div id="main-content" className="max-w-7xl mx-auto py-10 space-y-6">

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, skill, or service…"
              value={filters.searchQuery}
              onChange={e => handleFilterChange('searchQuery', e.target.value)}
              className="w-full pl-9 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Search technicians"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(v => !v)}
            aria-expanded={showFilters}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border font-medium text-sm transition-colors ${
              showFilters || hasActiveFilters
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400'
                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-sky-400'
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && (
              <span className="bg-sky-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">!</span>
            )}
          </button>
        </form>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Device category
                </label>
                <select
                  value={filters.category}
                  onChange={e => handleFilterChange('category', e.target.value)}
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">All categories</option>
                  {DEVICE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Min rating */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Minimum rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={e => handleFilterChange('minRating', parseFloat(e.target.value))}
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {RATING_OPTIONS.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Max price */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Max price per service ($)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 100"
                  value={filters.maxPrice}
                  onChange={e => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Reset */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw size={14} />
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result info bar */}
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>
            {loading ? 'Searching…' : `${technicians.length} technician${technicians.length !== 1 ? 's' : ''} found`}
          </span>
          {hasActiveFilters && !loading && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-sky-600 hover:underline"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl p-4 text-sm" role="alert">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Skeleton grid */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1,2,3,4].map(i => <TechnicianSkeleton key={i} />)}
          </div>
        )}

        {/* Technician grid */}
        {!loading && technicians.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {technicians.map(tech => (
              <TechnicianCard
                key={tech._id}
                technician={tech}
                onViewProfile={id => navigate(`/technician-profile/${id}`)}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && technicians.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              No technicians found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              Try adjusting your filters or search term to find the right technician.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors"
            >
              <RotateCcw size={15} />
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </WebLayout>
  );
};

export default FindTechnician;
