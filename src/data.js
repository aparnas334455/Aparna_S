export const profile = {
  name: 'Aparna S',
  title: 'M.Sc. Microbiologist',
  tagline:
    'Research-driven microbiologist with hands-on experience at BARC and ICMR-NIRT — molecular biology, gamma radiation mutagenesis, microbial culturing and laboratory analytics.',
  location: 'Palakkad, Kerala',
  phone: '8714958606',
  email: 'aparnas334455@gmail.com',
  linkedin: 'https://linkedin.com/in/aparna-s-1ba391269',
  photo: '/images/profile.jpg',
  cv: '/Aparna_S_CV.pdf',
  about:
    'I am a Master of Science graduate in Microbiology with a strong foundation in molecular biology, fermentation studies and medical microbiology. My training spans premier institutions — the Bhabha Atomic Research Centre, ICMR-National Institute for Research in Tuberculosis and the Food Corporation of India. I am dedicated to advancing medical microbiology and biotechnology innovation.',
}

export const stats = [
  { value: '8.98', label: 'M.Sc. CGPA' },
  { value: '3', label: 'Internships' },
  { value: '2', label: 'Research projects' },
  { value: '11', label: 'Certificates' },
]

export const education = [
  {
    degree: 'Master of Science in Microbiology',
    place: 'Bharathidasan University, Tiruchirappalli, Tamil Nadu',
    years: '2024 – 2026',
    score: '8.98 CGPA',
  },
  {
    degree: 'Bachelor of Science in Microbiology',
    place: 'Govt. Arts & Science College, Kozhinjampara, Palakkad — University of Calicut, Kerala',
    years: '2021 – 2024',
    score: '8.29 CGPA',
  },
]

export const skills = {
  'Laboratory & Microbiology': [
    'Microbial Isolation and Identification',
    'Microscopy',
    'Biochemical Assays and Analysis',
    'Antibiotic Susceptibility Testing',
    'Fermentation Studies',
    'Mutant Screening',
    'Aseptic Handling',
  ],
  'Molecular & Immunological': [
    'DNA, RNA and Plasmid Isolation',
    'PCR',
    'Gel Electrophoresis',
    'Protein Extraction',
    'PAGE',
    'Zymography',
    'ELISA',
    'Immunological Techniques',
  ],
  'Professional': [
    'Scientific Documentation',
    'Report Writing',
    'Analytical Thinking',
    'Experimental Planning',
    'Team Collaboration',
    'Problem-Solving',
    'MS Excel, Word & PowerPoint',
    'Quick Learning',
  ],
}

export const projects = [
  {
    level: 'M.Sc. Dissertation',
    title: 'Strain Improvement of Saccharomyces cerevisiae through Gamma Radiation for Bioethanol Production',
    place: 'NABTD, Bhabha Atomic Research Centre, Mumbai',
    points: [
      'Performed gamma radiation-induced mutagenesis to develop ethanol-tolerant and thermotolerant yeast strains for enhanced bioethanol production.',
      'Screened irradiated strains under varying ethanol concentrations to evaluate improved ethanol tolerance and stress adaptability.',
      'Assessed fermentation efficiency and ethanol production of mutant strains under different glucose concentrations and temperatures.',
      'Compared wild-type and mutant yeast strains using microbial growth studies and enzyme assays.',
    ],
    tags: ['Mutagenesis', 'Fermentation', 'Bioethanol', 'Enzyme assays'],
  },
  {
    level: 'B.Sc. Project',
    title: 'Investigating the Drug-Resistant Pattern of Vancomycin-Resistant Bacteria Isolated from Various Sources of the Palakkad Region',
    place: 'Govt. Arts & Science College, Kozhinjampara',
    points: [
      'Isolated bacterial strains from different water sources in the Palakkad region using standard microbiological techniques.',
      'Evaluated antimicrobial resistance patterns of isolates through antibiotic susceptibility testing.',
      'Performed cultural and biochemical characterisation of resistant isolates for preliminary identification.',
      'Conducted molecular-level identification of the most resistant bacterial strain.',
    ],
    tags: ['AMR', 'Susceptibility testing', 'Molecular ID'],
  },
]

