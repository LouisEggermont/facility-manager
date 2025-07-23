import { promises as fs } from 'fs'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content.toString())
    return google.auth.fromJSON(credentials)
  } catch {
    return null
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content.toString())
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  const client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  const client2 = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client2.credentials) {
    await saveCredentials(client2)
  }
  return client2
}
async function generateTranslations(auth) {
  const SUPPORTED_LOCALES = {
    en: 'en',
    nl: 'nl',
    zh: 'zh',
    es: 'es',
  }
  const LOCALE_PATH = 'dist/locales'

  const sheets = google.sheets({ version: 'v4', auth })

  for (const locale in SUPPORTED_LOCALES) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1YVrvxms0G861lbup5vMZJN-aDBaeNX0biBzGs_j6A4o',
      range: locale,
    })
    const rows = res.data.values
    console.log(rows)

    if (!rows || rows.length === 0) {
      console.log('No data found.')
      return
    }

    const translations = { [locale]: {} }
    for (const row of rows) {
      translations[locale][row[0]] = row[2]
    }

    await fs.writeFile(
      path.join(process.cwd(), `${LOCALE_PATH}/${locale}.json`),
      JSON.stringify(translations),
    )
    console.log(`Generated ${locale}.json in ${LOCALE_PATH}`)
  }

  //copy the folder dist/locales to the pwa src/locales
  await copyFolder(
    path.join(process.cwd(), LOCALE_PATH),
    path.join(process.cwd(), '../../packages/pwa/src/locales'),
  )
}

async function copyFolder(src: string, dest: string) {
  // Create the destination folder if it doesn't exist
  try {
    await fs.mkdir(dest, { recursive: true })
  } catch (err) {
    console.error(`Error creating folder: ${err}`)
    return
  }

  // Get the list of files in the source directory
  const entries = await fs.readdir(src, { withFileTypes: true })

  // Loop through each entry (file or folder) in the source directory
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isFile()) {
      // Copy files
      await fs.copyFile(srcPath, destPath)
      console.log(`Copied: ${srcPath} to ${destPath}`)
    }
  }
}

authorize().then(generateTranslations).catch(console.error)
