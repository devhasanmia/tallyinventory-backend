const data = {
    "customer": "64d7a05f8f5a7c33b1bfe4d1",
    "product": [
        {
            "productId": "67dbc1d3ec4ba722ef669a6e",
            "quantity": 2
        },
        {
            "productId": "64d7a09f8f5a7c33b1bfe4d3",
            "quantity": 1
        }
    ],
    "status": "Placed",
    "discount": 10,
    "totalAmount": 500,
    "paidPayment": 300,
    "paymentStatus": "Partially Paid",
    "notes": "Customer requested expedited delivery."
}


const isExist = data.product.forEach(product => {
    console.log(product.productId, product.quantity)
});

console.log(isExist)