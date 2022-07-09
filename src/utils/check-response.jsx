export default function checkResponse(response, error) {
  return response.ok ? response.json() : throw new Error(error);
}
