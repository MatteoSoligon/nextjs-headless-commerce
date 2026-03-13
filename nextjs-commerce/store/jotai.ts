import { atom } from 'jotai'

const filterVisibilityAtom = atom(false)
const selectedFiltersAtom  = atom({})
const isLoading = atom(false)

export { filterVisibilityAtom, selectedFiltersAtom, isLoading }
