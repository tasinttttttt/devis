import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MdNoteAdd } from "react-icons/md"
import Button from 'react-bootstrap/Button'

import QuoteItem from './QuoteItem.jsx'

const Quote = (props) => {
  const { t } = useTranslation()

  const {
    settings,
    quote
  } = props.data

  const addQuoteDetail = () => {
    const newDetails = [...quote.items, [{}]]
    props.updateQuote(newDetails)
  }
  const deleteQuoteItem = (itemIndex) => {
    const newItems = quote.items.filter((item, index) => index !== itemIndex)
    props.updateQuote(newItems)
  }
  const updateQuoteItem = (detailIndex, detailValue) => {
    const newDetails = [...quote.items]
    newDetails[detailIndex] = detailValue
    props.updateQuote(newDetails)
  }

  return (
    <React.Fragment>
      <div className="table">
        <div className="table-header">
          <div className="table-cell-group title">
            <div className="table-head detail">
              {t('item')}
            </div>
          </div>
          <div className="table-cell-group details">
            <div className="table-head detail">{t('description')}</div>
            <div className="table-head days">{t(settings.amountLabel)}</div>
            <div className="table-head feeperamount">{t('rate')}</div>
            <div className="table-head fee">{settings.currency}</div>
          </div>
        </div>
        <div className="table-content">
          {
            quote.items.map((item, index) => (
              <QuoteItem
                key={index}
                data={item}
                feeperamount={settings.feeperamount}
                deleteItem={() => {
                  deleteQuoteItem(index)
                }}
                updateItem={value => {
                  updateQuoteItem(index, value)
                }} />
            ))
          }
          <div className="quote-actions">
            <Button variant="outline-primary" onClick={addQuoteDetail}>
              <MdNoteAdd /> {t('additem')}
            </Button>
          </div>
        </div>
        <div className="table-footer">
          <div className="table-row">
            <div className="table-cell title">{t('subtotal')}</div>
            <div className="table-cell-group details">
              <div className="table-cell detail"></div>
              <div className="table-cell days">{quote.totalDays}</div>
              <div className="table-cell feeperamount"></div>
              <div className="table-cell fee">{quote.totalFee}</div>
            </div>
          </div>

          {
            settings.tax.enabled === true &&
            <div className="table-row quote-tax">
              <div className="table-cell title">{settings.tax.label}</div>
              <div className="table-cell-group details">
                <div className="table-cell detail"></div>
                <div className="table-cell days"></div>
                <div className="table-cell feeperamount">{settings.tax.amount}%</div>
                <div className="table-cell fee">{quote.totalTax}</div>
              </div>
            </div>
          }

          <div className="table-row quote-total">
            <div className="table-cell title">{t('total')}</div>
            <div className="table-cell-group details">
              <div className="table-cell detail"></div>
              <div className="table-cell days"></div>
              <div className="table-cell feeperamount"></div>
              <div className="table-cell fee">{quote.totalFeeTaxed}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Quote.defaultProps = {
  data: {},
  updateQuote: (e) => {
    console.log({updateQuote: e})
  }
}

Quote.propTypes = {
  data: PropTypes.object,
  updateQuote: PropTypes.func
}

export default Quote
