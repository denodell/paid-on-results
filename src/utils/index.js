import { requestData } from './network'
import { normalizeAdvertiserData, normalizeLinkData, normalizeVouchersData, normalizeTransactionData } from './process-data'

export function requestAdvertisers({ apiKey, affiliateId }) {
	let url = `http://affiliate.paidonresults.com/api/merchant-directory?apikey=${apiKey}&Format=XML&AffiliateID=${affiliateId}&MerchantCategories=ALL&Fields=MerchantID,MerchantCaption,MerchantCategory,MerchantName,MerchantURL,ProductFeedURL,Creative120x60,AverageBasket,VoidRate,AccountManager,LastFeedUpdate,MerchantStatus,DateLaunched,AffiliateStatus,Creative468x60,ConversionRatio,ApprovalRate,AccountManagerEmail,PublicMerchantProfile,CookieLength,AffiliateURL,ProductFeed,SampleCommissionRates,AverageCommission,DeepLinks,FullProductFeedURL&JoinedMerchants=YES&MerchantsNotJoined=NO`

	return new Promise(async function(resolve, reject) {
		try {
			let advertisers = await requestData(url)
			resolve(normalizeAdvertiserData(advertisers.merchants))
		} catch (err) {
			reject(err)
		}
	})
}

export function requestLinks({ apiKey, affiliateId }) {
	let url = `http://affiliate.paidonresults.com/api/creative-feed?apikey=${apiKey}&AffiliateID=${affiliateId}&Format=XML&MerchantCategories=ALL&Fields=MerchantName,MerchantURL,ExpiryDate,CreativeType,HTMLCode,UniqueID,CreativeID,CreativeName,CreativeSize,AffiliateURL,AltText,MerchantID,CreativeDescription,DateAdded,CreativeURL&CreativeSizes=ALL&NewWindow=YES&HideTracking=NO&BannerCreative=NO&TextCreative=YES`

	return new Promise(async function(resolve, reject) {
		try {
			let links = await requestData(url)
			resolve(normalizeLinkData(links.merchants))
		} catch (err) {
			reject(err)
		}
	})
}

// TODO: find out ... what is 'securitycode' in the URL below?
export function requestVouchers({ affiliateId }) {
	let url = `http://vouchers.paidonresults.net/api?affiliate_id=${affiliateId}&securitycode=ujybgHxe&export=xml&fields=MerchantID,MerchantName,MerchantURL,AffiliateURL,VoucherID,VoucherCode,VoucherDescription,StartDate,ExpiryDate&inc_upcoming=0&inc_all_merchants=0&date=YYYY-MM-DD`

	return new Promise(async function(resolve, reject) {
		try {
			let vouchers = await requestData(url)
			resolve(normalizeVouchersData(vouchers.voucher))
		} catch (err) {
			reject(err)
		}
	})
}

export function requestProducts() {}

export function requestTransactions({ apiKey, affiliateId }) {
	let url = `http://affiliate.paidonresults.com/api/transactions?apikey=${apiKey}&Format=XML&AffiliateID=${affiliateId}&Fields=NetworkOrderID,MerchantID,ClickDate,CustomTrackingID,AffiliateCommission,OrderNotes,AffiliateID,DateAdded,HTTPReferal,OrderDate,OrderValue,PaidtoAffiliate,MerchantName,DateUpdated,CreativeName,IPAddress,TransactionType,DatePaidToAffiliate&DateFormat=YYYY-MM-DD+HH:MN:SS&GetNewSales=YES&GetChanges=YES&GetPaidTransactions=YES&PendingSales=YES&ValidatedSales=YES&VoidSales=YES`

	return new Promise(async function(resolve, reject) {
		try {
			let transactions = await requestData(url)
			resolve(normalizeTransactionData(transactions.transactions))
		} catch (err) {
			reject(err)
		}
	})
}
