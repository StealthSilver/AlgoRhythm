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
    quote: "Step-by-step pointers made linked lists finally click.",
    initials: "PS",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "Bootcamp graduate · Seattle",
    quote: "Replaying steps turned interview prep from panic into practice.",
    initials: "MC",
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    role: "Self-taught developer · Madrid",
    quote: "The first place where recursion actually made sense.",
    initials: "ER",
  },
  {
    id: "james-okonkwo",
    name: "James Okonkwo",
    role: "CS junior · University of Lagos",
    quote: "Custom inputs let me see what each line is really doing.",
    initials: "JO",
  },
  {
    id: "sophie-martin",
    name: "Sophie Martin",
    role: "High school student · Lyon",
    quote: "I can explain every swap now—sorting isn't magic anymore.",
    initials: "SM",
  },
  {
    id: "arjun-patel",
    name: "Arjun Patel",
    role: "SWE intern · Bangalore",
    quote: "Live execution made Big O connect to real runtime behavior.",
    initials: "AP",
  },
  {
    id: "nina-kowalski",
    name: "Nina Kowalski",
    role: "Grad student · Warsaw",
    quote: "Watching the queue update live cleared weeks of graph confusion.",
    initials: "NK",
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "Career switcher · Austin",
    quote: "Stepping through code is slower, but retention is unmatched.",
    initials: "DK",
  },
  {
    id: "amira-hassan",
    name: "Amira Hassan",
    role: "CS freshman · Cairo University",
    quote: "Binary search went from copied formula to something I can trace.",
    initials: "AH",
  },
  {
    id: "lucas-ferreira",
    name: "Lucas Ferreira",
    role: "Competitive programmer · São Paulo",
    quote: "Step controls helped me spot inefficiencies I'd overlooked.",
    initials: "LF",
  },
  {
    id: "hannah-brooks",
    name: "Hannah Brooks",
    role: "Teaching assistant · Toronto",
    quote: "For anyone who gets the code but can't explain the algorithm.",
    initials: "HB",
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    role: "CS senior · Tokyo Institute of Technology",
    quote: "Watching the DP table fill cell by cell ended the guesswork.",
    initials: "YT",
  },
];

export const totalStudentTestimonials = studentTestimonials.length;
