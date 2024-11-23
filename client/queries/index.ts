import axios from "axios";

export async function makeGetRequest(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("failed fetching data");
  }
}
export async function makePOSTRequest(url: string, body: object) {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("failed fetching data");
  }
}
