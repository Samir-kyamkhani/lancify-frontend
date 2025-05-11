export const clients = [
  {
    id: 1,
    name: "Tech Corp",
    email: "contact@techcorp.com",
    status: "Active",
    country: "USA",
    tags: ["Enterprise", "Web Dev"],
  },
  {
    id: 6,
    name: "Innovate Solutions",
    email: "hello@innovate.io",
    status: "Lead",
    country: "Canada",
    tags: ["Startup", "Mobile App"],
  },
  {
    id: 2,
    name: "Global Media",
    email: "info@globalmedia.net",
    status: "Completed",
    country: "UK",
    tags: ["Marketing", "SEO"],
  },
  {
    id: 3,
    name: "Startup Hub",
    email: "founders@startuphub.org",
    status: "On Hold",
    country: "Australia",
    tags: ["Consulting", "SaaS"],
  },
  {
    id: 4,
    name: "Design Studio X",
    email: "creative@designx.co",
    status: "Active",
    country: "USA",
    tags: ["Design", "Branding"],
  },
];

export const invoices = [
  {
    invoiceId: "INV-001",
    date: "2025-05-08",
    dueDate: "2025-05-15",
    status: "Draft",
    client: {
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      address: "1234 Elm Street, NY, USA",
    },
    freelancer: {
      name: "Samir Khan",
      email: "samir@primewebdev.in",
      company: "PrimeWebDev",
      address: "Jaipur, Rajasthan, India",
    },
    items: [
      {
        name: "Website Design and Development",
        quantity: 1,
        discount: 1,
        rate: 500,
      },
      {
        name: "SEO Optimization",
        quantity: 1,
        discount: 1,
        rate: 200,
      },
    ],
    currency: "USD",
    taxRate: 10,
  },
  {
    invoiceId: "INV-002",
    date: "2025-05-08",
    dueDate: "2025-05-15",
    status: "Cancelled",
    client: {
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      address: "1234 Elm Street, NY, USA",
    },
    freelancer: {
      name: "Samir Khan",
      email: "samir@primewebdev.in",
      company: "PrimeWebDev",
      address: "Jaipur, Rajasthan, India",
    },
    items: [
      {
        name: "Website Design and Development",
        quantity: 1,
        discount: 1,
        rate: 500,
      },
      {
        name: "SEO Optimization",
        quantity: 1,
        discount: 1,
        rate: 200,
      },
    ],
    currency: "USD",
    taxRate: 10,
  },
  {
    invoiceId: "INV-003",
    date: "2025-05-08",
    dueDate: "2025-05-15",
    status: "Overdue",
    client: {
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      address: "1234 Elm Street, NY, USA",
    },
    freelancer: {
      name: "Samir Khan",
      email: "samir@primewebdev.in",
      company: "PrimeWebDev",
      address: "Jaipur, Rajasthan, India",
    },
    items: [
      {
        name: "Website Design and Development",
        quantity: 1,
        discount: 1,
        rate: 500,
      },
      {
        name: "SEO Optimization",
        quantity: 1,
        discount: 1,
        rate: 200,
      },
    ],
    currency: "USD",
    taxRate: 10,
  },
  {
    invoiceId: "INV-004",
    date: "2025-05-08",
    dueDate: "2025-05-15",
    status: "Pending",
    client: {
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      address: "1234 Elm Street, NY, USA",
    },
    freelancer: {
      name: "Samir Khan",
      email: "samir@primewebdev.in",
      company: "PrimeWebDev",
      address: "Jaipur, Rajasthan, India",
    },
    items: [
      {
        name: "Website Design and Development",
        quantity: 1,
        discount: 1,
        rate: 500,
      },
      {
        name: "SEO Optimization",
        quantity: 1,
        discount: 1,
        rate: 200,
      },
    ],
    currency: "USD",
    taxRate: 10,
    // dskjdskljdsfk
  },
  {
    invoiceId: "INV-005",
    date: "2025-05-08",
    dueDate: "2025-05-15",
    status: "Paid",
    client: {
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      address: "1234 Elm Street, NY, USA",
    },
    freelancer: {
      name: "Samir Khan",
      email: "samir@primewebdev.in",
      company: "PrimeWebDev",
      address: "Jaipur, Rajasthan, India",
    },
    items: [
      {
        name: "Website Design and Development",
        quantity: 1,
        discount: 1,
        rate: 500,
      },
      {
        name: "SEO Optimization",
        quantity: 1,
        discount: 1,
        rate: 200,
      },
    ],
    currency: "USD",
    taxRate: 10,
  },
  {
    invoiceId: "INV-001",
    date: "2025-05-08",
    dueDate: "2025-05-15",
    status: "Unpaid",
    client: {
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      address: "1234 Elm Street, NY, USA",
    },
    freelancer: {
      name: "Samir Khan",
      email: "samir@primewebdev.in",
      company: "PrimeWebDev",
      address: "Jaipur, Rajasthan, India",
    },
    items: [
      {
        name: "Website Design and Development",
        quantity: 1,
        discount: 1,
        rate: 500,
      },
      {
        name: "SEO Optimization",
        quantity: 1,
        discount: 1,
        rate: 200,
      },
    ],
    currency: "USD",
    taxRate: 10,
  },
  // Add more invoices here if needed
];

