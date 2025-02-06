const Member = require('../models/member');

class MemberService {
  static async createMember(memberData) {
    if (!Array.isArray(memberData)) {
      memberData = [memberData]; 
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    memberData.forEach((member) => {
      if (!emailRegex.test(member.email)) {
        throw new Error(`Invalid email format: ${member.email}`);
      }
      if (!phoneRegex.test(member.phone)) {
        throw new Error(`Invalid phone format: ${member.phone}`);
      }
    });

    return await Promise.all(memberData.map((data) => Member.create(data)));
  }
}

module.exports = MemberService;
