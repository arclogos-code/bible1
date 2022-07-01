/** @format */

import * as yup from 'yup'

export const SearchSchema = yup.object().shape({
  query: yup
    .string()
    .max(30)
    .matches(/\W+\d+:\d+/g, '슥4:1 같은 모양으로 검색해주세요.')
    .required('슥4:1 같은 모양으로 검색해주세요.')
})

export const BulkSchema = yup.object().shape({
  query: yup.string().max(300).required('그냥 복붙하셈')
})