export const proposals = [
  {
    id: 1,
    clientName: "Acme Corporation",
    projectName: "Website Redesign",
    amount: 5000,
    date: "2025-05-08",
    status: "Sent",
    clientNeeds:
      "The client wants a modern, responsive website that improves user experience and increases lead generation. They also need faster load times and mobile optimization.",
    proposedServices:
      "Web Design, Web Development, SEO Optimization, UI/UX Enhancements",
    yourName: "Demo Freelancer",
    yourExpertise: "Web Development & Design",
    tone: "Formal",
    generatedProposal:
      "Dear Acme Corporation,\n\nThank you for considering me for your Website Redesign project. Based on your requirements, I propose a comprehensive solution that includes Web Design, Web Development, and SEO Optimization. My goal is to deliver a responsive, fast, and user-friendly website that aligns with your business objectives.\n\nLooking forward to working with you.\n\nBest regards,\nDemo Freelancer",
  },
  {
    id: 2,
    clientName: "Acme Corporation",
    projectName: "Website Redesign",
    amount: 5000,
    date: "2025-05-08",
    status: "Accepted",
    clientNeeds:
      "The client wants a modern, responsive website that improves user experience and increases lead generation. They also need faster load times and mobile optimization.",
    proposedServices:
      "Web Design, Web Development, SEO Optimization, UI/UX Enhancements",
    yourName: "Demo Freelancer",
    yourExpertise: "Web Development & Design",
    tone: "Formal",
    generatedProposal:
      "Dear Acme Corporation,\n\nThank you for considering me for your Website Redesign project. Based on your requirements, I propose a comprehensive solution that includes Web Design, Web Development, and SEO Optimization. My goal is to deliver a responsive, fast, and user-friendly website that aligns with your business objectives.\n\nLooking forward to working with you.\n\nBest regards,\nDemo Freelancer",
  },
  {
    id: 3,
    clientName: "Acme Corporation",
    projectName: "Website Redesign",
    amount: 5000,
    date: "2025-05-08",
    status: "Draft",
    clientNeeds:
      "The client wants a modern, responsive website that improves user experience and increases lead generation. They also need faster load times and mobile optimization.",
    proposedServices:
      "Web Design, Web Development, SEO Optimization, UI/UX Enhancements",
    yourName: "Demo Freelancer",
    yourExpertise: "Web Development & Design",
    tone: "Formal",
    generatedProposal:
      "Dear Acme Corporation,\n\nThank you for considering me for your Website Redesign project. Based on your requirements, I propose a comprehensive solution that includes Web Design, Web Development, and SEO Optimization. My goal is to deliver a responsive, fast, and user-friendly website that aligns with your business objectives.\n\nLooking forward to working with you.\n\nBest regards,\nDemo Freelancer",
  },
  {
    id: 4,
    clientName: "Acme Corporation",
    projectName: "Website Redesign",
    amount: 5000,
    date: "2025-05-08",
    status: "Rejected",
    clientNeeds:
      "The client wants a modern, responsive website that improves user experience and increases lead generation. They also need faster load times and mobile optimization.",
    proposedServices:
      "Web Design, Web Development, SEO Optimization, UI/UX Enhancements",
    yourName: "Demo Freelancer",
    yourExpertise: "Web Development & Design",
    tone: "Formal",
    generatedProposal:
      "Dear Acme Corporation,\n\nThank you for considering me for your Website Redesign project. Based on your requirements, I propose a comprehensive solution that includes Web Design, Web Development, and SEO Optimization. My goal is to deliver a responsive, fast, and user-friendly website that aligns with your business objectives.\n\nLooking forward to working with you.\n\nBest regards,\nDemo Freelancer",
  },
  {
    id: 5,
    clientName: "Acme Corporation",
    projectName: "Website Redesign",
    amount: 5000,
    date: "2025-05-08",
    status: "Draft",
    clientNeeds:
      "The client wants a modern, responsive website that improves user experience and increases lead generation. They also need faster load times and mobile optimization.",
    proposedServices:
      "Web Design, Web Development, SEO Optimization, UI/UX Enhancements",
    yourName: "Demo Freelancer",
    yourExpertise: "Web Development & Design",
    tone: "Formal",
    generatedProposal:
      "Dear Acme Corporation,\n\nThank you for considering me for your Website Redesign project. Based on your requirements, I propose a comprehensive solution that includes Web Design, Web Development, and SEO Optimization. My goal is to deliver a responsive, fast, and user-friendly website that aligns with your business objectives.\n\nLooking forward to working with you.\n\nBest regards,\nDemo Freelancer",
  },
  {
    id: 6,
    clientName: "Acme Corporation",
    projectName: "Website Redesign",
    amount: 5000,
    date: "2025-05-08",
    status: "Draft",
    clientNeeds:
      "The client wants a modern, responsive website that improves user experience and increases lead generation. They also need faster load times and mobile optimization.",
    proposedServices:
      "Web Design, Web Development, SEO Optimization, UI/UX Enhancements",
    yourName: "Demo Freelancer",
    yourExpertise: "Web Development & Design",
    tone: "Formal",
    generatedProposal:
      "Dear Acme Corporation,\n\nThank you for considering me for your Website Redesign project. Based on your requirements, I propose a comprehensive solution that includes Web Design, Web Development, and SEO Optimization. My goal is to deliver a responsive, fast, and user-friendly website that aligns with your business objectives.\n\nLooking forward to working with you.\n\nBest regards,\nDemo Freelancer",
  },
];

