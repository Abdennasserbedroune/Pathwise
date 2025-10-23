export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
  logo?: string;
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    description:
      "We're looking for an experienced Frontend Developer to join our growing team. You'll be working on cutting-edge web applications using React, TypeScript, and Next.js.",
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with Next.js and server-side rendering",
      "Understanding of web performance optimization",
      "Excellent communication skills",
    ],
    benefits: [
      "Health insurance",
      "401(k) matching",
      "Flexible work hours",
      "Remote work options",
      "Professional development budget",
    ],
    postedAt: "2024-10-01",
    logo: "/placeholder.svg?height=80&width=80&query=tech company logo",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "DesignHub",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    description:
      "Join our design team to create beautiful, user-centered products. We're looking for someone passionate about UI/UX design and product thinking.",
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong portfolio demonstrating UX process",
      "Experience with design systems",
      "Collaborative mindset",
    ],
    benefits: [
      "Comprehensive health coverage",
      "Unlimited PTO",
      "Latest design tools and software",
      "Annual design conference budget",
      "Stock options",
    ],
    postedAt: "2024-10-02",
    logo: "/placeholder.svg?height=80&width=80&query=design company logo",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Austin, TX",
    type: "Remote",
    salary: "$130k - $170k",
    description:
      "We're seeking a skilled DevOps Engineer to help us scale our infrastructure. You'll work with Kubernetes, AWS, and modern CI/CD pipelines.",
    requirements: [
      "Experience with Kubernetes and Docker",
      "Strong knowledge of AWS or GCP",
      "CI/CD pipeline management",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Monitoring and observability tools",
    ],
    benefits: [
      "100% remote work",
      "Home office stipend",
      "Health and dental insurance",
      "Learning and development budget",
      "Team retreats twice a year",
    ],
    postedAt: "2024-09-28",
    logo: "/placeholder.svg?height=80&width=80&query=cloud computing logo",
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    description:
      "Join our fast-growing startup as a Full Stack Developer. You'll have the opportunity to work across the entire stack and make a significant impact.",
    requirements: [
      "3+ years full stack development experience",
      "Node.js and React expertise",
      "Database design (PostgreSQL, MongoDB)",
      "RESTful API development",
      "Startup mentality and adaptability",
    ],
    benefits: [
      "Equity package",
      "Flexible schedule",
      "Health insurance",
      "Learning stipend",
      "Quarterly team offsites",
    ],
    postedAt: "2024-10-03",
    logo: "/placeholder.svg?height=80&width=80&query=startup logo",
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "DataInsights",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$110k - $160k",
    description:
      "We're looking for a Data Scientist to help us extract insights from large datasets and build predictive models. Join our data-driven culture.",
    requirements: [
      "Master's degree in Computer Science, Statistics, or related field",
      "Python, pandas, scikit-learn expertise",
      "Experience with ML model deployment",
      "SQL and data warehousing knowledge",
      "Strong communication skills",
    ],
    benefits: [
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Conference and training budget",
      "Collaborative work environment",
      "Hybrid work model",
    ],
    postedAt: "2024-09-30",
    logo: "/placeholder.svg?height=80&width=80&query=data analytics logo",
  },
  {
    id: "6",
    title: "Mobile Developer (iOS)",
    company: "AppMakers",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$115k - $155k",
    description:
      "Build amazing iOS applications that millions of users love. We're looking for a passionate iOS developer to join our mobile team.",
    requirements: [
      "4+ years iOS development experience",
      "Swift and SwiftUI proficiency",
      "App Store publication experience",
      "Understanding of iOS design patterns",
      "TDD and unit testing experience",
    ],
    benefits: [
      "Latest Apple hardware",
      "Health and wellness benefits",
      "Stock options",
      "Flexible PTO",
      "Team building events",
    ],
    postedAt: "2024-10-04",
    logo: "/placeholder.svg?height=80&width=80&query=mobile app logo",
  },
  {
    id: "7",
    title: "Backend Engineer",
    company: "APIFirst",
    location: "Remote",
    type: "Contract",
    salary: "$100 - $150/hr",
    description:
      "We need a backend engineer to help us build scalable APIs and microservices. This is a 6-month contract with potential for extension.",
    requirements: [
      "Strong experience with Node.js or Python",
      "Microservices architecture",
      "Database optimization",
      "API design best practices",
      "Experience with message queues",
    ],
    benefits: [
      "Competitive hourly rate",
      "Fully remote",
      "Flexible hours",
      "Potential for full-time conversion",
    ],
    postedAt: "2024-10-05",
    logo: "/placeholder.svg?height=80&width=80&query=api development logo",
  },
  {
    id: "8",
    title: "UX Researcher",
    company: "UserLabs",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$95k - $135k",
    description:
      "Join our research team to understand user needs and drive product decisions. You'll conduct user interviews, usability testing, and synthesize findings.",
    requirements: [
      "3+ years UX research experience",
      "Qualitative and quantitative research methods",
      "Experience with user testing tools",
      "Strong presentation skills",
      "Empathy for users",
    ],
    benefits: [
      "Health benefits",
      "Professional development",
      "Flexible work arrangement",
      "Research tools and resources",
      "Collaborative culture",
    ],
    postedAt: "2024-10-01",
    logo: "/placeholder.svg?height=80&width=80&query=ux research logo",
  },
];
