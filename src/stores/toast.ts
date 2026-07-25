import { create } from 'zustand'

export interface Notice {
    type: "error" | "success" | "info"
    description: string
    id: number
}

type Store = {
    id: number
    list: Notice[]
    add: (description: string, type?: "error" | "success" | "info") => void
    delete: (id: number) => void
}

const useToast = create<Store>()((set) => ({
    id: 0,
    list: [],
    add: (description, type = "info") => set((state) => {setTimeout(() => {state.delete(state.id)}, 5000); return { list: [{ type: type, description: description, id:state.id }, ...state.list], id: state.id + 1 }}),
    delete: (id: number) => set((state) => ({list: state.list.filter((notice) => notice.id !== id)}))
}))

export default useToast
