export const fetchData = async <T>(url: string): Promise<T> => {
  const res: Response = await fetch(url)
  const json: T = await res.json()

  return json
}