export const initialColumns = [
  {
    title: "Todo",
    tasks: [
      {
        title: "Setup Database Schema",
        description: "Define models for users, projects, tasks.",
        priority: "Medium",
      },
      {
        title: "Deploy Staging Environment",
        description: "Set up CI/CD pipeline for staging.",
        priority: "Medium",
      },
      {
        title: "User Testing Setup",
        description: "Prepare scripts and recruit testers.",
        priority: "Low",
      },
    ],
  },
  {
    title: "InProgress",
    tasks: [
      {
        title: "Develop Authentication Flow",
        description: "Implement user login and registration.",
        priority: "High",
        user: "https://i.pravatar.cc/40",
      },
      {
        title: "Implement Payment Integration",
        description: "Connect Stripe API for subscriptions.",
        priority: "Medium",
        user: "https://i.pravatar.cc/40",
      },
      {
        title: "Analyze Campaign Results",
        description: "Compile report on ad spend and conversions.",
        priority: "High",
        user: "https://i.pravatar.cc/40",
      },
    ],
  },
  {
    title: "Done",
    tasks: [
      {
        title: "Write API Documentation",
        description: "Document endpoints using Swagger/OpenAPI.",
        priority: "Low",
        user: "https://i.pravatar.cc/40",
      },
      {
        title: "Client Feedback Session Prep",
        description: "Prepare presentation for client review.",
        priority: "Low",
        user: "https://i.pravatar.cc/40",
      },
    ],
  },
];

