// Mock Data Store

const DATA = {
    students: [
        { id: 1, name: "Sofia Martinez", email: "sofia@email.com", phone: "70012345", classes: [1, 2], status: "Active" },
        { id: 2, name: "Mateo Torrez", email: "mateo@email.com", phone: "70054321", classes: [3], status: "Active" },
        { id: 3, name: "Camila Vaca", email: "camila@email.com", phone: "60098765", classes: [1], status: "Inactive" },
        { id: 4, name: "Lucas Rojas", email: "lucas@email.com", phone: "75511223", classes: [2, 3], status: "Active" },
        { id: 5, name: "Isabella Flores", email: "isa@email.com", phone: "68844556", classes: [1], status: "Active" }
    ],
    
    classes: [
        { id: 1, name: "Pintura al Óleo", instructor: "Prof. Mendoza", schedule: "Lun/Mie 16:00", price: 350 },
        { id: 2, name: "Escultura en Arcilla", instructor: "Prof. Vargas", schedule: "Mar/Jue 17:00", price: 400 },
        { id: 3, name: "Dibujo Digital", instructor: "Prof. Chino", schedule: "Sab 09:00", price: 300 },
        { id: 4, name: "Acuarela Básica", instructor: "Prof. Lima", schedule: "Vie 15:00", price: 250 }
    ],
    
    income: [
        { id: 1, date: "2023-11-01", description: "Mensualidad - Sofia Martinez", category: "Tuition", amount: 750 },
        { id: 2, date: "2023-11-02", description: "Mensualidad - Mateo Torrez", category: "Tuition", amount: 300 },
        { id: 3, date: "2023-11-03", description: "Venta de Materiales", category: "Store", amount: 150 },
        { id: 4, date: "2023-11-05", description: "Mensualidad - Lucas Rojas", category: "Tuition", amount: 700 }
    ],
    
    expenses: [
        { id: 1, date: "2023-11-01", description: "Alquiler Local", category: "Fixed", amount: 2500 },
        { id: 2, date: "2023-11-05", description: "Material de Arte", category: "Supplies", amount: 800 },
        { id: 3, date: "2023-11-07", description: "Pago Limpieza", category: "Service", amount: 200 },
        { id: 4, date: "2023-11-10", description: "Publicidad Facebook", category: "Marketing", amount: 350 }
    ]
};

// Data Helpers
const DataManager = {
    getStudents: () => DATA.students,
    getClasses: () => DATA.classes,
    getIncome: () => DATA.income,
    getExpenses: () => DATA.expenses,
    
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(amount);
    },
    
    getStats: () => {
        const totalIncome = DATA.income.reduce((sum, item) => sum + item.amount, 0);
        const totalExpenses = DATA.expenses.reduce((sum, item) => sum + item.amount, 0);
        const balance = totalIncome - totalExpenses;
        const activeStudents = DATA.students.filter(s => s.status === "Active").length;
        
        return { totalIncome, totalExpenses, balance, activeStudents };
    }
};
