export async function getLinkPreview(url: string) {
  try {
    const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error("Failed to fetch link preview");
    return await response.json();
  } catch (error) {
    console.error("Error fetching link preview:", error);
    return null;
  }
}