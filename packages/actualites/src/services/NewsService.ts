import { instance } from '@/utils/axiosUtils.ts'

async function getPaginatedNews(readerId: number, pageIndex?: number | undefined, source?: string | undefined, rubriques?: Array<number> | undefined) {
  try {
    const params: Record<string, any> = {}

    // Ajoute les paramètres uniquement s'ils sont définis
    if (pageIndex !== undefined)
      params.pageIndex = pageIndex - 1
    if (source)
      params.source = source
    if (rubriques && rubriques.length > 0)
      params.rubriques = rubriques

    const response = await instance.get(`/news/myHome/${readerId.toString()}`, { params })
    return response.data
  }
  catch (e: any) {
    console.error(e)
  }
}

async function getItemById(url: string) {
  try {
    return await instance.get(url)
  }
  catch (error) {
    console.error('Failed to load item :', error)
  }
}

async function getItemEnclosure(path: string) {
  try {
    return import.meta.env.VITE_BASE_API_URL.concat(path)
  }
  catch (error) {
    console.error('Failed to load item :', error)
  }
}

export { getItemById, getItemEnclosure, getPaginatedNews }
