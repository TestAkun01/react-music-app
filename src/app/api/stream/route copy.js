import ytdl from "ytdl-core";

export async function GET(request) {
  const url = new URL(request.url).searchParams.get("url");

  try {
    if (!ytdl.validateURL(url)) {
      throw new Error("Invalid YouTube URL");
    }

    // Buffer the audio stream
    const audioStream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);
    const contentLength = audioBuffer.length;
    const contentRange = `bytes 0-${contentLength - 1}/${contentLength}`;

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/ogg",
        "Accept-Ranges": "bytes",
        "Access-Control-Allow-Origin": "*",
        "Alt-Svc": 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
        "Cache-Control": "public, max-age=86400",
        "Content-Length": contentLength.toString(),
        "Content-Range": contentRange,
        "Content-Security-Policy-Report-Only":
          "require-trusted-types-for 'script'; report-uri https://csp.withgoogle.com/csp/voice-delight-data",
        "Cross-Origin-Opener-Policy":
          'same-origin; report-to="voice-delight-data"',
        "Cross-Origin-Resource-Policy": "cross-origin",
        Date: new Date().toUTCString(),
        Expires: new Date(Date.now() + 86400 * 1000).toUTCString(),
        "Report-To":
          '{"group":"voice-delight-data","max_age":2592000,"endpoints":[{"url":"https://csp.withgoogle.com/csp/report-to/voice-delight-data"}]}',
        Server: "sffe",
        "X-Content-Type-Options": "nosniff",
        "X-Xss-Protection": "0",
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}