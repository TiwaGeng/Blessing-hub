import type { RowData } from "@/lib/admin-data";

function downloadBlob(filename: string, blob: Blob) {
  if (typeof window === "undefined") return;

  const url = window.URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.URL.revokeObjectURL(url);
}

export function exportRowsToCsv(filename: string, rows: RowData[]) {
  if (!rows.length) return;

  const headers = Object.keys(rows[0]);
  const content = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? "").replaceAll('"', '""')}"`)
        .join(","),
    ),
  ].join("\n");

  downloadBlob(
    filename,
    new Blob([content], { type: "text/csv;charset=utf-8;" }),
  );
}

export function exportRowsToWord(
  title: string,
  filename: string,
  rows: RowData[],
) {
  if (!rows.length) return;

  const headers = Object.keys(rows[0]);
  const tableHead = headers.map((header) => `<th>${header}</th>`).join("");
  const tableBody = rows
    .map(
      (row) =>
        `<tr>${headers.map((header) => `<td>${row[header] ?? ""}</td>`).join("")}</tr>`,
    )
    .join("");

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
          h1 { margin-bottom: 18px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
          th { background: #0f172a; color: white; }
          tr:nth-child(even) { background: #f8fafc; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table>
          <thead><tr>${tableHead}</tr></thead>
          <tbody>${tableBody}</tbody>
        </table>
      </body>
    </html>
  `;

  downloadBlob(filename, new Blob([html], { type: "application/msword" }));
}

export function printRowsReport(title: string, rows: RowData[]) {
  if (typeof window === "undefined" || !rows.length) return;

  const headers = Object.keys(rows[0]);
  const tableHead = headers.map((header) => `<th>${header}</th>`).join("");
  const tableBody = rows
    .map(
      (row) =>
        `<tr>${headers.map((header) => `<td>${row[header] ?? ""}</td>`).join("")}</tr>`,
    )
    .join("");

  const reportWindow = window.open("", "_blank", "width=1100,height=800");
  if (!reportWindow) return;

  reportWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
          h1 { margin-bottom: 8px; }
          p { margin-bottom: 18px; color: #475569; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
          th { background: #0f172a; color: white; }
          tr:nth-child(even) { background: #f8fafc; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <p>Generated from Blessing School portal.</p>
        <table>
          <thead><tr>${tableHead}</tr></thead>
          <tbody>${tableBody}</tbody>
        </table>
      </body>
    </html>
  `);
  reportWindow.document.close();
  reportWindow.focus();
  reportWindow.print();
}
