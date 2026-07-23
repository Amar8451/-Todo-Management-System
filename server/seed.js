import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';
import Activity from './models/Activity.js';

dotenv.config();

const tasks = [
  { title: 'Build REST API with Node.js', description: 'Design and implement a full RESTful API using Express and MongoDB for the backend service.', priority: 'High', status: 'Completed', category: 'Development', dueDate: '2026-07-10', createdAt: '2026-07-01' },
  { title: 'Design Dashboard UI', description: 'Create a modern, responsive dashboard with charts and analytics widgets using Figma.', priority: 'High', status: 'Completed', category: 'Design', dueDate: '2026-07-12', createdAt: '2026-07-02' },
  { title: 'Write Project Documentation', description: 'Document all API endpoints, data models, and setup instructions in a comprehensive README.', priority: 'Medium', status: 'Pending', category: 'Documentation', dueDate: '2026-08-05', createdAt: '2026-07-03' },
  { title: 'Set Up CI/CD Pipeline', description: 'Configure GitHub Actions for automated testing, linting, and deployment to staging environment.', priority: 'High', status: 'Pending', category: 'DevOps', dueDate: '2026-07-28', createdAt: '2026-07-04' },
  { title: 'Conduct User Research', description: 'Interview 10 target users to gather insights on pain points and desired features for the product.', priority: 'Medium', status: 'Completed', category: 'Research', dueDate: '2026-07-15', createdAt: '2026-07-05' },
  { title: 'Implement Authentication System', description: 'Add JWT-based authentication with refresh tokens, role-based access control, and secure session management.', priority: 'High', status: 'Pending', category: 'Development', dueDate: '2026-07-30', createdAt: '2026-07-06' },
  { title: 'Create Marketing Landing Page', description: 'Design and build a high-converting landing page with hero section, features, testimonials, and CTA.', priority: 'Medium', status: 'Pending', category: 'Marketing', dueDate: '2026-08-10', createdAt: '2026-07-07' },
  { title: 'Optimize Database Queries', description: 'Identify and fix slow queries, add proper indexes, and implement caching for frequently accessed data.', priority: 'High', status: 'Pending', category: 'Development', dueDate: '2026-07-25', createdAt: '2026-07-08' },
  { title: 'Prepare Q3 Financial Report', description: 'Compile revenue, expenses, and growth metrics into a comprehensive Q3 report for the board meeting.', priority: 'High', status: 'Completed', category: 'Finance', dueDate: '2026-07-20', createdAt: '2026-07-08' },
  { title: 'Write Unit & Integration Tests', description: 'Achieve 80%+ code coverage by writing unit tests for services and integration tests for API routes.', priority: 'Medium', status: 'Pending', category: 'Development', dueDate: '2026-08-15', createdAt: '2026-07-09' },
  { title: 'Conduct Code Review Sprint', description: 'Review all open pull requests, provide feedback, and merge approved changes into the main branch.', priority: 'Low', status: 'Completed', category: 'Development', dueDate: '2026-07-18', createdAt: '2026-07-09' },
  { title: 'Plan Social Media Campaign', description: 'Develop a 30-day social media strategy across LinkedIn, Twitter, and Instagram to boost brand awareness.', priority: 'Medium', status: 'Pending', category: 'Marketing', dueDate: '2026-08-01', createdAt: '2026-07-10' },
  { title: 'Migrate to Microservices', description: 'Decompose the monolith into independent microservices with clear API contracts and service boundaries.', priority: 'High', status: 'Pending', category: 'Development', dueDate: '2026-09-01', createdAt: '2026-07-10' },
  { title: 'Create Onboarding Flow', description: 'Design and implement a step-by-step onboarding experience to help new users get started quickly.', priority: 'Medium', status: 'Completed', category: 'Design', dueDate: '2026-07-22', createdAt: '2026-07-11' },
  { title: 'Security Audit & Penetration Test', description: 'Hire an external security firm to audit the application for vulnerabilities and OWASP Top 10 issues.', priority: 'High', status: 'Pending', category: 'Security', dueDate: '2026-08-20', createdAt: '2026-07-11' },
  { title: 'Set Up Error Monitoring', description: 'Integrate Sentry for real-time error tracking, alerting, and performance monitoring across all services.', priority: 'Medium', status: 'Completed', category: 'DevOps', dueDate: '2026-07-16', createdAt: '2026-07-12' },
  { title: 'Design Mobile App Wireframes', description: 'Create wireframes for all primary screens of the mobile application for iOS and Android platforms.', priority: 'High', status: 'Pending', category: 'Design', dueDate: '2026-08-08', createdAt: '2026-07-12' },
  { title: 'Employee Performance Reviews', description: 'Complete mid-year performance evaluations for all team members and document development goals.', priority: 'Medium', status: 'Pending', category: 'HR', dueDate: '2026-07-31', createdAt: '2026-07-13' },
  { title: 'Implement Dark Mode', description: 'Add a toggleable dark mode theme to the application with smooth transitions and persisted user preference.', priority: 'Low', status: 'Completed', category: 'Development', dueDate: '2026-07-19', createdAt: '2026-07-13' },
  { title: 'Upgrade React to v19', description: 'Migrate the frontend codebase to React 19 and adopt new concurrent features and the use() hook.', priority: 'Medium', status: 'Pending', category: 'Development', dueDate: '2026-08-12', createdAt: '2026-07-14' },
  { title: 'Client Proposal for Project Alpha', description: 'Prepare a detailed proposal document including scope, timeline, budget, and deliverables for Client Alpha.', priority: 'High', status: 'Completed', category: 'Sales', dueDate: '2026-07-17', createdAt: '2026-07-14' },
  { title: 'Set Up Analytics Dashboard', description: 'Integrate Google Analytics 4 and build a custom BI dashboard to track key product and business metrics.', priority: 'Medium', status: 'Pending', category: 'Marketing', dueDate: '2026-08-03', createdAt: '2026-07-15' },
  { title: 'Refactor Authentication Module', description: 'Simplify and clean up the auth module, extract reusable hooks, and improve error handling flows.', priority: 'Low', status: 'Pending', category: 'Development', dueDate: '2026-08-18', createdAt: '2026-07-15' },
  { title: 'Produce Demo Video', description: 'Record and edit a 3-minute product demo video showcasing key features for the marketing website.', priority: 'Medium', status: 'Pending', category: 'Marketing', dueDate: '2026-08-06', createdAt: '2026-07-16' },
  { title: 'Configure Load Balancer', description: 'Set up Nginx as a load balancer with SSL termination, rate limiting, and health check endpoints.', priority: 'High', status: 'Pending', category: 'DevOps', dueDate: '2026-07-29', createdAt: '2026-07-16' },
  { title: 'Accessibility (WCAG) Audit', description: 'Audit the application against WCAG 2.1 AA standards and fix keyboard navigation, ARIA labels, and color contrast issues.', priority: 'Medium', status: 'Pending', category: 'Design', dueDate: '2026-08-14', createdAt: '2026-07-17' },
  { title: 'Team Building Workshop', description: 'Organize a half-day team building workshop to improve collaboration and boost team morale.', priority: 'Low', status: 'Completed', category: 'HR', dueDate: '2026-07-21', createdAt: '2026-07-17' },
  { title: 'Implement Push Notifications', description: 'Integrate Firebase Cloud Messaging to send real-time push notifications for task reminders and updates.', priority: 'Medium', status: 'Pending', category: 'Development', dueDate: '2026-08-22', createdAt: '2026-07-18' },
  { title: 'Vendor Contract Renewal', description: 'Review and negotiate renewal terms for the cloud infrastructure and third-party API vendor contracts.', priority: 'High', status: 'Pending', category: 'Finance', dueDate: '2026-07-27', createdAt: '2026-07-18' },
  { title: 'Launch Beta Program', description: 'Recruit 50 beta testers, set up feedback channels, and coordinate the closed beta launch for the new product.', priority: 'High', status: 'Pending', category: 'Marketing', dueDate: '2026-08-25', createdAt: '2026-07-19' },
];

