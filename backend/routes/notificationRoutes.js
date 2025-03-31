import express from 'express';
import { 
  sendEventNotification,
  getAllNotifications,
  getEventNotifications,
  getUserNotifications,
  getNotificationById,
  markNotificationAsRead,
  deleteNotification
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', sendEventNotification);
router.get('/', getAllNotifications);
router.get('/event/:eventId', getEventNotifications);
router.get('/user/:userId', getUserNotifications);
router.get('/:notificationId', getNotificationById);
router.patch('/:notificationId/read', markNotificationAsRead);
router.delete('/:notificationId', deleteNotification);

export default router;