/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "uuid"
 *         title:
 *           type: string
 *           example: "JAVAFEST"
 *         description:
 *           type: string
 *           example: "Un super event"
 *         date:
 *           type: string
 *           format: date-time
 *         capacity:
 *           type: integer
 *           example: 100
 *         price:
 *           type: number
 *           example: 50
 *         organizer:
 *           type: string
 *           example: "Damien J"
 *         venue:
 *           type: string
 *           example: "10 Rue de Jeanne"
 *         category:
 *           type: string
 *           example: "Tech"
 *         imageUrl:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
