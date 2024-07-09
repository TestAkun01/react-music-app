export default async function FetchData(
  path,
  query = "",
  method = "GET",
  data = null
) {
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
    if (query) {
      query = "?" + query;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}${query}`,
      options
    );

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
