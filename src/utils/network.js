import { fetchXmlAsJson } from './fetch'

async function fetchData(url) {
	return fetchXmlAsJson(url)
}

export async function requestData(url) {
	try {
		let data = await fetchData(url)
		return Promise.resolve(data)
	} catch (err) {
		throw new Error(err)
	}
}
