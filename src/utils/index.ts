import axios from "axios";

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

export const uploadToPinata = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw new Error("Failed to upload image to Pinata");
  }
};

export function findJsonPathsForKey(jsonStr: string, key: string): string[] {
    const paths: string[] = [];
  
    function search(obj: any, path: string = "$") {
      if (typeof obj !== "object" || obj === null) return;
  
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          search(item, `${path}[${index}]`);
        });
      } else {
        for (const k in obj) {
          if (k === key) {
            paths.push(`${path}.${k}`);
          }
          search(obj[k], `${path}.${k}`);
        }
      }
    }
  
    try {
      const data = JSON.parse(jsonStr);
      search(data);
      return paths;
    } catch (e) {
      console.error("Invalid JSON:", e);
      return [];
    }
  }