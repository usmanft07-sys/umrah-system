// ============================================
// UMRAHFLEX API SERVICE
// Reusable API calls for all pages
// ============================================

const API_BASE_URL = 'https://api.umrahflex.com/api';

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Show loading indicator
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-3xl text-emerald-600"></i></div>';
    }
}

// Show error message
function showError(message, elementId = null) {
    console.error('Error:', message);
    
    if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    ${message}
                </div>
            `;
        }
    }
    
    // Also show as alert
    alert('Error: ' + message);
}

// Show success message
function showSuccess(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    toast.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Format currency
function formatCurrency(amount, currency = 'PKR') {
    return `${currency} ${amount.toLocaleString('en-PK')}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    });
}

// ============================================
// PACKAGES API
// ============================================

const PackagesAPI = {
    // Get all packages
    async getAll() {
        try {
            const response = await fetch(`${API_BASE_URL}/packages`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            showError('Failed to load packages: ' + error.message);
            return [];
        }
    },

    // Get single package
    async getById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/packages/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            showError('Failed to load package: ' + error.message);
            return null;
        }
    },

    // Create package
    async create(packageData) {
        try {
            const response = await fetch(`${API_BASE_URL}/packages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(packageData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to create package');
            }
            
            const result = await response.json();
            showSuccess('Package created successfully!');
            return result;
        } catch (error) {
            showError('Failed to create package: ' + error.message);
            return null;
        }
    },

    // Update package
    async update(id, packageData) {
        try {
            const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(packageData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to update package');
            }
            
            const result = await response.json();
            showSuccess('Package updated successfully!');
            return result;
        } catch (error) {
            showError('Failed to update package: ' + error.message);
            return null;
        }
    },

    // Delete package
    async delete(id) {
        if (!confirm('Are you sure you want to delete this package?')) {
            return false;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            showSuccess('Package deleted successfully!');
            return true;
        } catch (error) {
            showError('Failed to delete package: ' + error.message);
            return false;
        }
    }
};

// ============================================
// TEAMS API
// ============================================

const TeamsAPI = {
    // Get all team members
    async getAll() {
        try {
            const response = await fetch(`${API_BASE_URL}/teams`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            showError('Failed to load team members: ' + error.message);
            return [];
        }
    },

    // Get single team member
    async getById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/teams/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            showError('Failed to load team member: ' + error.message);
            return null;
        }
    },

    // Create team member
    async create(teamData) {
        try {
            const response = await fetch(`${API_BASE_URL}/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to create team member');
            }
            
            const result = await response.json();
            showSuccess('Team member added successfully!');
            return result;
        } catch (error) {
            showError('Failed to add team member: ' + error.message);
            return null;
        }
    },

    // Update team member
    async update(id, teamData) {
        try {
            const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to update team member');
            }
            
            const result = await response.json();
            showSuccess('Team member updated successfully!');
            return result;
        } catch (error) {
            showError('Failed to update team member: ' + error.message);
            return null;
        }
    },

    // Delete team member
    async delete(id) {
        if (!confirm('Are you sure you want to delete this team member?')) {
            return false;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            showSuccess('Team member deleted successfully!');
            return true;
        } catch (error) {
            showError('Failed to delete team member: ' + error.message);
            return false;
        }
    }
};

// ============================================
// OFFICES API
// ============================================

const OfficesAPI = {
    // Get all offices
    async getAll() {
        try {
            const response = await fetch(`${API_BASE_URL}/offices`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            showError('Failed to load offices: ' + error.message);
            return [];
        }
    },

    // Get single office
    async getById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/offices/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            showError('Failed to load office: ' + error.message);
            return null;
        }
    },

    // Create office
    async create(officeData) {
        try {
            const response = await fetch(`${API_BASE_URL}/offices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(officeData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to create office');
            }
            
            const result = await response.json();
            showSuccess('Office created successfully!');
            return result;
        } catch (error) {
            showError('Failed to create office: ' + error.message);
            return null;
        }
    },

    // Update office
    async update(id, officeData) {
        try {
            const response = await fetch(`${API_BASE_URL}/offices/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(officeData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to update office');
            }
            
            const result = await response.json();
            showSuccess('Office updated successfully!');
            return result;
        } catch (error) {
            showError('Failed to update office: ' + error.message);
            return null;
        }
    },

    // Delete office
    async delete(id) {
        if (!confirm('Are you sure you want to delete this office?')) {
            return false;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/offices/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            showSuccess('Office deleted successfully!');
            return true;
        } catch (error) {
            showError('Failed to delete office: ' + error.message);
            return false;
        }
    }
};

// ============================================
// LEADS API
// ============================================

const LeadsAPI = {
    // Get all leads
    async getAll() {
        try {
            const response = await fetch(`${API_BASE_URL}/leads`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            showError('Failed to load leads: ' + error.message);
            return [];
        }
    },

    // Get single lead
    async getById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/leads/${id}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            showError('Failed to load lead: ' + error.message);
            return null;
        }
    },

    // Update lead
    async update(id, leadData) {
        try {
            const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leadData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to update lead');
            }
            
            const result = await response.json();
            showSuccess('Lead updated successfully!');
            return result;
        } catch (error) {
            showError('Failed to update lead: ' + error.message);
            return null;
        }
    },

    // Get leads by status
    async getByStatus(status) {
        try {
            const response = await fetch(`${API_BASE_URL}/leads?status=${status}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            showError('Failed to load leads: ' + error.message);
            return [];
        }
    }
};

// ============================================
// DASHBOARD STATS API
// ============================================

const DashboardAPI = {
    // Get dashboard statistics
    async getStats() {
        try {
            const [packages, teams, offices, leads] = await Promise.all([
                PackagesAPI.getAll(),
                TeamsAPI.getAll(),
                OfficesAPI.getAll(),
                LeadsAPI.getAll()
            ]);
            
            const stats = {
                totalPackages: packages.length,
                activePackages: packages.filter(p => p.status === 'Active').length,
                totalTeam: teams.length,
                activeTeam: teams.filter(t => t.is_active).length,
                totalOffices: offices.length,
                activeOffices: offices.filter(o => o.status === 'active').length,
                totalLeads: leads.length,
                newLeads: leads.filter(l => l.status === 'new').length,
                contactedLeads: leads.filter(l => l.status === 'contacted').length,
                dealsWon: leads.filter(l => l.status === 'deal_done').length,
                leadsByAirport: {
                    Lahore: leads.filter(l => l.departure_airport === 'Lahore').length,
                    Karachi: leads.filter(l => l.departure_airport === 'Karachi').length,
                    Islamabad: leads.filter(l => l.departure_airport === 'Islamabad').length
                },
                leadsByStatus: {
                    new: leads.filter(l => l.status === 'new').length,
                    contacted: leads.filter(l => l.status === 'contacted').length,
                    negotiating: leads.filter(l => l.status === 'negotiating').length,
                    deal_done: leads.filter(l => l.status === 'deal_done').length,
                    follow_up: leads.filter(l => l.status === 'follow_up').length,
                    lost: leads.filter(l => l.status === 'lost').length
                }
            };
            
            return stats;
        } catch (error) {
            showError('Failed to load dashboard stats: ' + error.message);
            return null;
        }
    }
};

// ============================================
// EXPORT FOR USE IN HTML
// ============================================
window.API = {
    Packages: PackagesAPI,
    Teams: TeamsAPI,
    Offices: OfficesAPI,
    Leads: LeadsAPI,
    Dashboard: DashboardAPI,
    Utils: {
        showLoading,
        showError,
        showSuccess,
        formatCurrency,
        formatDate
    }
};
