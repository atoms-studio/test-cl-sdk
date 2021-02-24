import axios from 'axios'
import { initCLayer, Sku } from '@commercelayer/js-sdk'
import { getSalesChannelToken } from '@commercelayer/js-auth'

const endpoint = 'https://brioni.commercelayer.io'
const clientId = '9A-ewDDlpDHdeNeJiYDOEEt3g259GMdcVGQg-Kk_SDk'
const scope = 'market:3822'

let token = ''

getSalesChannelToken({
  clientId,
  endpoint,
  scope,
}).then(({ accessToken }) => {
  token = accessToken
  initCLayer({
    accessToken,
    endpoint,
  })
})

const skus = [
  'BDklSgJlqW',
  'BmDzSPbOeW',
  'nkGgSEwQYn',
  'BjwqSqomln',
  'nLgbSPJLPB',
  'ZrxeSMlbRB',
  'nzPQSJekwW',
  'nOpOSMywkZ',
  'BwpOSMaDkn',
  'WGDMSLgrgB',
]

const getSkuWithSdk = async (sku, index) => {
  const start = Date.now()
  console.log('[SDK] ------ start ' + index + ' --------   ')
  const res = await Sku.find(sku)
  console.log('[SDK] ------ end ' + index + ' --------   time: ' + (Date.now() - start).toString())
  return res
}

const getSkuWithAxios = async (sku, index) => {
  const start = Date.now()
  console.log('[Axios] ------ start ' + index + ' --------   ')
  const res = await axios.get(`https://brioni.commercelayer.io/api/skus/${sku}/`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  console.log('[Axios] ------ end ' + index + ' --------   time: '  + (Date.now() - start).toString())
  return res
}

window.useSdk = () => {
  const start = Date.now()
  const promises = skus.map(getSkuWithSdk)

  Promise.all(promises).then(() => {
    const total = Date.now() - start
    document.querySelector('#sdk-feedback').textContent = `Done in ${total}ms`
    console.log(`[SDK] Done in ${total}ms`)
  })
}

window.useAxios = () => {
  const start = Date.now()
  const promises = skus.map(getSkuWithAxios)

  Promise.all(promises).then(() => {
    const total = Date.now() - start
    document.querySelector('#axios-feedback').textContent = `Done in ${total}ms`
    console.log(`[Axios] Done in ${total}ms`)
  })
}
