// Core Application Logic

class App {
    constructor() {
        this.app = document.getElementById('app-content');
        this.init();
    }

    init() {
        this.setupNavigation();
        this.renderDashboard(); // Default view
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Active State
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Routing
                const view = link.getAttribute('href').substring(1); // Remove #
                this.router(view);
            });
        });
    }

    router(view) {
        this.app.style.opacity = '0';
        setTimeout(() => {
            switch (view) {
                case 'dashboard': this.renderDashboard(); break;
                case 'expenses': this.renderExpenses(); break;
                case 'income': this.renderIncome(); break;
                case 'students': this.renderStudents(); break;
                case 'classes': this.renderClasses(); break;
                default: this.renderDashboard();
            }
            this.app.style.opacity = '1';
        }, 300);
    }

    // --- VIEWS ---

    renderDashboard() {
        const stats = DataManager.getStats();

        const html = `
            <div class="header">
                <div class="page-title">
                    <h1>Dashboard</h1>
                    <span>Bienvenido, Administrador</span>
                </div>
                <div class="user-profile">
                    <button class="btn-primary"><i class="fas fa-plus"></i> Nuevo Registro</button>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon bg-purple"><i class="fas fa-wallet"></i></div>
                        <i class="fas fa-ellipsis-h" style="color:var(--text-muted)"></i>
                    </div>
                    <div class="stat-value">${DataManager.formatCurrency(stats.totalIncome)}</div>
                    <div class="stat-label">Ingresos del Mes</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon bg-orange"><i class="fas fa-file-invoice-dollar"></i></div>
                        <i class="fas fa-ellipsis-h" style="color:var(--text-muted)"></i>
                    </div>
                    <div class="stat-value">${DataManager.formatCurrency(stats.totalExpenses)}</div>
                    <div class="stat-label">Gastos del Mes</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon bg-blue"><i class="fas fa-chart-pie"></i></div>
                        <i class="fas fa-ellipsis-h" style="color:var(--text-muted)"></i>
                    </div>
                    <div class="stat-value">${DataManager.formatCurrency(stats.balance)}</div>
                    <div class="stat-label">Balance Neto</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon bg-green"><i class="fas fa-users"></i></div>
                        <i class="fas fa-ellipsis-h" style="color:var(--text-muted)"></i>
                    </div>
                    <div class="stat-value">${stats.activeStudents}</div>
                    <div class="stat-label">Alumnos Activos</div>
                </div>
            </div>

            <div class="section-container">
                <div class="section-header">
                    <h2>Actividad Reciente</h2>
                </div>
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th class="text-right">Monto</th>
                            </tr>
                        </thead>
                        <tbody id="recent-activity-table">
                            <!-- Populated via JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.app.innerHTML = html;

        // Populate specific table rows for dashboard (mix of income/expenses for demo)
        const recentTrans = [...DataManager.getIncome().map(i => ({ ...i, type: 'in' })), ...DataManager.getExpenses().map(e => ({ ...e, type: 'out' }))]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        const tableBody = document.getElementById('recent-activity-table');
        if (tableBody) {
            tableBody.innerHTML = recentTrans.map(t => `
                <tr>
                    <td>${t.date}</td>
                    <td>${t.description}</td>
                    <td><span class="status-badge ${t.type === 'in' ? 'status-paid' : 'status-pending'}">${t.category}</span></td>
                    <td class="text-right ${t.type === 'in' ? 'text-success' : 'text-danger'}">
                        ${t.type === 'in' ? '+' : '-'} ${DataManager.formatCurrency(t.amount)}
                    </td>
                </tr>
            `).join('');
        }
    }

    renderExpenses() {
        const html = `
            <div class="header">
                <div class="page-title">
                    <h1>Control de Gastos</h1>
                    <span>Registro y control de egresos</span>
                </div>
                <button class="btn-primary"><i class="fas fa-plus"></i> Registrar Gasto</button>
            </div>
            
            <div class="section-container">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th class="text-right">Monto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${DataManager.getExpenses().map(e => `
                                <tr>
                                    <td>${e.date}</td>
                                    <td>${e.description}</td>
                                    <td><span class="status-badge status-pending">${e.category}</span></td>
                                    <td class="text-right text-danger">-${DataManager.formatCurrency(e.amount)}</td>
                                    <td><i class="fas fa-ellipsis-v" style="cursor:pointer; color:var(--text-muted)"></i></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        this.app.innerHTML = html;
    }

    renderIncome() {
        const html = `
            <div class="header">
                <div class="page-title">
                    <h1>Ingresos</h1>
                    <span>Registro de pagos y mensualidades</span>
                </div>
                <button class="btn-primary"><i class="fas fa-plus"></i> Registrar Ingreso</button>
            </div>
            
            <div class="section-container">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th class="text-right">Monto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${DataManager.getIncome().map(i => `
                                <tr>
                                    <td>${i.date}</td>
                                    <td>${i.description}</td>
                                    <td><span class="status-badge status-paid">${i.category}</span></td>
                                    <td class="text-right text-success">+${DataManager.formatCurrency(i.amount)}</td>
                                    <td><i class="fas fa-ellipsis-v" style="cursor:pointer; color:var(--text-muted)"></i></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        this.app.innerHTML = html;
    }

    renderStudents() {
        const html = `
            <div class="header">
                <div class="page-title">
                    <h1>Lista de Alumnos</h1>
                    <span>Gestión de estudiantes inscritos</span>
                </div>
                <button class="btn-primary"><i class="fas fa-user-plus"></i> Nuevo Alumno</button>
            </div>
            
            <div class="section-container">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email/Teléfono</th>
                                <th>Clases</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${DataManager.getStudents().map(s => `
                                <tr>
                                    <td>#${s.id}</td>
                                    <td>
                                        <div style="font-weight:600">${s.name}</div>
                                    </td>
                                    <td>
                                        <div style="font-size:0.85rem; color:var(--text-muted)">${s.email}</div>
                                        <div style="font-size:0.85rem">${s.phone}</div>
                                    </td>
                                    <td>${s.classes.length} Clase(s)</td>
                                    <td><span class="status-badge ${s.status === 'Active' ? 'status-paid' : 'status-pending'}">${s.status}</span></td>
                                    <td><i class="fas fa-edit" style="cursor:pointer; color:var(--text-muted)"></i></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        this.app.innerHTML = html;
    }

    renderClasses() {
        const html = `
            <div class="header">
                <div class="page-title">
                    <h1>Clases de Arte</h1>
                    <span>Catálogo de cursos y horarios</span>
                </div>
                <button class="btn-primary"><i class="fas fa-plus"></i> Nueva Clase</button>
            </div>
            
             <div class="dashboard-grid">
                ${DataManager.getClasses().map(c => `
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-icon bg-blue"><i class="fas fa-palette"></i></div>
                            <span style="font-weight:600; color:var(--primary)">${DataManager.formatCurrency(c.price)}</span>
                        </div>
                        <div class="stat-value" style="font-size:1.5rem">${c.name}</div>
                        <div class="stat-label" style="margin-bottom:1rem">${c.instructor}</div>
                        <div style="display:flex; align-items:center; gap:0.5rem; color:var(--text-muted); font-size:0.9rem">
                            <i class="far fa-clock"></i> ${c.schedule}
                        </div>
                    </div>
                `).join('')}
             </div>
        `;
        this.app.innerHTML = html;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
