/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Créer un événement
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDTO'
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 *       400:
 *         description: Données invalides
 */
