/**
 * DEC AI Foundations - Router
 * Very simple hash-based router for SPA navigation.
 */

const Router = {
    routes: {},
    currentRoute: null,

    add(path, handler) {
        this.routes[path] = handler;
    },

    navigate(path) {
        window.location.hash = path;
    },

    init() {
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        // Initial route
        if (window.location.hash === '') {
            this.navigate('/dashboard');
        } else {
            this.handleHashChange();
        }
    },

    handleHashChange() {
        const path = window.location.hash.slice(1) || '/dashboard';
        const handler = this.routes[path];

        this.updateNavLinks(path);

        // Auto-close sidebar on mobile
        if (window.innerWidth <= 768) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
        const viewContainer = document.getElementById('view-container');
        viewContainer.innerHTML = ''; // Clear current view

        if (handler) {
            this.currentRoute = path;
            const routeName = path.substring(1); // remove slash
            document.getElementById('topbar-title').innerText = this.formatTitle(routeName);
            handler(viewContainer);
        } else {
            viewContainer.innerHTML = `
                <div class="card text-center" style="padding: 3rem;">
                    <h3>404 - Module Not Found</h3>
                    <p class="mt-4">The module you are looking for is under construction or doesn't exist.</p>
                    <button class="btn btn-primary mt-4" onclick="window.location.hash='/dashboard'">Back to Dashboard</button>
                </div>
            `;
        }
    },

    updateNavLinks(currentPath) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentPath) {
                link.classList.add('active');
            }
        });
    },
    
    formatTitle(path) {
        if(path === 'productivity') return 'AI Productivity Tracker';
        if(path === 'module1') return 'Module 1: Prompting & Docs';
        if(path === 'module2') return 'Module 2: Data Analysis';
        if(path === 'module3') return 'Module 3: Safe AI Usage';
        if(path === 'module4') return 'Module 4: Capstone Assistant';
        if(path === 'case-studies') return 'Enterprise Case Studies';
        return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
    }
};

window.Router = Router;
