import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { MdDelete } from "react-icons/md"
import Button from 'react-bootstrap/Button'

import {
  updateStateByKey,
  addMissingObjectKeys
} from '../helpers.js'

import Input from './Input.jsx'

const QuoteDetail = (props) => {
  const initialState = addMissingObjectKeys(props.data, {
    title: '',
    detail: '',
    days: 0,
    fee: 0,
  })
  const [data, setData] = useState(initialState)
  const updateDetail = (key, value) => {
    updateStateByKey(key, value, data, (newData) => {
      props.updateDetail(newData)
      setData(newData)
    })
  }

  return (
    <React.Fragment>
      <div className="table-row quote-item">
        <div className={props.hasTitle ? 'table-cell title' : 'table-cell title empty'}>
          {
            props.hasTitle &&
            <Input
              placeholder="Intitulé"
              savedvalue={props.data.title}
              required={true}
              updateField={value => {
                updateDetail('title', value)
              }}
            />
          }
        </div>
        <div className="table-cell details">
          <div className="table-cell detail">
            <Input
              type='textarea'
              placeholder="Description"
              required={true}
              savedvalue={props.data.detail}
              updateField={value => {
                updateDetail('detail', value)
              }}
            />
          </div>
          <div className="table-cell days">
            <Input
              type='number'
              min="0"
              required={true}
              placeholder="Nb Jours"
              savedvalue={props.data.days}
              updateField={value => {
                updateDetail('days', value)
              }}
            />
          </div>
          <div className="table-cell fee">
            {props.data.fee}
          </div>
          <div className="quotedetail-actions">
            <Button
              variant="outline-danger"
              size="sm"
              className="delete-btn"
              onClick={props.deleteDetail}>
              <MdDelete /> Supprimer ce détail
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
    fee: 0,
  },
  feeperamount: 0,
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
  feeperamount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  hasTitle: PropTypes.bool,
  deleteDetail: PropTypes.func,
  addDetail: PropTypes.func,
  updateDetail: PropTypes.func
}

export default QuoteDetail
