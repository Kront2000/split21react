import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useHistoryOfVictories = create(persist((set) => ({
    history: {},
    appendToHistory: (victory, date) => set((state) => ({...state, history: {...state.history, date: victory }})),
})));

export default useHistoryOfVictories