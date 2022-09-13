export default function checkResponse(response: Response) {
  return response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
}
