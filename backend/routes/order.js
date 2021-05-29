const express = require("express")
const orderRouter = express.Router()
const { Order } = require("../models/order")

orderRouter.get("/order", async (req, res) => {
    try {
        let orders

        const { offset, limit } = req.query;
        const specs = { offset: offset, limit: limit };
        orders = await Order.paginate({}, specs)

        if (orders.totalDocs === 0) {
            res.status(404).send("There is no such deck in your Cart!")
            return
        } else {
            res.json(orders)
        }

    } catch (error) {
        console.error(error)
        res.send("Error!")
    }
})


orderRouter.post("/order", async (req, res) => {
    try {
        const cart = req.body.cart
        const user = req.body.user

        const newOrder = new Order({ cart: cart, user: user })
        await newOrder.save()
        res.json(newOrder)

    } catch (error) {
        console.error(error)
        res.send("Error")
    }
})

orderRouter.put("/order/:id", async (req, res) => {
    try {
        const { id } = req.params
        const editOrder = await Order.findByIdAndUpdate(id, req.body)
        res.json(editOrder)
    } catch (error) {
        console.error(error)
        res.send("Error")
    }
})

orderRouter.delete("/order/:id", async (req, res) => {
    try {
        const { id } = req.params
        await Order.findByIdAndRemove(id)
        res.send("The item has been removed from the Cart!")
    } catch (error) {
        console.error(error)
        res.send("Error")
    }
})

exports.orderRouter = orderRouter
