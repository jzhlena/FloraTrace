import { create } from "zustand"

export const useFlowerStore = create((set) => ({
    flowers: [],
    setFlowers: (flowers) => set({ flowers }),
    createFlower: async (newFlower) => {
        if (!newFlower.primary_name || !newFlower.flower_price || !newFlower.image_url) {
            return { success: false, message: "Please fill in all fields..." }
        }
        const res = await fetch("/api/flowers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFlower),
        });
        const data = await res.json()
        set((state) => ({ flowers: [...state.flowers, data.data] }))
        return { success: true, message: "Flower created successfully." }
    },
    fetchFlowers: async () => {
        const res = await fetch("/api/flowers");
        const data = await res.json();
        set({ flowers: data.data })
    },
    deleteFlower: async (flower_id) => {
        const res = await fetch(`/api/flowers/${flower_id}`, {
            method: "DELETE",
        })
        const data = await res.json();
        if (!data.success)
            return { success: false, message: data.message }

        // immediately update ui
        set(state => ({ flowers: state.flowers.filter(flower => flower._id !== flower_id) }))
        return { success: true, message: data.message }
    }
}))