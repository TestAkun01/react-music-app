export default async function FetchData(url, method = "GET", data = null) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    if (method !== "DELETE") {
      return await response.json();
    }

    return { message: "Delete successful" };
  } catch (error) {
    console.error(error);
    return null;
  }
}
