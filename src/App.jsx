import React, { useEffect } from 'react'
import * as ls from 'local-storage'
import { useTranslation } from 'react-i18next'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { MdPrint, MdWarning, MdLink, MdSettings } from "react-icons/md"
import { DiGithubBadge } from 'react-icons/di'

import {
  LOCALSTORAGE_KEY
} from './config.js'

import Input from './components/Input.jsx'
import Quote from './components/Quote.jsx'
import Settings from './components/Settings.jsx'
import useAppState from './state/useAppState.js'

function App() {
  const { t } = useTranslation()

  const defaultState = {
    issuer: '',
    client: '',
    date: '',
    title: '',
    subtitle: '',
    note: '',
    settings: {
      language: 'en',
      currency: '€',
      amountLabel: 'day',
      tax: {
        amount: '',
        label: 'TVA',
        enabled: false
      }
    },
    quote: {
      items: [
        [
          {
            title: '',
            detail: '',
            days: '',
            fee: '',
          }
        ]
      ],
      totalDays: 0,
      totalTax: 0,
      totalFee: 0
    }
  }

  const {
    state,
    updateState,
    updateQuote,
    updateSettings
  } = useAppState(ls.get(LOCALSTORAGE_KEY), defaultState)

  // Blurs all inputs
  const render = () => {
    const inputs = document.querySelectorAll('input, textarea')

    return new Promise((resolve) => {
      inputs && inputs.forEach((element) => {
        element.blur()
      })
      resolve()
    })
  }

  // Delete localstorage then reload the page
  const deleteHandler = () => {
    ls.set(LOCALSTORAGE_KEY, defaultState)
    window.location.reload()
  }

  // Read mode then print
  const printHandler = () => {
    render().then(() => {
      window.print()
    })
  }

  const settingsHandler = (settings) => {
    render().then(() => {
      updateSettings(settings)
    })
  }

  // Initial render shows all fields as read mode
  useEffect(() => {
    render()
  }, [])

  return (
    <React.Fragment>

      <div className="sides">
        <div className="person issuer">
          <Input
            type='textarea'
            placeholder={t('placeholder.issuer')}
            savedvalue={state.issuer}
            required={true}
            rows={6}
            updateField={value => {
              updateState('issuer', value)
            }}
          />
        </div>
        <div className="link">{t('placeholder.to')}</div>
        <div className="person client">
          <Input
            type='textarea'
            placeholder={t('placeholder.client')}
            savedvalue={state.client}
            required={true}
            rows={6}
            updateField={value => {
              updateState('client', value)
            }}
          />
        </div>
      </div>

      <div className="header">
        <div className="date">
          <Input
            type='input'
            placeholder={t('placeholder.location')}
            savedvalue={state.date}
            required={true}
            updateField={value => {
              updateState('date', value)
            }}
          />
        </div>
        <div className="title">
          <Input
            type='input'
            placeholder={t('placeholder.documenttype')}
            savedvalue={state.title}
            required={true}
            updateField={value => {
              updateState('title', value)
            }}
          />
        </div>
        <div className="subtitle">
          <Input
            type='input'
            placeholder={t('placeholder.task')}
            savedvalue={state.subtitle}
            required={true}
            updateField={value => {
              updateState('subtitle', value)
            }}
          />
        </div>
      </div>

      <div className="quote">
        <Quote
          data={state}
          updateQuote={updateQuote} />
      </div>

      <div className="notes">
        <div className="note">
          <Input
            type='textarea'
            rows={6}
            placeholder={t('footnote')}
            savedvalue={state.note}
            required={false}
            updateField={value => {
              updateState('note', value)
            }}
          />
        </div>
      </div>

      <aside className="ui">
        <div className="primary">
          <Container>
            <Row>
              <Col sm={4}>
                <Settings
                  data={state.settings}
                  onSave={settingsHandler}
                >
                  <MdSettings /> {t('settings')}
                </Settings>
              </Col>
              <Col sm={4}>
                <Button className="print-btn" variant="success" onClick={printHandler}><MdPrint /> {t('printdocument')}</Button>
              </Col>
              <Col sm={4}>
                <Button className="print-btn" variant="danger" onClick={deleteHandler}><MdWarning /> {t('erasedocument')}</Button>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="credits">
          <a href="https://github.com/tasinttttttt/devis"><DiGithubBadge /> {t('source')}</a>
          <a href="https://www.buymeacoffee.com/tbayri" target="_blank" rel="noreferrer noopener">
            <img src="https://cdn.buymeacoffee.com/buttons/arial-yellow.png" alt="Buy Me A Coffee" style={{height: "28.2px", width: "120px", borderRadius: "3px", top: "8px", position: "relative"}} />
          </a>
          <a href="https://tayebbayri.com"><MdLink /> tbayri</a>
        </div>
      </aside>
    </React.Fragment>
  )
}

export default App
