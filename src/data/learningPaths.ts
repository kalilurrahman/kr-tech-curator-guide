export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  resourceIds: string[];
}

export const learningPaths: LearningPath[] = [
  {
    id: "ml-engineer",
    title: "ML Engineer Path",
    description: "From fundamentals to production ML — master machine learning end to end.",
    icon: "🧠",
    color: "from-primary/20 to-accent/20",
    resourceIds: [
      "ai-1",   // ML Specialization
      "ai-9",   // Kaggle Learn
      "ai-6",   // Google ML Crash Course
      "ai-2",   // Fast.ai
      "ai-4",   // Stanford CS229
      "ai-3",   // Hugging Face Transformers
      "ext-3",  // Deep Learning Specialization
      "ai-5",   // OpenAI Cookbook
      "ai-8",   // LangChain
      "ext-15", // ML From Scratch
      "ext-19", // Made With ML
      "ext-10", // TensorFlow Certificate
    ],
  },
  {
    id: "system-design",
    title: "System Design Mastery",
    description: "Design scalable, reliable systems — from fundamentals to advanced architecture.",
    icon: "🏗️",
    color: "from-accent/20 to-primary/20",
    resourceIds: [
      "ext-37", // System Design Primer
      "ext-42", // ByteByteGo
      "ext-43", // Grokking System Design
      "ext-44", // MIT 6.824
      "ext-46", // Alex Xu Book
      "ext-47", // DDIA
      "ext-39", // Awesome System Design
      "ext-48", // Gábor Szántó
      "ext-50", // LeetCode System Design
      "cloud-4", // AWS Well-Architected
      "ext-45", // Google Cloud Infra
    ],
  },
  {
    id: "data-science",
    title: "Data Science from Zero",
    description: "Build a strong data science foundation — statistics, Python, ML, and visualization.",
    icon: "📊",
    color: "from-resource-website/20 to-accent/20",
    resourceIds: [
      "ds-1",   // Python for Data Science
      "ds-2",   // Pandas documentation
      "ai-9",   // Kaggle Learn
      "ai-1",   // ML Specialization
      "ext-28", // Data Science Best Resources
      "ext-30", // Awesome Data Science
      "ext-31", // Data Science For Beginners
      "ext-32", // 100 Days of ML
      "ext-33", // freeCodeCamp ML Python
      "ext-29", // DS Interviews
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Engineer",
    description: "Master cloud platforms, containers, CI/CD, and infrastructure as code.",
    icon: "☁️",
    color: "from-resource-cert/20 to-primary/20",
    resourceIds: [
      "cloud-1", // AWS Cloud Practitioner
      "cloud-2", // Google Cloud Skills
      "cloud-3", // Azure Fundamentals
      "devops-1", // Docker
      "devops-5", // K8s Intro
      "devops-2", // K8s Hard Way
      "devops-3", // Terraform
      "devops-4", // GitHub Actions
      "ext-11",  // AWS Cert SAA
      "ext-45",  // Google Cloud Infra
    ],
  },
  {
    id: "fullstack-web",
    title: "Full-Stack Web Developer",
    description: "From HTML basics to full-stack mastery — build modern web applications.",
    icon: "🌐",
    color: "from-resource-free/20 to-resource-website/20",
    resourceIds: [
      "web-1",  // The Odin Project
      "web-2",  // freeCodeCamp
      "web-3",  // MDN Web Docs
      "web-5",  // JavaScript.info
      "web-4",  // React Docs
      "web-6",  // Next.js Learn
      "web-8",  // Full Stack Open
      "web-10", // Fireship
      "web-7",  // CSS Tricks
      "web-9",  // Awesome React
    ],
  },
  {
    id: "ai-interview",
    title: "AI/ML Interview Prep",
    description: "Ace your ML interviews — theory, coding, system design, and real-world projects.",
    icon: "🎯",
    color: "from-resource-youtube/20 to-primary/20",
    resourceIds: [
      "ext-30-interview", // ML Interview
      "ext-29",  // DS Interviews
      "ai-4",    // Stanford CS229
      "ext-15",  // ML From Scratch
      "ai-1",    // ML Specialization
      "ext-19",  // Made With ML
      "ext-26",  // 500 AI Projects
      "ext-37",  // System Design Primer
      "ext-42",  // ByteByteGo
    ],
  },
];
