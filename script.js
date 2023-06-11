const gameCanvas = document.getElementById('gameCanvas');
const context = gameCanvas.getContext("2d");
const targetImg = new Image();
targetImg.src = 'target.png';
var appreranceWidth = gameCanvas.getBoundingClientRect().width;
var appreranceHeight = gameCanvas.getBoundingClientRect().height;
var game;
var prompts = [
  "Establish a Structured Routine: Create a consistent and structured schedule for studying. Establish specific times for homework, breaks, and other activities to provide a sense of predictability and organization",
  "Break Tasks into Manageable Chunks: Help your child break down their study material into smaller, more manageable tasks. This makes the workload less overwhelming and allows them to focus on one task at a time.",
  "Use Visual Aids and Organizers: Visual aids, such as color-coded folders, highlighters, and sticky notes, can help organize information and make it more engaging. Encourage your child to use calendars, planners, or electronic reminders to keep track of assignments, deadlines, and study sessions.",
  "Provide a Distraction-Free Environment: Minimize distractions in the study area. Create a quiet and clutter-free space with minimal visual and auditory distractions. If needed, consider noise-canceling headphones or background music designed for focus.",
  "Utilize Multisensory Learning: Engage multiple senses during studying to enhance focus and retention. Encourage your child to read aloud, highlight important information, draw diagrams, or use hands-on activities to reinforce learning.",
  "Incorporate Movement Breaks: Allow for short movement breaks during study sessions. Physical activity can help reduce restlessness and improve focus. Encourage your child to take short breaks to stretch, do light exercises, or engage in activities like jumping jacks or yoga poses.",
  "Use Timers and Time-Management Techniques: Set timers for study sessions and breaks to create a sense of structure and help manage time effectively. Techniques like the Pomodoro Technique, where study periods are divided into 25-minute intervals with short breaks in between, can be particularly helpful.",
  "Provide Positive Reinforcement: Recognize and reward your child's efforts and achievements. Praise their progress, completion of tasks, and adherence to study routines. Positive reinforcement can motivate and boost their confidence.",
  "Seek Support and Collaboration: Maintain open communication with your child's teachers and school support staff. Collaborate with them to develop strategies and accommodations that can facilitate learning in the classroom. Consider enlisting the help of tutors or academic support programs if necessary.",
  "Encourage Healthy Lifestyle Habits: Ensure your child gets enough sleep, follows a balanced diet, and engages in regular physical activity. These lifestyle factors can positively impact attention, focus, and overall well-being."
];

class Game
{
  constructor() 
  {
    this.size = {x: 100, y: 100};
    this.width = targetImg.width;
    this.height = targetImg.height;
    this.Image = targetImg;
    this.scoreMult = 1;
    this.reset();
  }

  reset()
  {
    this.x = (gameCanvas.width/2 - (this.size.x/2));
    this.y = (gameCanvas.height/2 - (this.size.y/2));
    this.countdown = 100-this.scoreMult*8;
    this.playing = false;
    this.scoreMult = 0;
    this.clickDistance = 69;
    this.score = 0;
    this.lives = 5;
  }

  drawTarget()//draws target on x, y positions
  {
    context.drawImage(this.Image, this.x, this.y, this.size.x, this.size.y);
  }

  targetDistance(clickX, clickY)
  {
    this.clickDistance = Math.sqrt(Math.pow((this.x + this.size.x/2) - clickX, 2) + Math.pow((this.y + this.size.y/2) - clickY, 2));
  }

  targetHit() //if target is hit, score goes up by 1 and target is moved
  {
    if (this.playing == true)
    {
      if(this.clickDistance < this.size.x/6)
      {
        this.score+=5;
        this.targetMove();
        this.countdown = 100 - this.scoreMult*7;
      }

      else if(this.clickDistance < this.size.x/3)
      {
        this.score+=2;
        this.targetMove();
        this.countdown = 100 - this.scoreMult*7;
      }

      else if(this.clickDistance < this.size.x/2)
      {
        this.score+=1;
        this.targetMove();
        this.countdown = 100 - this.scoreMult*7;
      }

      else 
      {
        this.lives--;
      }
    }

    if (this.score >= (this.scoreMult + 1)*20)
    {
      clearInterval(game);
      document.getElementById("score").innerHTML = ("Score: " + t.score);
      document.getElementById("prompt").style.display = "inline-block";
      document.getElementById("continue").style.display = "inline-block";
      document.getElementById("promptText").innerHTML = prompts[Math.floor(Math.random()*9)];
      this.countdown = 100 - this.scoreMult*7;
      this.scoreMult ++;

    }

  }

