import 'babel-polyfill'
import { requestAdvertisers, requestLinks, requestProducts, requestTransactions } from './utils'
//import dateFormat from 'dateformat'

const defaultOptions = {
	apiKey: '',
	affiliateId: '',
}

export default class PaidOnResults {
	constructor(options) {
		this.options = Object.assign({}, defaultOptions, options)
	}

	getAdvertisers({} = {}) {
		return new Promise((resolve, reject) => {
			const { apiKey, affiliateId } = this.options

			requestAdvertisers({
				apiKey,
				affiliateId,
			}).then(resolve).catch(reject)
		})
	}

	getLinks() {
		return new Promise((resolve, reject) => {
			const { apiKey, affiliateId } = this.options

			requestLinks({
				apiKey,
				affiliateId,
			}).then(resolve).catch(reject)
		})
	}

  // TODO
  getTransactions() {

  }

  // TODO
  getProducts() {

  }

  // TODO
  searchProducts() {

  }
}
