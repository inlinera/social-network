import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'

/**
 *
 * @param e - onBlur event param
 * @param setValue - rhf useForm hook param
 * @example onBlur={e => handleBlur(e, setValue)}
 */

export const handleBlur = <I extends FieldValues>(
  e: React.FocusEvent<HTMLInputElement>,
  setValue: UseFormSetValue<I>
) => {
  const value = e.target.value.trim()
  const name = e.target.name as Path<I>

  const valueTyped = value as PathValue<I, Path<I>>

  setValue(name, valueTyped)
}

export const email = {
  required: 'Это поле обязательно для заполнения',
  minLength: {
    value: 8,
    message: 'Почта должна содержать минимум 8 символов',
  },
  maxLength: {
    value: 40,
    message: 'Почта не должна превышать 40 символов',
  },
}

export const password = {
  required: 'Это поле необходимо для заполнения',
  minLength: {
    value: 6,
    message: 'Пароль должен содержать минимум 6 символов',
  },
  maxLength: {
    value: 30,
    message: 'Пароль не должен превышать 30 символов',
  },
}
