import React, { useEffect } from 'react'
import * as ls from 'local-storage'

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
  const defaultState = {
    issuer: '',
    client: '',
    date: '',
    title: '',
    subtitle: '',
    note: '',
    settings: {
      feeperamount: 0,
      currency: '€',
      amountLabel: 'Jour',
      tax: {
        amount: 20,
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
            days: 0,
            fee: 0,
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
            placeholder="Émetteur"
            savedvalue={state.issuer}
            required={true}
            rows={6}
            updateField={value => {
              updateState('issuer', value)
            }}
          />
        </div>
        <div className="link">à</div>
        <div className="person client">
          <Input
            type='textarea'
            placeholder="Client"
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
            placeholder="Lieu, date"
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
            placeholder="Type (ex. Devis numéro, Facture numéro)"
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
            placeholder="Objet"
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
        <div className="feeperamount">
          * Tarif: <span className="bold">{state.settings.feeperamount}{state.settings.currency} / {state.settings.amountLabel}.</span>
        </div>
        <div className="note">
          <Input
            type='textarea'
            rows={6}
            placeholder="Notes"
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
                  <MdSettings /> Paramètres
                </Settings>
              </Col>
              <Col sm={4}>
                <Button className="print-btn" variant="success" onClick={printHandler}><MdPrint /> Imprimer le document</Button>
              </Col>
              <Col sm={4}>
                <Button className="print-btn" variant="danger" onClick={deleteHandler}><MdWarning /> Effacer le document</Button>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="credits">
          <a href="https://github.com/tasinttttttt/devis"><DiGithubBadge /> Code source</a>
          <a href="https://tayebbayri.com"><MdLink /> tbayri</a>
        </div>
      </aside>
    </React.Fragment>
  )
}

export default App
