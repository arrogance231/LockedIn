// /lib/pocketbase.ts
import PocketBase from "pocketbase";

if (!process.env.NEXT_PUBLIC_POCKETBASE_URL) {
  throw new Error("NEXT_PUBLIC_POCKETBASE_URL is not defined");
}
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export default pb;