const activities = [
  { text: 'Task "Build REST API with Node.js" marked as Completed', timestamp: '2026-07-10T14:00:00.000Z' },
  { text: 'Task "Design Dashboard UI" marked as Completed', timestamp: '2026-07-12T11:30:00.000Z' },
  { text: 'Task "Conduct User Research" marked as Completed', timestamp: '2026-07-15T16:00:00.000Z' },
  { text: 'Task "Prepare Q3 Financial Report" marked as Completed', timestamp: '2026-07-20T09:00:00.000Z' },
  { text: 'Task "Implement Dark Mode" marked as Completed', timestamp: '2026-07-19T17:45:00.000Z' },
  { text: 'Task "Create Onboarding Flow" marked as Completed', timestamp: '2026-07-22T10:00:00.000Z' },
  { text: 'Task "Set Up Error Monitoring" marked as Completed', timestamp: '2026-07-16T13:00:00.000Z' },
  { text: 'Task "Conduct Code Review Sprint" marked as Completed', timestamp: '2026-07-18T15:00:00.000Z' },
  { text: 'Task "Client Proposal for Project Alpha" marked as Completed', timestamp: '2026-07-17T12:00:00.000Z' },
  { text: 'Task "Team Building Workshop" marked as Completed', timestamp: '2026-07-21T17:00:00.000Z' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data
    await Task.deleteMany({});
    await Activity.deleteMany({});
    console.log('🗑️  Cleared existing tasks and activities');

    // Insert demo data
    const insertedTasks = await Task.insertMany(tasks);
    console.log(`✅ Inserted ${insertedTasks.length} tasks`);

    const insertedActivities = await Activity.insertMany(activities);
    console.log(`✅ Inserted ${insertedActivities.length} activities`);

    console.log('\n🎉 Seed complete! MongoDB Atlas is loaded with demo data.');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
