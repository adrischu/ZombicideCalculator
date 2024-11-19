import { defineStore } from 'pinia'
import { allWeapons } from './weaponStore'
import { allSeasons } from './seasonStore'

/**
 * In diesem Speicher befinden sich Einstellungen, die global abgerufen und verändert werden können.
 */
export const useDataStateStore = defineStore('dataState', {
  state: () => ({
    selectedWeapons: [allWeapons.find((o) => o.name === 'Pan')!],
    selectedSeasons: allSeasons,
  }),
})