export const messages = [
  {
    id: 1,
    sender: "Alice Johnson",
    email: "alice@example.com",
    phone: "+91-9876543210",
    subject: "Welcome to the platform",
    preview: "Thanks for signing up! Here's what you need to know...",
    time: "Today at 10:15 AM",
    starred: true,
    unread: true,
  },
  {
    id: 2,
    sender: "Product Updates",
    email: "updates@example.com",
    phone: "+91-9000000001",
    subject: "New features available",
    preview: "We're excited to share new tools with you...",
    time: "Yesterday at 5:00 PM",
    starred: false,
    unread: false,
  },
  {
    id: 3,
    sender: "Support Team",
    email: "support@example.com",
    phone: "+91-8000000002",
    subject: "Ticket resolved",
    preview: "Your issue has been resolved. Thank you for...",
    time: "2 days ago at 2:30 PM",
    starred: false,
    unread: false,
  },
  {
    id: 4,
    sender: "Support Team",
    email: "support@example.com",
    phone: "+91-8000000002",
    subject: "Ticket resolved",
    preview: "Your issue has been resolved. Thank you for...",
    time: "2 days ago at 2:30 PM",
    starred: false,
    unread: false,
  },
  {
    id: 5,
    sender: "Support Team",
    email: "support@example.com",
    phone: "+91-8000000002",
    subject: "Ticket resolved",
    preview: "Your issue has been resolved. Thank you for...",
    time: "2 days ago at 2:30 PM",
    starred: false,
    unread: false,
  },
  {
    id: 6,
    sender: "Support Team",
    email: "support@example.com",
    phone: "+91-8000000002",
    subject: "Ticket resolved",
    preview: "Your issue has been resolved. Thank you for...",
    time: "2 days ago at 2:30 PM",
    starred: false,
    unread: false,
  },
];

export const contacts = [
  {
    name: "Alice Wonderland",
    message: "hyy",
    starred: true,
    details: "Works at Wonderland Inc.",
  },
  {
    name: "Bob The Builder",
    message: "Can we reschedule?",
    active: true,
    details: "Builder and contractor",
  },
  {
    name: "Tech Corp Contact",
    message: "Thanks for the update.",
    details: "Tech enthusiast",
  },
  {
    name: "Design Studio X Lead",
    message: "See attached file.",
    details: "Designs for the future",
  },
];

