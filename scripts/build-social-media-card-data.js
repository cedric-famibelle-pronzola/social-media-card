#!/usr/bin/env node
/* eslint no-await-in-loop: off */
require('dotenv').config()

const path = require('path')
const {exit} = require('process')
const fs = require('fs-extra')
const got = require('got')
const {isEqual, differenceBy} = require('lodash')

const socialMediaFile = path.join(__dirname, '..', 'social-media-card-data.json')
let countMedia = 0
let hasData = false

/**
 * Check if an icon is available in forkawesome library.
 *
 * @param {string} icon
 * @returns {boolean}
 */
async function checkHasIcon(icon) {
  const {statusCode} = await got(`https://forkaweso.me/Fork-Awesome/icon/${icon}/`, {throwHttpErrors: false})
  return statusCode === 200
}

/**
 * Generate an id
 *
 * @returns {string}
 */
function createId() {
  return String(
    Date.now().toString(32)
      + Math.random().toString(16)
  ).replace(/\./g, '')
}

/**
 * Returns (if exist) SOCIAL_MEDIA_LIST content variable.
 *
 * @returns {array}
 */
function getSocialMediaList() {
  if (process.env.SOCIAL_MEDIA_LIST) {
    return process.env.SOCIAL_MEDIA_LIST.split(',')
  }

  return ['twitter', 'facebook', 'instagram', 'mastodon']
}

/**
 * Reads the json file and return its content.
 *
 * @returns {array}
 */
async function getExistingSocialMedia() {
  try {
    await fs.ensureFile(socialMediaFile)
    const socialMedia = await fs.readJson(socialMediaFile, {throws: false})

    return socialMedia
  } catch (error) {
    console.log(error)
  }
}

/**
 * Filters social media and returns social media to keep and new ones to write.
 *
 * @param {array} socialMediaList
 * @param {array} existingSocialMedia
 * @returns {object}
 */
function filterSocialMediaToWrite(socialMediaList, existingSocialMedia) {
  if (!existingSocialMedia) {
    return {socialMediaToWrite: socialMediaList}
  }

  const existingNameList = new Set(existingSocialMedia.map(({name}) => name))
  const socialMediaToKeep = existingSocialMedia.filter(({name}) => socialMediaList.includes(name))
  const socialMediaToWrite = socialMediaList.filter(n => !existingNameList.has(n))

  return {socialMediaToKeep, socialMediaToWrite}
}

/**
 * Writes json file.
 *
 * @param {array} socialMediaNames
 * @param {array} socialMediaToKeep
 * @returns {void}
 */
async function writeJson(socialMediaNames, socialMediaToKeep) {
  const jsonContent = await getExistingSocialMedia()
  const hasDataToWrite = !isEqual(jsonContent, socialMediaToKeep)
  const json = socialMediaToKeep || []

  if (socialMediaNames.length > 0) {
    hasData = true
  } else {
    console.log('\n\u001B[1m\u001B[42m  No other data to add.  \u001B[0m \n')
    if (hasDataToWrite) {
      const dataToDelete = differenceBy(jsonContent, socialMediaToKeep, 'id')
      console.log(`\n\u001B[1m\u001B[42m  \u001B[32m\u001B[107m ${dataToDelete.length} \u001B[97m\u001B[42m to delete.  \u001B[0m`)
    }

    await fs.outputJson(socialMediaFile, json, {spaces: 2})
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

/**
 * Counts items to write
 *
 * @param {number} nbItemsToWrite
 */
function countItems(nbItemsToWrite) {
  const isAllWrote = countMedia > 0 && countMedia === nbItemsToWrite

  if (isAllWrote) {
    console.log(`\n\u001B[42m   \u001B[32m\u001B[107m ${countMedia} \u001B[97m\u001B[42m item${countMedia > 1 ? 's' : ''} ${countMedia > 1 ? 'were' : 'was'} successfully wrote   \u001B[0m ✅`)
  } else {
    const missingItem = nbItemsToWrite - countMedia
    console.log(`\n\u001B[1m\u001B[41m  An error occured. Missing ${missingItem} item${missingItem > 1 ? 's' : ''} \u001B[0m ❌`)
  }
}

async function main() {
  const existingSocialMedia = await getExistingSocialMedia()
  const socialMediaList = getSocialMediaList()
  const {socialMediaToKeep, socialMediaToWrite} = filterSocialMediaToWrite(socialMediaList, existingSocialMedia)

  try {
    await writeJson(socialMediaToWrite, socialMediaToKeep)

    if (hasData) {
      countItems(socialMediaToWrite.length)
    }
  } catch (error) {
    console.error(error)
  }
}

main().catch(error => {
  console.error(error)
  exit(1)
})
