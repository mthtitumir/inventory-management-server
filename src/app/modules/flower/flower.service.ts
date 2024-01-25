import { TFlower } from "./flower.interface"
import { Flower } from "./flower.model"

const addFlowerIntoDB = async(payload: TFlower) => {
    const result = await Flower.create(payload);
    return result;
}
const deleteFlowerFromDB = async(flowerId: string) => {
    // check if the flower exists or not 
    

}
const updateFlowerInDB = async() => {

}
const getSingleFlowerFromDB = async() => {

}
const getAllFlowerFromDB = async() => {

}
const bulkDeleteFlowerFromDB = async() => {

}

export const FlowerService = {
    addFlowerIntoDB,
    deleteFlowerFromDB,
    updateFlowerInDB,
    getSingleFlowerFromDB,
    getAllFlowerFromDB,
    bulkDeleteFlowerFromDB
}