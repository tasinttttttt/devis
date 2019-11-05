import {useState} from 'react'
import * as ls from 'local-storage'

import {
  LOCALSTORAGE_KEY
} from '../config.js'

import {
  updateStateByKey,
  addMissingObjectKeys
} from '../helpers.js'

const computeQuote = (items, settings) => {
  const flattened = [].concat.apply([], items)
  flattened.map(item => {
    const days = parseFloat(item.days)
    const parsedFeePerAmount = parseFloat(settings.feeperamount)
    item.fee = isNaN(days) || isNaN(parsedFeePerAmount) ? 0 : days * parsedFeePerAmount
    return item
  })

  const totalDays = flattened.reduce((subtotal, val) => {
    const n = parseFloat(val.days)
    return isNaN(n) ? subtotal : n + subtotal
  }, 0)

  const totalFee = flattened.reduce((subtotal, val) => {
    const n = parseFloat(val.fee)
    return isNaN(n) ? subtotal : n + subtotal
  }, 0)

  const tax = parseFloat(settings.tax.amount)
  const totalTax = !settings.tax.enabled ? 0 : isNaN(tax) ? 0 : (totalFee * settings.tax.amount) / 100
  const totalFeeTaxed = totalFee - totalTax

  return {
    items: items,
    totalDays: totalDays,
    totalFee: totalFee,
    totalTax: totalTax,
    totalFeeTaxed: totalFeeTaxed
  }
}

const formatSettings = (settings) => {
  const newSettings = {...settings}
  const feeperamount = parseFloat(settings.feeperamount)
  const taxamount = parseFloat(settings.tax.amount)
  newSettings.feeperamount = isNaN(feeperamount) ? 0 : feeperamount
  newSettings.tax.amount = isNaN(taxamount) ? 0 : taxamount
  return newSettings
}

export default (initialState, defaultState) => {
  const fixedState = addMissingObjectKeys(initialState, defaultState)
  const [state, setState] = useState(fixedState)

  const updateState = (key, value) => {
    updateStateByKey(key, value, state, (newState) => {
      setState(newState)
      ls.set(LOCALSTORAGE_KEY, newState)
    })
  }

  const updateQuote = (items) => {
    updateState('quote', computeQuote(items, state.settings))
  }

  const updateSettings = (settings) => {
    const newState = {...state}
    newState.settings = formatSettings(settings)
    newState.quote = computeQuote(newState.quote.items, newState.settings)
    setState(newState)
    ls.set(LOCALSTORAGE_KEY, newState)
  }

  return {
    state,
    updateState: updateState,
    updateQuote: updateQuote,
    updateSettings: updateSettings
  }
}
