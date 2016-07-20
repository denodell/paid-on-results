import 'babel-polyfill'
import { requestAdvertisers, requestLinks, requestVouchers, requestProducts, requestTransactions } from './utils'
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
		const { apiKey, affiliateId } = this.options

		return requestAdvertisers({
			apiKey,
			affiliateId,
		})
	}

	getLinks() {
		const { apiKey, affiliateId } = this.options

		return requestLinks({
			apiKey,
			affiliateId,
		})
	}

	getVouchers() {
		const { apiKey, affiliateId } = this.options

		return requestVouchers({
			apiKey,
			affiliateId,
		})
	}

	getTransactions() {
		const { apiKey, affiliateId } = this.options

		return requestTransactions({
			apiKey,
			affiliateId,
		})
	}

  // TODO
	getProducts() {

	}

  // TODO
	searchProducts() {

	}
}
