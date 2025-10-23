export type JobType = "Remote" | "Hybrid" | "Onsite";
export type EmploymentType = "Full-time" | "Part-time" | "Contract";
export type ExperienceLevel = "Junior" | "Mid" | "Senior" | "Lead";

export interface Job {
  readonly id: string;
  readonly title: string;
  readonly company: string;
  readonly location: string;
  readonly jobType: JobType;
  readonly employmentType: EmploymentType;
  readonly salaryRange?: string;
  readonly experienceLevel: ExperienceLevel;
  readonly description: string;
  readonly about: string;
  readonly responsibilities: string[];
  readonly skills: string[];
  readonly perks: string[];
  readonly postedAt: string;
  readonly logo: string;
}

export const mockJobs: Job[] = [
  {
    id: "job-01",
    title: "Senior Frontend Engineer",
    company: "Lumen Labs",
    location: "Remote - North America",
    jobType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$150k – $190k + equity",
    experienceLevel: "Senior",
    description:
      "Own the front-of-house experience for a data storytelling platform serving Fortune 500 customers. Collaborate with product and design to ship delightful interfaces in record time.",
    about:
      "Lumen Labs builds visualization software that helps enterprise teams translate complex data into narratives executives understand. The product team is distributed across six time zones and values craftsmanship, autonomy, and measured delivery.",
    responsibilities: [
      "Architect resilient React features that scale to thousands of concurrent viewers",
      "Partner with design on interaction patterns that feel native on mobile and desktop",
      "Raise the bar on accessibility, performance budgets, and testing coverage",
      "Mentor mid-level engineers through pairing and actionable feedback",
    ],
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Accessibility"],
    perks: ["Remote-first culture", "Flexible Fridays", "Professional coaching stipend", "Comprehensive health cover"],
    postedAt: "2024-09-22",
    logo: "/placeholder.svg?height=80&width=80&query=lumen%20labs%20logo",
  },
  {
    id: "job-02",
    title: "Lead Product Manager",
    company: "Beacon Analytics",
    location: "Austin, TX",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$175k – $205k + bonus",
    experienceLevel: "Lead",
    description:
      "Guide the roadmap for Beacon's predictive revenue intelligence suite. Align cross-functional teams around measurable outcomes and customer value.",
    about:
      "Beacon Analytics equips revenue leaders with predictive signals rooted in customer behavior. The PM org works closely with research, design, and GTM to ship thoughtful, opinionated workflows.",
    responsibilities: [
      "Translate executive strategy into clear, prioritized roadmaps",
      "Drive discovery rituals with customers to surface unmet needs",
      "Collaborate with engineering leadership on squad resourcing",
      "Own KPI instrumentation and narrative storytelling for launches",
    ],
    skills: ["Roadmapping", "Data storytelling", "Stakeholder management", "Experimentation"],
    perks: ["Hybrid work (3 days HQ)", "401(k) match", "Sabbatical after 4 years", "Annual learning budget"],
    postedAt: "2024-10-01",
    logo: "/placeholder.svg?height=80&width=80&query=beacon%20analytics%20mark",
  },
  {
    id: "job-03",
    title: "Growth Marketing Strategist",
    company: "Northstar",
    location: "New York, NY",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$110k – $145k + commission",
    experienceLevel: "Mid",
    description:
      "Design and execute lifecycle programs that convert trial signups into long-term champions. Blend creative experimentation with data fluency.",
    about:
      "Northstar is a fintech platform giving employees transparent guidance on their compensation and equity. The marketing team is scrappy, insight-driven, and highly collaborative with product.",
    responsibilities: [
      "Own email, in-app, and paid retargeting campaigns from strategy to reporting",
      "Build multi-touch nurture journeys grounded in behavioral segmentation",
      "Partner with product marketing on messaging and positioning tests",
      "Report experiment readouts and recommendations to the growth pod",
    ],
    skills: ["Lifecycle automation", "SQL", "Figma", "Copywriting", "HubSpot"],
    perks: ["Equity grants", "Wellness stipend", "Hybrid commuter benefits", "Inclusive parental leave"],
    postedAt: "2024-09-27",
    logo: "/placeholder.svg?height=80&width=80&query=northstar%20branding",
  },
  {
    id: "job-04",
    title: "Staff Platform Engineer",
    company: "Fieldnote",
    location: "Denver, CO",
    jobType: "Onsite",
    employmentType: "Full-time",
    salaryRange: "$165k – $210k + RSUs",
    experienceLevel: "Senior",
    description:
      "Evolve Fieldnote's cloud platform so product teams deploy safely multiple times a day. Champion infrastructure reliability without slowing down experimentation.",
    about:
      "Fieldnote powers the workflow backbone for outdoor hospitality operators. The platform team manages multi-region Kubernetes clusters, observability pipelines, and developer tooling.",
    responsibilities: [
      "Design platform capabilities that balance guardrails with autonomy",
      "Optimize build pipelines to reduce average lead time under 15 minutes",
      "Own on-call rotation health and incident response maturity",
      "Coach engineers on observability dashboards and SLO-driven thinking",
    ],
    skills: ["Kubernetes", "Terraform", "AWS", "Go", "SRE"],
    perks: ["Onsite lunch program", "Outdoor gear stipend", "Equity refreshers", "Dedicated focus Fridays"],
    postedAt: "2024-09-18",
    logo: "/placeholder.svg?height=80&width=80&query=fieldnote%20logo",
  },
  {
    id: "job-05",
    title: "Product Designer",
    company: "Sonar Studio",
    location: "Seattle, WA",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$125k – $155k",
    experienceLevel: "Mid",
    description:
      "Shape the mobile experience for a collaboration suite used by 40k creative teams. Translate customer insights into elegant flows and polished UI systems.",
    about:
      "Sonar Studio provides async collaboration tools that feel handcrafted. Designers partner tightly with research, product, and engineering from discovery through QA.",
    responsibilities: [
      "Lead end-to-end design for mobile-first workflows",
      "Run lightweight generative research alongside product peers",
      "Define reusable interaction patterns within the design system",
      "Ship pixel-perfect assets and partner in implementation reviews",
    ],
    skills: ["Product discovery", "Figma", "Design systems", "Prototyping", "Motion design"],
    perks: ["Design conference stipend", "Hybrid commuter pass", "Quarterly creative sabbatical", "Wellness membership"],
    postedAt: "2024-10-03",
    logo: "/placeholder.svg?height=80&width=80&query=sonar%20studio%20mark",
  },
  {
    id: "job-06",
    title: "Machine Learning Engineer",
    company: "Greyline AI",
    location: "Remote - US & Canada",
    jobType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$160k – $185k",
    experienceLevel: "Senior",
    description:
      "Deploy responsible ML systems that power risk monitoring for financial institutions. Own the end-to-end lifecycle from data pipelines to production evaluation.",
    about:
      "Greyline AI partners with banks to surface suspicious activity with human-in-the-loop oversight. Engineering teams emphasize model transparency and measurable outcomes.",
    responsibilities: [
      "Build scalable training pipelines on top of Snowflake and Kubernetes",
      "Develop monitoring dashboards that surface drift, bias, and latency",
      "Collaborate with compliance on explainability and reporting",
      "Ship inference services with blue/green rollout discipline",
    ],
    skills: ["Python", "PyTorch", "Airflow", "ML Ops", "Snowflake"],
    perks: ["Home office stipend", "Quarterly team offsites", "Health and dental", "Mental health allowance"],
    postedAt: "2024-09-25",
    logo: "/placeholder.svg?height=80&width=80&query=greyline%20ai%20logo",
  },
  {
    id: "job-07",
    title: "Customer Success Partner",
    company: "Relay",
    location: "Chicago, IL",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$95k – $120k + variable",
    experienceLevel: "Mid",
    description:
      "Own enterprise relationships and ensure customers reach measurable value milestones. Drive adoption programs and executive narratives.",
    about:
      "Relay connects frontline teams with HQ through a secure mobile platform. Customer success partners operate cross-functionally with product, solutions engineering, and support.",
    responsibilities: [
      "Develop joint success plans with enterprise champions",
      "Host monthly business reviews and surface expansion opportunities",
      "Coordinate rollouts with enablement and onboarding teams",
      "Capture product feedback loops and advocate internally",
    ],
    skills: ["Customer lifecycle", "Churn prevention", "Executive communication", "SaaS playbooks"],
    perks: ["Stock options", "Professional development stipend", "Volunteer time off", "Transit benefits"],
    postedAt: "2024-09-29",
    logo: "/placeholder.svg?height=80&width=80&query=relay%20brand",
  },
  {
    id: "job-08",
    title: "Data Product Analyst",
    company: "Meridian",
    location: "San Francisco, CA",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$135k – $165k",
    experienceLevel: "Mid",
    description:
      "Translate product questions into trustworthy analytics. Build dashboards and experiments that guide roadmap decisions for Meridian's core marketplace.",
    about:
      "Meridian connects climate startups with enterprise buyers. Analysts sit with product squads to shape hypotheses, success metrics, and applied insights.",
    responsibilities: [
      "Design experiments with statistically sound guardrails",
      "Build self-serve dashboards using dbt and Looker",
      "Investigate funnel issues and deliver actionable narratives",
      "Partner with data engineers to improve semantic modeling",
    ],
    skills: ["SQL", "dbt", "Looker", "Experiment design", "Python"],
    perks: ["Carbon offset matching", "Hybrid commuter stipend", "Equity grants", "Wellness reimbursement"],
    postedAt: "2024-09-21",
    logo: "/placeholder.svg?height=80&width=80&query=meridian%20logo",
  },
  {
    id: "job-09",
    title: "Senior UX Researcher",
    company: "Atlas Health",
    location: "Remote - US",
    jobType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$140k – $170k",
    experienceLevel: "Senior",
    description:
      "Lead mixed-method research programs that inform the patient and clinician experience across Atlas Health's digital care suite.",
    about:
      "Atlas Health delivers a virtual-first care platform supporting specialty clinics. Research partners closely with design, product, and clinical experts.",
    responsibilities: [
      "Plan foundational and evaluative studies across the product lifecycle",
      "Develop research repositories and storytelling rituals",
      "Mentor product squads on rapid, lightweight testing",
      "Champion inclusive research practices and diverse recruitment",
    ],
    skills: ["Qualitative research", "Quant methods", "Research ops", "Storytelling", "Data synthesis"],
    perks: ["Inclusive parental leave", "Remote setup stipend", "Mental health coverage", "Annual research conference"],
    postedAt: "2024-09-30",
    logo: "/placeholder.svg?height=80&width=80&query=atlas%20health%20logo",
  },
  {
    id: "job-10",
    title: "Brand Copywriter",
    company: "Pilot & Co",
    location: "Portland, OR",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$80k – $105k",
    experienceLevel: "Mid",
    description:
      "Craft bold narratives for a modern outdoors brand spanning digital, retail, and experiential touchpoints. Inject personality without sacrificing clarity.",
    about:
      "Pilot & Co designs gear for people who take weekend adventures seriously. The creative team is multidisciplinary, collaborative, and detail-obsessed.",
    responsibilities: [
      "Own copy for seasonal campaigns across email, web, and retail signage",
      "Develop brand voice guidelines alongside design leadership",
      "Partner with e-commerce on conversion-oriented messaging",
      "Test and iterate on storytelling through rapid experimentation",
    ],
    skills: ["Brand voice", "Storytelling", "Lifecycle messaging", "Editing", "CMS tooling"],
    perks: ["Gear credit", "Studio creative retreats", "Wellness package", "401(k) contribution"],
    postedAt: "2024-09-17",
    logo: "/placeholder.svg?height=80&width=80&query=pilot%20and%20co%20logo",
  },
  {
    id: "job-11",
    title: "Back-End Engineer",
    company: "Carter Ledger",
    location: "Toronto, ON",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$135k – $165k CAD",
    experienceLevel: "Mid",
    description:
      "Build resilient API services that power Carter's global accounting automation platform. Focus on reliability and thoughtful system design.",
    about:
      "Carter Ledger is modernizing the audit workflow for finance teams. Engineering pods own services end-to-end with strong DevOps partnership.",
    responsibilities: [
      "Design event-driven services with idempotent workflows",
      "Harden integrations with financial data providers",
      "Improve observability and alerting for mission-critical flows",
      "Collaborate with product on shaping API-first capabilities",
    ],
    skills: ["Node.js", "TypeScript", "PostgreSQL", "Event-driven design", "AWS"],
    perks: ["Hybrid office downtown", "RRSP matching", "Stock options", "Professional development fund"],
    postedAt: "2024-09-24",
    logo: "/placeholder.svg?height=80&width=80&query=carter%20ledger%20logo",
  },
  {
    id: "job-12",
    title: "Design Operations Manager",
    company: "Arcadia",
    location: "Boston, MA",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$120k – $150k",
    experienceLevel: "Senior",
    description:
      "Stand up the operational backbone that enables Arcadia's design org to scale. Build rituals, tooling, and partnerships that increase velocity.",
    about:
      "Arcadia powers the clean energy transition by connecting consumers with renewable providers. The design team spans product, brand, and research disciplines.",
    responsibilities: [
      "Implement planning cadences and resource forecasting",
      "Own intake, prioritization, and cross-functional alignment",
      "Evaluate and roll out tooling for design system management",
      "Track org health metrics and share actionable readouts",
    ],
    skills: ["Program management", "Operations", "Figma", "Vendor evaluation", "Communication"],
    perks: ["Climate impact stipend", "Hybrid commuter benefits", "Employee stock program", "Wellness allowance"],
    postedAt: "2024-09-26",
    logo: "/placeholder.svg?height=80&width=80&query=arcadia%20energy%20logo",
  },
  {
    id: "job-13",
    title: "Security Engineer",
    company: "Fortress",
    location: "Remote - US",
    jobType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$145k – $180k",
    experienceLevel: "Senior",
    description:
      "Design layers of defense that keep Fortress customers safe. Embed with product squads to champion secure-by-default patterns.",
    about:
      "Fortress builds cybersecurity tooling for mid-market businesses. Security engineers partner closely with infrastructure, compliance, and product to keep risk low.",
    responsibilities: [
      "Conduct threat modeling and drive mitigations with engineering squads",
      "Automate detection and response playbooks",
      "Own vulnerability management processes",
      "Contribute to security awareness training and tabletop exercises",
    ],
    skills: ["Threat modeling", "Python", "AWS", "SIEM", "Security architecture"],
    perks: ["Remote stipend", "Annual security conference", "Equity grants", "Comprehensive insurance"],
    postedAt: "2024-09-19",
    logo: "/placeholder.svg?height=80&width=80&query=fortress%20security%20logo",
  },
  {
    id: "job-14",
    title: "Content Marketing Manager",
    company: "Brightwell",
    location: "Atlanta, GA",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$95k – $125k",
    experienceLevel: "Mid",
    description:
      "Own the editorial engine for Brightwell's payments platform. Create compelling narratives that convert prospects and delight customers.",
    about:
      "Brightwell helps global workers access their earnings instantly. The marketing team is metrics-driven and deeply aligned with sales.",
    responsibilities: [
      "Develop long-form content and thought leadership programs",
      "Manage editorial calendar and freelance partners",
      "Optimize SEO and distribution strategies",
      "Report on content performance and iterate quickly",
    ],
    skills: ["Editorial strategy", "SEO", "CMS", "Analytics", "Interviewing"],
    perks: ["Hybrid work", "401(k) match", "Health & dental", "Tuition reimbursement"],
    postedAt: "2024-09-16",
    logo: "/placeholder.svg?height=80&width=80&query=brightwell%20logo",
  },
  {
    id: "job-15",
    title: "Mobile Engineer (Android)",
    company: "Stride",
    location: "Remote - US",
    jobType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$140k – $170k",
    experienceLevel: "Senior",
    description:
      "Ship polished Android experiences that make personal finance feel intuitive. Partner with designers to deliver premium micro-interactions.",
    about:
      "Stride helps freelancers manage their cash flow with automated insights. The mobile team pairs daily and ships on a biweekly cadence.",
    responsibilities: [
      "Own feature development end-to-end in Kotlin",
      "Improve architecture patterns for modular code",
      "Collaborate on experimentation frameworks and analytics",
      "Champion inclusive design and accessibility on mobile",
    ],
    skills: ["Kotlin", "Jetpack Compose", "Clean architecture", "Firebase", "UI testing"],
    perks: ["Flexible PTO", "Remote office stipend", "Equity", "Quarterly team summits"],
    postedAt: "2024-09-28",
    logo: "/placeholder.svg?height=80&width=80&query=stride%20finance%20logo",
  },
  {
    id: "job-16",
    title: "Solutions Architect",
    company: "Harbor",
    location: "Boston, MA",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$155k – $190k",
    experienceLevel: "Senior",
    description:
      "Enable enterprise customers to deploy Harbor's supply chain visibility platform. Blend technical depth with storytelling to accelerate value.",
    about:
      "Harbor brings real-time tracking and predictive ETAs to global logistics teams. Solutions architects straddle product knowledge, systems design, and account strategy.",
    responsibilities: [
      "Design integration architectures tailored to customer ecosystems",
      "Run discovery workshops and document technical requirements",
      "Lead pilots and proof-of-concept implementations",
      "Partner with product on roadmap feedback grounded in customer reality",
    ],
    skills: ["Systems design", "APIs", "Stakeholder management", "Cloud platforms", "Scripting"],
    perks: ["Commuter stipend", "Equity", "Executive mentorship", "Wellness reimbursement"],
    postedAt: "2024-09-23",
    logo: "/placeholder.svg?height=80&width=80&query=harbor%20logo",
  },
  {
    id: "job-17",
    title: "QA Automation Engineer",
    company: "Loop",
    location: "Remote - Americas",
    jobType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$105k – $135k",
    experienceLevel: "Mid",
    description:
      "Build and maintain a modern automation suite covering web and mobile flows. Ensure Loop ships with confidence and catches issues before customers do.",
    about:
      "Loop provides returns management software for fast-growing e-commerce brands. Quality engineering partners closely with product squads.",
    responsibilities: [
      "Develop automation frameworks in Playwright and Cypress",
      "Integrate tests into CI pipelines with meaningful reporting",
      "Coach squads on test strategy and risk assessment",
      "Contribute to release planning and go/no-go decisions",
    ],
    skills: ["Playwright", "Cypress", "TypeScript", "CI/CD", "Test strategy"],
    perks: ["Remote stipend", "Learning allowance", "Stock options", "Wellness days"],
    postedAt: "2024-09-20",
    logo: "/placeholder.svg?height=80&width=80&query=loop%20returns%20logo",
  },
  {
    id: "job-18",
    title: "Finance & Strategy Associate",
    company: "Cinder",
    location: "San Francisco, CA",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$115k – $140k",
    experienceLevel: "Mid",
    description:
      "Support Cinder's leadership team with financial planning, strategic analysis, and investor-ready insights as we scale renewable storage.",
    about:
      "Cinder deploys grid-scale battery storage. The strategy team partners closely with operations, engineering, and go-to-market.",
    responsibilities: [
      "Model scenarios for capital deployment and new market entry",
      "Build dashboards that track company-wide KPIs",
      "Prepare board materials and investor updates",
      "Collaborate with operations on cost optimization initiatives",
    ],
    skills: ["Financial modeling", "SQL", "Investor relations", "Excel", "Storytelling"],
    perks: ["Equity", "Hybrid commute support", "Lunch stipend", "Health benefits"],
    postedAt: "2024-09-15",
    logo: "/placeholder.svg?height=80&width=80&query=cinder%20energy%20logo",
  },
  {
    id: "job-19",
    title: "People Operations Partner",
    company: "Signal",
    location: "Los Angeles, CA",
    jobType: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "$100k – $130k",
    experienceLevel: "Mid",
    description:
      "Build people programs that keep Signal's team engaged and growing. Drive onboarding, performance, and culture initiatives.",
    about:
      "Signal is a creative technology studio shipping immersive brand experiences. People ops partners with leadership to scale intentional culture.",
    responsibilities: [
      "Design onboarding journeys for hybrid teams",
      "Run performance review cycles and feedback programs",
      "Own HRIS administration and compliance",
      "Lead culture rituals, events, and employee listening programs",
    ],
    skills: ["HRIS", "Employee engagement", "Program design", "Compliance", "Facilitation"],
    perks: ["Creative studio stipend", "Hybrid commuter perks", "Healthcare", "401(k) match"],
    postedAt: "2024-09-14",
    logo: "/placeholder.svg?height=80&width=80&query=signal%20studio%20logo",
  },
  {
    id: "job-20",
    title: "DevRel Engineer",
    company: "Orbit",
    location: "Remote - Global",
    jobType: "Remote",
    employmentType: "Full-time",
    salaryRange: "$130k – $160k",
    experienceLevel: "Senior",
    description:
      "Champion Orbit's developer experience through content, community, and code. Make sure teams ship faster with our infrastructure APIs.",
    about:
      "Orbit provides low-latency edge computing for ambitious builders. DevRel partners with product, marketing, and community to drive adoption.",
    responsibilities: [
      "Create sample apps, tutorials, and reference architectures",
      "Host workshops, webinars, and community events",
      "Collect product feedback and influence roadmap priorities",
      "Measure program impact through growth and activation metrics",
    ],
    skills: ["JavaScript", "Public speaking", "Content creation", "Community building", "APIs"],
    perks: ["Global remote stipend", "Conference travel", "Equity", "Flexible time off"],
    postedAt: "2024-09-13",
    logo: "/placeholder.svg?height=80&width=80&query=orbit%20devrel%20logo",
  },
];
