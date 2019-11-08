import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MdDelete, MdSettings } from "react-icons/md"
import Button from 'react-bootstrap/Button'
import Settings from './Settings.jsx'

import {
  updateStateByKey,
  addMissingObjectKeys
} from '../helpers.js'

import Input from './Input.jsx'

const QuoteDetail = (props) => {
  const { t } = useTranslation()

  const data = addMissingObjectKeys(props.data, {
    title: '',
    detail: '',
    days: '',
    feeperamount: '',
    fee: 0,
    settings: {
      flatrate: false
    }
  })
  const updateDetail = (key, value) => {
    updateStateByKey(key, value, data, (newData) => {
      props.updateDetail(newData)
    })
  }

  return (
    <React.Fragment>
      <div className="table-row quote-item">
        <div className="table-cell-group title">
          <div className={props.hasTitle ? 'table-cell title' : 'table-cell title empty'}>
            {
              props.hasTitle &&
              <Input
                placeholder={t('placeholder.title')}
                savedvalue={data.title}
                required={true}
                updateField={value => {
                  updateDetail('title', value)
                }}
              />
            }
          </div>
        </div>
        <div className="table-cell-group details">
          <div className="table-cell detail">
            <Input
              type='textarea'
              placeholder={t('placeholder.description')}
              required={true}
              savedvalue={data.detail}
              updateField={value => {
                updateDetail('detail', value)
              }}
            />
          </div>
          <div className="table-cell days">
            <Input
              type='number'
              min="0"
              required={false}
              placeholder="0"
              savedvalue={data.days}
              updateField={value => {
                const parsed = parseFloat(value)
                updateDetail('days', isNaN(parsed) ? 0 : parsed)
              }}
            />
          </div>
          <div className="table-cell feeperamount">
            {
              !data.settings.flatrate &&
                <Input
                  type='number'
                  min="0"
                  required={false}
                  placeholder="0"
                  savedvalue={data.feeperamount}
                  updateField={value => {
                    const parsed = parseFloat(value)
                    updateDetail('feeperamount', isNaN(parsed) ? 0 : parsed)
                  }}
                />
            }
            {
              data.settings.flatrate &&
                <div className="field-form field-form--read form-group">
                  {t('flatrate')}
                </div>
            }
          </div>
          <div className="table-cell fee">
            {
              data.settings.flatrate &&
                <Input
                  type='number'
                  min={0}
                  required={false}
                  placeholder={t('placeholder.amount')}
                  savedvalue={data.fee}
                  updateField={value => {
                    const parsed = parseFloat(value)
                    updateDetail('fee', isNaN(parsed) ? 0 : parsed)
                  }}
                />
            }
            {
              !data.settings.flatrate &&
              <div>
                {data.fee}
              </div>
            }
          </div>
          <div className="quotedetail-actions">
            <Settings
              data={data.settings}
              variant='outline-primary'
              size='sm'
              onSave={value => {
                updateDetail('settings', value)
              }}
            >
              <MdSettings />
            </Settings>
            <Button
              variant="outline-danger"
              size="sm"
              className="delete-btn"
              onClick={props.deleteDetail}>
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

QuoteDetail.defaultProps = {
  data: {
    title: '',
    detail: '',
    days: 0,
    feeperamount: 0,
    fee: 0,
  },
  hasTitle: false,
  deleteDetail: (e) => {
    console.log({deleteDetail: e})
  },
  addDetail: (e) => {
    console.log({addDetail: e})
  },
  updateDetail: (e) => {
    console.log({updateDetail: e})
  }
}

QuoteDetail.propTypes = {
  data: PropTypes.object,
  hasTitle: PropTypes.bool,
  deleteDetail: PropTypes.func,
  addDetail: PropTypes.func,
  updateDetail: PropTypes.func
}

export default QuoteDetail
