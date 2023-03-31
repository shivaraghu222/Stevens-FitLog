import {Router} from 'express';

const router = Router();
router.get('/aboutme', async (req, res) => {

    try {
      const aboutMe = {
        firstName: "Yiju",
        lastName: "Hao",
        biography: "This is my biography \n but I don't know what to put here).",
        favoriteMovies: ["Spiderman", "The God Father", "Inception", "Life of Pi"],
        hobbies: ["Playing soccer", "Singing", "Playing video games"],
        fondestMemory: "first kiss"
      };
      
      return res.json(aboutMe);
    } catch (error) {
        res.status(500).send(e);
    }
  });
  

  router.get('/mystory', async (req, res) => {
    try {
      const myStory = {
        storyTitle: "Working on Lab05",
        storyGenre: "biographical",
        story: "I opened up the lab05 spec, and downloaded the starting code. \n I Didn't know where to start, so I looked up in the git repo, and I figured out how to do it real quick. \n I first wrote /aboutme, then /educationHistory. \n Now I come back here to write my last sentence of this lab."
      };

      return res.json(myStory);
    } catch (error) {
        res.status(500).send(e);
    }
  });
  
 
  router.get('/educationhistory', async (req, res) => {
    try {
      const educationHistory = [
        {
          schoolName: "DongBeiShiDaFuZhong",
          degreeEarned: "H.S. Diploma",
          numberOfYearsAttended: 3,
          favoriteClasses: ["Maths", "Phyics", "Chinese"],
          favoriteSchoolMemory: "Dating"
        }, 

        {
            schoolName: "Rose-Hulman Institute of Technology",
            degreeEarned: "Bachelor of Science",
            numberOfYearsAttended: 4,
            favoriteClasses: ["Real Analysis", "Linear Algebra", "Object Oriented Programming"],
            favoriteSchoolMemory: "Eating"
        }, 

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