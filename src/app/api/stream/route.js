import ytdl from "ytdl-core";

export async function GET(request) {
  const url = new URL(request.url).searchParams.get("url");

  try {
    if (!ytdl.validateURL(url)) {
      throw new Error("Invalid YouTube URL");
    }

    const audioStream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    return new Response(audioStream, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
