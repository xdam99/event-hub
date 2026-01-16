/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Récupérer la liste des événements
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: Liste des événements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
