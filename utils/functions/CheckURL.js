/**
 * @param {string} url
 * @return {boolean} true / false
 */
const CheckURL = (url) => {
	const regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(url)
}

export default CheckURL
