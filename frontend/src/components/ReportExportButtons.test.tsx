import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ReportExportButtons from "./ReportExportButtons";

const createResponse = (body: BlobPart, init: ResponseInit): Response =>
  new Response(body, init);

describe("ReportExportButtons", () => {
  const originalFetch = globalThis.fetch;
  const originalCreateObjectURL = globalThis.URL.createObjectURL;
  const originalRevokeObjectURL = globalThis.URL.revokeObjectURL;

  beforeEach(() => {
    globalThis.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    globalThis.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = originalFetch;
    globalThis.URL.createObjectURL = originalCreateObjectURL;
    globalThis.URL.revokeObjectURL = originalRevokeObjectURL;
  });

  it("downloads a resume PDF and exposes a loading state", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        createResponse("pdf", {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=resume.pdf",
          },
        }),
      );
    globalThis.fetch = fetchMock;
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    render(<ReportExportButtons analysisId="analysis-ava" token="token-ava" />);

    const downloadButton = screen.getByRole("button", { name: "Download PDF" });
    await user.click(downloadButton);

    expect(screen.getByRole("button", { name: "Downloading resume PDF…" })).toBeDisabled();

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/reports/resume/analysis-ava/export/pdf",
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer token-ava" }),
      }),
    );

    await waitFor(() => expect(clickSpy).toHaveBeenCalled());
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Download PDF" })).not.toBeDisabled(),
    );

    expect(globalThis.URL.createObjectURL).toHaveBeenCalled();
    expect(globalThis.URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
  });

  it("surfaces an error message when the export fails", async () => {
    const user = userEvent.setup();
    globalThis.fetch = vi.fn().mockResolvedValue(
      createResponse("", {
        status: 403,
      }),
    );

    render(<ReportExportButtons analysisId="analysis-ava" token="token-ava" />);

    await user.click(screen.getByRole("button", { name: "Download CSV" }));

    await screen.findByRole("alert");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The server rejected the export request.",
    );
  });

  it("requests recruiter batch exports when a batch id is provided", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        createResponse("csv", {
          status: 200,
          headers: {
            "Content-Type": "text/csv",
          },
        }),
      );

    globalThis.fetch = fetchMock;
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    render(
      <ReportExportButtons
        analysisId="analysis-ava"
        batchId="batch-recruiter-planetaria"
        token="token-recruiter-leia"
      />,
    );

    const csvButtons = screen.getAllByRole("button", { name: "Download CSV" });
    await user.click(csvButtons[1]);

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/reports/recruiter/batch/batch-recruiter-planetaria/export/csv",
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: "Bearer token-recruiter-leia" }),
        }),
      ),
    );
  });
});
