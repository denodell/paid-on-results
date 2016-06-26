import { describe, beforeEach } from 'ava-spec'
import PaidOnResults from '../'

describe(`Paid On Results`, it => {
	let POR

	beforeEach(async () => {
		POR = new PaidOnResults({
			apiKey: 'abcdef123456',
			affiliateId: '123456',
		})
	})

	it.skip(`Advertisers`, async expect => {
		let advertisers = await POR.getAdvertisers()
		expect.true(advertisers.length > 0)
	})

	it.skip(`Links`, async expect => {
		let links = await POR.getLinks()
		expect.true(links.length > 0)
	})

	it(`Vouchers`, async expect => {
		let vouchers = await POR.getVouchers()
		expect.true(vouchers.length > 0)
	})
})
