const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const targetPath = "./src/environments";
const fileName = "environment.ts";
const fileContent = `
  export const environment = {
    mapbox_key: "${process.env.MAPBOX_KEY}",
  }
`;

mkdirSync(targetPath, { recursive: true });
writeFileSync(`${targetPath}/${fileName}`, fileContent);
