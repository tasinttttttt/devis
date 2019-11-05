import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import {
  updateStateByKey
} from '../helpers.js'

const Settings = (props) => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState({
    currency: props.data.currency,
    feeperamount: props.data.feeperamount,
    amountLabel: props.data.amountLabel,
    tax: props.data.tax
  })

  const handleClose = () => {
    setShow(false)
  }
  const handleSave = () => {
    props.onSave(data)
    handleClose()
  }
  const handleChange = (key, value) => {
    updateStateByKey(key, value, data, setData)
  }

  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Button className="settings-btn" variant="primary" onClick={handleShow}>
        {props.children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Paramètres</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tarif</Form.Label>
              <Form.Control
                type="number"
                min={0}
                placeholder='ex. 350'
                value={data.feeperamount}
                onChange={e => {
                  handleChange('feeperamount', e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Monnaie</Form.Label>
              <Form.Control
                type="input"
                placeholder='Euros, $, MAD'
                value={data.currency}
                onChange={e => {
                  handleChange('currency', e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Intitulé de quantité</Form.Label>
              <Form.Control
                type="input"
                placeholder='Jour, Quantité'
                value={data.amountLabel}
                onChange={e => {
                  handleChange('amountLabel', e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Taxes (pourcentage)</Form.Label>
              <Form.Check
                type='switch'
                id='tax'
                label='Activés'
                checked={data.tax.enabled}
                onChange={e => {
                  console.log(e)
                  console.log(e.target.value)
                  handleChange('tax', {
                    ...data.tax,
                    enabled: !data.tax.enabled
                  })
                }}
              />
              {
                data.tax.enabled &&
                <React.Fragment>
                  <Form.Control
                    type="number"
                    placeholder='Montant en %'
                    value={data.tax.amount}
                    onChange={e => {
                      handleChange('tax', {
                        ...data.tax,
                        amount: e.target.value
                      })
                    }}
                  />
                  <Form.Control
                    type="input"
                    placeholder='TVA, charges'
                    value={data.tax.label}
                    onChange={e => {
                      handleChange('tax', {
                        ...data.tax,
                        label: e.target.value
                      })
                    }}
                  />
                </React.Fragment>
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

Settings.defaultProps = {
  data: {},
  onSave: (e) => {
    console.log({onSave: e})
  }
}

Settings.propTypes = {
  data: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onSave: PropTypes.func
}

export default Settings
