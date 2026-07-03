export async function requests(endpoint: string) {
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}/`);
    const json = await response.json();
    return json;
  } catch (e) {
    console.error("Ocorreu um erro", e);
  }
}
