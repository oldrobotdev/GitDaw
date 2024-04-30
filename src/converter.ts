import fs from "fs/promises";
import { xml2json, json2xml } from "xml-js";
import { gunzip, gzip } from "../utils/zlib";
import { mkdir } from "../utils/file";

export const alsToJson = async (fileName: string): Promise<void> => {
  try {
    const fileContent = await fs.readFile(`./${fileName}.als`);
    const unzippedALS = await gunzip(fileContent);
    const json = xml2json(unzippedALS.toString(), { compact: true, spaces: 4 });
    await fs.writeFile(`./${fileName}.json`, json);
  } catch (error: any) {
    throw new Error(
      `An error occurred while converting the Ableton file to JSON. ${error.message}`
    );
  }
};

export const jsonToAls = async (fileName: string): Promise<void> => {
  try {
    const fileContent = await fs.readFile(`./${fileName}.json`);
    const xml = json2xml(fileContent.toString(), { compact: true, spaces: 4 });
    const zipped = await gzip(xml);
    await fs.writeFile(`./${fileName}.als`, zipped);
  } catch (error: any) {
    throw new Error(
      `An error occurred while converting the JSON file to Ableton file. ${error.message}`
    );
  }
};
