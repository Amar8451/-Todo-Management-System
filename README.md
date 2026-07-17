# TaskFlow – Professional Todo Management System

TaskFlow is a modern, responsive Todo Management System built using React.js, React Bootstrap, and a local JSON REST API as the data source. The application models a professional admin dashboard layout with task CRUD operations and analytics.

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

You can run the full stack either with a single command (recommended for local development) or start the API and web servers separately.

Recommended (single command)

```bash
npm run dev
```

This runs two processes concurrently:
- A local JSON Server mock API serving `db.json` on port `5000`.
- The Vite development server for the React frontend (usually at http://localhost:5173).

Start servers separately

- Start only the API server (useful for CI or when the frontend runs elsewhere):

```bash
npm run start:api
# or
npx json-server --watch db.json --port 5000
```

- Start only the web frontend:

```bash
npm run start:web
# or
vite
```

Testing the API

- After starting the API server, confirm it serves data:

```bash
curl http://localhost:5000/tasks
```

This should return the `tasks` array from `db.json`.

Notes for frontend API calls

- The API is available at `http://localhost:5000` while developing. You can either call the full URL in your frontend (e.g. `fetch('http://localhost:5000/tasks')`) or configure a dev proxy in Vite if you prefer not to hard-code the host/port.

---

## 🛠️ Technology Stack
- **Core**: React 19, JavaScript (ES6+), HTML5, CSS3 Custom Properties
- **Styling**: React Bootstrap, Bootstrap v5, Bootstrap Icons
- **HTTP Client**: Axios
- **Database**: Firebase Firestore (cloud) / JSON Server (local)
- **Charts**: Chart.js, React ChartJS 2
- **Interactions**: Canvas Confetti (celebration on completion)

---

## 🔥 Firebase Setup (For Vercel Deployment)

The application supports Firebase Firestore for cloud data persistence. When deployed to Vercel, Firebase will be used as the backend instead of the local JSON Server.

### Quick Start

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project: "Todo-Management-System"

2. **Enable Firestore Database**
   - Go to Build > Firestore Database
   - Create database in production mode (us-central1 region)

3. **Get Firebase Credentials**
   - Go to Settings > Project Settings
   - Copy the web app config

4. **Configure Locally**
   - Create `.env.local` in the project root:
     ```
     VITE_FIREBASE_API_KEY=your_key
     VITE_FIREBASE_AUTH_DOMAIN=your_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

5. **Configure Vercel**
   - Add the same environment variables to Vercel project settings
   - Vercel will automatically use them during build and deployment

📄 **Detailed Setup Guide**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

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
│   │   ├── main.jsx               # Entry-point mount configuration
│   │   └── styles.css             # Main styling system, themes & animations
│
├── db.json                    # Local REST database schema
├── package.json               # Configured dependencies & run scripts
└── README.md                  # System instruction guide
```
