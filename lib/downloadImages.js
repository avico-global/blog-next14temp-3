import axios from "axios";
import fs from "fs";
import path from "path";
import { getImagePath } from "./myFun";

export function extractImageData({ data }) {
  const result = [];

  data.forEach((item) => {
    const images = [];
    let singleImage = "";
    if (item.file_name && isImage(item.file_name)) {
      singleImage = item.file_name;
    }
    Object.keys(item).forEach((key) => {
      const value = item[key];
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (isImage(val)) {
            images.push(val);
          }
        });
      }
    });
    if (singleImage || images.length > 0) {
      result.push({
        key: item.key,
        image: singleImage,
        images: images,
      });
    }
  });

  return result;
}
function isImage(fileName) {
  if (typeof fileName !== "string") return false;
  return /\.(gif|jpg|jpeg|tiff|png|webp)$/i.test(fileName);
}
export function downloadAllImages({ result, project_id }) {
  const downloadPromises = [];
  result.forEach((item) => {
    if (item.image) {
      downloadPromises.push(
        downloadImage({ imageName: item.image, key: item.key, project_id })
      );
    }
    if (Array.isArray(item.images) && item.images.length > 0) {
      item.images.forEach((imageName) => {
        downloadPromises.push(
          downloadImage({ imageName, key: item.key, project_id })
        );
      });
    }
  });

  // Wait for all download promises to complete
  Promise.all(downloadPromises)
    .then(() => console.log("All images have been downloaded."))
    .catch((err) => console.error("Error downloading images:", err));
}

// Helper function to download a single image and save it to the disk
async function downloadImage({ imageName, key, project_id }) {
  return new Promise((resolve, reject) => {
    const imagePath = getImagePath(project_id);
    // Construct the image URL based on your base URL
    const baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}`;
    const imageUrl = `${baseURL}/${imageName}`;

    // Define the folder path for saving images, grouped by their keys
    const folderPath = path.join(process.cwd(), "public", "images");

    // Ensure the folder path exists
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) return reject(err);

      // Construct the local path to save the image
      const localImagePath = path.join(folderPath, imageName);

      // Download the image using axios
      axios({
        url: imageUrl,
        method: "GET",
        responseType: "stream",
      })
        .then((response) => {
          // Save the image to disk
          const writer = fs.createWriteStream(localImagePath);
          response.data.pipe(writer);
          writer.on("finish", () => {
            console.log(`${key} image downloaded successfully`);
            resolve();
          });
          writer.on("error", (err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  });
}
