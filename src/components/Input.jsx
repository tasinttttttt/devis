import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

import useInputState from '../state/useInputState'

const Input = (props) => {
  const { value, onChange, updateValue } = useInputState(props.savedvalue)
  const [editing, setEditing] = useState(!!value)

  const newProps = {...props}
  delete newProps['updateField']

  newProps.onBlur = e => {
    if (!props.required || (props.required && e.target.value)) {
      setEditing(false)
      props.updateField(e.target.value)
    }
  }
  return (
    <Form.Group className={editing ? 'field-form' : 'field-form field-form--read'}>
      {
        (editing === true || props.savedvalue === '')
          ? props.type === 'textarea'
            ? <Form.Control {...newProps} value={value} onChange={onChange} as={props.type} />
            : <Form.Control {...newProps} value={value} onChange={onChange} />
          : <div
              className="field-form__content"
              style={{minHeight: '20px'}}
              onClick={() => {
                setEditing(true)
                updateValue(props.savedvalue)
              }}
            >
              {props.savedvalue}
            </div>
      }
    </Form.Group>
  )
}

Input.defaultProps = {
  className: 'field-form__form',
  type: 'input',
  placeholder: '',
  savedvalue: '',
  autoFocus: false,
  required: false,
  onBlur: e => {
    console.log({onBlur: e})
  },
  updateField: value => {
    console.log({updateField: value})
  }
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  savedvalue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  updateField: PropTypes.func,
}

export default Input
