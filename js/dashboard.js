// dashboard.js
(function() {
    const SESSION_KEY = 'dashboard_session';
    const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    
    function isAuthenticated() {
        const session = JSON.parse(localStorage.getItem(SESSION_KEY));
        if (!session) return false;
        return Date.now() - session.timestamp < SESSION_DURATION;
    }
    
    function login(password) {
        // Simple hash for demo - in production use proper auth
        if (password === 'Petalscroll2026') {
            localStorage.setItem(SESSION_KEY, JSON.stringify({
                timestamp: Date.now()
            }));
            return true;
        }
        return false;
    }
    
    function logout() {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = 'dashboard.html';
    }
    
    // Export for use
    window.DashboardAuth = { isAuthenticated, login, logout };
})();