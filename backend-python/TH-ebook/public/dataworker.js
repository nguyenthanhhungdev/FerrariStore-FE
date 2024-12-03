import fs from "node:fs";
import path from "path";

fs.readFile("./public/data.json", "utf8", (_, data) => {
  data = JSON.parse(data);
  mockVolPart(data);
  fs.writeFileSync("./public/data1.json", JSON.stringify(data, null, 4));
});

// fs.readFile("./public/data.json", "utf8", (_, data) => {
//   data = JSON.parse(data);
//   const imgs = listImgs(data);
//   const titles = listTitles(data);
//   const descs = listDescs(data);
//   genVols(data, imgs, titles, descs);
//   fs.writeFileSync("./public/data1.json", JSON.stringify(data, null, 4));
// });

// fs.readFile("./public/data.json", "utf8", (_, data) => {
//   data = JSON.parse(data);
//   const imgs = listImgs(data);
//   const titles = listTitles(data);
//   const descs = listDescs(data);
//   genVols(data, imgs, titles, descs);
//   fs.writeFileSync("./public/data1.json", JSON.stringify(data, null, 4));
// });

// fs.readFile("./public/data.json", "utf8", (_, data) => {
//   data = JSON.parse(data);
//   sepTag(data);
//   sepAuthor(data);
//   convType(data);
//   fs.writeFileSync("./public/data1.json", JSON.stringify(data, null, 4));
// });
function mockVolPart(items) {
  for (const item of items) {
    for (const vol of item.volumes) {
      vol.pages = generateFileArray("./public/content/1");
    }
  }
}
function genVols(items, imgs, titles, descs) {
  for (const item of items) {
    item.volumes = genVol(imgs, titles, descs);
  }
}
function genVol(imgs, titles, descs) {
  const vols = [];
  const num = getRandomInt(1, 3);
  for (let i = 1; i <= num; i++) {
    vols.push({
      nth: i,
      cover_image: getRandomArrayElement(imgs),
      title: getRandomArrayElement(titles),
      description: getRandomArrayElement(descs),
    });
  }
  return vols;
}
function listTitles(items) {
  const titles = [];
  for (const item of items) {
    titles.push(item.title);
  }
  return titles;
}
function listDescs(items) {
  const desc = [];
  for (const item of items) {
    desc.push(item.description);
  }
  return desc;
}
function listImgs(items) {
  const imgs = [];
  for (const item of items) {
    imgs.push(item.cover_image);
  }
  return imgs;
}
function sepTag(items) {
  for (const item of items) {
    const obj = [];
    for (const tag of item.tag.split(",")) {
      obj.push({ name: tag });
    }
    item.category = obj;
    delete item.tag;
  }
}
function sepAuthor(items) {
  for (const item of items) {
    const obj = [];
    for (const author of item.author.split(",")) {
      obj.push({ name: author });
    }
    item.authors = obj;
    delete item.author;
  }
}
function convType(items) {
  for (const item of items) {
    item.type = { name: item.type };
  }
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// Function to generate array with objects
const generateFileArray = (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    const fileArray = files
      .filter((file) => {
        // Check if it's a file and not a directory
        return fs.statSync(path.join(dirPath, file)).isFile();
      })
      .map((file) => {
        const page = parseInt(file.match(/^\d+/)[0], 10);
        return { page, filename: file };
      });
    return fileArray;
  } catch (error) {
    console.error("Error reading directory:", error);
  }
};
function addAltTitles() {
  import { readFileSync, createReadStream, writeFileSync } from "fs";
  import { join } from "path";
  import { createInterface } from "readline";

  // Read JSON file synchronously
  const readJsonFile = (filePath) => {
    return JSON.parse(readFileSync(filePath, "utf8"));
  };
  const dirname =
    "C:/Users/ACER/source/repos/THebook/frontend/TH-ebook/public/api";

  // File paths
  const inputFilePath = join(dirname, "input.json");
  const outputFilePath = join(dirname, "output.txt");

  // Read input JSON file
  const inputData = readJsonFile(inputFilePath);

  // Function to read lines from text file
  const readLines = async (filePath) => {
    const lines = [];
    const fileStream = createReadStream(filePath);
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      lines.push(line);
    }

    return lines;
  };

  // Main function to update data and print
  const updateDataWithAltTitles = async () => {
    try {
      const outputLines = await readLines(outputFilePath);

      const updatedData = inputData.map((item, index) => {
        item.altTitle = outputLines[index] || ""; // Handle cases where there may be fewer lines than data objects
        return item;
      });

      // Print the updated data
      writeFileSync(
        join(dirname, "books.json"),
        JSON.stringify(updatedData, null, 2)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Call the main function
  updateDataWithAltTitles();
}
