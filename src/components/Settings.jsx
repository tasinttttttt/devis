import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import {
  LANGUAGES
} from '../config.js'

import {
  updateStateByKey
} from '../helpers.js'
import { FormGroup } from 'react-bootstrap'

const Settings = (props) => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState(props.data)
  const { t, i18n } = useTranslation()

  const changeLanguage = lang => {
    i18n.changeLanguage(lang)
  }

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
      <Button
        className="settings-btn"
        variant={props.variant || 'primary'}
        onClick={handleShow}
        size={props.size || 'md'}
      >
        {props.children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('settings')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {
              'language' in data &&
              <Form.Group className='mb-3'>
                <Form.Label>{t('language')}</Form.Label>
                <Form.Control
                  as='select'
                  value={data.language}
                  onChange={e => {
                    handleChange('language', e.target.value)
                    changeLanguage(e.target.value)
                  }}
                >
                  {
                    LANGUAGES.map((lang, index) => {
                      return (
                      <React.Fragment key={index}>
                      {lang}
                      <option
                        value={lang}>{t('languages.' + lang)}</option>
                      </React.Fragment>
                    )})
                  }
                </Form.Control>
              </Form.Group>
            }
            {
              'flatrate' in data &&
              <Form.Group className='mb-3'>
                <Form.Check
                  type='switch'
                  id='tax'
                  label={`${t('flatrate')} ?`}
                  checked={data.flatrate}
                  onChange={() => {
                    handleChange('flatrate', !data.flatrate)
                  }}
                />
              </Form.Group>
            }
            {
              'currency' in data &&
              <Form.Group className='mb-3'>
                <Form.Label>{t('currency')}</Form.Label>
                <Form.Control
                  type="input"
                  placeholder={t('placeholder.currency')}
                  value={data.currency}
                  onChange={e => {
                    handleChange('currency', e.target.value)
                  }}
                />
              </Form.Group>
            }
            {
              'amountLabel' in data &&
              <Form.Group className='mb-3'>
                <Form.Label>{t('amountlabel')}</Form.Label>
                <Form.Control
                  as='select'
                  placeholder={t('placeholder.amountlabel')}
                  value={data.amountLabel}
                  onChange={e => {
                    handleChange('amountLabel', e.target.value)
                  }}
                >
                  <option value="days">{t('days')}</option>
                  <option value="units">{t('units')}</option>
                </Form.Control>
              </Form.Group>
            }
            {
              'tax' in data &&
              <Form.Group className='mb-3'>
                <Form.Check
                  type='switch'
                  id='tax'
                  label={t('placeholder.tax')}
                  checked={data.tax.enabled}
                  onChange={() => {
                    handleChange('tax', {
                      ...data.tax,
                      enabled: !data.tax.enabled
                    })
                  }}
                />
                {
                  data.tax.enabled &&
                  <React.Fragment>
                    <FormGroup>
                      <Form.Control
                       className='mb-1'
                        type="number"
                        placeholder={t('placeholder.taxamount')}
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
                        placeholder={t('placeholder.taxlabel')}
                        value={data.tax.label}
                        onChange={e => {
                          handleChange('tax', {
                            ...data.tax,
                            label: e.target.value
                          })
                        }}
                        />
                    </FormGroup>
                  </React.Fragment>
                }
              </Form.Group>
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {t('save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

Settings.defaultProps = {
  data: {},
  variant: 'primary',
  size: 'md',
  onSave: (e) => {
    console.log({onSave: e})
  }
}

Settings.propTypes = {
  data: PropTypes.object,
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onSave: PropTypes.func
}

export default Settings
