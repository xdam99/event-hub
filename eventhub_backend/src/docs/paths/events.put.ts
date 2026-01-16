/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Mettre à jour un événement
 *     tags:
 *       - Events
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
 *             $ref: '#/components/schemas/UpdateEventDTO'
 *     responses:
 *       200:
 *         description: Événement mis à jour
 *       404:
 *         description: Événement non trouvé
 */
