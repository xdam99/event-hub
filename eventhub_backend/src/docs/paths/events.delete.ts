/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Supprimer un événement
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Événement supprimé
 *       404:
 *         description: Événement non trouvé
 */
