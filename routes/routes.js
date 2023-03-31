import {Router} from 'express';

const router = Router();

  router.get('/educationhistory', async (req, res) => {
    try {
      const educationHistory = [
        {
            schoolName: "SIT",
            degreeEarned: "none",
            numberOfYearsAttended: 1,
            favoriteClasses: ["CS546", "CS548"],
            favoriteSchoolMemory: "Working out"
        }
      ];
      return res.json(educationHistory);
    } catch (error) {
        res.status(500).send(e);
    }
  });
  
  export default router;