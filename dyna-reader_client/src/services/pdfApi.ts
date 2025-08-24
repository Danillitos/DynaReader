import { PdfRef } from '../hooks/usePdfService'

const API_URL = 'http://192.168.18.73:3000';

export async function uploadPdfBase64(pdf: PdfRef) {
  const payload = {
    filename: pdf.name,
    mimeType: 'application/pdf',
    dataBase64: pdf.base64,
  };

  const res = await fetch(`${API_URL}/pdf/upload-base64`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Falha no upload: ${res.status}`);
  }

  return res.json();
}