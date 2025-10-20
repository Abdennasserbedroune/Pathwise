// <CHANGE> new API route: accept file upload and return resume analysis

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import pdf from "pdf-parse";
import mammoth from "mammoth";

type SectionPresence = {
  summary: boolean;
  experience: boolean;
  education: boolean;
  projects: boolean;
  skills: boolean;
  certifications?: boolean;
};

type Metric = {
  key: string;
  label: string;
  value: number;
  details?: string;
};

type ContactSignals = {
  has_email: boolean;
  has_phone: boolean;
  email_count: number;
  phone_count: number;
};

type FeedbackItem = {
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  recommendation?: string;
};

type AnalyzeResponse = {
  overall_score: number;
  metrics: {
    coverage: Metric;
    length: Metric;
    contact: Metric;
    skills: Metric;
  };
  sections: SectionPresence;
  contact: ContactSignals;
  detected_skills: string[];
  word_count: number;
  sentence_count: number;
  truncated: boolean;
  feedback: FeedbackItem[];
};

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const PHONE_RE =
  /(?:(?:\+?\d{1,3}[\s.-])?(?:\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4})/g;
const WORD_RE = /\b\w+\b/g;
const SENTENCE_RE = /[^.!?]+[.!?]/g;

const DEFAULT_SKILLS = [
  "python",
  "java",
  "javascript",
  "typescript",
  "sql",
  "postgres",
  "mysql",
  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "react",
  "node",
  "django",
  "flask",
  "fastapi",
  "c++",
  "c#",
  "go",
  "rust",
  "html",
  "css",
  "graphql",
  "tensorflow",
  "pytorch",
  "nlp",
  "machine learning",
  "ml",
  "ai",
];

function containsAny(text: string, keys: string[]): string[] {
  const t = text.toLowerCase();
  const out: string[] = [];
  for (const k of keys) {
    if (t.includes(k.toLowerCase())) out.push(k.toLowerCase());
  }
  return Array.from(new Set(out)).sort();
}

function wordCount(text: string) {
  return (text.match(WORD_RE) ?? []).length;
}

function sentenceCount(text: string) {
  const n = (text.match(SENTENCE_RE) ?? []).length;
  return Math.max(1, n);
}

