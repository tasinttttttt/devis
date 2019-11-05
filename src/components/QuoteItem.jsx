import React from 'react'
import PropTypes from 'prop-types'

import { MdAdd } from "react-icons/md"
import Button from 'react-bootstrap/Button'

import QuoteDetail from './QuoteDetail.jsx'

const QuoteItem = (props) => {
  const details = props.data

  const addDetail = () => (
    props.updateItem([...details, {}])
  )

  const deleteDetail = (detailIndex) => {
    const newDetails = details.filter((item, index) => index !== detailIndex)
    if (!newDetails.length) {
      props.deleteItem()
    } else {
      props.updateItem(newDetails)
    }
  }

  const updateItem = (index, value) => {
    const newDetails = [...details]
    newDetails[index] = value
    props.updateItem(newDetails)
  }

  return (
    <React.Fragment>
      {
        details.map((item, index) => (
          <React.Fragment key={index}>
            <QuoteDetail
              data={item}
              feeperamount={props.feeperamount}
              hasTitle={index === 0}
              deleteDetail={() => {
                deleteDetail(index)
              }}
              updateDetail={value => {
                updateItem(index, value)
              }}
            />
          </React.Fragment>
        ))
      }
      {
        props.data.length
        ? <div className="quoteitem-actions">
            <Button variant="outline-primary" size="sm" onClick={addDetail}>
              <MdAdd /> Ajouter un détail
            </Button>
          </div>
        : ''
      }
    </React.Fragment>
  )
}

QuoteItem.defaultProps = {
  data: [],
  feeperamount: 0,
  updateItem: e => {
    console.log({updateItem: e})
  },
  deleteItem: e => {
    console.log({deleteItem: e})
  }
}

QuoteItem.propTypes = {
  data: PropTypes.array,
  feeperamount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
}

export default QuoteItem