export const teamMembers = [
  {
    name: "Alice Wonderland",
    email: "alice@freelanceflow.app",
    role: "Admin",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "Bob The Builder",
    email: "bob@freelanceflow.app",
    role: "Member",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    name: "Charlie Chaplin",
    email: "charlie@freelanceflow.app",
    role: "Member",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "Viewer",
    status: "Invited",
    avatar: "",
  },
  {
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "Member",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
];

export const faqData = [
  {
    question: "How do I add a new client?",
    answer:
      "Navigate to the 'Clients' section using the sidebar, then click the 'Add Client' button in the top right corner. Fill in the required details and save.",
  },
  {
    question: "Can I customize proposal templates?",
    answer:
      "Yes, you can create and edit custom proposal templates in the 'Templates' section under settings.",
  },
  {
    question: "Which payment gateways are supported?",
    answer:
      "We support Stripe, PayPal, and Razorpay for seamless payment processing.",
  },
  {
    question: "How does project tracking work?",
    answer:
      "You can track your project using milestones, tasks, and activity logs in the 'Projects' section.",
  },
];

export const projects = [
  {
    id: 1,
    title: "Website Redesign",
    status: "In Progress",
    startDate: "2024-07-01",
    endDate: "2024-09-30",
  },
  {
    id: 2,
    title: "Mobile App Launch",
    status: "Completed",
    startDate: "2024-01-10",
    endDate: "2024-04-15",
  },
  {
    id: 3,
    title: "Marketing Campaign",
    status: "Pending",
    startDate: "2025-06-01",
    endDate: "2025-08-30",
  },
];

export const tasks = [
  {
    id: 1,
    title: "Design Landing Page Mockup",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Develop Authentication Flow",
    priority: "High",
    completed: false,
  },
  {
    id: 3,
    title: "Set Up Database Schema",
    priority: "Medium",
    completed: false,
  },
  {
    id: 4,
    title: "Write API Documentation",
    priority: "Low",
    completed: true,
  },
  {
    id: 5,
    title: "Configure User Testing Environment",
    priority: "Low",
    completed: false,
  },
];

// Mock Revenue Chart Data
export const revenueData = [
  { month: "Jan", revenue: 1500 },
  { month: "Feb", revenue: 2800 },
  { month: "Mar", revenue: 4000 },
  { month: "Apr", revenue: 3200 },
  { month: "May", revenue: 5000 },
  { month: "Jun", revenue: 4500 },
];

// Mock Client Pie Chart Data
export const clientStatusData = [
  { name: "Active", value: 400 },
  { name: "Lead", value: 300 },
  { name: "Completed", value: 200 },
  { name: "On Hold", value: 100 },
];

// Updated Pie Chart Colors
export const pieColors = [
  "#22C55E", // ✅ Active – green-500 (brighter, more vibrant)
  "#FACC15", // 🔄 Lead – yellow-400 (draws attention, indicates potential)
  "#EF4444", // ✅ Completed – red-500 (clear and readable red)
  "#3B82F6", // ⏸️ On Hold – blue-500 (cool and neutral)
];

export const notifications = [
  {
    id: 1,
    type: "success",
    message: "$2400, Design changes",
    time: "22 DEC 7:20 PM",
  },
  {
    id: 2,
    type: "info",
    message: "New order #1832412",
    time: "21 DEC 11:21 PM",
  },
  {
    id: 3,
    type: "warning",
    message: "Server payments for April",
    time: "21 DEC 9:28 PM",
  },
  {
    id: 4,
    type: "yellow",
    message: "New card added for order #4395133",
    time: "20 DEC 3:52 PM",
  },
  {
    id: 5,
    type: "error",
    message: "New card added for order #4395133",
    time: "19 DEC 11:34 AM",
  },
];

export const iconMap = {
  success: "bg-green-500",
  info: "bg-blue-500",
  warning: "bg-gray-400",
  yellow: "bg-yellow-500",
  error: "bg-red-500",
};

// Priority styles
export const priorityStyles = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-700",
};

// Sample projects with priorities
export const projectsData = [
  {
    title: "Website Redesign",
    client: "Tech Corp",
    status: "In Progress",
    priority: "High",
    description: "Complete overhaul of the main corporate website.",
    start: "2024-07-01",
    end: "2024-09-30",
  },
  {
    title: "Mobile App Development",
    client: "Innovate Solutions",
    status: "Not Started",
    priority: "Medium",
    description: "Develop native iOS and Android apps.",
    start: "",
    end: "",
  },
  {
    title: "Marketing Campaign Q3",
    client: "Global Media",
    status: "Completed",
    priority: "Low",
    description: "Run digital marketing campaigns across platforms.",
    start: "2024-05-01",
    end: "2024-06-30",
  },
];

export const statCardsData = [
  {
    title: "Total Clients",
    count: "50,789",
    trend: "8.5% Up from yesterday",
    icon: LuUsers,
    css: "text-blue-500 text-2xl",
  },
  {
    title: "Active Projects",
    count: "20,393",
    trend: "8.5% Up past week",
    icon: LuFolderKanban,
    css: "text-purple-500 text-2xl",
  },
  {
    title: "Revenue",
    count: "$60,000",
    trend: "2.5% Down past yesterday",
    icon: LuTrendingUp,
    css: "text-green-500 text-2xl",
  },
  {
    title: "Overdue Payment",
    count: "5,040",
    trend: "1.5% Up past week",
    icon: CgDanger,
    css: "text-orange-500 text-2xl",
  },
];

import { CgDanger } from "react-icons/cg";
import { FaUniversity, FaPaypal, FaStripe } from "react-icons/fa";
import { LuFolderKanban, LuTrendingUp, LuUsers } from "react-icons/lu";
import { SiPhonepe } from "react-icons/si";

