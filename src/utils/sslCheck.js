"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBrvmSsl = verifyBrvmSsl;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
function verifyBrvmSsl() {
    const scriptPath = path_1.default.join(__dirname, "../verify_brvm_ssl.py");
    return new Promise((resolve) => {
        (0, child_process_1.exec)(`python "${scriptPath}"`, (error, stdout) => {
            if (error) {
                console.error("❌ Erreur Python:", error);
                return resolve({ success: false, error: error.message });
            }
            try {
                const result = JSON.parse(stdout);
                resolve(result);
            }
            catch (parseError) {
                console.error("❌ Erreur parsing JSON:", parseError);
                resolve({ success: false, error: "Invalid JSON output from Python" });
            }
        });
    });
}
