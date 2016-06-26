import { describe, beforeEach } from 'ava-spec'
import PaidOnResults from '../'

describe(`Paid On Results`, it => {
	let POR

	beforeEach(async () => {
		POR = new PaidOnResults({
			apiKey: 'UEIEXTLUQMOCMWZNUBOB',
			affiliateId: '45574',
		})
	})

	it(`Advertisers`, async expect => {
		let advertisers = await POR.getAdvertisers()
		expect.true(advertisers.length > 0)
	})

	it(`Links`, async expect => {
		let links = await POR.getLinks()
		expect.true(links.length > 0)
	})
})
