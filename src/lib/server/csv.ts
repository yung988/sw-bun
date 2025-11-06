import { access, readFile } from 'node:fs/promises'

export async function getPriceListFile(): Promise<string | null> {
  try {
    const file = `${process.cwd()}/public/services/services.csv`
    await access(file)
    const text = await readFile(file, 'utf-8')
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[services] Loaded CSV: ${file}`)
    }
    return text
  } catch (error) {
    console.error('Nepodařilo se načíst public/services/services.csv:', error)
    return null
  }
}
