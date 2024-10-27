import ytdl from "@distube/ytdl-core";
import path from "path";
import fs from "fs";

export async function GET(request) {
  try {
    const cookieData = [
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.36027,
        hostOnly: false,
        httpOnly: false,
        name: "__Secure-1PAPISID",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "1",
        value: "OsxTHIlZ_v6OmeNK/AfvSNncyQfvqFlTUz",
        id: 1,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.36012,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-1PSID",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "1",
        value:
          "g.a000mghkO14e3tqbtYBpB3u-vJ8JIu916HBJ15jRk8T2CoFKAITtapZK9eLaDYpHgvfPMmqmuwACgYKAQkSARYSFQHGX2MiqvueoRs01VzmkT7fNJaR8BoVAUF8yKovQSmT-5mj-fnUJguN9SW00076",
        id: 2,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1754587452.447909,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-1PSIDCC",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "1",
        value:
          "AKEyXzX-14HblBJOXV5_U1MNEd5eM9IvyFYvdpPG-NEUly5QxKIEA2P_Gul0rZsksNafwuDmtA",
        id: 3,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1754587350.360053,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-1PSIDTS",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "1",
        value:
          "sidts-CjIB4E2dkUPz1SvOr_zhfssX0FZF9FVxQLN_bDFZLbrGnSISVFV-Q0lNydaOQYEngyFdfRAA",
        id: 4,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.360295,
        hostOnly: false,
        httpOnly: false,
        name: "__Secure-3PAPISID",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "1",
        value: "OsxTHIlZ_v6OmeNK/AfvSNncyQfvqFlTUz",
        id: 5,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.360147,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-3PSID",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "1",
        value:
          "g.a000mghkO14e3tqbtYBpB3u-vJ8JIu916HBJ15jRk8T2CoFKAITtQnasA1D6ZLYX66YHEj9lAwACgYKAd4SARYSFQHGX2MiEU0jQ1lJuUTXUnkDqxBUQRoVAUF8yKrudaviQFG6KzAdO-URZgad0076",
        id: 6,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1754587452.447939,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-3PSIDCC",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "1",
        value:
          "AKEyXzUnLXcDswsb-L99lHYB1WOOSmbdRbflAf_IEADNrDNxydnFhR9RmItIMJPiIjBgUrcoDw",
        id: 7,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1754587350.360091,
        hostOnly: false,
        httpOnly: true,
        name: "__Secure-3PSIDTS",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "1",
        value:
          "sidts-CjIB4E2dkUPz1SvOr_zhfssX0FZF9FVxQLN_bDFZLbrGnSISVFV-Q0lNydaOQYEngyFdfRAA",
        id: 8,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.36022,
        hostOnly: false,
        httpOnly: false,
        name: "APISID",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "1",
        value: "uxG8dScGNFAuXDpX/AaJefjOUD-x5Dwldp",
        id: 9,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1723053129.302307,
        hostOnly: false,
        httpOnly: true,
        name: "GPS",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "1",
        value: "1",
        id: 10,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.360174,
        hostOnly: false,
        httpOnly: true,
        name: "HSID",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "1",
        value: "AFAUE6TFvZmerypUA",
        id: 11,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.719055,
        hostOnly: false,
        httpOnly: true,
        name: "LOGIN_INFO",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "1",
        value:
          "AFmmF2swRAIgK6VLfTcjH37ogGiW7ePeWQ5PkI1A90Kl2nupSGiFSvsCIAlwf3sTdUBzIoW_a67tPMAXtyaxkgk0ZQT7MJ1S3-pr:QUQ3MjNmenk1OXBsLXdnWnlSYkkwaUQ0bEdOM1h6V0kzN1pNZk1HM1VlX0pnRi1vVHprTU1XdlVfLVZTTlJnTm1HZDMzUFBoalhtd2c1WG9pUGxWWW1WcXZseERxSVBoV29qb3FVYU1oSnNObUU0Q01UZ2hSUWh3YUNZWHNoZ1R6VzZUWWhjTjF5ZFE5Sk5YV1B5alp3aTdtVEZtVVQzSE9R",
        id: 12,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611371.180315,
        hostOnly: false,
        httpOnly: false,
        name: "PREF",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "1",
        value: "f4=4000000&f6=40000000&tz=Asia.Jakarta",
        id: 13,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.360244,
        hostOnly: false,
        httpOnly: false,
        name: "SAPISID",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "1",
        value: "OsxTHIlZ_v6OmeNK/AfvSNncyQfvqFlTUz",
        id: 14,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.359881,
        hostOnly: false,
        httpOnly: false,
        name: "SID",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "1",
        value:
          "g.a000mghkO14e3tqbtYBpB3u-vJ8JIu916HBJ15jRk8T2CoFKAITtfly006LhuAuexjbNiH20XgACgYKATcSARYSFQHGX2MiEIs-Xe0GgVwICDqE9WIcCxoVAUF8yKpfwNqA1xtdPBsNlPbirgtw0076",
        id: 15,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1754587452.447807,
        hostOnly: false,
        httpOnly: false,
        name: "SIDCC",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "1",
        value:
          "AKEyXzWEvQULzXRePzVV73XH-83Fcr4IKBBxrPOFDfDRE7H9VzFWhxvW-pz80T5PsuDiW5PaMA",
        id: 16,
      },
      {
        domain: ".youtube.com",
        expirationDate: 1757611350.360197,
        hostOnly: false,
        httpOnly: true,
        name: "SSID",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "1",
        value: "Aci3wZuJKxy3mX63v",
        id: 17,
      },
    ];
    if (!cookieData) {
      throw new Error("File cookieYoutube.json kosong");
    }

    const cookie = JSON.parse(cookieData);

    if (!cookie || typeof cookie !== "object") {
      throw new Error("Data cookie tidak valid");
    }

    const agent = ytdl.createAgent(cookie);

    const url = new URL(request.url).searchParams.get("url");

    if (ytdl.validateURL(url)) {
      const audioStream = ytdl(url, {
        filter: "audioonly",
        quality: "highestaudio",
        agent,
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
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the media content");
      }

      const contentType = response.headers.get("content-type");
      const contentLength = response.headers.get("content-length");
      const audioBuffer = await response.arrayBuffer();

      return new Response(audioBuffer, {
        headers: {
          "Content-Type": contentType || "application/octet-stream",
          "Accept-Ranges": "bytes",
          "Access-Control-Allow-Origin": "*",
          "Alt-Svc": 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
          "Cache-Control": "public, max-age=86400",
          "Content-Length": contentLength,
          "Content-Range": `bytes 0-${contentLength - 1}/${contentLength}`,
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
    }
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Something went wrong", { status: 500 });
  }
}
