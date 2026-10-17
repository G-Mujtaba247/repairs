import React, { useEffect, useState } from 'react';
import { colors, spacing, typography } from '../resources/designSystem';
import { useNavigate } from 'react-router-dom';

const FindTechnician = () => {
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [filters, setFilters] = useState({
    category: '',
    minRating: 0,
    searchQuery: '',
    maxPrice: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  const deviceCategories = [
    'Mobile Phones',
    'Laptops & PCs',
    'Tablets',
    'Home Appliances',
    'Electronics',
    'Mechanical'
  ];

  const ratings = [
    { value: 0, label: 'All ratings' },
    { value: 4.5, label: '4.5+ stars' },
    { value: 4, label: '4+ stars' },
    { value: 3.5, label: '3.5+ stars' },
  ];

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async (searchFilters = filters) => {
    setLoading(true);
    setError('');
    
    try {
      let url = '/api/v1/technicians?verified=true';

      if (searchFilters.category) {
        url += `&category=${encodeURIComponent(searchFilters.category)}`;
      }

      if (searchFilters.minRating > 0) {
        url += `&rating=${searchFilters.minRating}`;
      }

      if (searchFilters.searchQuery) {
        url += `&query=${encodeURIComponent(searchFilters.searchQuery)}`;
      }

      if (searchFilters.maxPrice) {
        url += `&maxPrice=${searchFilters.maxPrice}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status) {
        setTechnicians(data.technicians || []);
      } else {
        setError(data.message || 'Failed to load technicians');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while loading technicians');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTechnicians(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = { category: '', minRating: 0, searchQuery: '', maxPrice: '' };
    setFilters(resetFilters);
    fetchTechnicians(resetFilters);
  };

  const handleViewProfile = (technicianId) => {
    navigate(`/technician-profile/${technicianId}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background, paddingBottom: spacing.xl }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: colors.primary[500], color: 'white', padding: `${spacing.xl} ${spacing.lg}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.md }}>
            Find Expert Technicians
          </h1>
          <p style={{ fontSize: typography.fontSize.lg, opacity: 0.9 }}>
            Connect with verified professionals for all your repair needs
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: spacing.xl }}>
        {/* Search & Filters Section */}
        <div style={{ marginBottom: spacing.xl }}>
          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ marginBottom: spacing.lg }}>
            <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md }}>
              <input
                type="text"
                placeholder="Search technicians by name, service, or skill..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                style={{
                  flex: 1,
                  padding: spacing.md,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '0.5rem',
                  fontSize: typography.fontSize.base
                }}
              />
              <button
                type="submit"
                style={{
                  padding: `${spacing.md} ${spacing.lg}`,
                  backgroundColor: colors.primary[500],
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: typography.fontWeight.semibold,
                  cursor: 'pointer',
                  transition: '200ms'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = colors.primary[600]}
                onMouseOut={(e) => e.target.style.backgroundColor = colors.primary[500]}
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  padding: `${spacing.md} ${spacing.lg}`,
                  backgroundColor: colors.neutral[200],
                  color: colors.text.primary,
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: typography.fontWeight.semibold,
                  cursor: 'pointer',
                  transition: '200ms'
                }}
              >
                {showFilters ? 'Hide Filters' : 'Filters'}
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div
                style={{
                  padding: spacing.lg,
                  backgroundColor: colors.neutral[50],
                  borderRadius: '0.5rem',
                  border: `1px solid ${colors.border}`,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: spacing.md
                }}
              >
                {/* Category Filter */}
                <div>
                  <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                    Device Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    style={{
                      width: '100%',
                      padding: spacing.md,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '0.5rem',
                      fontSize: typography.fontSize.base
                    }}
                  >
                    <option value="">All Categories</option>
                    {deviceCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                    Minimum Rating
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                    style={{
                      width: '100%',
                      padding: spacing.md,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '0.5rem',
                      fontSize: typography.fontSize.base
                    }}
                  >
                    {ratings.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                    Max Price per Service
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 100"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    style={{
                      width: '100%',
                      padding: spacing.md,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '0.5rem',
                      fontSize: typography.fontSize.base
                    }}
                  />
                </div>

                {/* Reset Button */}
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    style={{
                      width: '100%',
                      padding: spacing.md,
                      backgroundColor: colors.neutral[300],
                      color: colors.text.primary,
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: typography.fontWeight.medium,
                      cursor: 'pointer',
                      transition: '200ms'
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Results Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
            <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.base }}>
              Found {loading ? '...' : technicians.length} technician{technicians.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: spacing.md,
              marginBottom: spacing.lg,
              backgroundColor: '#fee2e2',
              border: `1px solid ${colors.error}`,
              borderRadius: '0.5rem',
              color: colors.error,
              fontSize: typography.fontSize.sm
            }}
          >
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: spacing.xl }}>
            <p style={{ color: colors.text.secondary }}>Loading technicians...</p>
          </div>
        )}

        {/* Technician Grid */}
        {!loading && technicians.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: spacing.lg
            }}
          >
            {technicians.map((technician) => (
              <div
                key={technician._id}
                style={{
                  backgroundColor: colors.card,
                  borderRadius: '0.75rem',
                  border: `1px solid ${colors.border}`,
                  overflow: 'hidden',
                  transition: '200ms',
                  boxShadow: colors.shadows.sm
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = colors.shadows.lg;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = colors.shadows.sm;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Profile Image */}
                <div
                  style={{
                    height: '200px',
                    backgroundColor: colors.primary[50],
                    backgroundImage: technician.profileImage ? `url(${technician.profileImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    color: colors.primary[300]
                  }}
                >
                  {!technician.profileImage && '👨‍🔧'}
                </div>

                {/* Content */}
                <div style={{ padding: spacing.lg }}>
                  <h3 style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, marginBottom: spacing.sm }}>
                    {technician.userId?.name || 'Technician'}
                  </h3>

                  {/* Rating */}
                  <div style={{ marginBottom: spacing.md, display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          style={{
                            color: i < Math.floor(technician.rating) ? colors.warning : colors.neutral[300],
                            fontSize: '16px'
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>
                      {technician.rating.toFixed(1)} ({technician.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Bio */}
                  <p
                    style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.text.secondary,
                      marginBottom: spacing.md,
                      minHeight: '40px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {technician.bio}
                  </p>

                  {/* Experience */}
                  <p
                    style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.text.secondary,
                      marginBottom: spacing.md
                    }}
                  >
                    <strong>{technician.yearsExperience}</strong> years experience
                  </p>

                  {/* Categories */}
                  <div style={{ marginBottom: spacing.md }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.sm }}>
                      {technician.deviceCategories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          style={{
                            padding: `${spacing.xs} ${spacing.sm}`,
                            backgroundColor: colors.primary[50],
                            color: colors.primary[700],
                            borderRadius: '9999px',
                            fontSize: typography.fontSize.xs,
                            fontWeight: typography.fontWeight.medium
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                      {technician.deviceCategories.length > 3 && (
                        <span
                          style={{
                            padding: `${spacing.xs} ${spacing.sm}`,
                            backgroundColor: colors.neutral[200],
                            color: colors.text.secondary,
                            borderRadius: '9999px',
                            fontSize: typography.fontSize.xs
                          }}
                        >
                          +{technician.deviceCategories.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price Range */}
                  {technician.servicesOffered.length > 0 && (
                    <p style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary, marginBottom: spacing.md }}>
                      💰 From ${Math.min(...technician.servicesOffered.map(s => s.price))}
                    </p>
                  )}

                  {/* View Profile Button */}
                  <button
                    onClick={() => handleViewProfile(technician._id)}
                    style={{
                      width: '100%',
                      padding: spacing.md,
                      backgroundColor: colors.primary[500],
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: typography.fontWeight.semibold,
                      cursor: 'pointer',
                      transition: '200ms'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = colors.primary[600]}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.primary[500]}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && technicians.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: `${spacing.xl} ${spacing.lg}` }}>
            <div style={{ fontSize: '48px', marginBottom: spacing.md }}>🔍</div>
            <h3 style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.sm }}>
              No technicians found
            </h3>
            <p style={{ color: colors.text.secondary, marginBottom: spacing.lg }}>
              Try adjusting your filters or search criteria
            </p>
            <button
              onClick={handleResetFilters}
              style={{
                padding: `${spacing.md} ${spacing.lg}`,
                backgroundColor: colors.primary[500],
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: typography.fontWeight.semibold,
                cursor: 'pointer',
                transition: '200ms'
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTechnician;
