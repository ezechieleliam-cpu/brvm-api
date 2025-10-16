import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { cache } from "./cache.js";

export async function verifyBrvmSsl(): Promise<{ status: string; error?: string }> {
  return new Promise((resolve) => {
    const scriptPath = path.resolve("scripts", "check_ssl.py");

    if (!fs.existsSync(scriptPath)) {
      console.warn("⚠️ Script Python introuvable :", scriptPath);
      return resolve({ status: "error", error: "Script check_ssl.py manquant" });
    }

    exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Erreur exécution script Python:", error);
        return resolve({ status: "error", error: error.message });
      }

      try {
        const result = JSON.parse(stdout);
        cache.set("sslStatus", result, 600); // TTL 10 min
        resolve(result);
      } catch (parseError) {
        console.error("❌ Erreur parsing JSON:", parseError);
        resolve({ status: "error", error: "Invalid JSON output from Python" });
      }
    });
  });
}
