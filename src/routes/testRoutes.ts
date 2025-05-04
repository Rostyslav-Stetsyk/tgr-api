import { Router } from 'express';
import { altoAuthMiddleware } from '../middlewares/altoAuthMiddleware';
import testCotroller from '../controllers/testController';

const router = Router();

router.get('/ping');
/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test endpoint
 *     description: Return test item
 *     tags:
 *       - Test
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 succes:
 *                  type: boolean
 *                 data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    name:
 *                      type: string
 */
router.get('/test', altoAuthMiddleware, testCotroller.getTestItem);

export default router;
