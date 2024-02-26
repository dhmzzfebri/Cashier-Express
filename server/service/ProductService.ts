const db = require("../models")

// method bawaan sequelize CRUD

export interface ProductEntity{
    name:string,
    quantity:number,
    price:number,
    description:string
}

class ProductService{
    // Create Operation
    async store(data: ProductEntity){
       try{
        const result = await db.productss.create({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            description: data.description
        })
        return result
       } catch (error){
            return error
       }
    }

    // Read Operation
    async getAll(){
        try {
            const products = await db.productss.findAll()
            return products
        } catch (error) {
            return error
        }
    }
}

export default ProductService