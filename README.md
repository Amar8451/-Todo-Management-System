# TaskFlow – Professional Todo Management System

TaskFlow is a modern, responsive Todo Management System built using React.js, React Bootstrap, and a local JSON REST API as the data source. The application models a professional admin dashboard layout with statistics, charts, CRUD operations, searching, filtering, and instant notifications.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed on your machine.

### Installation
1. Clone or extract the project directory and open it in your terminal.
2. Install the node packages:
   ```bash
   npm install --legacy-peer-deps
   ```

### Running the Application

To run the full stack, you need to spin up the local mock server and the Vite React development server:

1. **Start the API Server**:
   Launch the JSON Server mock API on port `5000`:
   ```bash
   npx json-server --watch db.json --port 5000
   ```

2. **Start the React Application**:
   In a separate terminal tab, run the Vite development server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:5173/](http://localhost:5173/) to interact with the application!*

---

## 🛠️ Technology Stack
- **Core**: React 19, JavaScript (ES6+), HTML5, CSS3 Custom Properties
- **Styling**: React Bootstrap, Bootstrap v5, Bootstrap Icons
- **HTTP Client**: Axios
- **Database Server**: JSON Server
- **Charts**: Chart.js, React ChartJS 2
- **Interactions**: Canvas Confetti (celebration on completion)

---

## 🎹 Keyboard Shortcuts

Boost your productivity with built-in hotkeys available from any page:

| Shortcut | Description |
|---|---|
| `/` or `s` | Focus Search Input |
| `Shift` + `N` / `C` | Create New Task |
| `Shift` + `D` | Navigate to Dashboard |
| `Shift` + `A` | Navigate to All Tasks |

---

## 📂 Folder Structure
```
taskflow/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky header with alerts bell & search
│   │   ├── Sidebar.jsx        # Navigation sidebar with real-time counters
│   │   ├── Footer.jsx         # Footer containing shortcuts cheat sheet
│   │   ├── TaskCard.jsx       # Grid card representation of tasks
│   │   ├── TaskTable.jsx      # Tabular representation of tasks
│   │   ├── TaskForm.jsx       # Validation forms for adding/editing tasks
│   │   ├── SearchBar.jsx      # Integrated search input field
│   │   ├── FilterBar.jsx      # Category, status & priority dropdowns
│   │   ├── StatusBadge.jsx    # Badges for status/priority pills
│   │   ├── ConfirmModal.jsx   # Deletion safety check modal
│   │   └── Loader.jsx         # Loading spinner
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx      # Metrics stats and data charts
│   │   ├── AllTasks.jsx       # Paginated task list page
│   │   ├── AddTask.jsx        # Task creation page
│   │   ├── EditTask.jsx       # Task update page
│   │   ├── Completed.jsx      # Filtered Completed tasks page
│   │   ├── Pending.jsx        # Filtered Pending tasks page
│   │   ├── HighPriority.jsx   # Filtered High priority tasks page
│   │   ├── Settings.jsx       # Shortcuts cheat sheet page
│   │   └── NotFound.jsx       # 404 Error page
│   │
│   ├── services/
│   │   └── taskService.js     # Axios client CRUD endpoints
│   │
│   ├── context/
│   │   └── TaskContext.jsx    # Global state, toast alerts, activity feed
│   │
│   ├── hooks/
│   │   └── useTasks.js        # Global context hook consumer
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx      # React Router DOM path matching
│   │
│   ├── utils/
│   │   └── helpers.js         # Date formatting and overdue calculations
│   │
│   ├── App.jsx                # Layout wrapper & hotkey listeners
│   ├── main.jsx               # Entry-point mount configuration
│   └── styles.css             # Main styling system, themes & animations
│
├── db.json                    # Local REST database schema
├── package.json               # Configured dependencies & run scripts
└── README.md                  # System instruction guide
```