function analyzeText(textIn: string, jobDescription?: string): AnalyzeResponse {
  let text = textIn;
  let truncated = false;
  if (text.length > 100_000) {
    text = text.slice(0, 100_000);
    truncated = true;
  }

  const wc = wordCount(text);
  const sc = sentenceCount(text);
  const emails = text.match(EMAIL_RE) ?? [];
  const phones = text.match(PHONE_RE) ?? [];

  const sections: SectionPresence = {
    summary: /summary|objective|profile/i.test(text),
    experience: /experience|employment/i.test(text),
    education: /education/i.test(text),
    projects: /project|projects/i.test(text),
    skills: /skills|technologies/i.test(text),
    certifications: /certification|certifications/i.test(text),
  };

  const detected = containsAny(text, DEFAULT_SKILLS);
  if (jobDescription) {
    const jdHits = containsAny(jobDescription, DEFAULT_SKILLS);
    for (const k of jdHits) if (!detected.includes(k)) detected.push(k);
    detected.sort();
  }

  const coverageHits = [
    sections.summary,
    sections.experience,
    sections.education,
    sections.projects,
    sections.skills,
  ].filter(Boolean).length;

  const coverageScore = (coverageHits / 5) * 100;

  const lengthOptimalLow = 250;
  const lengthOptimalHigh = 900;
  let lengthScore: number;
  if (wc < lengthOptimalLow) {
    lengthScore = Math.max(0, (wc / lengthOptimalLow) * 100);
  } else if (wc > lengthOptimalHigh) {
    const over = Math.min(2000, wc);
    lengthScore = Math.max(
      20,
      100 - ((over - lengthOptimalHigh) / (2000 - lengthOptimalHigh)) * 80
    );
  } else {
    lengthScore = 100;
  }

  const contact: ContactSignals = {
    has_email: emails.length > 0,
    has_phone: phones.length > 0,
    email_count: emails.length,
    phone_count: phones.length,
  };
  const contactScore = contact.has_email && contact.has_phone ? 100 : contact.has_email ? 50 : 0;
  const skillsScore = Math.min(100, (detected.length / 10) * 100);

  const overall = Math.round(
    (0.3 * coverageScore +
      0.2 * lengthScore +
      0.3 * contactScore +
      0.2 * skillsScore) * 10
  ) / 10;

  const metrics = {
    coverage: { key: "coverage", label: "Section coverage", value: Math.round(coverageScore * 10) / 10 },
    length: {
      key: "length",
      label: "Length appropriateness",
      value: Math.round(lengthScore * 10) / 10,
      details: `${wc} words, ${sc} sentences`,
    },
    contact: { key: "contact", label: "Contact details present", value: Math.round(contactScore * 10) / 10 },
    skills: { key: "skills", label: "Skills & keywords", value: Math.round(skillsScore * 10) / 10, details: `${detected.length} detected` },
  };

  const feedback: FeedbackItem[] = [];
  if (!contact.has_email) {
    feedback.push({
      severity: "high",
      message: "No email address detected.",
      recommendation: "Add a professional email to the header section.",
    });
  }
  if (!contact.has_phone) {
    feedback.push({
      severity: "medium",
      message: "No phone number detected.",
      recommendation: "Consider adding a mobile number for recruiter outreach.",
    });
  }
  if (coverageHits < 4) {
    feedback.push({
      severity: "medium",
      message:
        "Some core sections are missing (summary, experience, education, projects, skills).",
      recommendation: "Add the missing sections to improve scanning and ATS parsing.",
    });
  }
  if (wc < lengthOptimalLow) {
    feedback.push({
      severity: "low",
      message: "Resume appears too short.",
      recommendation:
        "Expand experience bullets with measurable outcomes and impact.",
    });
  } else if (wc > 1200) {
    feedback.push({
      severity: "low",
      message: "Resume may be overly long.",
      recommendation: "Trim older roles or consolidate repetitive bullets.",
    });
  }

  return {
    overall_score: overall,
    metrics,
    sections,
    contact,
    detected_skills: detected,
    word_count: wc,
    sentence_count: sc,
    truncated,
    feedback,
  };
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // Support multipart (file upload) and JSON (raw text)
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file") as File | null;
      const jobDescription = (form.get("jobDescription") as string | null) ?? undefined;

      if (!file) {
        return NextResponse.json({ error: "No file provided." }, { status: 400 });
      }

      const buf = Buffer.from(await file.arrayBuffer());
      let text = "";

      if (
        file.type === "application/pdf" ||
        file.name?.toLowerCase().endsWith(".pdf")
      ) {
        const out = await pdf(buf);
        text = out.text || "";
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name?.toLowerCase().endsWith(".docx")
      ) {
        const out = await mammoth.extractRawText({ buffer: buf });
        text = out.value || "";
      } else if (file.type === "text/plain" || file.name?.toLowerCase().endsWith(".txt")) {
        text = buf.toString("utf-8");
      } else {
        return NextResponse.json(
          { error: "Unsupported file type. Please upload PDF, DOCX, or TXT." },
          { status: 415 }
        );
      }

      text = (text || "").trim();
      if (!text) {
        return NextResponse.json(
          { error: "Could not extract text from the provided file." },
          { status: 422 }
        );
      }

      const result = analyzeText(text, jobDescription);
      return NextResponse.json(result, { status: 200 });
    }

    // JSON payload: { text, job_description? }
    const body = await req.json().catch(() => null) as
      | { text?: string; job_description?: string }
      | null;

    if (!body?.text) {
      return NextResponse.json(
        { error: "Missing 'text' in request body." },
        { status: 400 }
      );
    }

    const result = analyzeText(body.text, body.job_description);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("[analyze/resume] Error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