export const methods = [
  { value: "bank", name: "Bank Transfer", icon: FaUniversity },
  { value: "upi", name: "UPI", icon: SiPhonepe },
  { value: "paypal", name: "PayPal", icon: FaPaypal },
  { value: "stripe", name: "Stripe", icon: FaStripe },
];

export const balance = 12500.0;

export const transactions = [
  { id: 1, type: "Income", amount: 5000, date: "2025-04-10" },
  { id: 2, type: "Withdrawal", amount: 2000, date: "2025-04-15" },
  { id: 3, type: "Income", amount: 3000, date: "2025-04-20" },
  { id: 4, type: "Withdrawal", amount: 1500, date: "2025-04-25" },
];

export const Userinvoices = [
  {
    id: "INV-001",
    status: "Paid",
    issueDate: "2024-07-15",
    dueDate: "2024-07-30",
    amount: 5000.0,
    canPay: false,
  },
  {
    id: "INV-006",
    status: "Pending",
    issueDate: "2024-08-01",
    dueDate: "2024-08-15",
    amount: 2500.0,
    canPay: true,
  },
];

export const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

export const statusColors = {
  "In Progress": "bg-blue-100 text-blue-700",
  Reviewed: "bg-yellow-100 text-yellow-700",
  Lead: "bg-yellow-100 text-yellow-600 border border-yellow-200",
  Completed: "bg-blue-100 text-blue-600 border border-blue-200",
  "On Hold": "bg-purple-100 text-purple-600 border border-purple-200",
  Paid: "bg-green-100 text-green-600 border border-green-200",
  "50% Paid": "bg-green-100 text-green-600 border border-green-200",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Unpaid: "bg-red-100 text-red-600 border border-red-200",
  Overdue: "bg-red-100 text-red-600 border border-red-200",
  Draft: "bg-gray-100 text-gray-600 border border-gray-200",
  Cancelled: "bg-purple-100 text-purple-600 border border-purple-200",
  Sent: "bg-blue-100 text-blue-600 border border-blue-200",
  Accepted: "bg-green-100 text-green-600 border border-green-200",
  Rejected: "bg-red-100 text-red-600 border border-red-200",
  Active: "bg-green-100 text-green-600 border border-green-200",
  Invited: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Inactive: "bg-gray-100 text-gray-600 border border-gray-200",
};

export const Userproposals = [
  {
    id: 1,
    projectName: "Website Redesign",
    status: "Sent",
    dateSubmitted: "2024-07-20",
    amount: 5000.0,
  },
  {
    id: 2,
    projectName: "App Development",
    status: "Reviewed",
    dateSubmitted: "2024-08-15",
    amount: 12000.0,
  },
];

export const files = [
  {
    name: "Initial Brief.pdf",
    project: "Website Redesign",
    type: "PDF",
    size: "1.2 MB",
    dateShared: "Jul 10, 2024",
  },
  {
    name: "Brand Guidelines v1.pdf",
    project: "Branding Package",
    type: "PDF",
    size: "5.8 MB",
    dateShared: "Jul 28, 2024",
  },
  {
    name: "Logo_Final.png",
    project: "Branding Package",
    type: "Image",
    size: "350 KB",
    dateShared: "Jul 29, 2024",
  },
  {
    name: "Q2 Report.docx",
    project: "N/A",
    type: "Document",
    size: "800 KB",
    dateShared: "Jul 5, 2024",
  },
];

export const reportOptions = [
  {
    title: "Project Progress Summary",
    description:
      "Track completion status, deadlines, and milestones across projects.",
  },
  {
    title: "Task Completion Rates",
    description:
      "Analyze task throughput, identify bottlenecks, and monitor team efficiency.",
  },
  {
    title: "Team Workload Distribution",
    description:
      "View task assignments and estimated workload per team member.",
  },
  {
    title: "Client Billing Summary",
    description:
      "Generate reports on invoiced amounts, payments received, and outstanding balances per client.",
  },
  {
    title: "Proposal Conversion Rates",
    description:
      "Track the success rate of proposals (Sent vs. Accepted/Rejected).",
  },
  {
    title: "Time Tracking Summary",
    description:
      "Summarize logged hours per project, task, or team member (if time tracking is implemented).",
  },
];

