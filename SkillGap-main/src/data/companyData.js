// Comprehensive database of 20+ target companies and salary group benchmarks.
// Fully differentiated, accurate skills, interview rounds, ATS models, and tailored roadmaps.

export const TARGET_COMPANIES = [
  // ─── 🏢 Big Tech & Product Giants ─────────────────────────────────────
  {
    id: 'amazon',
    name: 'Amazon',
    badge: 'Big Tech / Cloud & E-Commerce',
    category: 'Big Tech',
    categoryGroup: '🏢 Big Tech',
    logo: '🛒',
    roles: [
      {
        id: 'amazon-sde1',
        title: 'Software Development Engineer I (SDE-1)',
        salary: '₹28 - 44 LPA',
        salaryOptions: ['₹25 - 32 LPA', '₹32 - 40 LPA', '₹40 - 48 LPA', '₹50 LPA+'],
        overview: 'Build highly scalable distributed services across AWS, Prime, and Retail processing millions of TPS.',
        jobDescription: `Position: Software Development Engineer I (SDE-1)
Location: Bangalore / Hyderabad / Chennai / Delhi-NCR

About the Role:
Amazon is looking for passionate Software Development Engineers to build the next generation of scalable cloud computing and e-commerce platforms. You will design, build, and deploy low-latency, fault-tolerant microservices running on AWS.

Key Responsibilities:
- Design and develop robust services using Java/C++, Go, or Python.
- Translate requirements into clean Object-Oriented Design (LLD) following SOLID principles and design patterns.
- Optimize high-throughput APIs, NoSQL databases (DynamoDB), and asynchronous message queues (SQS, SNS, Kafka).
- Demonstrate Amazon Leadership Principles (Customer Obsession, Ownership, Bias for Action, Dive Deep).`,
        atsBaseline: 72,
        matchedKeywords: ['Java', 'C++', 'Data Structures', 'REST APIs', 'Git', 'HTML5 & CSS3', 'Node.js', 'SQL'],
        missingKeywords: ['AWS DynamoDB & Lambda', 'Low-Level Design (SOLID)', 'Amazon Leadership Principles', 'Concurrency & Multi-threading', 'Microservices Architecture', 'Graph & DP Algorithms', 'Distributed Caching (Redis)'],
        skillsHave: [
          { name: 'Core Java / C++', level: 'Advanced' },
          { name: 'Basic Data Structures (Arrays/Strings)', level: 'Intermediate' },
          { name: 'REST API Design', level: 'Intermediate' },
          { name: 'Version Control (Git/GitHub)', level: 'Proficient' },
          { name: 'SQL & Database Queries', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Low-Level Design (LLD / OOD)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Class diagrams, Design Patterns (Factory, Strategy, Observer), SOLID principles.' },
          { name: 'Amazon Leadership Principles (LP)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: '14 LPs formatted in STAR method for Behavioral & Bar Raiser rounds.' },
          { name: 'Advanced DSA (Graphs & DP)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Topological sort, Dijkstra, 0/1 Knapsack, Memoization, Trees traversals.' },
          { name: 'AWS Cloud Services (S3, Lambda, SQS)', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Cloud infrastructure, serverless compute, message brokering.' },
          { name: 'Distributed Systems & Concurrency', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Thread safety, locks, caching strategies, rate limiting.' }
        ],
        matchScores: [
          { label: 'Technical Problem Solving (DSA)', value: 65, color: 'yellow' },
          { label: 'Object-Oriented Design (LLD)', value: 50, color: 'red' },
          { label: 'Web & Backend Development', value: 80, color: 'green' },
          { label: 'Resume ATS Alignment', value: 72 },
          { label: 'Amazon Behavioral (LP/STAR)', value: 45, color: 'red' }
        ],
        interviewRounds: [
          'Round 1: Online Assessment (OA) — 2 LeetCode Medium/Hard DSA questions + Work Style Survey',
          'Round 2: Technical Interview 1 — Data Structures, Tree/Graph Traversal & 1 Leadership Principle',
          'Round 3: Technical Interview 2 — Object-Oriented Design (LLD) & 2 Leadership Principles',
          'Round 4: Bar Raiser — Deep Dive on System Architecture & Leadership Principles (Customer Obsession/Ownership)'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: DSA Mastery & Amazon Core DS',
            title: 'Master Amazon LeetCode Patterns',
            tasks: [
              { id: 't1', label: 'Solve Top 50 Amazon Tagged Questions (Arrays, HashMaps, Two Pointers)', done: false },
              { id: 't2', label: 'Master Trees (LCA, Tree Diameter, Binary Tree Zigzag Traversal)', done: false },
              { id: 't3', label: 'Graphs: BFS, DFS, Number of Islands, Word Ladder, Topological Sort', done: false },
              { id: 't4', label: 'Prepare 5 STAR stories mapped to Amazon Leadership Principles', done: false }
            ]
          },
          {
            id: 'm2',
            month: 'Month 2: Object-Oriented Design (LLD) & Backend',
            title: 'Low-Level Design & AWS Foundations',
            tasks: [
              { id: 't5', label: 'Implement SOLID principles and 6 GoF Design Patterns in Java/C++', done: false },
              { id: 't6', label: 'Design Parking Lot, Elevator System, and Amazon Locker System (LLD)', done: false },
              { id: 't7', label: 'Build and deploy a REST microservice utilizing AWS S3 and DynamoDB', done: false },
              { id: 't8', label: 'Practice Dynamic Programming (Coin Change, Longest Increasing Subsequence)', done: false }
            ]
          },
          {
            id: 'm3',
            month: 'Month 3: Mock Interviews & Bar Raiser Prep',
            title: 'Full Simulation & Application Sprint',
            tasks: [
              { id: 't9', label: 'Take 4 Pramp/Peer Mock Interviews under 45-min Amazon timer constraints', done: false },
              { id: 't10', label: 'Complete STAR script for all 14 Amazon Leadership Principles', done: false },
              { id: 't11', label: 'Reach out to 15 Amazon SDEs and Recruiters for Employee Referrals on LinkedIn', done: false }
            ]
          }
        ]
      },
      {
        id: 'amazon-sde-intern',
        title: 'SDE Intern (Summer / 6-Month)',
        salary: '₹80,000 - ₹1,10,000 / month',
        salaryOptions: ['₹60k - 80k/mo', '₹80k - 1.1L/mo', '₹1.1L - 1.3L/mo'],
        overview: 'Fast-track path to full-time SDE-1 PPO. High emphasis on coding fluency and CS fundamentals.',
        jobDescription: `Position: Software Development Engineer Intern
Location: Bangalore / Hyderabad

Requirements:
- Enrolled in B.Tech/B.E./M.Tech graduating in 2025/2026.
- Proficiency in Java, C++, or Python.
- Strong command over Data Structures, Sorting, Searching, and Recursion.`,
        atsBaseline: 76,
        matchedKeywords: ['Data Structures', 'C++ / Java', 'OOP', 'Git', 'Algorithms'],
        missingKeywords: ['Time/Space Complexity Optimization', 'Binary Search Variants', 'Graph Traversal (BFS/DFS)', 'Clean Code / Modular Design'],
        skillsHave: [
          { name: 'Core Language (C++/Java/Python)', level: 'Intermediate' },
          { name: 'Basic Data Structures', level: 'Intermediate' },
          { name: 'Git & Linux Basics', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Medium DSA (Trees, Heaps, BFS/DFS)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Required for clearing the 2-question OA and technical rounds.' },
          { name: 'DBMS & SQL Query Optimization', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Core CS interview questions (Joins, Indexing, ACID, Normalization).' },
          { name: 'Operating Systems & Concurrency', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Processes vs Threads, Deadlocks, Virtual Memory.' }
        ],
        matchScores: [
          { label: 'DSA & Coding Fluency', value: 70, color: 'yellow' },
          { label: 'Core CS (OS/DBMS/CN)', value: 60, color: 'yellow' },
          { label: 'Projects & Coding Practice', value: 75, color: 'green' },
          { label: 'Resume ATS Score', value: 76 }
        ],
        interviewRounds: [
          'Round 1: Amazon Debugging & Coding OA (HackerRank)',
          'Round 2: Technical Interview (DSA + Project Discussion)',
          'Round 3: Technical + Culture Fit / LP Interview'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Fast-Track DSA',
            title: 'Core DSA Foundations',
            tasks: [
              { id: 't1', label: 'Solve 60 LeetCode Easy & Medium problems (Arrays, Strings, Stacks, Queues)', done: false },
              { id: 't2', label: 'Master Binary Trees, BSTs, and Recursion', done: false }
            ]
          },
          {
            id: 'm2',
            month: 'Month 2: Graphs, DBMS & Projects',
            title: 'Advanced DSA & Project Polish',
            tasks: [
              { id: 't3', label: 'Graph Algorithms (BFS, DFS, Dijkstra) and Dynamic Programming Basics', done: false },
              { id: 't4', label: 'SQL Practice on LeetCode: Top 25 SQL questions (Subqueries, Window Functions)', done: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'google',
    name: 'Google',
    badge: 'Search / Distributed Systems / AI',
    category: 'Big Tech',
    categoryGroup: '🏢 Big Tech',
    logo: '🔍',
    roles: [
      {
        id: 'google-swe',
        title: 'Software Engineer (SWE - University Grad)',
        salary: '₹35 - 55 LPA',
        salaryOptions: ['₹30 - 38 LPA', '₹38 - 48 LPA', '₹48 - 60 LPA', '₹60 LPA+'],
        overview: 'Work on billion-user global services across Search, YouTube, Cloud, Android, and Gemini AI infrastructure.',
        jobDescription: `Position: Software Engineer (SWE - Early Career)
Location: Bangalore / Hyderabad / Pune

About the Role:
Google engineers develop next-generation technologies. Our engineering culture values scalable algorithms, elegant code, and deep problem-solving skills without relying on memorized patterns.

Requirements:
- Strong knowledge of Data Structures (Segment Trees, Trie, Disjoint Set Union, Flow Networks, Graphs).
- Deep understanding of asymptotic notation, cache locality, and memory footprints.
- Experience with C++, Java, Go, or Python.`,
        atsBaseline: 66,
        matchedKeywords: ['C++ / Java', 'Data Structures & Algorithms', 'Git', 'Linux / Bash', 'OOP', 'Mathematics'],
        missingKeywords: ['Advanced Graph Algorithms (Bridges, SCC, Flow)', 'Segment Trees & Fenwick Trees', 'Dynamic Programming on Trees & Bitmask DP', 'System Concurrency & Memory Models', 'Google C++ Style Guide', 'Go / Modern C++20'],
        skillsHave: [
          { name: 'Core Language Fundamentals (C++/Java)', level: 'Advanced' },
          { name: 'Standard DSA (Sorting, Binary Search)', level: 'Intermediate' },
          { name: 'Basic Tree Traversals', level: 'Intermediate' },
          { name: 'Git & Version Control', level: 'Proficient' }
        ],
        skillsNeed: [
          { name: 'Hard Algorithmic Problem Solving', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Google interviews strictly focus on LeetCode Hard & novel algorithmic twists.' },
          { name: 'Advanced Dynamic Programming (Trees/Bitmasks)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Optimizing state spaces and handling multi-dimensional subproblems.' },
          { name: 'Disjoint Set Union (DSU) & Segment Trees', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Range query data structures and connected components optimization.' },
          { name: 'Googleyness & Collaborative Leadership', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Humility, intellectual curiosity, navigating ambiguity, collaborative problem solving.' }
        ],
        matchScores: [
          { label: 'Algorithmic Problem Solving (DSA Hard)', value: 50, color: 'red' },
          { label: 'Clean Code & Google Style', value: 65, color: 'yellow' },
          { label: 'System Architecture & Concurrency', value: 55, color: 'yellow' },
          { label: 'Resume ATS Match', value: 66 },
          { label: 'Googleyness & Culture Fit', value: 70, color: 'green' }
        ],
        interviewRounds: [
          'Round 1: Screening Technical Interview (45 min) — LeetCode Medium/Hard Problem Solving on Google Docs',
          'Round 2: Virtual Onsite Round 1 (45 min) — Advanced Graph / Tree Algorithms',
          'Round 3: Virtual Onsite Round 2 (45 min) — Dynamic Programming & Edge Case Handling',
          'Round 4: Virtual Onsite Round 3 (45 min) — Complex Data Structures & Clean Code',
          'Round 5: Googleyness & Leadership Round (45 min) — Behavioral & Ethical Situations'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Deep Algorithmic Foundations',
            title: 'Hard Data Structures & Complexity Rigor',
            tasks: [
              { id: 't1', label: 'Solve 40 LeetCode Medium/Hard graph problems (Tarjan, Bridges, Dijkstra)', done: false },
              { id: 't2', label: 'Implement DSU (Disjoint Set Union) and Segment Trees from scratch', done: false }
            ]
          },
          {
            id: 'm2',
            month: 'Month 2: Advanced DP & Concurrency',
            title: 'Dynamic Programming & Multi-threading',
            tasks: [
              { id: 't3', label: 'Master DP on Trees, Digit DP, and Bitmask Dynamic Programming', done: false },
              { id: 't4', label: 'Solve 30 Google-tagged interview questions from past 6 months', done: false }
            ]
          }
        ]
      },
      {
        id: 'google-sre',
        title: 'Site Reliability Engineer (SRE)',
        salary: '₹32 - 50 LPA',
        salaryOptions: ['₹28 - 36 LPA', '₹36 - 46 LPA', '₹46 - 55 LPA'],
        overview: 'Apply software engineering to production reliability, Kubernetes, networking, and distributed systems operations.',
        jobDescription: `Position: Site Reliability Engineer (SRE)
Requirements: Strong Linux kernel internals, networking (TCP/IP, BGP), Go/Python scripting, and distributed systems debugging.`,
        atsBaseline: 68,
        matchedKeywords: ['Linux', 'Python', 'Networking Basics', 'Git', 'Data Structures'],
        missingKeywords: ['Linux Kernel Internals', 'Kubernetes & Containers', 'Distributed Tracing & Prometheus', 'TCP/IP Packet Analysis'],
        skillsHave: [
          { name: 'Python Scripting', level: 'Advanced' },
          { name: 'Basic Linux / Bash', level: 'Intermediate' },
          { name: 'Networking Concepts', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Linux System Internals & Troubleshooting', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Processes, memory, signals, file systems, strace, gdb.' },
          { name: 'Networking (TCP/IP, DNS, HTTP/3)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Deep dive into socket programming, congestion control, latency.' },
          { name: 'System Design for Reliability & Scale', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'SLIs/SLOs, circuit breakers, load balancing, fault domains.' }
        ],
        matchScores: [
          { label: 'Linux & Systems Programming', value: 60, color: 'yellow' },
          { label: 'Algorithms & Scripting', value: 75, color: 'green' },
          { label: 'Networking & Infrastructure', value: 55, color: 'yellow' },
          { label: 'ATS Score', value: 68 }
        ],
        interviewRounds: [
          'Round 1: Coding & Scripting (Python/Go/C++)',
          'Round 2: Systems & Linux Internals Troubleshooting',
          'Round 3: Networking Deep Dive',
          'Round 4: Non-Abstract Large Scale System Design (NALSD)',
          'Round 5: Googleyness & Leadership'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Linux & Systems Mastery',
            title: 'Kernel Internals & Tooling',
            tasks: [
              { id: 't1', label: 'Study Linux processes, virtual memory, and file descriptors', done: false },
              { id: 't2', label: 'Master networking protocols (TCP handshake, SSL/TLS, DNS)', done: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    badge: 'Enterprise Cloud / OS / AI',
    category: 'Big Tech',
    categoryGroup: '🏢 Big Tech',
    logo: '🪟',
    roles: [
      {
        id: 'ms-swe-newgrad',
        title: 'Software Engineer (SWE - New Grad L59/60)',
        salary: '₹26 - 42 LPA',
        salaryOptions: ['₹22 - 28 LPA', '₹28 - 36 LPA', '₹36 - 45 LPA'],
        overview: 'Build next-gen cloud services in Azure, Microsoft 365, Teams, and Copilot AI platforms.',
        jobDescription: `Position: Software Engineer (University Graduate)
Location: Hyderabad / Bangalore / Noida

About the Role:
Microsoft engineers create products that empower every person and organization on the planet. You will build highly scalable cloud microservices, develop clean algorithms, and work with C#, C++, Java, or TypeScript.

Requirements:
- Strong problem solving in Data Structures (Trees, Graphs, DP, Linked Lists).
- Sound understanding of Object-Oriented Principles, System Design, and Concurrency.
- Excellent communication and collaboration mindset.`,
        atsBaseline: 74,
        matchedKeywords: ['C# / C++ / Java', 'Data Structures', 'OOP', 'SQL', 'Git', 'REST APIs'],
        missingKeywords: ['Azure Cloud Architecture', 'Low-Level Design Patterns', 'Multithreading & Async Programming', 'Unit Testing & CI/CD Pipelines'],
        skillsHave: [
          { name: 'Object-Oriented Programming (Java/C++)', level: 'Advanced' },
          { name: 'Core Data Structures', level: 'Intermediate' },
          { name: 'Database Fundamentals (SQL)', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'DSA - Binary Trees, BSTs & Graphs', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Microsoft interviews heavily test trees, recursion, and graph BFS/DFS.' },
          { name: 'Object-Oriented Design & Design Patterns', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Factory, Singleton, Observer, and SOLID principles in practice.' },
          { name: 'System Design Basics & Concurrency', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Multithreading, async/await, API rate limiters, load balancers.' }
        ],
        matchScores: [
          { label: 'DSA & Coding Ability', value: 72, color: 'green' },
          { label: 'OOP & Software Design', value: 65, color: 'yellow' },
          { label: 'Core CS (OS & DBMS)', value: 75, color: 'green' },
          { label: 'Resume ATS Alignment', value: 74 }
        ],
        interviewRounds: [
          'Round 1: Microsoft Codility OA (2-3 DSA questions)',
          'Round 2: Technical Interview 1 — Tree/Graph Algorithms & Code Quality',
          'Round 3: Technical Interview 2 — LLD, Data Structures & Resume Projects',
          'Round 4: AA (As Appropriate / Partner Manager) — Architecture & Culture Fit'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Microsoft LeetCode Patterns',
            title: 'Trees, Linked Lists & Strings',
            tasks: [
              { id: 't1', label: 'Solve Top 50 Microsoft-tagged questions on LeetCode', done: false },
              { id: 't2', label: 'Implement 6 GoF Design Patterns with clean class diagrams', done: false }
            ]
          }
        ]
      },
      {
        id: 'ms-swe-intern',
        title: 'SWE Intern (Summer / 6-Month)',
        salary: '₹80,000 - ₹1,00,000 / month',
        salaryOptions: ['₹75k - 90k/mo', '₹90k - 1.1L/mo'],
        overview: 'Internship opportunity for 2025/2026 batches with direct PPO conversion path.',
        jobDescription: `Position: Software Engineering Intern
Requirements: Enrolled in pre-final year engineering. Strong problem-solving, OOPS, and CS fundamentals.`,
        atsBaseline: 78,
        matchedKeywords: ['C++ / Java / Python', 'Data Structures', 'OOP', 'Git'],
        missingKeywords: ['Tree Traversals & BST Operations', 'Dynamic Programming Fundamentals', 'Clean Code Practices'],
        skillsHave: [
          { name: 'Core Language Fundamentals', level: 'Intermediate' },
          { name: 'Basic Algorithms', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Trees, Recursion & Stacks', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Core focus of Microsoft intern rounds.' },
          { name: 'OOPs Concepts & Real-life Examples', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Explain encapsulation, polymorphism, abstraction with live code.' }
        ],
        matchScores: [
          { label: 'DSA & Logic', value: 75, color: 'green' },
          { label: 'OOP Concepts', value: 80, color: 'green' },
          { label: 'ATS Alignment', value: 78 }
        ],
        interviewRounds: [
          'Round 1: Codility Online Assessment',
          'Round 2: Technical Interview (DSA + CS Fundamentals)',
          'Round 3: Final Tech + Managerial Round'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Tree & Recursion Mastery',
            title: 'Microsoft Intern Focus',
            tasks: [
              { id: 't1', label: 'Solve 40 Binary Tree & BST questions on LeetCode', done: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'adobe',
    name: 'Adobe',
    badge: 'Creative Cloud / Document Tech / AI',
    category: 'Big Tech',
    categoryGroup: '🏢 Big Tech',
    logo: '🔴',
    roles: [
      {
        id: 'adobe-mts',
        title: 'Member of Technical Staff (MTS-1)',
        salary: '₹25 - 40 LPA',
        salaryOptions: ['₹22 - 28 LPA', '₹28 - 35 LPA', '₹35 - 45 LPA'],
        overview: 'Build high-performance graphics engines, PDF technologies, and Firefly Generative AI systems.',
        jobDescription: `Position: Member of Technical Staff 1 (MTS-1)
Location: Noida / Bangalore

Responsibilities:
- Develop algorithms for graphics rendering, distributed document processing, and cloud services in C++, Java, or JavaScript/WebAssembly.
- Optimize high-throughput microservices and data pipelines.`,
        atsBaseline: 70,
        matchedKeywords: ['C++ / Java', 'Data Structures', 'OOP', 'Algorithms', 'Git'],
        missingKeywords: ['Advanced DSA (Segment Trees, Trie, Graph DP)', 'Modern C++ (Smart Pointers, Memory Management)', 'Low-Level Graphics / Performance Optimization'],
        skillsHave: [
          { name: 'C++ / Java Programming', level: 'Advanced' },
          { name: 'Core Data Structures', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Advanced DSA (Tries, DP, Trees)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Adobe tests challenging Trie, DP, and String Matching algorithms.' },
          { name: 'Memory Management & Modern C++', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Pointers, RAII, move semantics, memory leaks.' }
        ],
        matchScores: [
          { label: 'Algorithms & Data Structures', value: 68, color: 'yellow' },
          { label: 'Language Depth (C++/Java)', value: 75, color: 'green' },
          { label: 'ATS Baseline', value: 70 }
        ],
        interviewRounds: [
          'Round 1: Adobe Online Assessment (Aptitude + 2 DSA coding questions)',
          'Round 2: Technical Interview 1 (DSA & Pointers/Memory)',
          'Round 3: Technical Interview 2 (System Design / LLD)',
          'Round 4: Director / HR Round'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Trie, Strings & DP',
            title: 'Adobe Algorithmic Core',
            tasks: [
              { id: 't1', label: 'Solve 30 Adobe-tagged LeetCode problems (Trie, Word Break, DP)', done: false }
            ]
          }
        ]
      },
      {
        id: 'adobe-intern',
        title: 'Research / Software Intern',
        salary: '₹75,000 - ₹1,00,000 / month',
        salaryOptions: ['₹70k - 85k/mo', '₹85k - 1.0L/mo'],
        overview: 'Work alongside Adobe Research on computer vision, generative AI, or web tools.',
        jobDescription: `Position: Software Engineering Intern. Focus on algorithms, math, and data structure fluency.`,
        atsBaseline: 74,
        matchedKeywords: ['Python / C++', 'Data Structures', 'Git', 'OOP'],
        missingKeywords: ['Graph Algorithms', 'Recursion & Backtracking', 'Time/Space Analysis'],
        skillsHave: [{ name: 'C++ / Python', level: 'Intermediate' }],
        skillsNeed: [
          { name: 'Recursion, Backtracking & DP', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Standard question type for Adobe intern OA.' }
        ],
        matchScores: [{ label: 'Problem Solving', value: 74, color: 'green' }],
        interviewRounds: ['Round 1: OA', 'Round 2: Technical Interview', 'Round 3: HR'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Prep', tasks: [{ id: 't1', label: 'DSA Practice', done: false }] }]
      }
    ]
  },
  {
    id: 'oracle',
    name: 'Oracle',
    badge: 'Database / Cloud Infrastructure (OCI)',
    category: 'Big Tech',
    categoryGroup: '🏢 Big Tech',
    logo: '🔴',
    roles: [
      {
        id: 'oracle-app-eng',
        title: 'Applications Engineer',
        salary: '₹16 - 25 LPA',
        salaryOptions: ['₹14 - 18 LPA', '₹18 - 24 LPA', '₹24 LPA+'],
        overview: 'Develop enterprise cloud applications, ERP software, and high-performance Java backends.',
        jobDescription: `Position: Applications Engineer. Solid command of Java, SQL, Relational Database Internals, and REST APIs.`,
        atsBaseline: 75,
        matchedKeywords: ['Java', 'SQL', 'DBMS', 'REST APIs', 'Data Structures', 'OOP'],
        missingKeywords: ['Oracle Database Internals (Indexing, B-Trees)', 'Spring Boot Enterprise Framework', 'Advanced SQL Performance Tuning'],
        skillsHave: [
          { name: 'Core Java & OOP', level: 'Advanced' },
          { name: 'SQL & Database Queries', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Advanced SQL & Database Internals', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Oracle deeply questions indexing, transaction isolation, ACID, and complex queries.' },
          { name: 'Core Java Collections & Concurrency', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'HashMap internals, ConcurrentHashMap, threading.' }
        ],
        matchScores: [
          { label: 'Java & OOP Depth', value: 78, color: 'green' },
          { label: 'Database & SQL', value: 72, color: 'green' },
          { label: 'ATS Alignment', value: 75 }
        ],
        interviewRounds: [
          'Round 1: Oracle Online Assessment (Coding + CS Fundamentals MCQs)',
          'Round 2: Technical Interview 1 (Java Internals & DSA)',
          'Round 3: Technical Interview 2 (SQL & Database Architecture)',
          'Round 4: Managerial Round'
        ],
        roadmap: [
          { id: 'm1', month: 'Month 1', title: 'Java & SQL Focus', tasks: [{ id: 't1', label: 'Deep dive Java Collections and SQL queries', done: false }] }
        ]
      },
      {
        id: 'oracle-cloud-eng',
        title: 'Cloud Engineer (OCI - Oracle Cloud)',
        salary: '₹20 - 32 LPA',
        salaryOptions: ['₹18 - 24 LPA', '₹24 - 32 LPA'],
        overview: 'Build cloud infrastructure, hypervisors, distributed storage, and networking on OCI.',
        jobDescription: `Position: Cloud Infrastructure Engineer. Systems programming in C/C++, Go, or Python. Distributed systems experience.`,
        atsBaseline: 72,
        matchedKeywords: ['C++ / Go', 'Linux', 'Networking', 'Data Structures'],
        missingKeywords: ['Distributed Systems Architecture', 'Cloud Virtualization & Storage', 'Concurrency & Locking'],
        skillsHave: [{ name: 'Systems Programming Basics', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Distributed Systems & Storage', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Replication, consensus, block storage.' }],
        matchScores: [{ label: 'Systems & Cloud', value: 70, color: 'green' }],
        interviewRounds: ['Round 1: OA', 'Round 2: Systems Coding', 'Round 3: System Design', 'Round 4: HR'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'OCI Prep', tasks: [{ id: 't1', label: 'Learn Cloud storage & networking', done: false }] }]
      }
    ]
  },

  // ─── 🦄 Unicorns & High-Growth Product ────────────────────────────────
  {
    id: 'phonepe',
    name: 'PhonePe',
    badge: 'FinTech / High-Throughput UPI Systems',
    category: 'Unicorns',
    categoryGroup: '🦄 Unicorns & Startups',
    logo: '🟣',
    roles: [
      {
        id: 'phonepe-sde1',
        title: 'Software Engineer I (SDE-1)',
        salary: '₹24 - 38 LPA',
        salaryOptions: ['₹20 - 28 LPA', '₹28 - 36 LPA', '₹36 LPA+'],
        overview: 'Architect India’s largest payment engine handling over 150 Million daily transactions with zero downtime.',
        jobDescription: `Position: Software Engineer 1
Location: Bangalore

Requirements:
- Exceptional problem-solving and clean Machine Coding skills in Java / Go.
- Expertise in Low-Level Design (SOLID, Design Patterns, Modularity).
- Strong understanding of Database Transactions, Locking, and Idempotency.`,
        atsBaseline: 72,
        matchedKeywords: ['Java', 'Data Structures', 'REST APIs', 'SQL', 'Git', 'OOP'],
        missingKeywords: ['Machine Coding (Clean LLD in 90 mins)', 'Transactional Idempotency & ACID', 'Kafka & Asynchronous Queues', 'Redis Caching & Distributed Locks'],
        skillsHave: [
          { name: 'Java & OOP Fundamentals', level: 'Advanced' },
          { name: 'Core Data Structures', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Machine Coding (90-min Live OOP Implementation)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'PhonePe signature filter round: build complete modular apps (e.g. Splitwise, Digital Wallet, Cab Booking).' },
          { name: 'Design Patterns & SOLID Principles', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Strategy, Factory, State, Observer patterns in clean running code.' },
          { name: 'Distributed Caching & Concurrency', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Thread pools, race conditions, atomic operations, Redis.' }
        ],
        matchScores: [
          { label: 'Machine Coding & LLD', value: 55, color: 'red' },
          { label: 'DSA & Problem Solving', value: 75, color: 'green' },
          { label: 'Fintech Systems & Concurrency', value: 60, color: 'yellow' },
          { label: 'ATS Alignment', value: 72 }
        ],
        interviewRounds: [
          'Round 1: Online Assessment (3 Coding Questions on HackerEarth)',
          'Round 2: Machine Coding Round (90 min) — Code a running object-oriented system with unit tests',
          'Round 3: Problem Solving & DSA (60 min)',
          'Round 4: Engineering Manager & Cultural Fit'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Machine Coding Sprint',
            title: 'Master PhonePe Machine Coding',
            tasks: [
              { id: 't1', label: 'Implement Payment Gateway, Wallet Service, and Splitwise with clean OOP in 90 mins', done: false },
              { id: 't2', label: 'Solve 30 PhonePe-tagged DSA problems on LeetCode (DP & Trees)', done: false }
            ]
          }
        ]
      },
      {
        id: 'phonepe-backend',
        title: 'Backend Engineer (Payments & Core Banking)',
        salary: '₹26 - 40 LPA',
        salaryOptions: ['₹22 - 30 LPA', '₹30 - 40 LPA'],
        overview: 'Build high-resilience payment routing systems and merchant settlement pipelines.',
        jobDescription: `Position: Backend Engineer. High throughput Java/Go, MySQL sharding, Kafka, and Redis caching.`,
        atsBaseline: 70,
        matchedKeywords: ['Java', 'SQL', 'REST APIs', 'Git'],
        missingKeywords: ['High-Throughput Microservices', 'Kafka Event Streaming', 'MySQL Replication & Sharding'],
        skillsHave: [{ name: 'Java Backend Development', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Distributed Message Queues (Kafka)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Consumer groups, partitions, event-driven architecture.' }],
        matchScores: [{ label: 'Backend Architecture', value: 70, color: 'green' }],
        interviewRounds: ['Round 1: OA', 'Round 2: Machine Coding', 'Round 3: DSA', 'Round 4: Architecture'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Backend Mastery', tasks: [{ id: 't1', label: 'Build Kafka event pipeline', done: false }] }]
      }
    ]
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    badge: 'FinTech / Payments & Banking APIs',
    category: 'Unicorns',
    categoryGroup: '🦄 Unicorns & Startups',
    logo: '💳',
    roles: [
      {
        id: 'razorpay-sde1',
        title: 'Software Development Engineer I (SDE-1)',
        salary: '₹20 - 32 LPA',
        salaryOptions: ['₹18 - 24 LPA', '₹24 - 30 LPA', '₹30 LPA+'],
        overview: 'Build developer-first payment APIs, fraud detection systems, and payment gateway infrastructure.',
        jobDescription: `Position: SDE-1 (Payments / Core Platform)
Location: Bangalore

Requirements:
- Proficiency in Go, PHP, Python, or Java.
- Solid Low-Level Design (SOLID principles) and Clean Code.
- Strong Database modeling (PostgreSQL/MySQL) and asynchronous processing.`,
        atsBaseline: 74,
        matchedKeywords: ['Go / Java / Python', 'REST APIs', 'SQL', 'Git', 'Data Structures', 'OOP'],
        missingKeywords: ['Payment Gateway Protocol & Webhooks', 'Database Indexing & Query Plans', 'Machine Coding Architecture', 'Microservices with Go/Java'],
        skillsHave: [
          { name: 'Core Language Skills', level: 'Advanced' },
          { name: 'REST API Design', level: 'Intermediate' },
          { name: 'Relational Database Concepts', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Machine Coding (Modular LLD Architecture)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Writing clean, extensible code with design patterns and test cases.' },
          { name: 'Database Query Optimization & PostgreSQL', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Deadlocks, isolation levels, foreign key indexing, transactions.' }
        ],
        matchScores: [
          { label: 'Clean Code & Machine Coding', value: 65, color: 'yellow' },
          { label: 'DSA & Algorithms', value: 75, color: 'green' },
          { label: 'API Design & Backend', value: 80, color: 'green' },
          { label: 'ATS Alignment', value: 74 }
        ],
        interviewRounds: [
          'Round 1: Online Assessment (Coding + CS Fundamentals)',
          'Round 2: Machine Coding Round (90 min)',
          'Round 3: DSA & Architecture Round',
          'Round 4: Hiring Manager / Culture Round'
        ],
        roadmap: [
          { id: 'm1', month: 'Month 1', title: 'Razorpay Prep', tasks: [{ id: 't1', label: 'Practice clean machine coding with SOLID', done: false }] }
        ]
      },
      {
        id: 'razorpay-fullstack',
        title: 'Full Stack Engineer (Checkout & Merchant Experience)',
        salary: '₹18 - 28 LPA',
        salaryOptions: ['₹16 - 22 LPA', '₹22 - 28 LPA'],
        overview: 'Build ultra-fast Checkout SDKs and merchant analytics dashboards using React, TypeScript, and Node/Go.',
        jobDescription: `Position: Full Stack Engineer. React, Web performance (sub-second bundle size), TypeScript, and Node/Go microservices.`,
        atsBaseline: 78,
        matchedKeywords: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Node.js', 'REST APIs'],
        missingKeywords: ['SDK Architecture & Web Performance', 'State Machines & Redux Toolkit', 'Cross-browser Security (CORS, CSP)'],
        skillsHave: [{ name: 'React & Frontend Web', level: 'Advanced' }],
        skillsNeed: [{ name: 'Web Performance & Bundle Optimization', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Tree shaking, code splitting, WebAssembly, security.' }],
        matchScores: [{ label: 'Frontend & Full Stack', value: 82, color: 'green' }],
        interviewRounds: ['Round 1: Coding', 'Round 2: Frontend Machine Coding', 'Round 3: Fullstack System Design', 'Round 4: HR'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Frontend SDK Mastery', tasks: [{ id: 't1', label: 'Build a embeddable React payment checkout widget', done: false }] }]
      }
    ]
  },
  {
    id: 'zomato',
    name: 'Zomato',
    badge: 'Food Delivery / Quick Commerce (Blinkit)',
    category: 'Unicorns',
    categoryGroup: '🦄 Unicorns & Startups',
    logo: '🍕',
    roles: [
      {
        id: 'zomato-sde1',
        title: 'Software Development Engineer I (SDE-1)',
        salary: '₹22 - 34 LPA',
        salaryOptions: ['₹18 - 25 LPA', '₹25 - 34 LPA'],
        overview: 'Build real-time delivery dispatch algorithms, order tracking microservices, and live search engines.',
        jobDescription: `Position: SDE-1. Fast-paced, high ownership environment. Strong Golang, Python, or Java with real-time systems (WebSockets, Redis).`,
        atsBaseline: 73,
        matchedKeywords: ['Java / Python / Go', 'Data Structures', 'REST APIs', 'SQL', 'Git'],
        missingKeywords: ['Realtime WebSockets & Geolocation', 'Redis Geo-Spatial Indexing', 'Fast Prototyping & Machine Coding', 'Microservices Scaling'],
        skillsHave: [
          { name: 'Programming Languages', level: 'Advanced' },
          { name: 'DSA Basics', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'DSA - Graphs, Shortest Path & Heaps', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Delivery routing, matching riders, Dijkstra, A* algorithm.' },
          { name: 'Realtime Backend (WebSockets/Redis)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Live order tracking, geospatial queries with Redis GEO.' }
        ],
        matchScores: [
          { label: 'Problem Solving & DSA', value: 72, color: 'green' },
          { label: 'System Design Basics', value: 65, color: 'yellow' },
          { label: 'ATS Score', value: 73 }
        ],
        interviewRounds: [
          'Round 1: Online Assessment (DSA & Speed Test)',
          'Round 2: Problem Solving & DSA (Graphs / DP)',
          'Round 3: Machine Coding & Project Discussion',
          'Round 4: Culture & Engineering Fit'
        ],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Graph & Realtime Prep', tasks: [{ id: 't1', label: 'Solve 30 LeetCode Graph and Shortest Path problems', done: false }] }]
      },
      {
        id: 'zomato-intern',
        title: 'SDE Intern',
        salary: '₹60,000 - ₹80,000 / month',
        salaryOptions: ['₹50k - 70k/mo', '₹70k - 85k/mo'],
        overview: '6-month internship with direct opportunity to ship features on Zomato & Blinkit apps.',
        jobDescription: `Internship role for final year students. Strong coding speed and clean implementation skills.`,
        atsBaseline: 76,
        matchedKeywords: ['Data Structures', 'Python / Java / C++', 'Git'],
        missingKeywords: ['Fast Coding Speed', 'Clean Code Implementation', 'API Basics'],
        skillsHave: [{ name: 'Core Coding Skills', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Fast Medium DSA Implementation', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Clearing 2 questions in 45 minutes.' }],
        matchScores: [{ label: 'Coding Speed', value: 76, color: 'green' }],
        interviewRounds: ['Round 1: OA', 'Round 2: Technical Interview', 'Round 3: HR'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Speed Coding', tasks: [{ id: 't1', label: 'Timed LeetCode contests', done: false }] }]
      }
    ]
  },
  {
    id: 'paytm',
    name: 'Paytm',
    badge: 'FinTech / Payments & Lending',
    category: 'Unicorns',
    categoryGroup: '🦄 Unicorns & Startups',
    logo: '📱',
    roles: [
      {
        id: 'paytm-sde1',
        title: 'Software Engineer (Backend / SDE-1)',
        salary: '₹16 - 25 LPA',
        salaryOptions: ['₹14 - 18 LPA', '₹18 - 24 LPA'],
        overview: 'Build robust fintech systems, Soundbox IoT backends, and credit processing engines in Java/Spring Boot.',
        jobDescription: `Position: Software Engineer. Java, Spring Boot, MySQL, MongoDB, Redis, and high-concurrency transaction processing.`,
        atsBaseline: 74,
        matchedKeywords: ['Java', 'Spring Boot', 'SQL', 'MongoDB', 'REST APIs', 'Git'],
        missingKeywords: ['Distributed Caching with Redis', 'Kafka Event Streaming', 'Transaction Idempotency', 'Multithreading in Spring Boot'],
        skillsHave: [
          { name: 'Java & Spring Boot', level: 'Advanced' },
          { name: 'Database Operations', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Spring Boot Microservices & JPA', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Core framework tested in Paytm technical rounds.' },
          { name: 'DSA - Trees, Graphs & Dynamic Programming', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Standard DSA problems in live coding.' }
        ],
        matchScores: [
          { label: 'Java Backend', value: 80, color: 'green' },
          { label: 'DSA & Algorithms', value: 68, color: 'yellow' },
          { label: 'ATS Baseline', value: 74 }
        ],
        interviewRounds: [
          'Round 1: Online Assessment (Coding + Core CS MCQs)',
          'Round 2: Technical Interview 1 (DSA & Java Fundamentals)',
          'Round 3: Technical Interview 2 (Spring Boot & Projects)',
          'Round 4: HR Round'
        ],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Spring & DSA', tasks: [{ id: 't1', label: 'Master Spring Boot security, JPA, and LeetCode Mediums', done: false }] }]
      },
      {
        id: 'paytm-android',
        title: 'Android / Mobile Developer',
        salary: '₹15 - 22 LPA',
        salaryOptions: ['₹12 - 16 LPA', '₹16 - 22 LPA'],
        overview: 'Build user-facing payment flows, QR scanners, and secure biometric authentication on Android.',
        jobDescription: `Position: Android Engineer. Kotlin, Jetpack Compose, Coroutines, MVVM, Room DB, and Security protocols.`,
        atsBaseline: 75,
        matchedKeywords: ['Kotlin / Java', 'Android Basics', 'REST APIs', 'Git'],
        missingKeywords: ['Jetpack Compose & MVVM', 'Kotlin Coroutines & Flow', 'Android Security & Encryption'],
        skillsHave: [{ name: 'Java / Kotlin Basics', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Jetpack Compose & Kotlin Coroutines', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Modern Android development standard.' }],
        matchScores: [{ label: 'Mobile Engineering', value: 75, color: 'green' }],
        interviewRounds: ['Round 1: OA', 'Round 2: Android Tech Round', 'Round 3: Architecture', 'Round 4: HR'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Android Prep', tasks: [{ id: 't1', label: 'Build a fintech mini-app with Jetpack Compose', done: false }] }]
      }
    ]
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    badge: 'E-Commerce / Big Billion Days Scale',
    category: 'Unicorns',
    categoryGroup: '🦄 Unicorns & Startups',
    logo: '🛍️',
    roles: [
      {
        id: 'flipkart-sde1',
        title: 'Software Development Engineer I (SDE-1)',
        salary: '₹22 - 32 LPA',
        salaryOptions: ['₹18 - 24 LPA', '₹24 - 30 LPA', '₹30 - 36 LPA'],
        overview: 'Build distributed e-commerce systems powering flash sales with millions of requests per second.',
        jobDescription: `Position: SDE-1. Java, Python, Go, Machine Coding (90 min), and distributed systems fundamentals.`,
        atsBaseline: 74,
        matchedKeywords: ['Java', 'Data Structures', 'REST APIs', 'SQL', 'Git', 'OOP Design'],
        missingKeywords: ['Machine Coding Round (Clean LLD in 90 mins)', 'Kafka / RabbitMQ Message Queues', 'Redis Caching & Distributed Locks', 'Design Patterns (Strategy, State, Observer)'],
        skillsHave: [
          { name: 'Core Language Skills (Java/Python)', level: 'Advanced' },
          { name: 'Data Structures & Algorithms', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Machine Coding Mastery (90-Minute Clean LLD)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Flipkart famous filter round: Write running, modular, object-oriented code with unit tests.' },
          { name: 'Design Patterns (Factory, Strategy, Observer)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Mandatory for clearing Machine Coding round.' }
        ],
        matchScores: [
          { label: 'Machine Coding & LLD', value: 58, color: 'yellow' },
          { label: 'Problem Solving & DSA', value: 72, color: 'green' },
          { label: 'ATS Alignment', value: 74 }
        ],
        interviewRounds: [
          'Round 1: Online Assessment (Coding + Aptitude)',
          'Round 2: Machine Coding Round (90 min) — Implement a fully working OOP problem (e.g. Splitwise, Ride Sharing)',
          'Round 3: Problem Solving & DSA Round (60 min)',
          'Round 4: Engineering Manager & Cultural Fit Round'
        ],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Machine Coding', tasks: [{ id: 't1', label: 'Practice 4 full machine coding problems with running code', done: false }] }]
      },
      {
        id: 'flipkart-intern',
        title: 'SDE Intern',
        salary: '₹75,000 - ₹1,00,000 / month',
        salaryOptions: ['₹60k - 80k/mo', '₹80k - 1.0L/mo'],
        overview: 'Summer and winter internship program for circuit branches with direct PPO interviews.',
        jobDescription: `Internship role. Focus on Problem solving in Data Structures and OOP principles.`,
        atsBaseline: 78,
        matchedKeywords: ['C++ / Java', 'Data Structures', 'Git', 'OOP'],
        missingKeywords: ['Clean Object-Oriented Code', 'Trees & Graph Traversal'],
        skillsHave: [{ name: 'Data Structures & OOP', level: 'Intermediate' }],
        skillsNeed: [{ name: 'DSA & OOP Implementation', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'LeetCode Medium problem solving.' }],
        matchScores: [{ label: 'DSA & OOP', value: 78, color: 'green' }],
        interviewRounds: ['Round 1: HackerEarth OA', 'Round 2: Technical Interview 1', 'Round 3: Technical Interview 2'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Intern Prep', tasks: [{ id: 't1', label: 'Solve Flipkart tagged questions', done: false }] }]
      }
    ]
  },
  {
    id: 'startup',
    name: 'High-Growth AI & SaaS Startup',
    badge: '0-to-1 Product / Fast Iteration',
    category: 'Unicorns',
    categoryGroup: '🦄 Unicorns & Startups',
    logo: '🚀',
    roles: [
      {
        id: 'startup-fullstack-ai',
        title: 'Founding Full-Stack & AI Engineer',
        salary: '₹16 - 28 LPA + ESOPs',
        salaryOptions: ['₹12 - 18 LPA', '₹18 - 25 LPA', '₹25 - 35 LPA + Equity'],
        overview: 'Build modern AI-powered SaaS using Next.js 14, TypeScript, Python, PostgreSQL, and LLMs (LangChain/OpenAI).',
        jobDescription: `Position: Full Stack Engineer (Founding Team / Early Stage)
Requirements: Extreme ownership, fast shipping, Next.js (App Router), TypeScript, PostgreSQL (Prisma), Docker, and LLM APIs.`,
        atsBaseline: 84,
        matchedKeywords: ['React', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Git'],
        missingKeywords: ['LLM APIs / LangChain / RAG', 'PostgreSQL & Prisma/Drizzle ORM', 'Redis Caching & BullMQ', 'Docker Containerization & CI/CD', 'Next.js Server Actions'],
        skillsHave: [
          { name: 'React.js & Web Development', level: 'Advanced' },
          { name: 'JavaScript & Async Programming', level: 'Advanced' },
          { name: 'Git & GitHub Workflow', level: 'Proficient' }
        ],
        skillsNeed: [
          { name: 'TypeScript & Next.js 14 (App Router)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Industry standard for modern product startups.' },
          { name: 'PostgreSQL & ORM (Prisma/Supabase)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Relational data modeling, foreign keys, migrations, and joins.' },
          { name: 'AI & LLM Integration (LangChain/OpenAI)', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Building RAG pipelines, embeddings, prompt engineering, vector search.' }
        ],
        matchScores: [
          { label: 'Full-Stack Practical Skills', value: 85, color: 'green' },
          { label: 'Modern Tech Stack (Next/TS/Postgres)', value: 65, color: 'yellow' },
          { label: 'Portfolio & Live Deployed Projects', value: 80, color: 'green' },
          { label: 'Resume ATS Alignment', value: 84 }
        ],
        interviewRounds: [
          'Round 1: Screening & Portfolio Walkthrough (30 min)',
          'Round 2: Take-Home Machine Coding Assignment (24-48 hrs)',
          'Round 3: Live Code Review & Architecture Chat (60 min)',
          'Round 4: Founder / Cultural Fit Chat'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Next.js 14 & TypeScript',
            title: 'Modern Full-Stack Foundations',
            tasks: [
              { id: 't1', label: 'Build a Next.js 14 App Router project with TypeScript and Tailwind CSS', done: false },
              { id: 't2', label: 'Deploy a full-stack SaaS app featuring OpenAI API / LangChain integration', done: false }
            ]
          }
        ]
      },
      {
        id: 'startup-ai-eng',
        title: 'AI / LLM Application Engineer',
        salary: '₹18 - 30 LPA',
        salaryOptions: ['₹15 - 22 LPA', '₹22 - 30 LPA'],
        overview: 'Build GenAI workflows, fine-tuning pipelines, agentic workflows, and semantic search systems.',
        jobDescription: `Position: AI Engineer. Python, FastAPI, LangChain, LlamaIndex, Vector Databases (Pinecone/Qdrant), and OpenAI/Anthropic APIs.`,
        atsBaseline: 82,
        matchedKeywords: ['Python', 'FastAPI', 'Machine Learning Basics', 'Git', 'REST APIs'],
        missingKeywords: ['LangChain / LlamaIndex Agents', 'Vector Databases & Embeddings', 'RAG Pipeline Optimization', 'Evaluation Frameworks (Ragas)'],
        skillsHave: [{ name: 'Python & API Development', level: 'Advanced' }],
        skillsNeed: [{ name: 'RAG Architectures & Vector Search', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Chunking strategies, hybrid search, re-ranking.' }],
        matchScores: [{ label: 'AI & Full Stack', value: 80, color: 'green' }],
        interviewRounds: ['Round 1: Portfolio Review', 'Round 2: AI Coding Task', 'Round 3: Architecture & Founder Chat'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'GenAI Foundations', tasks: [{ id: 't1', label: 'Build an end-to-end RAG document search assistant', done: false }] }]
      }
    ]
  },

  // ─── 🏦 Finance & Consulting Tech ────────────────────────────────────
  {
    id: 'goldman',
    name: 'Goldman Sachs',
    badge: 'Premier Investment Banking Tech',
    category: 'Finance Tech',
    categoryGroup: '🏦 Finance Tech',
    logo: '🏦',
    roles: [
      {
        id: 'gs-eng-analyst',
        title: 'Engineering Analyst (Global Markets & Core Tech)',
        salary: '₹24 - 36 LPA',
        salaryOptions: ['₹20 - 26 LPA', '₹26 - 34 LPA', '₹34 LPA+'],
        overview: 'Build ultra-low-latency financial trading engines, risk analytics calculators, and cryptographic security systems.',
        jobDescription: `Position: Engineering Analyst (Technology Division)
Location: Bangalore / Hyderabad

Core Requirements:
- Strong mathematical aptitude, probability, combinatorics, and analytical problem solving.
- High proficiency in Java, C++, Python, or Scala with emphasis on memory management and concurrency.
- Strong knowledge of relational databases, SQL queries, transactions, and ACID properties.
- Data Structures & Algorithms expertise (Dynamic Programming, Graph Theory, Matrix Operations).`,
        atsBaseline: 70,
        matchedKeywords: ['Java', 'C++', 'Algorithms', 'Data Structures', 'SQL', 'Git', 'Linux'],
        missingKeywords: ['Advanced Probability & Mathematics', 'Low-Latency Java / Concurrency (Threads, Locks, Memory)', 'Advanced SQL (Window Functions, CTEs)', 'Object-Oriented Design Patterns', 'Financial Domain & Markets Awareness'],
        skillsHave: [
          { name: 'Java / C++ Programming', level: 'Proficient' },
          { name: 'Core Data Structures', level: 'Intermediate' },
          { name: 'Basic SQL', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'High-Level DSA & Mathematical Logic', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Combinatorics, Probability, Game Theory, Matrix DP.' },
          { name: 'Java Multi-threading & Low Latency', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Volatile, Atomic variables, ConcurrentHashMap, Thread Pools.' },
          { name: 'Complex SQL Queries & Database Internals', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Query plans, Index scans vs Seek, Isolation levels.' },
          { name: 'Behavioral: Why Goldman Sachs / Finance', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Understanding financial markets, risk management, and work culture.' }
        ],
        matchScores: [
          { label: 'Mathematical & Analytical Problem Solving', value: 60, color: 'yellow' },
          { label: 'Data Structures & Algorithms', value: 68, color: 'yellow' },
          { label: 'Core Java / C++ Concurrency', value: 55, color: 'red' },
          { label: 'Resume ATS Alignment', value: 70 }
        ],
        interviewRounds: [
          'Round 1: HackerRank OA (Math/Probability MCQs + 2 DSA Coding Questions)',
          'Round 2: Technical Interview 1 — Data Structures & Code Optimization',
          'Round 3: Technical Interview 2 — Concurrency, Core Java/C++, and Database Design',
          'Round 4: Super Day / Engineering Leadership & Values Interview'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Math, Probability & DSA',
            title: 'Math Foundations & LeetCode Hard',
            tasks: [
              { id: 't1', label: 'Study Permutations, Combinations, Probability, and Bayes Theorem for OA', done: false },
              { id: 't2', label: 'Solve 40 LeetCode Medium/Hard DP and Matrix problems', done: false }
            ]
          },
          {
            id: 'm2',
            month: 'Month 2: Concurrency & Database Mastery',
            title: 'Multi-threading & Enterprise SQL',
            tasks: [
              { id: 't3', label: 'Master Java Concurrency (ExecutorService, CountDownLatch, Synchronizers)', done: false },
              { id: 't4', label: 'Solve 30 advanced SQL problems on LeetCode / StrataScratch', done: false }
            ]
          }
        ]
      },
      {
        id: 'gs-tech-analyst',
        title: 'Technology Analyst (Risk & Asset Management)',
        salary: '₹22 - 32 LPA',
        salaryOptions: ['₹18 - 25 LPA', '₹25 - 32 LPA'],
        overview: 'Develop real-time risk calculators, portfolio optimization algorithms, and analytics dashboards.',
        jobDescription: `Position: Technology Analyst. Python/Java, SQL, Data modeling, statistical calculation, and microservices.`,
        atsBaseline: 72,
        matchedKeywords: ['Python / Java', 'SQL', 'Data Structures', 'Git', 'Linux'],
        missingKeywords: ['Financial Mathematics & Time Series', 'Advanced Pandas/NumPy & Query Tuning', 'Behavioral Super Day Preparation'],
        skillsHave: [{ name: 'Python & SQL Analytics', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Advanced SQL & Data Analytics', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Window functions, CTEs, self-joins, query optimization.' }],
        matchScores: [{ label: 'Analytics & DSA', value: 72, color: 'green' }],
        interviewRounds: ['Round 1: HackerRank OA', 'Round 2: Tech Interview', 'Round 3: Super Day Panel'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Data & Tech Focus', tasks: [{ id: 't1', label: 'Master SQL Window Functions and LeetCode Mediums', done: false }] }]
      }
    ]
  },
  {
    id: 'jpmorgan',
    name: 'JPMorgan Chase & Co.',
    badge: 'Global Banking & Asset Tech',
    category: 'Finance Tech',
    categoryGroup: '🏦 Finance Tech',
    logo: '🏛️',
    roles: [
      {
        id: 'jpmc-swe',
        title: 'Software Engineer (Code for Good Track)',
        salary: '₹18 - 26 LPA',
        salaryOptions: ['₹15 - 20 LPA', '₹20 - 26 LPA', '₹26 LPA+'],
        overview: 'Recruited through JPMC Code for Good hackathon or campus drives. Build mission-critical global banking platforms.',
        jobDescription: `Position: Software Engineer
Location: Mumbai / Bangalore / Hyderabad

Requirements:
- Strong problem solving in Data Structures (Arrays, Strings, Trees, Graphs, DP).
- Object-Oriented Programming (Java/Python), REST APIs, SQL, and Agile teamwork.
- High ethical standards and willingness to learn financial systems.`,
        atsBaseline: 75,
        matchedKeywords: ['Java / Python', 'Data Structures', 'SQL', 'REST APIs', 'Git', 'OOP'],
        missingKeywords: ['HireVue Video Interview Preparation', 'Code for Good Hackathon Collaboration', 'Enterprise Java (Spring Boot)', 'Banking Security & Compliance'],
        skillsHave: [
          { name: 'Core Programming (Java/Python)', level: 'Advanced' },
          { name: 'Data Structures & Algorithms', level: 'Intermediate' },
          { name: 'Database Fundamentals', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'DSA & Code for Good Hackathon Prep', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Collaborative 24-hr hackathon evaluation + live technical screening.' },
          { name: 'HireVue AI Video Interview Prep', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: '2 recorded behavioral/situational questions evaluated by HireVue AI.' },
          { name: 'Enterprise Spring Boot / Python Frameworks', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Backend microservices, REST APIs, and database connectivity.' }
        ],
        matchScores: [
          { label: 'Problem Solving & DSA', value: 74, color: 'green' },
          { label: 'Core CS (OOP & DBMS)', value: 80, color: 'green' },
          { label: 'HireVue & Behavioral Fit', value: 65, color: 'yellow' },
          { label: 'ATS Alignment', value: 75 }
        ],
        interviewRounds: [
          'Round 1: JPMC HackerRank OA (2 Coding Questions in 60 mins)',
          'Round 2: HireVue Video Interview (2 Recorded Behavioral Questions)',
          'Round 3: Code for Good 24-hour Hackathon (Team Prototype + Mentor Evaluation)',
          'Round 4: Final Technical & HR Interview'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Hackathon & DSA Prep',
            title: 'Code for Good Sprint',
            tasks: [
              { id: 't1', label: 'Solve 40 LeetCode Medium questions (Arrays, HashMaps, Trees, Graphs)', done: false },
              { id: 't2', label: 'Practice 10 standard HireVue situational prompts with a webcam timer', done: false }
            ]
          }
        ]
      },
      {
        id: 'jpmc-analyst',
        title: 'Technology Analyst',
        salary: '₹16 - 22 LPA',
        salaryOptions: ['₹14 - 18 LPA', '₹18 - 22 LPA'],
        overview: 'Develop cloud integrations, analytics workflows, and enterprise APIs for Corporate Investment Banking.',
        jobDescription: `Position: Technology Analyst. Java, SQL, Python, Cloud migrations, and Agile methodologies.`,
        atsBaseline: 76,
        matchedKeywords: ['Java', 'SQL', 'Git', 'Agile', 'OOP'],
        missingKeywords: ['Cloud Fundamentals (AWS/Azure)', 'Enterprise SQL (Joins, Stored Procedures)', 'HireVue Behavioral Answers'],
        skillsHave: [{ name: 'Java & SQL Basics', level: 'Intermediate' }],
        skillsNeed: [{ name: 'SQL & Database Design', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Complex relational joins and ACID properties.' }],
        matchScores: [{ label: 'Enterprise Tech', value: 76, color: 'green' }],
        interviewRounds: ['Round 1: HackerRank OA', 'Round 2: HireVue', 'Round 3: Super Day Interviews'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Tech Analyst Track', tasks: [{ id: 't1', label: 'SQL and OOP revision', done: false }] }]
      }
    ]
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    badge: 'Technology Consulting / Cloud / Analytics',
    category: 'Finance Tech',
    categoryGroup: '🏦 Finance Tech',
    logo: '🟢',
    roles: [
      {
        id: 'deloitte-tech-analyst',
        title: 'Technology Analyst (Consulting)',
        salary: '₹8.5 - 12 LPA',
        salaryOptions: ['₹7.5 - 9.5 LPA', '₹9.5 - 12.5 LPA'],
        overview: 'Consulting technology role delivering ERP transformations, cloud architectures, and digital banking platforms.',
        jobDescription: `Position: Technology Analyst (Deloitte USI / Consulting)
Location: Hyderabad / Bangalore / Gurgaon

Requirements:
- Excellent communication skills, client presentation abilities, and business acumen.
- Solid programming foundation in Java, Python, or Web Development with SQL.
- Strong problem-solving, analytical aptitude, and adaptability.`,
        atsBaseline: 78,
        matchedKeywords: ['Java / Python', 'SQL', 'HTML/CSS/JavaScript', 'Git', 'DBMS', 'Communication'],
        missingKeywords: ['Deloitte Versant English Assessment', 'Case Study & Consulting Problem Solving', 'Enterprise Software (Salesforce / SAP / Cloud)', 'Client Presentation & Structured Thinking'],
        skillsHave: [
          { name: 'Core Programming Language', level: 'Intermediate' },
          { name: 'Web Dev & SQL Basics', level: 'Intermediate' },
          { name: 'Basic Communication', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Versant & Communication Assessment', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Deloitte uses Versant AI to test spoken English, listening, fluency, and pronunciation.' },
          { name: 'Aptitude (Quantitative, Logical, Verbal)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'High cut-off in national qualification round.' },
          { name: 'Case Study / Consulting Problem Solving', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Structuring business problems, cost-benefit analysis, and tech trade-offs.' }
        ],
        matchScores: [
          { label: 'Aptitude & Logical Reasoning', value: 75, color: 'green' },
          { label: 'Communication & Versant Prep', value: 70, color: 'green' },
          { label: 'Technical & SQL Basics', value: 80, color: 'green' },
          { label: 'ATS Alignment', value: 78 }
        ],
        interviewRounds: [
          'Round 1: Online Assessment (Quantitative, Logical, Verbal Aptitude + Basic Coding)',
          'Round 2: Versant Spoken English & Listening Assessment',
          'Round 3: Technical & Case Study Interview',
          'Round 4: Partner / HR Behavioral Interview'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Aptitude & Versant Prep',
            title: 'Deloitte Selection Strategy',
            tasks: [
              { id: 't1', label: 'Practice 150 Deloitte Aptitude previous year questions (Indiabix)', done: false },
              { id: 't2', label: 'Practice 5 Versant speaking & active listening audio simulations', done: false }
            ]
          }
        ]
      },
      {
        id: 'deloitte-ust',
        title: 'UST Analyst (Undergraduate Solutions Trainee)',
        salary: '₹6.5 - 8.5 LPA',
        salaryOptions: ['₹5.5 - 7.0 LPA', '₹7.0 - 8.5 LPA'],
        overview: 'Entry-level technology consulting track for engineering and science graduates.',
        jobDescription: `Position: Solutions Trainee. SQL, Java/Python, Data Analysis, and business communication.`,
        atsBaseline: 80,
        matchedKeywords: ['SQL', 'Java', 'Python', 'DBMS', 'OOP'],
        missingKeywords: ['Aptitude Speed Test', 'Versant Test Practice', 'Professional Email & Presentation Writing'],
        skillsHave: [{ name: 'Core CS Basics', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Aptitude & Verbal Reasoning', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Speed and accuracy in quantitative and logical sections.' }],
        matchScores: [{ label: 'Aptitude & Core Tech', value: 80, color: 'green' }],
        interviewRounds: ['Round 1: Aptitude + Coding OA', 'Round 2: Versant Test', 'Round 3: Tech + HR Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Aptitude Fast Track', tasks: [{ id: 't1', label: 'Solve 100 Aptitude questions and SQL basics', done: false }] }]
      }
    ]
  },

  // ─── 🖥️ Service-Based IT & Global Systems ────────────────────────────
  {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    badge: 'Global IT Leader / Tier-1',
    category: 'IT Service',
    categoryGroup: '🖥️ IT Service',
    logo: '💼',
    roles: [
      {
        id: 'tcs-prime',
        title: 'TCS Prime (Premier Developer / R&D Track)',
        salary: '₹9.0 - 11.5 LPA',
        salaryOptions: ['₹8.5 - 9.5 LPA', '₹9.5 - 11.5 LPA', '₹11.5 - 13 LPA'],
        overview: 'Top-tier developer track at TCS for building enterprise AI/GenAI solutions, cloud migrations, and distributed platforms.',
        jobDescription: `Position: TCS Prime — System Engineer
Selection Track: TCS NQT Premier / National Qualifier Test (Advanced Section)`,
        atsBaseline: 82,
        matchedKeywords: ['Java', 'Python', 'SQL', 'DBMS', 'OOP', 'HTML/CSS/JavaScript', 'Git', 'Data Structures'],
        missingKeywords: ['Spring Boot Microservices', 'Advanced SQL (Triggers, Stored Procedures, Views)', 'TCS NQT Advanced Quantitative Ability', 'Cloud Basics (Azure/AWS)'],
        skillsHave: [
          { name: 'Core Java / Python', level: 'Advanced' },
          { name: 'DBMS & Basic SQL Queries', level: 'Intermediate' },
          { name: 'OOP Concepts (Polymorphism, Inheritance)', level: 'Proficient' }
        ],
        skillsNeed: [
          { name: 'Advanced TCS NQT Coding (2 Problems)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'String manipulations, matrices, dynamic programming, and greedy algorithms.' },
          { name: 'Advanced Quantitative Aptitude & Logic', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Permutations, probability, geometry, speed-time, syllogisms tested in NQT.' }
        ],
        matchScores: [
          { label: 'TCS NQT Advanced Coding', value: 75, color: 'green' },
          { label: 'Quantitative & Logical Aptitude', value: 65, color: 'yellow' },
          { label: 'Core CS (DBMS / OS / Networks)', value: 80, color: 'green' },
          { label: 'Resume ATS Alignment', value: 82 }
        ],
        interviewRounds: [
          'Round 1: TCS National Qualifier Test (NQT) — Foundation Section + Advanced Section (Advanced Coding)',
          'Round 2: Technical Interview (TR) — Deep dive into Java/Python, DBMS, College Projects, and DSA',
          'Round 3: Managerial & HR Interview (MR/HR) — Company awareness, relocations, behavioral questions'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: TCS NQT Mastery',
            title: 'NQT Aptitude & Advanced Coding',
            tasks: [
              { id: 't1', label: 'Solve 150 TCS NQT previous year Aptitude & Reasoning questions', done: false },
              { id: 't2', label: 'Master 40 TCS Advanced Coding Questions (Strings, Arrays, DP basics)', done: false }
            ]
          }
        ]
      },
      {
        id: 'tcs-digital',
        title: 'TCS Digital (Digital Innovator Track)',
        salary: '₹7.0 - 8.5 LPA',
        salaryOptions: ['₹6.5 - 7.5 LPA', '₹7.5 - 8.5 LPA'],
        overview: 'Specialist digital developer role focusing on Cloud, Modern Web, Analytics, and Enterprise modernization.',
        jobDescription: `Position: TCS Digital — System Engineer. High-potential engineering graduates with strong programming fundamentals.`,
        atsBaseline: 80,
        matchedKeywords: ['Java', 'Python', 'C++', 'SQL', 'Data Structures', 'OOP'],
        missingKeywords: ['REST APIs', 'Spring / Django Basics', 'Aptitude Speed Test', 'Git Collaboration'],
        skillsHave: [{ name: 'Core Programming Language', level: 'Intermediate' }],
        skillsNeed: [{ name: 'NQT Digital Coding Section', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Clearing both coding questions in the time limit.' }],
        matchScores: [{ label: 'Digital Coding Aptitude', value: 72, color: 'green' }],
        interviewRounds: ['Round 1: TCS NQT Digital Exam', 'Round 2: Combined TR, MR & HR Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Digital Prep', tasks: [{ id: 't1', label: 'Practice 100 TCS Digital level coding questions', done: false }] }]
      },
      {
        id: 'tcs-ninja',
        title: 'TCS Ninja (Associate System Engineer)',
        salary: '₹3.36 - 4.0 LPA',
        salaryOptions: ['₹3.36 - 4.0 LPA'],
        overview: 'Mass hiring track for fresh engineering graduates across all disciplines.',
        jobDescription: `Position: Assistant System Engineer. Basic coding, quantitative aptitude, and English comprehension.`,
        atsBaseline: 84,
        matchedKeywords: ['C / C++ / Java', 'Basic Computer Science', 'Communication'],
        missingKeywords: ['NQT Foundation Aptitude Speed', 'Basic Array/String Coding'],
        skillsHave: [{ name: 'Basic Programming', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Foundation Section Aptitude & Basic Coding', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Clearing numerical ability, reasoning, and verbal.' }],
        matchScores: [{ label: 'Aptitude & Basics', value: 84, color: 'green' }],
        interviewRounds: ['Round 1: TCS NQT Foundation', 'Round 2: TR/HR Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Ninja Prep', tasks: [{ id: 't1', label: 'Foundation Aptitude Practice', done: false }] }]
      }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    badge: 'Global Tech Consulting & Digital',
    category: 'IT Service',
    categoryGroup: '🖥️ IT Service',
    logo: '🏛️',
    roles: [
      {
        id: 'infosys-sp',
        title: 'Specialist Programmer (SP / Power Programmer)',
        salary: '₹9.5 - 11.0 LPA',
        salaryOptions: ['₹8.5 - 9.5 LPA', '₹9.5 - 11.0 LPA', '₹11.0 - 13.0 LPA'],
        overview: 'Elite competitive programming track at Infosys recruited through HackWithInfy / InfyTQ.',
        jobDescription: `Position: Specialist Programmer (SP). Elite competitive coders for high-complexity architecture and performance tuning.`,
        atsBaseline: 78,
        matchedKeywords: ['C++ / Java / Python', 'Data Structures', 'Algorithms', 'SQL', 'Git', 'OOP'],
        missingKeywords: ['Competitive Programming (Codeforces / CodeChef 3★+)', 'Graph Theory (Shortest Path, MST)', 'Dynamic Programming Optimization'],
        skillsHave: [{ name: 'Coding Fluency in C++/Java', level: 'Proficient' }],
        skillsNeed: [{ name: 'HackWithInfy Coding Level (3 Hard Problems)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Dynamic Programming, Graph algorithms, Advanced Math.' }],
        matchScores: [{ label: 'Competitive Coding', value: 68, color: 'yellow' }],
        interviewRounds: ['Round 1: HackWithInfy Round 1', 'Round 2: HackWithInfy Grand Finale', 'Round 3: Technical Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'HackWithInfy Sprint', tasks: [{ id: 't1', label: 'Solve 50 CodeChef Div 2 & HackWithInfy questions', done: false }] }]
      },
      {
        id: 'infosys-dse',
        title: 'Digital Specialist Engineer (DSE)',
        salary: '₹6.25 - 7.5 LPA',
        salaryOptions: ['₹6.25 - 7.5 LPA'],
        overview: 'Digital transformation developer role building full-stack cloud and mobile enterprise applications.',
        jobDescription: `Position: Digital Specialist Engineer. Java, Python, SQL, REST APIs, and full-stack development.`,
        atsBaseline: 80,
        matchedKeywords: ['Java', 'Python', 'SQL', 'OOP', 'HTML/CSS/JS'],
        missingKeywords: ['InfyTQ Certification Exam', 'Intermediate DSA (Stacks, Queues, Trees)'],
        skillsHave: [{ name: 'Core Programming', level: 'Intermediate' }],
        skillsNeed: [{ name: 'InfyTQ Certification & DSA', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Clearing qualifying + final round on InfyTQ platform.' }],
        matchScores: [{ label: 'InfyTQ Readiness', value: 78, color: 'green' }],
        interviewRounds: ['Round 1: InfyTQ Qualifier', 'Round 2: InfyTQ Final Round', 'Round 3: Technical + HR Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'InfyTQ Prep', tasks: [{ id: 't1', label: 'InfyTQ sample test series', done: false }] }]
      }
    ]
  },
  {
    id: 'wipro',
    name: 'Wipro',
    badge: 'Global IT & Cloud Solutions',
    category: 'IT Service',
    categoryGroup: '🖥️ IT Service',
    logo: '🌐',
    roles: [
      {
        id: 'wipro-turbo',
        title: 'Project Engineer (Wipro Turbo / Digital)',
        salary: '₹6.5 - 8.0 LPA',
        salaryOptions: ['₹6.0 - 7.0 LPA', '₹7.0 - 8.5 LPA'],
        overview: 'Premium developer band at Wipro for cloud engineering, full-stack web, and enterprise Java.',
        jobDescription: `Position: Project Engineer (Turbo Track). OOPS in Java, SQL joins, Data Structures, and verbal aptitude.`,
        atsBaseline: 74,
        matchedKeywords: ['Java', 'SQL', 'HTML', 'CSS', 'JavaScript', 'OOP', 'Git'],
        missingKeywords: ['OOPS concepts in Java', 'DBMS Normalization (1NF to 3NF)', 'Communication & Essay Writing', 'Aptitude Preparation', 'Pseudocode Writing'],
        skillsHave: [
          { name: 'Java Basics & Syntax', level: 'Intermediate' },
          { name: 'HTML/CSS Basics', level: 'Intermediate' },
          { name: 'Basic SQL Queries', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'OOPS Concepts in Java (Deep Dive)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Wipro technical interviews focus heavily on live implementation of Inheritance, Abstract Classes vs Interfaces, Polymorphism.' },
          { name: 'DBMS & SQL Joins / Normalization', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Writing Inner/Left/Right joins, primary vs foreign keys, subqueries.' },
          { name: 'Aptitude (Quantitative + Logical + Verbal)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Wipro Elite/Turbo National Talent Hunt online test clearance.' },
          { name: 'Pseudocode & Error Debugging', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Answering 15-20 timed pseudocode and syntax bug identification questions.' }
        ],
        matchScores: [
          { label: 'Quantitative & Logical Aptitude', value: 72, color: 'green' },
          { label: 'OOPS in Java & Core CS', value: 76, color: 'green' },
          { label: 'DBMS & SQL', value: 70, color: 'green' },
          { label: 'Resume ATS Alignment', value: 74 }
        ],
        interviewRounds: [
          'Round 1: Wipro National Talent Hunt (NLTH) — Aptitude + Essay Writing + Pseudocode + 2 Coding Questions',
          'Round 2: Technical Interview (OOPS in Java, DBMS, Final Year Project)',
          'Round 3: HR Interview (Communication, Willingness to Relocate)'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Aptitude & Java OOPS',
            title: 'Wipro NLTH Selection Plan',
            tasks: [
              { id: 't1', label: 'Solve 100 Wipro previous year Aptitude & Pseudocode questions', done: false },
              { id: 't2', label: 'Master Java OOPS (Abstraction, Encapsulation, Interface vs Abstract class)', done: false },
              { id: 't3', label: 'Practice writing 5 timed 200-word business essays for NLTH', done: false }
            ]
          },
          {
            id: 'm2',
            month: 'Month 2: DBMS, SQL & Communication',
            title: 'Core CS & Verbal Preparation',
            tasks: [
              { id: 't4', label: 'Practice 50 SQL queries — Joins, Subqueries, Window Functions on HackerRank', done: false },
              { id: 't5', label: 'Revise DBMS normalization (1NF, 2NF, 3NF, BCNF) with real examples', done: false },
              { id: 't6', label: 'Record and review 5 mock Group Discussion answers on tech topics (AI, Remote Work)', done: false }
            ]
          },
          {
            id: 'm3',
            month: 'Month 3: Mock Tests & Final Prep',
            title: 'Full Wipro NLTH Simulation',
            tasks: [
              { id: 't7', label: 'Complete 3 full Wipro NLTH mock tests (Aptitude + Essay + Pseudocode + Coding)', done: false },
              { id: 't8', label: 'Prepare HR interview answers — relocation, teamwork, goals', done: false },
              { id: 't9', label: 'Polish resume with Wipro-specific keywords and project descriptions', done: false }
            ]
          }
        ]
      },
      {
        id: 'wipro-elite',
        title: 'Project Engineer Trainee (Wipro Elite)',
        salary: '₹3.5 - 4.2 LPA',
        salaryOptions: ['₹3.5 - 4.2 LPA'],
        overview: 'Foundation entry-level engineering role via National Talent Hunt across India.',
        jobDescription: `Position: Project Engineer Trainee. Basic programming in C/C++/Java, verbal English, and quantitative reasoning.`,
        atsBaseline: 78,
        matchedKeywords: ['C / C++ / Java Basics', 'HTML/CSS', 'Basic Math'],
        missingKeywords: ['Pseudocode Debugging', 'Verbal Aptitude Speed', 'OOPS in Java'],
        skillsHave: [{ name: 'Basic Programming', level: 'Intermediate' }],
        skillsNeed: [{ name: 'NLTH Aptitude & Pseudocode', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Clearing quantitative and debugging sections.' }],
        matchScores: [{ label: 'Aptitude & Basics', value: 78, color: 'green' }],
        interviewRounds: ['Round 1: Wipro NLTH Online Assessment', 'Round 2: TR + HR Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Elite Prep', tasks: [{ id: 't1', label: 'Aptitude and Pseudocode practice', done: false }] }]
      }
    ]
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    badge: 'Digital Engineering & Modern IT',
    category: 'IT Service',
    categoryGroup: '🖥️ IT Service',
    logo: '🏢',
    roles: [
      {
        id: 'cognizant-genc-pro',
        title: 'GenC Pro (Full Stack & Cloud Track)',
        salary: '₹6.75 - 9.0 LPA',
        salaryOptions: ['₹6.5 - 8.0 LPA', '₹8.0 - 9.5 LPA'],
        overview: 'Specialist GenC Pro developer role for microservices, cloud migrations, and full-stack web applications.',
        jobDescription: `Position: GenC Pro. Java, Spring Boot, React, SQL, Cloud deployment, and REST APIs.`,
        atsBaseline: 75,
        matchedKeywords: ['Java', 'SQL', 'HTML', 'CSS', 'JavaScript', 'OOP', 'Git'],
        missingKeywords: ['OOPS concepts in Java', 'DBMS normalization', 'Communication skills', 'Aptitude preparation', 'Pseudocode writing', 'Spring Boot Basics'],
        skillsHave: [
          { name: 'Java / Python Syntax', level: 'Intermediate' },
          { name: 'Basic Web Development', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'GenC Pro Skill-Based Coding Assessment', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Hands-on coding in Java/Python + SQL queries in 90 minutes.' },
          { name: 'OOPS Concepts in Java & DBMS Normalization', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Mandatory technical interview questions.' },
          { name: 'Verbal Communication & Presentation', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Cognizant evaluates clear, articulate spoken English.' }
        ],
        matchScores: [
          { label: 'GenC Coding Assessment', value: 74, color: 'green' },
          { label: 'Core CS (OOPS + DBMS)', value: 78, color: 'green' },
          { label: 'ATS Alignment', value: 75 }
        ],
        interviewRounds: [
          'Round 1: GenC Pro Skill-Based Assessment (Coding + Advanced MCQ)',
          'Round 2: Technical Interview (OOPS, Java, DBMS, Projects)',
          'Round 3: HR Interview'
        ],
        roadmap: [
          { id: 'm1', month: 'Month 1: Java, OOPS & SQL', title: 'Core Technical Foundation', tasks: [
            { id: 't1', label: 'Practice Cognizant GenC Pro past coding questions (Java + SQL)', done: false },
            { id: 't2', label: 'Master Java OOPS: Polymorphism, Abstraction, Interfaces vs Abstract Classes', done: false },
            { id: 't3', label: 'Complete HackerRank SQL certification (Basic + Intermediate)', done: false }
          ]},
          { id: 'm2', month: 'Month 2: Projects & Communication', title: 'Project Deep Dive', tasks: [
            { id: 't4', label: 'Prepare clear 3-minute project explanation with architecture diagram', done: false },
            { id: 't5', label: 'Complete 10 mock HR interview questions with recorded responses', done: false },
            { id: 't6', label: 'Learn Spring Boot basics and deploy a simple REST API project on GitHub', done: false }
          ]},
          { id: 'm3', month: 'Month 3: Mock Rounds', title: 'Full Interview Simulation', tasks: [
            { id: 't7', label: 'Take 3 mock technical interviews (OOPS + DBMS + projects)', done: false },
            { id: 't8', label: 'Apply via Cognizant off-campus portal and upload complete GitHub profile', done: false },
            { id: 't9', label: 'Review Cognizant GenC Pro previous recruitment batch experiences on GeeksForGeeks', done: false }
          ]}
        ]
      },
      {
        id: 'cognizant-genc',
        title: 'GenC Engineer (Associate)',
        salary: '₹4.0 - 4.5 LPA',
        salaryOptions: ['₹4.0 - 4.5 LPA'],
        overview: 'Campus graduate recruitment for software development, test automation, and digital support.',
        jobDescription: `Position: Programmer Analyst Trainee (GenC). Quantitative aptitude, logical reasoning, and fundamentals of programming.`,
        atsBaseline: 78,
        matchedKeywords: ['C / Java', 'SQL Basics', 'HTML/CSS'],
        missingKeywords: ['Aptitude Speed Test', 'Pseudocode MCQs', 'Communication & GD Prep'],
        skillsHave: [{ name: 'Basic Programming', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Aptitude & Logical Reasoning', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Clearing Cognizant AMCAT assessment.' }],
        matchScores: [{ label: 'Aptitude & Basics', value: 78, color: 'green' }],
        interviewRounds: ['Round 1: AMCAT Online Assessment', 'Round 2: Technical + HR Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'GenC Prep', tasks: [{ id: 't1', label: 'AMCAT pattern aptitude practice', done: false }] }]
      }
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    badge: 'Strategy & Global Technology',
    category: 'IT Service',
    categoryGroup: '🖥️ IT Service',
    logo: '🟣',
    roles: [
      {
        id: 'accenture-aase',
        title: 'Advanced Associate Software Engineer (AASE)',
        salary: '₹6.5 - 8.5 LPA',
        salaryOptions: ['₹6.5 - 7.5 LPA', '₹7.5 - 8.5 LPA'],
        overview: 'Top recruitment tier at Accenture for full-stack engineering, cloud architecture, and modern data platforms.',
        jobDescription: `Position: Advanced Associate Software Engineer (AASE)
Selection: Cognitive & Technical Assessment + Coding Assessment (2 questions) + Communication Assessment.`,
        atsBaseline: 75,
        matchedKeywords: ['Java / Python / C++', 'SQL', 'HTML/CSS', 'OOP', 'Data Structures', 'Git'],
        missingKeywords: ['Accenture Communication Assessment (Versant style)', 'Pseudocode & Common Application Security', 'OOPS concepts in Java', 'DBMS normalization', 'Cloud Fundamentals (AWS/Azure/GCP)'],
        skillsHave: [
          { name: 'Core Language Fundamentals', level: 'Advanced' },
          { name: 'Basic SQL & OOP', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Accenture Coding Assessment (2 LeetCode Easy/Med)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Strings, arrays, dynamic programming, and greedy questions.' },
          { name: 'Accenture Communication Assessment', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Reading, listening, sentence mastery, and vocabulary recorded online.' },
          { name: 'Cognitive & Technical MCQ (Pseudocode/MS Office/Cloud)', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Critical reasoning, abstract reasoning, pseudocode debugging.' }
        ],
        matchScores: [
          { label: 'Cognitive & Technical Test', value: 75, color: 'green' },
          { label: 'Communication Assessment', value: 72, color: 'green' },
          { label: 'Coding & DSA', value: 78, color: 'green' },
          { label: 'ATS Alignment', value: 75 }
        ],
        interviewRounds: [
          'Round 1: Cognitive Assessment (50 Qs) + Technical Assessment (40 Qs)',
          'Round 2: Coding Assessment (2 Coding Questions — 45 mins)',
          'Round 3: Communication Assessment (Automated AI Spoken English test)',
          'Round 4: Combined Technical & HR Interview'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Cognitive & Technical Foundation',
            title: 'Accenture Selection Roadmap',
            tasks: [
              { id: 't1', label: 'Solve 100 Accenture Pseudocode & Cognitive questions', done: false },
              { id: 't2', label: 'Practice 30 Accenture-pattern coding questions (Strings, Arrays on HackerRank)', done: false },
              { id: 't3', label: 'Complete 3 simulated Communication Audio & Spoken English Tests', done: false }
            ]
          },
          {
            id: 'm2',
            month: 'Month 2: Coding & Cloud Fundamentals',
            title: 'Algorithm & System Basics',
            tasks: [
              { id: 't4', label: 'Master LeetCode Easy/Medium DP and Greedy algorithms for coding section', done: false },
              { id: 't5', label: 'Revise Cloud computing fundamentals (IaaS, PaaS, SaaS, AWS/Azure basics)', done: false },
              { id: 't6', label: 'Review Network Security, MS Office MCQs, and Common Application Security', done: false }
            ]
          },
          {
            id: 'm3',
            month: 'Month 3: Mock Interviews & Final Selection',
            title: 'Interview & Behavioral Readiness',
            tasks: [
              { id: 't7', label: 'Conduct 2 mock technical interviews focusing on college projects & OOPS', done: false },
              { id: 't8', label: 'Prepare Accenture core values (Stewardship, Client Value Creation, Integrity)', done: false },
              { id: 't9', label: 'Apply on Accenture Careers portal and track assessment schedule', done: false }
            ]
          }
        ]
      },
      {
        id: 'accenture-ase',
        title: 'Associate Software Engineer (ASE)',
        salary: '₹4.5 - 5.5 LPA',
        salaryOptions: ['₹4.5 - 5.5 LPA'],
        overview: 'Core engineering entry role for developing, testing, and maintaining enterprise applications.',
        jobDescription: `Position: Associate Software Engineer. Programming, problem-solving, and communication.`,
        atsBaseline: 80,
        matchedKeywords: ['C / Java', 'SQL', 'HTML/CSS', 'Git'],
        missingKeywords: ['Communication Assessment', 'Pseudocode Debugging', 'Aptitude Preparation'],
        skillsHave: [{ name: 'Basic Programming', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Cognitive & Communication Assessment', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Clearing all 3 elimination rounds.' }],
        matchScores: [{ label: 'Assessment Readiness', value: 80, color: 'green' }],
        interviewRounds: ['Round 1: Cognitive & Tech OA', 'Round 2: Coding', 'Round 3: Communication', 'Round 4: Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'ASE Track', tasks: [{ id: 't1', label: 'Cognitive & communication test prep', done: false }] }]
      }
    ]
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    badge: 'Consulting, Cloud & Digital Services',
    category: 'IT Service',
    categoryGroup: '🖥️ IT Service',
    logo: '🔷',
    roles: [
      {
        id: 'capgemini-senior-analyst',
        title: 'Senior Analyst (Exceller Differential Track)',
        salary: '₹7.5 - 9.0 LPA',
        salaryOptions: ['₹7.0 - 8.5 LPA', '₹8.5 - 9.5 LPA'],
        overview: 'Differential high-package recruitment track through Capgemini Exceller Coding Challenge.',
        jobDescription: `Position: Senior Analyst. OOPS in Java, Game-based aptitude, Pseudocode, SQL, and DSA coding.`,
        atsBaseline: 74,
        matchedKeywords: ['Java', 'SQL', 'OOP', 'HTML/CSS', 'Data Structures', 'Git'],
        missingKeywords: ['Capgemini Game-Based Aptitude Assessment', 'Pseudocode & Algorithms', 'OOPS concepts in Java', 'DBMS normalization', 'Spoken English Communication'],
        skillsHave: [
          { name: 'Java / Python Syntax', level: 'Intermediate' },
          { name: 'Basic SQL', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'Game-Based Cognitive Aptitude', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Unique Capgemini round: grid challenge, motion challenge, deductive reasoning games.' },
          { name: 'Pseudocode & OOPS in Java', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Inheritance, interfaces, dry running nested loops and recursive functions.' }
        ],
        matchScores: [
          { label: 'Game-Based & Technical Aptitude', value: 72, color: 'green' },
          { label: 'Exceller Coding Challenge', value: 75, color: 'green' },
          { label: 'ATS Alignment', value: 74 }
        ],
        interviewRounds: [
          'Round 1: Technical Assessment (Pseudocode + English) + Game-Based Aptitude',
          'Round 2: Exceller Coding Assessment (2 Coding Questions)',
          'Round 3: Spoken English Assessment',
          'Round 4: Technical & HR Interview'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Game Aptitude & Pseudocode',
            title: 'Capgemini Assessment Foundation',
            tasks: [
              { id: 't1', label: 'Practice Capgemini game-based aptitude (Grid, Motion, Switch Challenge)', done: false },
              { id: 't2', label: 'Solve 60 Pseudocode & Data Structures MCQs (dry-running loops/recursion)', done: false },
              { id: 't3', label: 'Practice Spoken English Assessment modules (Audio repetition & vocabulary)', done: false }
            ]
          },
          {
            id: 'm2',
            month: 'Month 2: Exceller Coding & Java OOPS',
            title: 'Exceller Track Technical Prep',
            tasks: [
              { id: 't4', label: 'Solve 40 Exceller-level coding questions on HackerEarth/LeetCode', done: false },
              { id: 't5', label: 'Deep dive Java OOPS (Inheritance, Polymorphism, Abstract classes)', done: false },
              { id: 't6', label: 'Master SQL joins, group by, having, and subquery writing', done: false }
            ]
          },
          {
            id: 'm3',
            month: 'Month 3: Full Exceller Simulation',
            title: 'Technical & HR Mock Rounds',
            tasks: [
              { id: 't7', label: 'Take 3 full Capgemini mock test simulations', done: false },
              { id: 't8', label: 'Prepare academic project presentation with schema diagrams', done: false },
              { id: 't9', label: 'Review Capgemini HR interview questions on flexibility & location preference', done: false }
            ]
          }
        ]
      },
      {
        id: 'capgemini-analyst',
        title: 'Analyst (Exceller Core Track)',
        salary: '₹4.0 - 4.5 LPA',
        salaryOptions: ['₹4.0 - 4.5 LPA'],
        overview: 'Core Exceller track for engineering graduates entering software engineering and cloud ops.',
        jobDescription: `Position: Analyst. Technical aptitude, pseudocode, English comprehension, and basic programming.`,
        atsBaseline: 80,
        matchedKeywords: ['C / Java', 'SQL Basics', 'HTML/CSS'],
        missingKeywords: ['Game-Based Aptitude Tests', 'Pseudocode Writing', 'Communication Skills'],
        skillsHave: [{ name: 'Basic Coding', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Pseudocode & Game-Based Aptitude', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Speed in deductive reasoning and syntax trace.' }],
        matchScores: [{ label: 'Aptitude & Basics', value: 80, color: 'green' }],
        interviewRounds: ['Round 1: Pseudocode & Game Aptitude', 'Round 2: Spoken English', 'Round 3: Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Analyst Plan', tasks: [{ id: 't1', label: 'Capgemini mock tests', done: false }] }]
      }
    ]
  },
  {
    id: 'hcl',
    name: 'HCLTech',
    badge: 'Global Tech & Engineering R&D',
    category: 'IT Service',
    categoryGroup: '🖥️ IT Service',
    logo: '🏢',
    roles: [
      {
        id: 'hcl-swe',
        title: 'Software Engineer (Digital & R&D)',
        salary: '₹6.0 - 8.0 LPA',
        salaryOptions: ['₹5.5 - 7.0 LPA', '₹7.0 - 8.5 LPA'],
        overview: 'Build digital solutions, IoT platforms, and enterprise software for global clients.',
        jobDescription: `Position: Software Engineer. Java, C++, Python, SQL, REST APIs, and core CS fundamentals.`,
        atsBaseline: 76,
        matchedKeywords: ['Java / C++', 'SQL', 'OOP', 'HTML/CSS', 'Git'],
        missingKeywords: ['OOPS concepts in Java', 'DBMS normalization', 'Quantitative & Logical Aptitude', 'Project Documentation & Testing'],
        skillsHave: [{ name: 'Java / C++ Fundamentals', level: 'Intermediate' }],
        skillsNeed: [
          { name: 'Java OOPS & Database Normalization', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Live explanation of schema design, relationships, and inheritance.' },
          { name: 'Aptitude & Technical MCQ Assessment', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Clearing Firstnaukri/CoCubes online test pattern.' }
        ],
        matchScores: [{ label: 'Tech & Aptitude', value: 76, color: 'green' }],
        interviewRounds: ['Round 1: Online Aptitude & Coding Test', 'Round 2: Technical Interview', 'Round 3: HR Interview'],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Aptitude & Core Programming',
            title: 'HCLTech Assessment Sprint',
            tasks: [
              { id: 't1', label: 'Solve 100 Firstnaukri/CoCubes pattern Quantitative & Logical Aptitude questions', done: false },
              { id: 't2', label: 'Master Java/C++ OOPS concepts with practical coding examples', done: false },
              { id: 't3', label: 'Practice basic string and array manipulation coding questions', done: false }
            ]
          },
          {
            id: 'm2',
            month: 'Month 2: DBMS, SQL & Web Fundamentals',
            title: 'Database & Technical Depth',
            tasks: [
              { id: 't4', label: 'Master SQL Joins, Normalization, Indexing, and ACID properties', done: false },
              { id: 't5', label: 'Revise Operating Systems (Process synchronization, Paging, Deadlocks)', done: false },
              { id: 't6', label: 'Document and polish college major project architecture', done: false }
            ]
          },
          {
            id: 'm3',
            month: 'Month 3: Mock Interviews & Hiring Drives',
            title: 'Interview & Placement Readiness',
            tasks: [
              { id: 't7', label: 'Conduct 2 technical mock interviews on OOPS and DBMS', done: false },
              { id: 't8', label: 'Prepare HR behavioral answers and company background for HCLTech', done: false },
              { id: 't9', label: 'Submit application on HCLTech Early Careers portal', done: false }
            ]
          }
        ]
      },
      {
        id: 'hcl-get',
        title: 'Graduate Engineer Trainee (GET)',
        salary: '₹3.6 - 4.5 LPA',
        salaryOptions: ['₹3.6 - 4.5 LPA'],
        overview: 'Entry-level trainee engineer program across development, cloud support, and testing.',
        jobDescription: `Position: Graduate Engineer Trainee. Basic computer science, problem solving, and English proficiency.`,
        atsBaseline: 82,
        matchedKeywords: ['C / Java', 'SQL Basics', 'Communication'],
        missingKeywords: ['Aptitude Speed Test', 'Basic OOPS in Java'],
        skillsHave: [{ name: 'Basic Computer Science', level: 'Intermediate' }],
        skillsNeed: [{ name: 'Online Aptitude & Technical MCQs', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Quantitative, logical, and pseudocode tests.' }],
        matchScores: [{ label: 'Aptitude & Basics', value: 82, color: 'green' }],
        interviewRounds: ['Round 1: Online Test', 'Round 2: TR + HR Interview'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'GET Track', tasks: [{ id: 't1', label: 'Aptitude speed practice', done: false }] }]
      }
    ]
  },
  {
    id: 'ibm',
    name: 'IBM',
    badge: 'Hybrid Cloud, AI & Enterprise Solutions',
    category: 'IT Service',
    categoryGroup: '🖥️ IT Service',
    logo: '🔵',
    roles: [
      {
        id: 'ibm-assoc-dev',
        title: 'Associate Software Developer',
        salary: '₹7.5 - 11.0 LPA',
        salaryOptions: ['₹6.5 - 8.5 LPA', '₹8.5 - 11.0 LPA'],
        overview: 'Develop cloud-native applications on Red Hat OpenShift, IBM Cloud, and Watson AI microservices.',
        jobDescription: `Position: Associate Software Developer (IBM India)
Location: Bangalore / Hyderabad / Pune / Kochi

Requirements:
- Strong grasp of Java, Python, Go, or JavaScript.
- Proficiency in Data Structures, Algorithms, SQL, and Object-Oriented Design.
- Familiarity with Cloud concepts, Docker, and Linux environments.`,
        atsBaseline: 74,
        matchedKeywords: ['Java', 'Python', 'SQL', 'Data Structures', 'OOP', 'Linux', 'Git'],
        missingKeywords: ['IBM Cognitive Assessment (Learning Agility)', 'Red Hat OpenShift & Docker Containers', 'Cloud Microservices Architecture', 'OOPS concepts in Java', 'DBMS normalization'],
        skillsHave: [
          { name: 'Programming in Java / Python', level: 'Advanced' },
          { name: 'SQL & Database Queries', level: 'Intermediate' },
          { name: 'Linux Basics', level: 'Intermediate' }
        ],
        skillsNeed: [
          { name: 'IBM Cognitive Ability Assessment', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Game-based assessment measuring problem-solving speed, numerical reasoning, and agility.' },
          { name: 'Java OOPS & Microservices Architecture', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Building modular REST services, dependency injection, and clean OOD.' },
          { name: 'Containers & Cloud Basics (Docker/Linux)', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Containerizing services and basic cloud deployment.' }
        ],
        matchScores: [
          { label: 'Cognitive & Problem Solving', value: 74, color: 'green' },
          { label: 'Java / Python & OOP', value: 78, color: 'green' },
          { label: 'Cloud & Containers', value: 65, color: 'yellow' },
          { label: 'ATS Alignment', value: 74 }
        ],
        interviewRounds: [
          'Round 1: IBM Cognitive Ability Assessment (Online Game-based test)',
          'Round 2: English Language & Technical Coding Assessment (HackerRank)',
          'Round 3: Technical Interview (OOPS, DSA, Cloud & Database Design)',
          'Round 4: Managerial & HR Interview'
        ],
        roadmap: [
          {
            id: 'm1',
            month: 'Month 1: Cognitive Games & Coding Core',
            title: 'IBM Selection Strategy',
            tasks: [
              { id: 't1', label: 'Practice IBM Cognitive Ability mini-games and logical agility puzzles', done: false },
              { id: 't2', label: 'Solve 30 HackerRank LeetCode Medium Java/Python problems', done: false },
              { id: 't3', label: 'Complete English Language assessment practice tests', done: false }
            ]
          },
          {
            id: 'm2',
            month: 'Month 2: Java OOPS & Cloud Microservices',
            title: 'Enterprise Architecture & Cloud',
            tasks: [
              { id: 't4', label: 'Build a modular REST API service using Spring Boot / FastAPI', done: false },
              { id: 't5', label: 'Learn Docker containerization and deploy microservices locally', done: false },
              { id: 't6', label: 'Master SQL complex queries, transaction management, and NoSQL basics', done: false }
            ]
          },
          {
            id: 'm3',
            month: 'Month 3: Technical Panels & Case Studies',
            title: 'Interview & Innovation Readiness',
            tasks: [
              { id: 't7', label: 'Conduct 3 mock technical interviews on DSA, OOP, and Cloud architecture', done: false },
              { id: 't8', label: 'Prepare clear walkthrough of past projects and open-source contributions', done: false },
              { id: 't9', label: 'Apply via IBM Careers portal for Associate Developer roles', done: false }
            ]
          }
        ]
      },
      {
        id: 'ibm-data-analyst',
        title: 'Associate Data Analyst',
        salary: '₹7.0 - 9.5 LPA',
        salaryOptions: ['₹6.0 - 8.0 LPA', '₹8.0 - 9.5 LPA'],
        overview: 'Data engineering, SQL pipelines, Python data manipulation, and Watson AI integration.',
        jobDescription: `Position: Data Analyst. Python (Pandas/NumPy), SQL, Data Warehousing, and business storytelling.`,
        atsBaseline: 76,
        matchedKeywords: ['Python', 'SQL', 'Data Analysis', 'Git'],
        missingKeywords: ['Advanced SQL (Subqueries, Views, Indexing)', 'Data Visualization (PowerBI / Tableau)', 'IBM Cognitive Game Test'],
        skillsHave: [{ name: 'Python & SQL Analytics', level: 'Intermediate' }],
        skillsNeed: [{ name: 'SQL Query Tuning & Data Modeling', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Complex joins, star schema, ETL pipelines.' }],
        matchScores: [{ label: 'Data & Analytics', value: 76, color: 'green' }],
        interviewRounds: ['Round 1: Cognitive Games', 'Round 2: SQL & Coding OA', 'Round 3: Tech Interview', 'Round 4: HR'],
        roadmap: [{ id: 'm1', month: 'Month 1', title: 'Data Analytics Sprint', tasks: [{ id: 't1', label: 'Master advanced SQL and data modeling', done: false }] }]
      }
    ]
  }
]

// ─── 💰 SALARY GROUPS BENCHMARKS (FIX 4) ──────────────────────────────────
export const SALARY_GROUPS = {
  '5-8lpa': {
    id: '5-8lpa',
    key: '5-8lpa',
    name: '₹5–8 LPA Package Target',
    label: '₹5–8 LPA (Service-Based / IT Fast-Track)',
    badge: 'IT Fast-Track & Service Giants',
    typicalSalary: '₹5.0 - 8.5 LPA',
    companies: ['TCS (Digital)', 'Wipro (Turbo)', 'Infosys (DSE)', 'Cognizant (GenC Pro)', 'Accenture (AASE)', 'Capgemini (Exceller)', 'HCLTech'],
    overview: 'Target tier for high-intake IT service giants and fast-track digital developer tracks with competitive compensation.',
    jobDescription: `Target Track: ₹5–8 LPA Tier-1 IT & Digital Developer
Key Requirements:
- Deep command of OOPS in Java, C++, or Python with live coding fluency.
- Solid understanding of DBMS, SQL Joins, Normalization (1NF to 3NF), and ACID properties.
- Fast, accurate Quantitative and Logical Aptitude solving.
- Clear, professional English communication for Versant and interview rounds.
- Basic Data Structures (Arrays, Strings, Stacks, Queues, Sorting, Searching).`,
    atsBaseline: 75,
    matchedKeywords: ['Java', 'Python', 'C++', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Git', 'OOP', 'Data Structures'],
    missingKeywords: ['OOPS concepts in Java (Interfaces vs Abstract Classes)', 'DBMS Normalization & Complex Joins', 'Quantitative & Logical Aptitude Speed', 'Pseudocode Debugging', 'Communication & Spoken English (Versant)'],
    skillsHave: [
      { name: 'Core Language Syntax (Java/Python/C++)', level: 'Advanced' },
      { name: 'Basic Web Development (HTML/CSS)', level: 'Intermediate' },
      { name: 'Basic SQL Queries', level: 'Intermediate' }
    ],
    skillsNeed: [
      { name: 'Core Java + OOPS Implementation', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Live coding of Inheritance, Polymorphism, Abstract classes, Interface, and Exception Handling.' },
      { name: 'DBMS + SQL (Joins, Normalization, Keys)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Writing Inner/Outer joins, subqueries, primary/foreign keys, and 1NF to 3NF normalization.' },
      { name: 'Aptitude (Quantitative + Logical + Verbal)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Speed and accuracy in speed-distance, work-time, percentages, syllogisms, and coding-decoding.' },
      { name: 'Communication & GD / Versant Prep', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Spoken English fluency, active listening, and structured project explanations.' },
      { name: 'Basic DSA (Arrays, Strings, Sorting)', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Two pointers, palindrome checks, frequency maps, binary search.' },
      { name: 'Pseudocode & Code Debugging', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Predicting output of nested loops, bitwise operations, and recursion.' }
    ],
    matchScores: [
      { label: 'Quantitative & Logical Aptitude', value: 74, color: 'green' },
      { label: 'OOPS & Core Java Depth', value: 78, color: 'green' },
      { label: 'DBMS & SQL Mastery', value: 72, color: 'green' },
      { label: 'Spoken English & Communication', value: 70, color: 'green' },
      { label: 'ATS Alignment Score', value: 75 }
    ],
    interviewRounds: [
      'Round 1: Online Aptitude & Pseudocode Assessment (Quantitative, Logical, Verbal + Coding)',
      'Round 2: Spoken English / Communication Assessment (Versant / Automated AI)',
      'Round 3: Technical Interview (Live Java OOPS, SQL Queries & Academic Project)',
      'Round 4: Managerial & HR Interview'
    ],
    roadmap: [
      {
        id: 'm1',
        month: 'Month 1: Aptitude & Java OOPS Deep Dive',
        title: 'Aptitude & OOPS Foundations',
        tasks: [
          { id: 't1', label: 'Solve 200 previous year Aptitude & Logical reasoning questions (Indiabix/FacePrep)', done: false },
          { id: 't2', label: 'Master Java OOPS (Abstraction, Polymorphism, Interfaces, Collections Framework)', done: false },
          { id: 't3', label: 'Practice 50 Pseudocode and debugging problems', done: false }
        ]
      },
      {
        id: 'm2',
        month: 'Month 2: DBMS, SQL & Project Polish',
        title: 'SQL Mastery & Project Walkthrough',
        tasks: [
          { id: 't4', label: 'Master SQL: Inner/Left/Right Joins, Subqueries, Normalization, and ACID properties', done: false },
          { id: 't5', label: 'Polish final year academic project with clean architecture diagrams and live demo', done: false },
          { id: 't6', label: 'Practice speaking aloud 10 mock technical interview answers in fluent English', done: false }
        ]
      },
      {
        id: 'm3',
        month: 'Month 3: Mock Tests & Campus Drives',
        title: 'National Qualifier Tests & Drives',
        tasks: [
          { id: 't7', label: 'Take 5 full-length mock tests for TCS NQT, Wipro NLTH, and Accenture AASE', done: false },
          { id: 't8', label: 'Prepare HR questions: Tell me about yourself, Strengths/Weaknesses, Relocation', done: false }
        ]
      }
    ]
  },
  '8-12lpa': {
    id: '8-12lpa',
    key: '8-12lpa',
    name: '₹8–12 LPA Package Target',
    label: '₹8–12 LPA (Specialist Tracks / Tech Consulting)',
    badge: 'Premier Service Tracks & Mid-tier Product',
    typicalSalary: '₹8.5 - 12.0 LPA',
    companies: ['TCS (Prime)', 'Infosys (SP)', 'Deloitte (USI)', 'IBM (Associate Dev)', 'Capgemini (Senior Analyst)'],
    overview: 'Premier developer tier for competitive programmers, tech consultants, and enterprise full-stack developers.',
    jobDescription: `Target Track: ₹8–12 LPA Specialist Developer & Tech Consultant
Key Requirements:
- Strong problem solving in Data Structures (Trees, Graphs, DP, HashMaps).
- Full Stack development using Spring Boot, Node.js, or React.
- Database optimization, REST microservices design, and Consulting case solving.`,
    atsBaseline: 78,
    matchedKeywords: ['Java', 'Python', 'C++', 'Data Structures', 'Algorithms', 'SQL', 'REST APIs', 'Git'],
    missingKeywords: ['Competitive Programming (HackWithInfy / TCS Prime level)', 'Spring Boot / Node.js Microservices', 'Versant Spoken English & Case Analysis', 'Database Query Optimization'],
    skillsHave: [
      { name: 'Core Language Fundamentals', level: 'Advanced' },
      { name: 'Data Structures & Algorithms', level: 'Intermediate' },
      { name: 'Database Queries', level: 'Intermediate' }
    ],
    skillsNeed: [
      { name: 'Competitive Coding & Advanced DSA', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Clearing HackWithInfy, TCS Prime, or premier coding challenges (DP, Graphs, Trees).' },
      { name: 'Enterprise Backend (Spring Boot / Node.js)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Building secure RESTful microservices with JPA/Hibernate or Prisma.' },
      { name: 'Communication & Consulting Case Solving', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Versant spoken English test and client case walkthroughs.' }
    ],
    matchScores: [
      { label: 'Advanced Coding & DSA', value: 72, color: 'green' },
      { label: 'Enterprise Web & Backend', value: 78, color: 'green' },
      { label: 'Core CS (OS/DBMS/CN)', value: 80, color: 'green' },
      { label: 'ATS Alignment Score', value: 78 }
    ],
    interviewRounds: [
      'Round 1: Advanced Coding OA (3 Problems on HackWithInfy / TCS NQT Premier)',
      'Round 2: Technical Interview (DSA + Spring Boot / Full Stack Projects)',
      'Round 3: Versant / English Communication Assessment',
      'Round 4: Leadership & HR Interview'
    ],
    roadmap: [
      {
        id: 'm1',
        month: 'Month 1: Advanced Algorithms & DP',
        title: 'Hard DSA & Competitive Coding',
        tasks: [
          { id: 't1', label: 'Solve 60 LeetCode Medium/Hard DP and Graph problems', done: false },
          { id: 't2', label: 'Build a production microservice with Spring Boot / Node.js + PostgreSQL', done: false }
        ]
      }
    ]
  },
  '12-18lpa': {
    id: '12-18lpa',
    key: '12-18lpa',
    name: '₹12–18 LPA Package Target',
    label: '₹12–18 LPA (Product Startups / Mid-tier Product)',
    badge: 'High-Growth Startups & Product Tech',
    typicalSalary: '₹12.0 - 18.0 LPA',
    companies: ['Zomato', 'Paytm', 'PhonePe', 'Razorpay', 'Freshworks', 'Meesho', 'High-Growth AI Startup'],
    overview: 'High-impact product engineering tier requiring modern tech stack mastery, speed of execution, and clean coding.',
    jobDescription: `Target Track: ₹12–18 LPA Product Engineer
Key Requirements:
- Modern Full-Stack development (Next.js/React, TypeScript, Node.js, Python).
- Clean Code, Object-Oriented Design (SOLID), and Machine Coding in 90 minutes.
- Relational (PostgreSQL) and NoSQL (MongoDB/Redis) modeling.
- Strong practical problem solving in Data Structures.`,
    atsBaseline: 80,
    matchedKeywords: ['React', 'JavaScript (ES6+)', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Git'],
    missingKeywords: ['Machine Coding (90-min live OOP task)', 'Next.js 14 App Router & Server Components', 'Redis Caching & Queue Processing', 'Docker & CI/CD Pipelines'],
    skillsHave: [
      { name: 'React.js & Modern JavaScript', level: 'Advanced' },
      { name: 'REST API Integration', level: 'Proficient' },
      { name: 'Git & GitHub', level: 'Proficient' }
    ],
    skillsNeed: [
      { name: 'Machine Coding (90-minute Clean LLD)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Build modular, runnable applications with OOP design patterns and unit tests.' },
      { name: 'Modern Full-Stack (Next.js 14, TypeScript, PostgreSQL)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Server components, Prisma ORM, migrations, and authentication.' },
      { name: 'DSA - Trees, Graphs & Dynamic Programming', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'LeetCode Medium problem-solving fluency in 30 minutes.' }
    ],
    matchScores: [
      { label: 'Full-Stack Practical Engineering', value: 82, color: 'green' },
      { label: 'Machine Coding & LLD', value: 65, color: 'yellow' },
      { label: 'DSA & Problem Solving', value: 74, color: 'green' },
      { label: 'ATS Alignment Score', value: 80 }
    ],
    interviewRounds: [
      'Round 1: Online Coding Assessment (2-3 LeetCode Mediums)',
      'Round 2: Machine Coding Round (90 min) — Code a live object-oriented application',
      'Round 3: Problem Solving & Architecture Deep Dive',
      'Round 4: Engineering Manager & Founder Chat'
    ],
    roadmap: [
      {
        id: 'm1',
        month: 'Month 1: Machine Coding & Next.js 14',
        title: 'Modern Full-Stack & Clean OOP',
        tasks: [
          { id: 't1', label: 'Practice 4 full Machine Coding problems (Splitwise, Task Board, E-Commerce Cart)', done: false },
          { id: 't2', label: 'Deploy a full-stack Next.js 14 + TypeScript app with PostgreSQL & Auth', done: false }
        ]
      }
    ]
  },
  '18-25lpa': {
    id: '18-25lpa',
    key: '18-25lpa',
    name: '₹18–25 LPA Package Target',
    label: '₹18–25 LPA (Tier-1 Unicorns & Fintech)',
    badge: 'Tier-1 Unicorns & FinTech Leaders',
    typicalSalary: '₹18.0 - 25.0 LPA',
    companies: ['Flipkart', 'PhonePe', 'Razorpay', 'JPMorgan Chase', 'Oracle', 'Goldman Sachs'],
    overview: 'High-scale Indian product engineering and global fintech hubs processing millions of high-value transactions.',
    jobDescription: `Target Track: ₹18–25 LPA FinTech & Unicorn SDE
Key Requirements:
- Machine Coding & Low-Level Design (Design Patterns, SOLID, Class Architecture).
- Advanced DSA (Trees, Graphs, DP, Heaps, Binary Search).
- Distributed systems fundamentals (Kafka, Redis, Sharding, Database Locks).`,
    atsBaseline: 74,
    matchedKeywords: ['Java', 'C++', 'Python', 'Data Structures', 'SQL', 'REST APIs', 'Git', 'OOP'],
    missingKeywords: ['Machine Coding (Modular LLD in 90 mins)', 'Distributed Caching & Concurrency', 'Kafka Message Streaming', 'Transactional ACID & Idempotency'],
    skillsHave: [
      { name: 'Core Language (Java/C++/Go)', level: 'Advanced' },
      { name: 'Data Structures & Algorithms', level: 'Intermediate' }
    ],
    skillsNeed: [
      { name: 'Machine Coding (90-min Clean LLD)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Writing clean, testable, object-oriented code under strict timer.' },
      { name: 'Design Patterns (Factory, Strategy, Observer, State)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Applying GoF design patterns naturally to real-world software.' },
      { name: 'Concurrency, Thread Safety & Caching', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: 'Locks, atomic variables, Redis, rate limiters.' }
    ],
    matchScores: [
      { label: 'Machine Coding & LLD', value: 68, color: 'yellow' },
      { label: 'DSA & Problem Solving', value: 76, color: 'green' },
      { label: 'Systems & Concurrency', value: 65, color: 'yellow' },
      { label: 'ATS Alignment Score', value: 74 }
    ],
    interviewRounds: [
      'Round 1: Online Assessment (3 Coding Questions)',
      'Round 2: Machine Coding Round (90 min)',
      'Round 3: Problem Solving & DSA (60 min)',
      'Round 4: Architecture & Managerial Round'
    ],
    roadmap: [
      {
        id: 'm1',
        month: 'Month 1: LLD & Machine Coding Sprint',
        title: 'Machine Coding Mastery',
        tasks: [
          { id: 't1', label: 'Implement Snake & Ladder, Splitwise, and Parking Lot in 90 mins', done: false },
          { id: 't2', label: 'Solve 40 LeetCode Medium/Hard Tree and Graph questions', done: false }
        ]
      }
    ]
  },
  '25lpa+': {
    id: '25lpa+',
    key: '25lpa+',
    name: '₹25 LPA+ Package Target',
    label: '₹25 LPA+ (FAANG & Top Global Product)',
    badge: 'FAANG / Top Tier Global Tech',
    typicalSalary: '₹28.0 - 55.0 LPA',
    companies: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Goldman Sachs', 'Uber'],
    overview: 'Highest tier of global software engineering compensation requiring algorithmic brilliance and system excellence.',
    jobDescription: `Target Track: ₹25 LPA+ FAANG & Tier-1 Global Engineering
Key Requirements:
- Mastery of LeetCode Hard Data Structures & Algorithms (Graphs, DP, Trees, Segment Trees).
- Low-Level Design (SOLID, OOD) & High-Level System Architecture basics.
- Deep language mastery, memory models, concurrency, and behavioral leadership (STAR method).`,
    atsBaseline: 70,
    matchedKeywords: ['Java', 'C++', 'Go', 'Data Structures & Algorithms', 'System Architecture', 'SQL', 'Git', 'Linux'],
    missingKeywords: ['Hard Dynamic Programming & Graph Algorithms', 'Low-Level Design (SOLID Principles & GoF Patterns)', 'Distributed Systems & Microservices Scalability', 'Behavioral Leadership (Amazon LP / Googleyness / STAR Method)'],
    skillsHave: [
      { name: 'Core Programming Language', level: 'Advanced' },
      { name: 'Standard DSA (Binary Search, Sorting)', level: 'Intermediate' },
      { name: 'Git & Linux Basics', level: 'Proficient' }
    ],
    skillsNeed: [
      { name: 'Hard Algorithmic Problem Solving (DSA)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'LeetCode Hard graphs, dynamic programming, tree traversals, shortest path, and bit manipulation.' },
      { name: 'Low-Level Design (LLD & SOLID)', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Class diagrams, design patterns, modular architecture, and edge-case handling.' },
      { name: 'System Design Basics & Concurrency', priority: 'High', priorityClass: 'high', emoji: '🔴', desc: 'Distributed caching, load balancing, message queues, database sharding, thread safety.' },
      { name: 'Behavioral Leadership (STAR Method)', priority: 'Medium', priorityClass: 'medium', emoji: '🟡', desc: '14 Amazon Leadership Principles, Googleyness, Bar Raiser preparation.' }
    ],
    matchScores: [
      { label: 'Hard DSA Problem Solving', value: 60, color: 'yellow' },
      { label: 'Object-Oriented Design (LLD)', value: 65, color: 'yellow' },
      { label: 'System Architecture & Concurrency', value: 58, color: 'yellow' },
      { label: 'Behavioral & Leadership (STAR)', value: 55, color: 'red' },
      { label: 'ATS Alignment Score', value: 70 }
    ],
    interviewRounds: [
      'Round 1: Online Assessment (2 LeetCode Medium/Hard DSA questions)',
      'Round 2: Technical Interview 1 — Advanced Graph / Tree Algorithms',
      'Round 3: Technical Interview 2 — Object-Oriented Design (LLD) & Concurrency',
      'Round 4: Technical Interview 3 — Dynamic Programming & Edge Case Handling',
      'Round 5: Bar Raiser / Leadership Round (STAR Behavioral Framework)'
    ],
    roadmap: [
      {
        id: 'm1',
        month: 'Month 1: DSA Mastery & Hard LeetCode Patterns',
        title: 'Master Top FAANG LeetCode Patterns',
        tasks: [
          { id: 't1', label: 'Solve 60 LeetCode Medium/Hard questions (Trees, Graphs, DP, Disjoint Set Union)', done: false },
          { id: 't2', label: 'Master topological sort, Dijkstra, Bridges in Graphs, and Segment Trees', done: false }
        ]
      },
      {
        id: 'm2',
        month: 'Month 2: Object-Oriented Design & System Fundamentals',
        title: 'Low-Level Design & Concurrency',
        tasks: [
          { id: 't3', label: 'Implement 6 GoF Design Patterns and SOLID principles in clean Java/C++', done: false },
          { id: 't4', label: 'Design Elevator System, Amazon Locker, and Parking Lot with class diagrams', done: false },
          { id: 't5', label: 'Study Distributed Caching, Message Queues (Kafka), and Database Sharding', done: false }
        ]
      },
      {
        id: 'm3',
        month: 'Month 3: Mock Interviews & Bar Raiser Prep',
        title: 'Full Simulation & Application Sprint',
        tasks: [
          { id: 't6', label: 'Conduct 6 timed Pramp/Peer mock interviews with 45-min timer constraints', done: false },
          { id: 't7', label: 'Prepare 10 STAR stories mapped to Leadership Principles and Googleyness', done: false },
          { id: 't8', label: 'Reach out to 20 SDEs for Employee Referrals on LinkedIn', done: false }
        ]
      }
    ]
  }
}

// ─── 40 ONBOARDING SKILLS CATALOG (FIX 2) ───────────────────────────────
export const ONBOARDING_SKILL_CATEGORIES = [
  {
    category: 'Languages',
    icon: '💻',
    skills: ['Java', 'C++', 'Python', 'JavaScript', 'TypeScript', 'Go', 'SQL', 'C']
  },
  {
    category: 'Frontend',
    icon: '🎨',
    skills: ['React', 'HTML/CSS', 'Vue.js', 'Angular', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    icon: '⚙️',
    skills: ['Node.js', 'Express.js', 'Spring Boot', 'Django', 'FastAPI']
  },
  {
    category: 'Database',
    icon: '🗄️',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis']
  },
  {
    category: 'DSA Level',
    icon: '🧠',
    skills: ['Arrays/Strings only', 'Basic Trees/Graphs', 'Medium DSA', 'Advanced DSA (DP/Graphs)']
  },
  {
    category: 'Tools & Cloud',
    icon: '🛠️',
    skills: ['Git/GitHub', 'Docker', 'Postman', 'Linux/Bash', 'AWS basics']
  },
  {
    category: 'CS Fundamentals',
    icon: '📚',
    skills: ['OOPS', 'DBMS', 'OS', 'Computer Networks']
  }
]

// ─── HELPER: GET ACTIVE ANALYSIS (COMPANY OR SALARY GROUP) ───────────────
export function getCompanyAnalysis(companyId = 'amazon', roleId = 'amazon-sde1', mode = 'company', salaryGroupKey = '5-8lpa') {
  // Check if salary group mode
  const effectiveMode = mode || localStorage.getItem('skillgap_mode') || 'company'
  const effectiveSalaryGroup = salaryGroupKey || localStorage.getItem('skillgap_salary_group') || '5-8lpa'

  if (effectiveMode === 'salary') {
    const group = SALARY_GROUPS[effectiveSalaryGroup] || SALARY_GROUPS['5-8lpa']
    return {
      mode: 'salary',
      id: group.id,
      key: group.key,
      companyName: group.name,
      roleTitle: group.label,
      badge: group.badge,
      category: 'Salary Target',
      typicalSalary: group.typicalSalary,
      companiesIncluded: group.companies,
      jobDescription: group.jobDescription,
      atsBaseline: group.atsBaseline,
      matchedKeywords: group.matchedKeywords,
      missingKeywords: group.missingKeywords,
      skillsHave: group.skillsHave,
      skillsNeed: group.skillsNeed,
      matchScores: group.matchScores,
      interviewRounds: group.interviewRounds,
      roadmap: group.roadmap
    }
  }

  // Company mode
  const company = TARGET_COMPANIES.find(c => c.id === companyId) || TARGET_COMPANIES[0]
  const role = company.roles.find(r => r.id === roleId) || company.roles[0]

  return {
    mode: 'company',
    company,
    role,
    id: `${company.id}_${role.id}`,
    companyId: company.id,
    roleId: role.id,
    companyName: company.name,
    roleTitle: role.title,
    badge: company.badge,
    category: company.category,
    categoryGroup: company.categoryGroup,
    typicalSalary: role.salary,
    jobDescription: role.jobDescription,
    atsBaseline: role.atsBaseline,
    matchedKeywords: role.matchedKeywords,
    missingKeywords: role.missingKeywords,
    skillsHave: role.skillsHave,
    skillsNeed: role.skillsNeed,
    matchScores: role.matchScores,
    interviewRounds: role.interviewRounds,
    roadmap: role.roadmap
  }
}
