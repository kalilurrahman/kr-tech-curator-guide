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
      "ext-3",  // MIT 6.036
      "ai-5",   // OpenAI Cookbook
      "ai-8",   // LangChain
      "ext-15", // ML From Scratch
      "ext-18", // Made With ML
      "ext-10", // freeCodeCamp ML Python
    ],
  },
  {
    id: "system-design",
    title: "System Design Mastery",
    description: "Design scalable, reliable systems — from fundamentals to advanced architecture.",
    icon: "🏗️",
    color: "from-accent/20 to-primary/20",
    resourceIds: [
      "sys-1",  // System Design Primer
      "sys-3",  // ByteByteGo
      "sys-2",  // DDIA
      "sys-5",  // MIT 6.824
      "sys-4",  // High Scalability
      "cloud-4", // AWS Well-Architected
    ],
  },
  {
    id: "data-science",
    title: "Data Science from Zero",
    description: "Build a strong data science foundation — statistics, Python, ML, and visualization.",
    icon: "📊",
    color: "from-resource-website/20 to-accent/20",
    resourceIds: [
      "data-6",  // Khan Academy Stats
      "lang-3",  // Python Tutorial
      "data-3",  // Python for Data Analysis
      "ai-9",    // Kaggle Learn
      "ext-9",   // Kaggle Micro-Courses
      "data-1",  // IBM Data Science Cert
      "ext-22",  // MS Data Science Beginners
      "ext-23",  // DS Best Resources
      "ext-30",  // Awesome Data Science
      "data-2",  // Kaggle Competitions
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
      "devops-7", // TechWorld with Nana
      "cert-1",  // AWS SAA
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
      "ext-25",  // ML Interview Guide
      "ext-24",  // DS Interviews
      "ai-4",    // Stanford CS229
      "ext-15",  // ML From Scratch
      "ai-1",    // ML Specialization
      "ext-18",  // Made With ML
      "ext-27",  // 500 AI Projects
      "sys-1",   // System Design Primer
      "sys-3",   // ByteByteGo
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Professional",
    description: "From security fundamentals to penetration testing — defend and attack with confidence.",
    icon: "🔒",
    color: "from-destructive/20 to-accent/20",
    resourceIds: [
      "sec-4",  // TryHackMe
      "sec-1",  // OWASP Top 10
      "sec-2",  // Google Cybersecurity Cert
      "sec-3",  // Hack The Box
      "sec-6",  // Professor Messer Security+
      "sec-5",  // Awesome Security
    ],
  },
  {
    id: "llm-genai",
    title: "LLM & Generative AI",
    description: "Master large language models — prompting, fine-tuning, RAG, agents, and deployment.",
    icon: "🤖",
    color: "from-primary/20 to-resource-free/20",
    resourceIds: [
      "ai-7",   // Anthropic Prompt Engineering
      "ai-5",   // OpenAI Cookbook
      "ai-8",   // LangChain
      "ext-14", // LLM Course — Maxime Labonne
      "ext-12", // nanoGPT — Karpathy
      "ai-3",   // Hugging Face Transformers
      "ext-6",  // d2l.ai
      "ext-7",  // Deep Learning Book
      "ext-4",  // AWS AI Training
    ],
  },
  {
    id: "mobile-dev",
    title: "Mobile App Developer",
    description: "Build native and cross-platform mobile apps — React Native, Flutter, Swift, and Android.",
    icon: "📱",
    color: "from-resource-website/20 to-resource-free/20",
    resourceIds: [
      "mobile-1", // React Native
      "mobile-2", // Flutter Codelabs
      "mobile-3", // Swift/SwiftUI
      "mobile-4", // Android Kotlin
      "web-4",    // React Docs (foundation)
      "lang-4",   // TypeScript Deep Dive
    ],
  },
  {
    id: "programming-fundamentals",
    title: "Programming Polyglot",
    description: "Learn multiple languages — Python, Rust, Go, TypeScript — and sharpen your coding skills.",
    icon: "💻",
    color: "from-accent/20 to-resource-website/20",
    resourceIds: [
      "lang-3", // Python
      "lang-4", // TypeScript
      "lang-2", // Go
      "lang-1", // Rust
      "lang-5", // Exercism
      "web-5",  // JavaScript.info
    ],
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect Path",
    description: "Design enterprise-grade cloud solutions — multi-cloud, security, cost optimization.",
    icon: "🏛️",
    color: "from-resource-cert/20 to-accent/20",
    resourceIds: [
      "cloud-1", // AWS Cloud Practitioner
      "cert-1",  // AWS SAA
      "cert-2",  // AWS Developer
      "cert-3",  // GCP Architect
      "cert-4",  // Azure Admin
      "cloud-4", // AWS Well-Architected
      "cloud-5", // Cloud Computing Concepts
      "cloud-6", // Awesome AWS
      "sys-1",   // System Design Primer
      "sys-2",   // DDIA
    ],
  },
  {
    id: "open-source",
    title: "Open Source Contributor",
    description: "Start contributing to open source — from finding projects to making your first PR.",
    icon: "🌟",
    color: "from-resource-free/20 to-primary/20",
    resourceIds: [
      "devops-4", // GitHub Actions
      "lang-1",   // Rust Book
      "web-9",    // Awesome React
      "ai-11",    // Awesome ML
      "sec-5",    // Awesome Security
      "cloud-6",  // Awesome AWS
      "ext-12",   // nanoGPT
      "ext-18",   // Made With ML
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents & Agentic AI",
    description: "Build autonomous AI agents — multi-agent systems, tool use, planning, and orchestration.",
    icon: "🤖",
    color: "from-primary/20 to-resource-cert/20",
    resourceIds: [
      "ai-8",                       // LangChain (foundation)
      "langchain-agents-guide",     // LangChain Agents
      "autogen-multi-agent",        // AutoGen
      "crewai-agents",              // CrewAI
      "ai-agents-course-deeplearning", // Agentic Design Patterns
      "dspy-programming-llms",      // DSPy
      "ai-5",                       // OpenAI Cookbook
      "ai-7",                       // Anthropic Prompt Engineering
      "tweet-13",                   // Harrison Chase
      "tweet-2",                    // Jim Fan
    ],
  },
  {
    id: "quantum-computing",
    title: "Quantum Computing Path",
    description: "From qubits to quantum algorithms — explore the next frontier of computation.",
    icon: "⚛️",
    color: "from-accent/20 to-resource-cert/20",
    resourceIds: [
      "ibm-quantum-learning",       // IBM Quantum Learning
      "qiskit-github",              // Qiskit SDK
      "google-cirq-quantum",        // Google Cirq
      "pennylane-quantum-ml",       // PennyLane QML
      "mit-quantum-computing-course", // MIT Quantum Info Science
    ],
  },
  {
    id: "web3-defi",
    title: "Web3 & DeFi Developer",
    description: "Build decentralized applications — smart contracts, DeFi protocols, and blockchain development.",
    icon: "⛓️",
    color: "from-resource-website/20 to-accent/20",
    resourceIds: [
      "web3-1",                 // CryptoZombies
      "web3-2",                 // Ethereum Docs
      "alchemy-university",     // Alchemy University
      "web3-8",                 // Patrick Collins Course
      "foundry-smart-contracts", // Foundry
      "solana-cookbook",         // Solana Cookbook
      "chainlink-docs",         // Chainlink
      "defi-llama",             // DeFi Llama
      "viem-web3-typescript",   // Viem
      "web3-4",                 // Awesome Blockchain
    ],
  },
];
