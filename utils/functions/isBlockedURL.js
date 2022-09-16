import BlockedUrls from '@/data/blocked_urls'

/**
 * @name isBlockedURL
 * @description Checks if the URL is blacklisted
 * @param {string} url
 * @return {boolean} true / false
 */
const isBlockedURL = (url) => BlockedUrls.some((v) => url.toLowerCase().includes(v))

export default isBlockedURL
