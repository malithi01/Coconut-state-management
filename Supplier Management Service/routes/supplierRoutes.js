const express = require("express");
const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  receiveProducts
} = require("../controllers/supplierController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - price
 *         - quantity
 *       properties:
 *         productName:
 *           type: string
 *           enum: [Coconut, King Coconut, Young Coconut]
 *           example: Coconut
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 *           minimum: 0
 *     Supplier:
 *       type: object
 *       required:
 *         - name
 *         - contactNumber
 *         - location
 *       properties:
 *         _id:
 *           type: string
 *           example: 66bc42fd0d1df2f6f4f8a173
 *         name:
 *           type: string
 *           example: Green Harvest Pvt Ltd
 *         contactNumber:
 *           type: string
 *           example: +94771234567
 *         location:
 *           type: string
 *           example: Kurunegala
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *     SupplierInput:
 *       type: object
 *       required:
 *         - name
 *         - contactNumber
 *         - location
 *       properties:
 *         name:
 *           type: string
 *         contactNumber:
 *           type: string
 *         location:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *     UpdateSupplierResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Supplier updated successfully
 *         supplier:
 *           $ref: '#/components/schemas/Supplier'
 *     DeleteSupplierResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Supplier deleted successfully
 *         deletedSupplier:
 *           $ref: '#/components/schemas/Supplier'
 */

/**
 * @swagger
 * /supplier:
 *   post:
 *     summary: Add a new supplier
 *     tags: [Supplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SupplierInput'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       400:
 *         description: Invalid request body
 */
router.post("/", createSupplier);

/**
 * @swagger
 * /supplier:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Supplier]
 *     responses:
 *       200:
 *         description: List of suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
router.get("/", getSuppliers);

/**
 * @swagger
 * /supplier/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supplier details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found
 *       400:
 *         description: Invalid supplier ID
 */
router.get("/:id", getSupplierById);

/**
 * @swagger
 * /supplier/{id}:
 *   put:
 *     summary: Update supplier details
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SupplierInput'
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateSupplierResponse'
 *       404:
 *         description: Supplier not found
 *       400:
 *         description: Invalid request data
 */
router.put("/:id", updateSupplier);

/**
 * @swagger
 * /supplier/{id}:
 *   delete:
 *     summary: Delete supplier
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteSupplierResponse'
 *       404:
 *         description: Supplier not found
 *       400:
 *         description: Invalid supplier ID
 */
router.delete("/:id", deleteSupplier);

/**
 * @swagger
 * /supplier/{id}/receive-products:
 *   post:
 *     summary: Receive products from supplier and update inventory
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - quantity
 *               - warehouseLocation
 *               - price
 *             properties:
 *               productName:
 *                 type: string
 *                 enum: [Coconut, King Coconut, Young Coconut]
 *                 example: Coconut
 *               quantity:
 *                 type: number
 *                 example: 500
 *               price:
 *                 type: number
 *                 description: Price per unit of the product
 *                 example: 150.00
 *               warehouseLocation:
 *                 type: string
 *                 example: Warehouse A - Room 1
 *     responses:
 *       201:
 *         description: Products received successfully and inventory updated
 *       400:
 *         description: Bad request - missing required fields
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Error receiving products
 */
router.post("/:id/receive-products", receiveProducts);

module.exports = router;
