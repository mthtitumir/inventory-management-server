import { TSales } from "./sales.interface";
import Sales from "./sales.model";

const addNewSalesIntoDB = async (payload: TSales) =>{
    const result = await Sales.create(payload);
    return result;
};

const getAllSalesFromDB = async() =>{

}

export const SalesService = {
    addNewSalesIntoDB,
    getAllSalesFromDB
}