  playerDie()
  {
    if (this.lives <=0)
    {
      clearInterval(game);
      document.getElementById("back").style.display = "inline-block";
      document.getElementById("lose").style.display = "inline-block";
      document.getElementById("restart").style.display = "inline-block";
    }
  }

  targetTick()//counts down time until position needs to be changed
  {
    if(this.playing == true)
    {
      if (this.countdown <= 0)
      {
        this.countdown = 100 - this.scoreMult*7;
        this.lives--;
        this.targetMove();
      }
      this.countdown--;
    }
  }

  targetMove()//randomly moves the target
  {
    this.x = (Math.random() * (gameCanvas.width - this.size.x));
    this.y = (Math.random() * (gameCanvas.height - this.size.y));
  }

}

const t = new Game(); //creates instance of class

function back()
{
  clearInterval(game);
  document.getElementById("menu").style.display = "block";
  document.getElementById("play").style.display = "block";
  document.getElementById("instructions").style.display = "block";
  document.getElementById("back").style.display = "none";
  document.getElementById("iBox").style.display = "none";
  document.getElementById("gameCanvas").style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("score").style.display = "none";
  document.getElementById("lives").style.display = "none";
  document.getElementById("lose").style.display = "none";
  document.getElementById("prompt").style.display = "none";
  document.getElementById("continueB").style.display = "none";
  console.log("code is running);
  t.reset();
}
function play()
{
  context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  document.getElementById("start").style.display = "none";
  document.getElementById("score").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("start").style.display = "inline-block";
  document.getElementById("gameCanvas").style.display = "block";
  document.getElementById("back").style.display = "inline-block";
}

function start()
{
  t.playing = true;
  document.getElementById("start").style.display = "none";
  
  document.getElementById("score").style.display = "inline-block";
  document.getElementById("lives").style.display = "inline-block";
  game = setInterval(() => //gameloop
  {
    appreranceWidth = gameCanvas.getBoundingClientRect().width;
    appreranceHeight = gameCanvas.getBoundingClientRect().height;

    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    t.targetTick();
    t.drawTarget();
    t.playerDie();
    document.getElementById("score").innerHTML = ("Score: " + t.score);
    document.getElementById("lives").innerHTML = ("Lives: " + t.lives);
  }, 20);
  
}

function restart()
{
  document.getElementById("restart").style.display = "none";
  document.getElementById("lose").style.display = "none";
  document.getElementById("score").style.display = "inline-block";
  document.getElementById("lives").style.display = "inline-block";
  t.reset();
  t.playing = true;
  game = setInterval(() => //gameloop
  {
    appreranceWidth = gameCanvas.getBoundingClientRect().width;
    appreranceHeight = gameCanvas.getBoundingClientRect().height;

    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    t.targetTick();
    t.drawTarget();
    t.playerDie();
    document.getElementById("score").innerHTML = ("Score: " + t.score);
    document.getElementById("lives").innerHTML = ("Lives: " + t.lives);
  }, 20);
}

function continueB()
{
  t.playing = true;
  document.getElementById("continue").style.display = "none";
  document.getElementById("prompt").style.display = "none";
  game = setInterval(() => //gameloop
  {
    appreranceWidth = gameCanvas.getBoundingClientRect().width;
    appreranceHeight = gameCanvas.getBoundingClientRect().height;

    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    t.targetTick();
    t.drawTarget();
    t.playerDie();
    document.getElementById("score").innerHTML = ("Score: " + t.score);
    document.getElementById("lives").innerHTML = ("Lives: " + t.lives);
  }, 20);
}

function instructions()
{
  document.getElementById("play").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("iBox").style.display = "block";
  document.getElementById("back").style.display = "inline-block";
}
document.getElementById("gameCanvas").addEventListener("click",function(event)
{
  var xPos = (event.clientX - gameCanvas.offsetLeft)/appreranceWidth*gameCanvas.width;
  var yPos = (event.clientY - gameCanvas.offsetTop)/appreranceHeight*gameCanvas.height;
  t.targetDistance(xPos, yPos);
  t.targetHit();
});


