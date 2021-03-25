export interface Cart {
    customerID: String,
    products: [{
        productID: String,
        qty: Number
    }]
}