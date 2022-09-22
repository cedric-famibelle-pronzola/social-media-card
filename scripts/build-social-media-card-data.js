#!/usr/bin/env node
/* eslint no-await-in-loop: off */
require('dotenv').config()

const path = require('path')
const {exit} = require('process')
const fs = require('fs-extra')
const got = require('got')

const socialMediaFile = path.join(__dirname, '..', 'social-media-card-data.json')
let countMedia = 0
let hasData = false

async function checkHasIcon(icon) {
  const {statusCode} = await got(`https://forkaweso.me/Fork-Awesome/icon/${icon}/`, {throwHttpErrors: false})
  return statusCode === 200
}

function createId() {
  return String(
    Date.now().toString(32)
      + Math.random().toString(16)
  ).replace(/\./g, '')
}

function getSocialMediaList() {
  if (process.env.SOCIAL_MEDIA_LIST) {
    return process.env.SOCIAL_MEDIA_LIST.split(',')
  }

  throw new Error('SOCIAL_MEDIA_LIST is required')
}

async function getExistingSocialMedia() {
  try {
    await fs.ensureFile(socialMediaFile)
    const socialMedia = await fs.readJson(socialMediaFile, {throws: false})

    return socialMedia
  } catch (error) {
    console.log(error)
  }
}

function sortSocialMediaNames(socialMediaList, existingSocialMedia) {
  if (!existingSocialMedia) {
    return socialMediaList
  }

  const nameList = new Set(existingSocialMedia.map(({name}) => name))
  const difference = socialMediaList.filter(n => !nameList.has(n))

  return difference.length > 0 ? difference : null
}

async function writeJson(socialMediaNames, existingSocialMedia) {
  const json = existingSocialMedia || []

  if (socialMediaNames) {
    hasData = true
  } else {
    console.log('\n\u001B[1m\u001B[42m  No data to write  \u001B[0m')
    return
  }

  for (const socialMediaName of socialMediaNames) {
    const hasIcon = await checkHasIcon(socialMediaName.trim())

    json.push({
      id: createId(),
      name: socialMediaName.trim(),
      profilUrl: `https://framalibre.org/recherche-par-crit-res?keys=${socialMediaName.trim()}`,
      customIcon: hasIcon ? null : 'no-icon.png'
    })

    countMedia++
    console.log(`${countMedia} item${countMedia > 1 ? 's' : ''}`)
  }

  console.log(`\n\u001B[42m   \u001B[32m\u001B[107m ${countMedia} \u001B[97m\u001B[42m item${countMedia > 1 ? 's' : ''} to write   \u001B[0m ✍️`)

  await fs.outputJson(socialMediaFile, json, {spaces: 2})
}

async function countItems() {
  const json = await fs.readJson(socialMediaFile)
  const nbItems = json.length
  const isAllWrote = countMedia > 0 && countMedia === nbItems

  if (isAllWrote) {
    console.log(`\n\u001B[42m   \u001B[32m\u001B[107m ${countMedia} \u001B[97m\u001B[42m item${countMedia > 1 ? 's' : ''} was successfully wrote   \u001B[0m ✅`)
  } else {
    const missingItem = countMedia - nbItems
    console.log(`\n\u001B[1m\u001B[41m  An error occured. Missing ${missingItem} item${missingItem > 1 ? 's' : ''} \u001B[0m ❌`)
  }
}

async function main() {
  const existingSocialMedia = await getExistingSocialMedia()
  const socialMediaList = getSocialMediaList()
  const socialMediaNames = sortSocialMediaNames(socialMediaList, existingSocialMedia)

  try {
    await writeJson(socialMediaNames, existingSocialMedia)

    if (hasData) {
      await countItems()
    }
  } catch (error) {
    console.error(error)
  }
}

main().catch(error => {
  console.error(error)
  exit(1)
})
