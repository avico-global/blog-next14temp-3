// lib/serverUtils.js
import fs from "fs";
import path from "path";

export const checkAPIJson = async ({ filePath }) => {
  try {
    const folderPath = path.join(process.cwd(), "public/json");
    const fullFilePath = path.join(folderPath, filePath);

    if (!fs.existsSync(fullFilePath)) {
      return null;
    }
    const response = fs.readFileSync(fullFilePath, "utf-8");
    return JSON.parse(response);
  } catch (err) {
    console.error("error", err);
    return null;
  }
};

export const saveJson = async ({ filePath, data }) => {
  const folderPath = path.join(process.cwd(), "public/json");
  const fullFilePath = path.join(folderPath, filePath);
  fs.mkdirSync(path.dirname(fullFilePath), { recursive: true });
  fs.writeFile(fullFilePath, JSON.stringify(data), (err) => {
    if (err) {
      console.log("🚀 ~ fs.writeFile ~ err:", err);
      return null;
    }
  });
};
