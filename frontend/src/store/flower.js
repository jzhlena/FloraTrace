import { create } from "zustand"

export const useFlowerStore = create((set) => ({
    flowers: [],
    setFlowers: (flowers) => set({ flowers }),
    createFlower: async (newFlower) => {
        console.log(newFlower)
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
        console.log(data)
        set((state) => ({flowers: [...state.flowers, data.data]}))
        return {success: true, message: "Flower created successfully."}
    }
}))