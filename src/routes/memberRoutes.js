const express = require('express');
const MemberController = require('../controllers/memberController');
const BorrowingController = require('../controllers/borrowingController');

const router = express.Router();

router.post('/', MemberController.createMember);
router.get("/", MemberController.getAllMembers);
router.get('/:id/borrowings', BorrowingController.getMemberBorrowings);

module.exports = router;