export const internships = [
  {
    org: 'Bhabha Atomic Research Centre (BARC)',
    unit: 'Nuclear Agriculture and Biotechnology Division',
    place: 'Mumbai',
    period: '01 Jan 2026 – 15 Apr 2026',
    note: 'Dissertation training on gamma-radiation strain improvement of S. cerevisiae for bioethanol, under Dr. Kuber C. Bhainsa.',
    cert: 'barc',
  },
  {
    org: 'Food Corporation of India',
    unit: 'Regional Office',
    place: 'Chennai',
    period: '04 Jun 2025 – 13 Jun 2025',
    note: 'Completed internship programme; performance and conduct certified as good.',
    cert: 'fci',
  },
  {
    org: 'ICMR – National Institute for Research in Tuberculosis',
    unit: 'Department of Virology and Biotechnology',
    place: 'Chennai',
    period: '13 May 2025 – 02 Jun 2025',
    note: 'Learned immunological techniques for HIV diagnosis and monitoring, universal precautions and safe handling of infectious specimens.',
    cert: 'icmr',
  },
]

export const interests = [
  'Clinical and Medical Microbiology',
  'Molecular Biology and Microbial Genetics',
  'Microbiome Studies',
  'Virology and Emerging Infectious Diseases',
  'Immunology and Host–Pathogen Interactions',
  'Bioinformatics and Microbial Genomics',
]

export const languages = ['English', 'Malayalam', 'Tamil']

export const certificates = [
  { id: 'barc', title: 'Project Training Certificate', issuer: 'Bhabha Atomic Research Centre', date: 'Jan – Apr 2026', category: 'Internship', img: '/certs/barc.jpg' },
  { id: 'fci', title: 'Internship Certificate', issuer: 'Food Corporation of India, Chennai', date: 'Jun 2025', category: 'Internship', img: '/certs/fci.jpg' },
  { id: 'icmr', title: 'Internship Certificate', issuer: 'ICMR – NIRT, Chennai', date: 'May – Jun 2025', category: 'Internship', img: '/certs/icmr-nirt.jpg' },
  { id: 'rna', title: 'RNA Biology', issuer: 'NPTEL — IISER Mohali', date: 'Jan – Apr 2025', category: 'Course', img: '/certs/rna-biology.jpg' },
  { id: 'rm', title: 'Research Methodology (Elite)', issuer: 'NPTEL — IIT Madras', date: 'Jul – Sep 2025', category: 'Course', img: '/certs/research-methodology.jpg' },
  { id: 'mbsi', title: 'Annual Membership 2025–2026', issuer: 'Microbiologists Society, India', date: 'Oct 2025', category: 'Membership', img: '/certs/mbsi.jpg' },
  { id: 'cutn', title: 'Recent Advances in Biomedical Sciences for Drug Discovery', issuer: 'Central University of Tamil Nadu', date: '20 – 21 Jul 2026', category: 'Workshop', img: '/certs/cutn-workshop.jpg' },
  { id: 'chlorella', title: 'Chlorella Genomics, Cultivation, Processing and Value-Added Product', issuer: 'TNSCST & NRMC-F, Bharathidasan University', date: '1 – 3 Sep 2025', category: 'Workshop', img: '/certs/chlorella-workshop.jpg' },
  { id: 'webinar', title: 'Bioprocessing of Secondary Metabolites', issuer: 'Microbiologists Society, India — International Experts’ Talk', date: '10 Apr 2025', category: 'Seminar', img: '/certs/webinar.jpg' },
  { id: 'vector', title: 'Vector Borne Diseases and Their Control', issuer: 'Bharathidasan University — National Seminar', date: '25 Sep 2024', category: 'Seminar', img: '/certs/vector-borne.jpg' },
  { id: 'sustain', title: 'Sustainable Future through Microbial Innovations', issuer: 'GASC Kozhinjampara — National Seminar', date: '12 – 13 Oct 2023', category: 'Seminar', img: '/certs/sustainable-future.jpg' },
]
