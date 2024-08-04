import fs from "fs";
import path from "path";

export const checkOrCreateSitemap = ({ DOMAIN }) => {
  const dirPath = path.join(process.cwd(), "public", DOMAIN);
  const filePath = path.join("public", "main-sitemap.xsl");

  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf-8");
  } 
//   else {
//     console.log("sitemap.xsl not exists.");

//     fs.readFile(
//       path.join(process.cwd(), "public", "main-sitemap.xsl"),
//       {
//         encoding: "utf-8",
//       },
//       (err, fileContents) => {
//         if (err) {
//           console.log("Error reading main-sitemap.xsl:", err);
//         } else {
//           console.log("start writing the sitemap.xsl.");

//           // Ensure the directory exists
//           fs.mkdir(dirPath, { recursive: true }, (err) => {
//             if (err) {
//               console.log("Error creating directory:", err);
//               return null;
//             }

//             // Write the sitemap.xsl file
//             fs.writeFile(
//               filePath,
//               fileContents?.replaceAll(
//                 "%DOMAIN%",
//                 `${DOMAIN.startsWith("https://") ? "" : "https://"}${DOMAIN}`
//               ),
//               // ?.replaceAll("%CITY_NAME%", homeData.city)
//             // ?.replaceAll("%INDUSTRY_NAME%", homeData?.industry_name),
//               (err) => {
//                 if (err) {
//                   console.log("Error writing sitemap.xsl:", err);
//                   return null;
//                 }
//                 console.log("sitemap.xsl written successfully.");
//               }
//             );
//           });
//         }
//       }
//     );
//   }
};
