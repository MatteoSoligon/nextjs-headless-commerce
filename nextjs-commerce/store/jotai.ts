import { atom } from 'jotai'

const filterVisibilityAtom = atom(false)
const selectedFiltersAtom  = atom<undefined | Record<string, unknown[]>>(undefined)
const isLoading = atom(false)

export { filterVisibilityAtom, selectedFiltersAtom, isLoading }
