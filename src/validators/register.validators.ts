import { body } from 'express-validator';

export default [
   body('firstName').notEmpty().withMessage('First name is required'),
   body('lastName').notEmpty().withMessage('Last name is required'),
   body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
   body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 chars long'),
];
