import { defineStore } from 'pinia'

/**
 * In diesem Speicher befinden sich Einstellungen, die global abgerufen und verändert werden können.
 */
export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    extraDiceAll: 0, //Extra Würfel auf alle Attacken
    extraDiceMeele: 0, //Extra Würfel auf Nahkampfattacken
    extraDiceRange: 0, //Extra Würfel auf Fernkampfattacken
    extraResultAll: 0, //Extra Würfelergebnis auf alle Attacken
    extraResultMeele: 0, //Extra Würfelergebnis auf Nahkampfattacken
    extraResultRange: 0, //Extra Würfelergebnis auf Fernkampfattacken
  }),
})
