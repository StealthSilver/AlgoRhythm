export type StudentTestimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
};

export const studentTestimonials: StudentTestimonial[] = [
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "CS sophomore · IIT Delhi",
    quote:
      "Watching pointers move step-by-step finally made linked lists click. I stopped memorizing and started understanding.",
    initials: "PS",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "Bootcamp graduate · Seattle",
    quote:
      "The visualizer turned interview prep from panic into practice. I could replay tricky parts until they felt natural.",
    initials: "MC",
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    role: "Self-taught developer · Madrid",
    quote:
      "I tried videos and textbooks for months. AlgoRhythm was the first place where recursion actually made sense.",
    initials: "ER",
  },
  {
    id: "james-okonkwo",
    name: "James Okonkwo",
    role: "CS junior · University of Lagos",
    quote:
      "Custom inputs let me break algorithms on purpose. That is when I learned what each line of code is really doing.",
    initials: "JO",
  },
  {
    id: "sophie-martin",
    name: "Sophie Martin",
    role: "High school student · Lyon",
    quote:
      "Sorting used to feel like magic tricks. Now I can explain every swap and compare like I am walking through it myself.",
    initials: "SM",
  },
  {
    id: "arjun-patel",
    name: "Arjun Patel",
    role: "SWE intern · Bangalore",
    quote:
      "The complexity breakdowns paired with live execution helped me connect Big O notation to real runtime behavior.",
    initials: "AP",
  },
  {
    id: "nina-kowalski",
    name: "Nina Kowalski",
    role: "Grad student · Warsaw",
    quote:
      "Graph traversals finally felt tangible. Seeing the queue and visited set update live removed weeks of confusion.",
    initials: "NK",
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "Career switcher · Austin",
    quote:
      "I rebuilt my study routine around stepping through code. It is slower at first, but the retention is unmatched.",
    initials: "DK",
  },
  {
    id: "amira-hassan",
    name: "Amira Hassan",
    role: "CS freshman · Cairo University",
    quote:
      "Binary search went from a formula I copied to a process I can trace. That confidence carried into my exams.",
    initials: "AH",
  },
  {
    id: "lucas-ferreira",
    name: "Lucas Ferreira",
    role: "Competitive programmer · São Paulo",
    quote:
      "Even after solving problems for years, the step controls helped me spot inefficiencies I had been overlooking.",
    initials: "LF",
  },
  {
    id: "hannah-brooks",
    name: "Hannah Brooks",
    role: "Teaching assistant · Toronto",
    quote:
      "I recommend this to every student who says they understand the code but cannot explain the algorithm out loud.",
    initials: "HB",
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    role: "CS senior · Tokyo Institute of Technology",
    quote:
      "Dynamic programming stopped feeling like guesswork once I could watch the table fill cell by cell.",
    initials: "YT",
  },
];

export const totalStudentTestimonials = studentTestimonials.length;
