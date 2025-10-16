import { exec } from "child_process";
import path from "path";
import { cache } from "./cache.js"; // ✅

export async function verifyBrvmSsl(): Promise<{ status: string; error?: string }> {
  return new Promise((resolve) => {
    const scriptPath = path.resolve("scripts", "check_ssl.py");

    exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Erreur exécution script Python:", error);
        return resolve({ status: "error", error: error.message });
      }

      try {
        const result = JSON.parse(stdout);
        cache.set("sslStatus", result); // facultatif
        resolve(result);
      } catch (parseError) {
        console.error("❌ Erreur parsing JSON:", parseError);
        resolve({ status: "error", error: "Invalid JSON output from Python" });
      }
    });
  });
}
