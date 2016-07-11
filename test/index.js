import { describe, beforeEach } from 'ava-spec'
import sinon from 'sinon'
import PaidOnResults from '../'
import fetchLib from '../dist/utils/fetch'
import fs from 'fs'

describe(`Paid On Results`, it => {
	let POR

	beforeEach(async () => {
		POR = new PaidOnResults({
			apiKey: 'abcdef123456',
			affiliateId: '123456',
		})
	})

	it(`Advertisers`, async expect => {
		let xmlData = fs.readFileSync('./mock-data/advertisers.xml', 'utf-8')
		sinon.stub(fetchLib, 'fetchXml').returns(Promise.resolve(xmlData))

		let advertisers = await POR.getAdvertisers()
		expect.true(advertisers.length > 0)
		expect.deepEqual(advertisers[0], {
			merchantId: '1327',
			merchantCaption: 'Alice\'s Pig is a new fashion brand from Brixton in South London, inspired by vintage style and Alice in Wonderland. Founded in May 2013 by siblings Amanda and Nicolai. The brand image comes from our love for Alice in Wonderland where crazy is normal.',
			merchantCategory: 'Clothing and Fashion',
			merchantName: 'Alice\'s Pig',
			merchantUrl: 'http://www.alicespig.com/',
			productFeedUrl: 'http://feeds.paidonresults.net/1.0?affiliateid=45574&feedid=M1327&&template=XML&field_names=ProductID,ProductName,ProductPrice,SummaryDescription,ProductDescription,AffiliateURL,ImageURL100by100,ImageURL200by200,ProductAddedDate,Category,MerchantName',
			creative120x60: 'http://images.uk.paidonresults.net/45574/1327/0/3',
			averageBasket: '£43.28',
			voidRate: '0.00%',
			accountManager: 'Kelly Morrison',
			lastFeedUpdate: new Date("Tue Apr 12 2016 02:00:00 GMT+0200 (CEST)"),
			merchantStatus: 'LIVE',
			dateLaunched: new Date("Sat Sep 12 2015 00:00:00 GMT+0200 (CEST)"),
			affiliateStatus: 'JOINED',
			creative468x60: 'http://images.uk.paidonresults.net/45574/1327/0/7',
			conversionRatio: '2.82%',
			approvalRate: '100.00%',
			accountManagerEmail: 'kelly@paidonresults.com',
			publicMerchantProfile: 'http://www.paidonresults.com/merchants/alices-pig.html',
			cookieLength: '120',
			affiliateUrl: 'http://www.paidonresults.net/c/45574/1/1327/0',
			productFeed: 'YES',
			sampleCommissionRates: '10%',
			averageCommission: '£4.33',
			deepLinks: 'YES',
			fullProductFeedUrl: 'http://feeds.paidonresults.net/1.0?affiliateid=45574&feedid=M1327&&template=XML&field_names=ProductName,ProductPrice,ProductDescription,SummaryDescription,Gender,ProductID,AffiliateURL,ImageURL,ProductAddedDate,ProductUpdatedDate,Category,MerchantName,ImageURL50by50,ImageURL100by100,ImageURL120by120,ImageURL200by200,ImageURL234by234,ImageURL300by300,ImageURL400by400,OriginalImage',
		})

		fetchLib.fetchXml.restore()
	})

	it(`Links`, async expect => {
		let xmlData = fs.readFileSync('./mock-data/links.xml', 'utf-8')
		sinon.stub(fetchLib, 'fetchXml').returns(Promise.resolve(xmlData))

		let links = await POR.getLinks()
		expect.true(links.length > 0)
		expect.deepEqual(links[0], {
			merchantName: 'Alice\'s Pig',
			expiryDate: undefined,
			creativeType: 'Text',
			htmlCode: '<a href="http://www.paidonresults.net/c/45574/1/1327/0" target="_blank">Alice\'s Pig</a>',
			uniqueId: '31407',
			creativeId: '1',
			creativeName: 'Standard Text Link',
			creativeSize: undefined,
			affiliateUrl: 'http://www.paidonresults.net/c/45574/1/1327/0',
			altText: 'Alice\'s Pig',
			merchantId: '1327',
			creativeDescription: 'Create your own text, and use this link to track it.',
			dateAdded: new Date("Tue Oct 06 2015 02:00:00 GMT+0200 (CEST)"),
			creativeUrl: undefined,
		})

		fetchLib.fetchXml.restore()
	})

	it(`Vouchers`, async expect => {
		let xmlData = fs.readFileSync('./mock-data/vouchers.xml', 'utf-8')
		sinon.stub(fetchLib, 'fetchXml').returns(Promise.resolve(xmlData))

		let vouchers = await POR.getVouchers()
		expect.true(vouchers.length > 0)
		expect.deepEqual(vouchers[0], {
			merchantId: '1436',
			merchantName: 'Red Hamper',
			merchantUrl: 'http://www.redhamper.co.uk/',
			affiliateUrl: 'http://www.paidonresults.net/c/45574/1/1436/0',
			voucherId: '5011',
			voucherCode: '5%SAVER',
			voucherDescription: '5% off any order',
			startDate: new Date("Wed Jun 22 2016 00:00:00 GMT+0200 (CEST)"),
			expiryDate: undefined,
		})

		fetchLib.fetchXml.restore()
	})

	it(`Transactions`, async expect => {
		let xmlData = fs.readFileSync('./mock-data/transactions.xml', 'utf-8')
		sinon.stub(fetchLib, 'fetchXml').returns(Promise.resolve(xmlData))

		let transactions = await POR.getTransactions()
		expect.true(transactions.length > 0)
		expect.deepEqual(transactions[0], {
			networkOrderID: 'TEST1000X',
			affiliateID: '1234',
			merchantName: 'Alice\'s Pig',
			merchantId: '1327',
			dateAdded: new Date("Sun Jul 10 2016 01:05:59 GMT+0200 (CEST)"),
			dateUpdated: new Date("Sun Jul 10 2016 01:05:59 GMT+0200 (CEST)"),
			clickDate: new Date("Sun Jul 10 2016 00:36:41 GMT+0200 (CEST)"),
			orderDate: new Date("Sun Jul 10 2016 01:03:11 GMT+0200 (CEST)"),
			creativeName: undefined,
			customTrackingID: 'user_id',
			httpReferal: undefined,
			ipAddress: '192.168.0.1',
			affiliateCommission: 9.99,
			orderValue: 99.99,
			transactionType: 'PENDING',
			orderNotes: undefined,
			paidToAffiliate: false,
			datePaidToAffiliate: undefined,
		})

		fetchLib.fetchXml.restore()
	})
})
