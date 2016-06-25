function getDate(date) {
	return new Date(date.split('/')[2] + '-' + date.split('/')[1] + '-' + date.split('/')[0])
}

export function normalizeAdvertiserData(merchants) {
	let dateValueFields = ['dateLaunched', 'lastFeedUpdate']

	return merchants.map(merchant => {
		let out = {}

		for (let dataItem in merchant) {
			if (merchant.hasOwnProperty(dataItem)) {
				let newDataItemName = dataItem.replace(/^ns1/g, '').toLowerCase().replace('merchantid', 'merchantId').replace('merchantcaption', 'merchantCaption').replace('merchantcategory', 'merchantCategory')
					.replace('merchantname', 'merchantName').replace('merchanturl', 'merchantUrl').replace('productfeedurl', 'productFeedUrl').replace('averagebasket', 'averageBasket').replace('voidrate', 'voidRate')
					.replace('accountmanager', 'accountManager').replace('lastfeedupdate', 'lastFeedUpdate').replace('merchantstatus', 'merchantStatus').replace('datelaunched', 'dateLaunched').replace('affiliatestatus', 'affiliateStatus')
					.replace('conversionration', 'conversionRatio').replace('aprovalrate', 'approvalRate').replace('accountmanageremail', 'accountManagerEmail').replace('publicmerchantprofile', 'publicMerchantProfile').replace('cookielength', 'cookieLength')
					.replace('affiliateurl', 'affiliateUrl').replace('productfeed', 'productFeed').replace('samplecommissionrates', 'sampleCommissionRates').replace('averagecommission', 'averageCommission').replace('deeplinks', 'deepLinks')
					.replace('fullproductfeedurl', 'fullProductFeedUrl')
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
				let newDataItemName = linkItem.replace(/^ns1/g, '').toLowerCase().replace('merchantname', 'merchantName').replace('expirydate', 'expiryDate').replace('creativeurl', 'creativeUrl')
					.replace('creativetype', 'creativeType').replace('htmlcode', 'htmlCode').replace('uniqueid', 'uniqueId').replace('creativeid', 'creativeId').replace('dateadded', 'dateAdded')
					.replace('creativename', 'creativeName').replace('creativesize', 'creativeSize').replace('affiliateurl', 'affiliateUrl').replace('alttext', 'altText').replace('merchantid', 'merchantId').replace('creativedescription', 'creativeDescription')
				let value = link[linkItem][0]
				out[newDataItemName] = value
				out[newDataItemName] = dateValueFields.includes(newDataItemName) && value !== 'NA' ? getDate(value) : (value !== 'NA' ? out[newDataItemName] : undefined)
			}
		}

		return out
	})
}
