import { useState, type JSX } from "react";

type ReportScope = "resume" | "batch";
type ReportFormat = "pdf" | "csv";

type LoadingState = {
  scope: ReportScope;
  format: ReportFormat;
};

type Props = {
  analysisId?: string;
  batchId?: string;
  token: string;
  className?: string;
};

const PENDING_TEXT: Record<ReportScope, Record<ReportFormat, string>> = {
  resume: {
    pdf: "Downloading resume PDF…",
    csv: "Downloading resume CSV…",
  },
  batch: {
    pdf: "Downloading batch PDF…",
    csv: "Downloading batch CSV…",
  },
};

const BUTTON_TEXT: Record<ReportScope, Record<ReportFormat, string>> = {
  resume: {
    pdf: "Download PDF",
    csv: "Download CSV",
  },
  batch: {
    pdf: "Download PDF",
    csv: "Download CSV",
  },
};

function buildEndpoint(scope: ReportScope, id: string, format: ReportFormat): string {
  if (scope === "resume") {
    return `/api/reports/resume/${id}/export/${format}`;
  }
  return `/api/reports/recruiter/batch/${id}/export/${format}`;
}

function defaultFilename(scope: ReportScope, id: string, format: ReportFormat): string {
  const prefix = scope === "resume" ? "resume" : "batch";
  return `${prefix}-${id}.${format}`;
}

export function ReportExportButtons({
  analysisId,
  batchId,
  token,
  className,
}: Props): JSX.Element {
  const [loading, setLoading] = useState<LoadingState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoading = (scope: ReportScope, format: ReportFormat): boolean =>
    loading?.scope === scope && loading?.format === format;

  async function handleDownload(scope: ReportScope, format: ReportFormat) {
    const id = scope === "resume" ? analysisId : batchId;
    if (!id) {
      setErrorMessage("A valid report identifier is required for downloads.");
      return;
    }

    setLoading({ scope, format });
    setErrorMessage(null);

    try {
      const response = await fetch(buildEndpoint(scope, id, format), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("The server rejected the export request.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;

      const contentDisposition = response.headers.get("Content-Disposition");
      const fileNameCandidate =
        contentDisposition?.split("filename=")[1]?.replace(/"/g, "") ??
        defaultFilename(scope, id, format);

      link.download = fileNameCandidate;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setErrorMessage(message);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className={className}>
      {analysisId && (
        <section>
          <header>
            <h3>Resume exports</h3>
          </header>
          <div className="export-row">
            <button
              type="button"
              onClick={() => handleDownload("resume", "pdf")}
              disabled={isLoading("resume", "pdf")}
            >
              {isLoading("resume", "pdf")
                ? PENDING_TEXT.resume.pdf
                : BUTTON_TEXT.resume.pdf}
            </button>
            <button
              type="button"
              onClick={() => handleDownload("resume", "csv")}
              disabled={isLoading("resume", "csv")}
            >
              {isLoading("resume", "csv")
                ? PENDING_TEXT.resume.csv
                : BUTTON_TEXT.resume.csv}
            </button>
          </div>
        </section>
      )}

      {batchId && (
        <section>
          <header>
            <h3>Recruiter batch exports</h3>
          </header>
          <div className="export-row">
            <button
              type="button"
              onClick={() => handleDownload("batch", "pdf")}
              disabled={isLoading("batch", "pdf")}
            >
              {isLoading("batch", "pdf")
                ? PENDING_TEXT.batch.pdf
                : BUTTON_TEXT.batch.pdf}
            </button>
            <button
              type="button"
              onClick={() => handleDownload("batch", "csv")}
              disabled={isLoading("batch", "csv")}
            >
              {isLoading("batch", "csv")
                ? PENDING_TEXT.batch.csv
                : BUTTON_TEXT.batch.csv}
            </button>
          </div>
        </section>
      )}

      {errorMessage && (
        <p role="alert" className="export-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default ReportExportButtons;
