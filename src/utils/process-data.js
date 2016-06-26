const fieldNameConversion = {
	accountmanager: 'accountManager',
	accountmanageremail: 'accountManagerEmail',
	affiliatestatus: 'affiliateStatus',
	affiliateurl: 'affiliateUrl',
	alttext: 'altText',
	approvalrate: 'approvalRate',
	averagebasket: 'averageBasket',
	averagecommission: 'averageCommission',
	conversionratio: 'conversionRatio',
	cookielength: 'cookieLength',
	creativeid: 'creativeId',
	creativename: 'creativeName',
	creativedescription: 'creativeDescription',
	creativesize: 'creativeSize',
	creativetype: 'creativeType',
	creativeurl: 'creativeUrl',
	dateadded: 'dateAdded',
	datelaunched: 'dateLaunched',
	deeplinks: 'deepLinks',
	expirydate: 'expiryDate',
	fullproductfeedurl: 'fullProductFeedUrl',
	htmlcode: 'htmlCode',
	lastfeedupdate: 'lastFeedUpdate',
	merchantid: 'merchantId',
	merchantcaption: 'merchantCaption',
	merchantcategory: 'merchantCategory',
	merchantname: 'merchantName',
	merchantstatus: 'merchantStatus',
	merchanturl: 'merchantUrl',
	productfeed: 'productFeed',
	productfeedurl: 'productFeedUrl',
	publicmerchantprofile: 'publicMerchantProfile',
	samplecommissionrates: 'sampleCommissionRates',
	startdate: 'startDate',
	uniqueid: 'uniqueId',
	voidrate: 'voidRate',
	voucherid: 'voucherId',
	vouchercode: 'voucherCode',
	voucherdescription: 'voucherDescription',
}

function getDate(date) {
	return new Date(date.split('/')[2] + '-' + date.split('/')[1] + '-' + date.split('/')[0])
}

export function normalizeAdvertiserData(merchants) {
	let dateValueFields = ['dateLaunched', 'lastFeedUpdate']

	return merchants.map(merchant => {
		let out = {}

		for (let dataItem in merchant) {
			if (merchant.hasOwnProperty(dataItem)) {
				let normalizedFieldName = dataItem.replace(/^ns1/g, '').toLowerCase()
				let newDataItemName = fieldNameConversion[normalizedFieldName] || normalizedFieldName
				let value = merchant[dataItem][0]
				out[newDataItemName] = value
				out[newDataItemName] = dateValueFields.includes(newDataItemName) ? new Date(value) : out[newDataItemName]
			}
		}

		return out
	})
}

export function normalizeLinkData(links) {
	let dateValueFields = ['dateAdded', 'expiryDate']

	return links.map(link => {
		let out = {}
		for (let linkItem in link) {
			if (link.hasOwnProperty(linkItem)) {
				let normalizedFieldName = linkItem.replace(/^ns1/g, '').toLowerCase()
				let newDataItemName = fieldNameConversion[normalizedFieldName] || normalizedFieldName
				let value = link[linkItem][0]
				out[newDataItemName] = value
				out[newDataItemName] = dateValueFields.includes(newDataItemName) && value !== 'NA' ? getDate(value) : (value !== 'NA' ? out[newDataItemName] : undefined)
			}
		}

		return out
	})
}

export function normalizeVouchersData(vouchers) {
	let dateValueFields = ['startDate', 'expiryDate']

	return vouchers.map(voucher => {
		let out = {}
		for (let voucherItem in voucher) {
			if (voucher.hasOwnProperty(voucherItem)) {
				let normalizedFieldName = voucherItem.toLowerCase()
				let newDataItemName = fieldNameConversion[normalizedFieldName] || normalizedFieldName
				let value = voucher[voucherItem][0]
				out[newDataItemName] = value
				out[newDataItemName] = dateValueFields.includes(newDataItemName) && value ? getDate(value) : (value !== '' ? out[newDataItemName] : undefined)
			}
		}

		return out
	})
}
