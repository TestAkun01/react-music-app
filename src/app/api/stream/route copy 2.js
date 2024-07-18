import { getInfo } from "./getInfo";
import ytdl from "ytdl-core";

export async function GET(request) {
  const url = new URL(request.url).searchParams.get("url");

  try {
    const videoId = ytdl.getURLVideoID(url);
    const audioInfo = await getInfo(videoId);
    if (!audioInfo || !audioInfo.url) {
      throw new Error("Cannot find audio URL");
    }

    const audio = await fetch(audioInfo.url).then(
      async (r) => new Uint8Array(await r.arrayBuffer())
    );
    console.log(audio);
    // const contentRange = `bytes 0-${contentLength - 1}/${contentLength}`;
    // const contentLength = audioBuffer.byteLength;

    // return new Response(audioBuffer, {
    //   headers: {
    //     "Content-Type": audioInfo.mimeType,
    //     "Accept-Ranges": "bytes",
    //     "Content-Length": contentLength.toString(),
    //     "Content-Range": contentRange,
    //   },
    // });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