export const roleColors = {
  Admin: "bg-blue-100 text-blue-700 border border-blue-200",
  Member: "bg-gray-100 text-gray-700 border border-gray-200",
  Viewer: "bg-purple-100 text-purple-700 border border-purple-200",
};

///////////////////////////////
export const navItems = [
  { name: "Home", path: "/", type: "link" },
  { name: "Features", path: "/#features", type: "anchor" },
  { name: "Pricing", path: "/#pricing", type: "anchor" },
  { name: "Blog", path: "/blogs", type: "link" },
  { name: "Contact", path: "/contact", type: "link" },
];
import { FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

export const socialLinks = [
  { icon: FaInstagram, label: "Instagram", url: "#" },
  { icon: FaLinkedin, label: "LinkedIn", url: "#" },
  { icon: FaYoutube, label: "YouTube", url: "#" },
  { icon: FaTwitter, label: "Twitter", url: "#" },
];

export const faqs = [
  {
    question: "What is this platform?",
    answer:
      "It's a modern freelance management tool with AI features to streamline proposals, tasks, and invoicing.",
  },

  {
    question: "Can I send invoices and accept payments?",
    answer:
      "Yes, you can generate invoices and get paid through Stripe or PayPal directly from the platform.",
  },
  {
    question: "Is there a way to track time for billing?",
    answer:
      "Yes, the built-in time tracker lets you log hours and convert them into billable entries for invoices.",
  },
  {
    question: "Is client data secure?",
    answer:
      "Absolutely. Your data and your clients' data are encrypted and stored securely.",
  },
  {
    question: "Can I customize proposals and branding?",
    answer:
      "Yes, you can tailor proposals, use templates, and apply your brand identity throughout the platform.",
  },
];

export const basePlans = [
  {
    title: "Starter",
    monthly: 12,
    yearly: 120,
    description: "Everything in starter plan",
    features: [
      "Unlimited AI usage here",
      "Premium support",
      "Customer care on point",
      "Collaboration tools",
    ],
    featured: false,
  },
  {
    title: "Pro",
    monthly: 17,
    yearly: 163,
    description: "Everything in Pro plan",
    features: [
      "Integrations with 3rd-party",
      "Advanced analytics",
      "Team performance tracking",
      "Top grade security",
      "Customizable Solutions",
    ],
    featured: true,
    tag: "Popular", // just use text here
  },
  {
    title: "Enterprise",
    monthly: 97,
    yearly: 930,
    description: "Dedicated account manager",
    features: [
      "Custom reports & dashboards",
      "Most performance usage",
      "Enterprise-grade security",
      "Customizable Solutions",
      "Seamless Integration",
      "Dedicated account manager",
    ],
    featured: false,
  },
];

export const cards = [
  {
    label: "AI-Powered Proposal Builder",
    value:
      "Craft compelling proposals in minutes. Leverage AI to generate sections, refine content, and save templates for future use.",
    graph: "8.5% Up from yesterday",
  },
  {
    label: "Client CRM",
    value:
      "Organize client data, track interactions, manage notes, and improve follow-ups with our simple yet powerful CRM.",
    graph: "8.5% Up past week",
  },
  {
    label: "Visual Task Tracking",
    value:
      "Manage projects with a flexible Kanban board. Create tasks, assign them to team members, set priorities, and track progress.",
    graph: "2.5% Down past yesterday",
  },
];

import {
  FiFileText,
  FiUserCheck,
  FiClock,
  FiCreditCard,
  FiPieChart,
  FiLock,
} from "react-icons/fi";
import { BsKanban } from "react-icons/bs";
export const features = [
  {
    title: "AI-Powered Proposal Builder",
    description:
      "Craft compelling proposals in minutes. Leverage AI to generate sections, refine content, and save templates for future use.",
    icon: FiFileText,
  },
  {
    title: "Client CRM",
    description:
      "Organize client data, track interactions, manage notes, and improve follow-ups with our simple yet powerful CRM.",
    icon: FiUserCheck,
  },
  {
    title: "Visual Task Tracking",
    description:
      "Manage projects with a flexible Kanban board. Create tasks, assign them to team members, set priorities, and track progress.",
    icon: BsKanban,
  },
  {
    title: "Time Tracker",
    description:
      "Accurately log time spent on tasks and projects. Generate reports for billing and analyze team productivity.",
    icon: FiClock,
  },
  {
    title: "Invoicing & Payments",
    description:
      "Generate professional invoices, send payment reminders, and integrate with popular gateways like Stripe and PayPal.",
    icon: FiCreditCard,
  },
  {
    title: "Insightful Analytics",
    description:
      "Get a clear overview of your earnings, project profitability, client lifetime value, and team performance.",
    icon: FiPieChart,
  },
  {
    title: "Secure Client Portal",
    description:
      "Provide clients a dedicated space to view proposals, project status, shared files, and invoices.",
    icon: FiLock,
  },
];

export const tabs = [
  { value: "all", label: "All" },
  { value: "announcements", label: "Announcements" },
  { value: "changelog", label: "Changelog" },
];

export const posts = [
  {
    id: 1,
    type: "announcements",
    title: "Introducing Alter 1.0.4",
    date: "Nov 28, 2021",
    description:
      "We’re excited to share Alter 1.0.4, bringing improved stability and new features to enhance your workflows. Here's what's new:",
    coverImg:
      "https://framerusercontent.com/images/2pl18v1iDnPJHjcAuGIAPUrtYU.png?scale-down-to=1024",
    authorImg:
      "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    type: "changelog",
    title: "Changelog 1.0.5 Released",
    date: "Dec 10, 2021",
    description:
      "Minor bug fixes, faster load times, and UI improvements across the board in 1.0.5.",
    coverImg:
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1280&q=80",
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    type: "announcements",
    title: "We’re Launching a Beta Program",
    date: "Jan 4, 2022",
    description:
      "Join our early access program to get new features before anyone else and help shape the future of our platform.",
    coverImg:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    authorImg: "https://randomuser.me/api/portraits/men/36.jpg",
  },
];

export const testimonials = [
  {
    text: "An absolute standout! This platform delivers robust tools, effortless connectivity, and usability.",
    name: "Brendan",
    title: "owner of plantio",
    avatar:
      "https://framerusercontent.com/images/uiCwnaEkTqs9OpUag37i2vd6g.jpg?scale-down-to=512",
  },
  {
    text: "A remarkable solution! It provides top-tier features, intuitive interfaces, and reliability.",
    name: "Wilson",
    title: "owner of saan",
    avatar:
      "https://framerusercontent.com/images/W7xYkGKzPzvnPv58ZBNzxS3JZI.jpg?scale-down-to=512",
  },
  {
    text: "A genuine innovation! Experience advanced tools, smooth workflows, and high utility.",
    name: "mayak",
    title: "owner of deconec",
    avatar:
      "https://framerusercontent.com/images/X0pqhTmlK8gdYqPbljhuLXlyd0I.png?scale-down-to=512",
  },
  {
    text: "A revolutionary platform! Packed with cutting-edge tools, integration ease, and functionality.",
    name: "jacychan",
    title: "owner of canacio",
    avatar:
      "https://framerusercontent.com/images/CKOjoIKzlrL1yyLwUQNbDnVZw.jpg?scale-down-to=512",
  },
  {
    text: "A real breakthrough! Unlock next-gen features, seamless compatibility, and efficiency.",
    name: "jamesil",
    title: "owner of gito",
    avatar:
      "https://framerusercontent.com/images/tkxhdci1U3ftWlWGdi4BOD5so.jpg?scale-down-to=512",
  },
  {
    text: "A standout choice! Combining advanced features, smooth syncing, and practicality.",
    name: "janney",
    title: "owner of ioptp",
    avatar:
      "https://framerusercontent.com/images/tkxhdci1U3ftWlWGdi4BOD5so.jpg?scale-down-to=512",
  },
];
