import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export type PdfRef = {
  uri: string;
  name: string;
  base64: string; 
};


export function usePdfService() {
  const [pdfs, setPdfs] = useState<PdfRef[]>([]);

  const pickPdfs = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if ("canceled" in res) {
        if (res.canceled) return;

        const newFiles = await Promise.all(
          (res.assets ?? []).map(async (a) => {
            const base64 = await FileSystem.readAsStringAsync(a.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            return {
              uri: a.uri,
              name: a.name || a.uri.split("/").pop() || "Arquivo sem nome",
              base64,
            };
          })
        );

        setPdfs((prev) => [...prev, ...newFiles]);
        return;
      }

      // API antiga
      const legacy = res as any;
      if (legacy?.type === "success" && legacy?.uri) {
        const base64 = await FileSystem.readAsStringAsync(legacy.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setPdfs((prev) => [
          ...prev,
          {
            uri: legacy.uri,
            name: legacy.name || legacy.uri.split("/").pop() || "Arquivo sem nome",
            base64,
          },
        ]);
      }
    } catch (err) {
      console.error("Erro ao selecionar PDFs:", err);
    }
  };

  return { pdfs, pickPdfs };
}
