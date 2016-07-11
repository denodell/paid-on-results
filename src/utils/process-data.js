import fieldNameConversion from './field-name-map'

function getDate(date) {
	return new Date(date.split('/')[2] + '-' + date.split('/')[1] + '-' + date.split('/')[0])
}

export function normalizeAdvertiserData(merchants = []) {
	let dateValueFields = ['dateLaunched', 'lastFeedUpdate']

	return merchants.map(merchant => {
		let out = {}

		for (let dataItem in merchant) {
			if (merchant.hasOwnProperty(dataItem)) {
				let normalizedFieldName = dataItem.toLowerCase()
				let newDataItemName = fieldNameConversion[normalizedFieldName] || normalizedFieldName
				let value = merchant[dataItem][0]
				out[newDataItemName] = value
				out[newDataItemName] = dateValueFields.includes(newDataItemName) ? new Date(out[newDataItemName]) : out[newDataItemName]
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
				let normalizedFieldName = linkItem.toLowerCase()
				let newDataItemName = fieldNameConversion[normalizedFieldName] || normalizedFieldName
				let value = link[linkItem][0]
				out[newDataItemName] = value
				out[newDataItemName] = dateValueFields.includes(newDataItemName) && out[newDataItemName] !== 'NA' ? getDate(out[newDataItemName]) : (out[newDataItemName] !== 'NA' ? out[newDataItemName] : undefined)
			}
		}

		return out
	})
}

export function normalizeVouchersData(vouchers = []) {
	let dateValueFields = ['startDate', 'expiryDate']

	return vouchers.map(voucher => {
		let out = {}
		for (let voucherItem in voucher) {
			if (voucher.hasOwnProperty(voucherItem)) {
				let normalizedFieldName = voucherItem.toLowerCase()
				let newDataItemName = fieldNameConversion[normalizedFieldName] || normalizedFieldName
				let value = voucher[voucherItem][0]
				out[newDataItemName] = value
				out[newDataItemName] = dateValueFields.includes(newDataItemName) && out[newDataItemName] ? getDate(out[newDataItemName]) : (out[newDataItemName] !== '' ? out[newDataItemName] : undefined)
			}
		}

		return out
	})
}

export function normalizeTransactionData(transactions = []) {
	let booleanValueFields = ['paidToAffiliate']
	let numberValueFields = ['affiliateCommission', 'orderValue']
	let dateValueFields = ['clickDate', 'dateAdded', 'orderDate', 'dateUpdated', 'datePaidToAffiliate']
	let stringNAValueFields = ['creativeName', 'httpReferal', 'ipAddress', 'orderNotes']

	return transactions.map(transaction => {
		let out = {}
		for (let transactionItem in transaction) {
			if (transaction.hasOwnProperty(transactionItem)) {
				let normalizedFieldName = transactionItem.toLowerCase()
				let newDataItemName = fieldNameConversion[normalizedFieldName] || normalizedFieldName
				let value = transaction[transactionItem][0]
				out[newDataItemName] = value
				out[newDataItemName] = booleanValueFields.includes(newDataItemName) && out[newDataItemName] ? out[newDataItemName] === 'YES' : (out[newDataItemName] !== 'NA' ? out[newDataItemName] : undefined)
				out[newDataItemName] = numberValueFields.includes(newDataItemName) && out[newDataItemName] ? +out[newDataItemName] : (out[newDataItemName] !== 'NA' ? out[newDataItemName] : undefined)
				out[newDataItemName] = dateValueFields.includes(newDataItemName) && out[newDataItemName] && out[newDataItemName] !== 'NA' && out[newDataItemName] !== 'NO' ? new Date(out[newDataItemName]) : (out[newDataItemName] !== 'NA' && out[newDataItemName] !== 'NO' ? out[newDataItemName] : undefined)
				out[newDataItemName] = stringNAValueFields.includes(newDataItemName) && out[newDataItemName] && out[newDataItemName] !== 'NA' ? out[newDataItemName] : (out[newDataItemName] !== 'NA' ? out[newDataItemName] : undefined)
			}
		}
		return out
	})
}
