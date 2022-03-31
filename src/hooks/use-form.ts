import { isEmpty, isEqual } from 'lodash'
import React, { ReactNode } from 'react'

type StateType = {
  values: { [key: string]: any }
  touches: Array<string>
  initialValues: { [key: string]: any }
  isDirty: boolean
  submitted: boolean
  resetCount: number
  clearCount: number
}

type ActionType = {
  type:
    | 'value-changed'
    | 'values-changed'
    | 'values-reseted'
    | 'values-cleared'
    | 'form-submitted'
    | 'form-unsubmitted'
    | 'field-touched'
    | 'field-untouched'
  payload?: any
}

type ValidationFunctionType<T = any> = (arg: T) => string | undefined

const initialState: StateType = {
  values: {},
  touches: [],
  initialValues: {},
  isDirty: false,
  submitted: false,
  resetCount: 0,
  clearCount: 0
}

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'value-changed': {
      const field = action.payload.field
      const value = action.payload.value

      const values: StateType['values'] = {
        ...state.values,
        [field]:
        // If field is a object merge the old value with the new one
          state.values[field]?.constructor() === '{}'
            ? { ...state.values[field], ...value }
            : value
      }
      const isDirty = Object.keys(values).some(
        (field) => values[field] && state.initialValues[field] !== values[field]
      )

      return {
        ...state,
        isDirty,
        values,
        touches: state.touches.includes(field)
          ? state.touches
          : [...state.touches, field]
      }
    }
    case 'values-changed': {
      return {
        ...initialState,
        values: action.payload
      }
    }
    case 'values-reseted': {
      return {
        ...initialState,
        values: state.initialValues || {},
        resetCount: state.resetCount + 1
      }
    }
    case 'values-cleared': {
      if (!Object.keys(state.values).length) {
        return state
      }
      return {
        ...state,
        values: {},
        clearCount: state.clearCount + 1
      }
    }
    case 'form-submitted': {
      return {
        ...state,
        submitted: true
      }
    }
    case 'form-unsubmitted': {
      return {
        ...state,
        submitted: false
      }
    }
    case 'field-touched': {
      return {
        ...state,
        touches: [...state.touches, action.payload]
      }
    }
    case 'field-untouched': {
      return {
        ...state,
        touches: state.touches.filter((field) => field !== action.payload)
      }
    }
    default: {
      return state
    }
  }
}

const useForm = <T>(settings?: {
  validations?: Partial<{ [K in keyof T]: ValidationFunctionType<T[K]>[] }>
  initialValues?: Partial<{
    [K in keyof T]: T[K] extends object ? Partial<T[K]> : T[K]
  }>
  onSubmit?: (values: T) => void
  onReset?: () => void
}) => {
  const previousInitialValues = React.useRef<any>()
  const initialValuesHasChanged = !isEqual(
    settings?.initialValues,
    previousInitialValues.current
  )

  const nodes = React.useRef<{ [K in keyof T]: any }>({} as T)

  React.useEffect(() => {
    if (initialValuesHasChanged) {
      previousInitialValues.current = settings?.initialValues
      setValues(settings?.initialValues ?? {})
    }
  }, [initialValuesHasChanged])

  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    initialValues: settings?.initialValues ?? {},
    values: settings?.initialValues ?? {}
  })

  function setRef<P>(field: keyof T) {
    return (node: P) => {
      nodes.current[field] = node
    }
  }

  function getRef(field: keyof T): any {
    return nodes.current?.[field] ?? {}
  }

  function setValue<K extends keyof T>(
    field: K,
    // If it is an object the value's type turns optional
    // because the old value will be merged with the new one
    value?: T[K] extends {} ? Partial<T[K]> : T[K]
  ) {
    if (value === undefined) {
      return (data: T[K]) =>
        dispatch({ type: 'value-changed', payload: { field, value: data } })
    } else {
      dispatch({ type: 'value-changed', payload: { field, value } })
    }

    return
  }

  function setValues(
    payload: Partial<{
      [K in keyof T]: T[K] extends object ? Partial<T[K]> : T[K]
    }>
  ) {
    dispatch({ type: 'values-changed', payload })
  }

  function getValue<K extends keyof T>(field: K): T[K] {
    return state.values?.[field] ?? ''
  }

  function getValues(): T {
    return state.values
  }

  function reset() {
    dispatch({ type: 'values-reseted' })
    settings?.onReset?.()
  }

  function getResetCount() {
    return state.resetCount
  }

  function clear() {
    dispatch({ type: 'values-cleared' })
  }

  function getClearCount() {
    return state.clearCount
  }

  function submit(values = {}) {
    dispatch({ type: 'form-submitted' })

    if (settings?.validations && Object.keys(settings.validations).length) {
      const hasAnyError = Object.keys(settings?.validations).some((field) => {
        return (
          settings?.validations?.[field as keyof T] as ValidationFunctionType[]
        ).some((validation) => {
          const error = validation(getValue(field as keyof T))

          if (typeof error === 'object') {
            return Object.keys(error).find((key) => error[key])
          }

          return error
        })
      })

      if (hasAnyError) {
        return
      }
    }
    settings?.onSubmit?.({ ...state.values, ...values })
  }

  function unsubmit() {
    dispatch({ type: 'form-unsubmitted' })
  }

  function isSubmitted() {
    return state.submitted
  }

  function touch(field: keyof T) {
    dispatch({ type: 'field-touched', payload: field })
  }

  function untouch(field: keyof T) {
    dispatch({ type: 'field-untouched', payload: field })
  }

  function isTouched(field: keyof T) {
    return state.touches.includes(field as string)
  }

  function getError<K extends keyof T>(field: K) {
    if (!state.submitted) {
      return
    }
    if (!settings?.validations?.[field]) {
      return undefined
    }
    const error = (
      settings.validations[field] as ValidationFunctionType<T[K]>[]
    )
      .map((validation) => validation(getValue(field)))
      .find((e) => Boolean(e))

    return error
  }

  return {
    getRef,
    setRef,
    setValue,
    setValues,
    getValue,
    getValues,
    reset,
    getResetCount,
    clear,
    getClearCount,
    submit,
    unsubmit,
    isSubmitted,
    touch,
    untouch,
    isTouched,
    getError,
    isDirty: state.isDirty
  }
}

export default useForm

export const validations = {
  required: (value: string | number | Object) => {
    if (isEmpty(value)) {
      return 'Este campo é obrigatório'
    }
    return undefined
  },
  minLength: (min: number) => {
    return (value: string) => {
      if (String(value).length < min) {
        return `This field must be at least ${min} characters.`
      }

      return undefined
    }
  },
  maxLength: (max: number) => {
    return (value: string) => {
      if (String(value).length > max) {
        return `This field may not be greater than ${max} characters.`
      }
      return undefined
    }
  },
  validEmail: (value: string) => {
    if (!new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value)) {
      return 'This field must be a valid email address.'
    }
    return undefined
  }
}
