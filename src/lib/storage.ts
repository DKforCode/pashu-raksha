// Local storage utility for managing farm data

export interface Animal {
  id: string;
  barcode: string;
  category: string;
  breed: string;
  dob: string;
  weight: number;
  district: string;
  state: string;
  registrationDate: string;
}

export interface VaccinationRecord {
  id: string;
  date: string;
  animalBarcode: string;
  animalCategory: string;
  breed: string;
  vaccineName: string;
  doctorName: string;
  nextDate: string;
}

export interface HealthCheckup {
  id: string;
  date: string;
  animalBarcode: string;
  animalCategory: string;
  breed: string;
  weight: number;
  condition: string;
  diseaseName?: string;
  prevention?: string;
  notes?: string;
}

export interface DiseaseOutbreak {
  id: string;
  date: string;
  diseaseName: string;
  animalBarcode: string;
  preventionMethod: string;
  status: string;
}

export interface Visitor {
  id: string;
  date: string;
  name: string;
  dob?: string;
  mobile: string;
  address?: string;
  purpose: string;
}

export interface RiskAssessment {
  id: string;
  date: string;
  score: number;
  answers: Record<string, string>;
}

// Initialize with example data
const EXAMPLE_ANIMALS: Animal[] = [
  {
    id: "1",
    barcode: "PIG001234567",
    category: "Pig",
    breed: "Large White",
    dob: "2024-03",
    weight: 85.5,
    district: "Pune",
    state: "Maharashtra",
    registrationDate: "2025-01-15"
  },
  {
    id: "2",
    barcode: "PIG001234568",
    category: "Pig",
    breed: "Duroc",
    dob: "2024-05",
    weight: 72.3,
    district: "Pune",
    state: "Maharashtra",
    registrationDate: "2025-02-10"
  },
  {
    id: "3",
    barcode: "PLT001234569",
    category: "Poultry",
    breed: "Broiler",
    dob: "2025-01",
    weight: 2.8,
    district: "Nashik",
    state: "Maharashtra",
    registrationDate: "2025-03-05"
  }
];

const EXAMPLE_VACCINATIONS: VaccinationRecord[] = [
  {
    id: "1",
    date: "2025-03-10",
    animalBarcode: "PIG001234567",
    animalCategory: "Pig",
    breed: "Large White",
    vaccineName: "Swine Fever Vaccine",
    doctorName: "Dr. Ramesh Kumar",
    nextDate: "2025-06-10"
  },
  {
    id: "2",
    date: "2025-03-15",
    animalBarcode: "PLT001234569",
    animalCategory: "Poultry",
    breed: "Broiler",
    vaccineName: "Newcastle Disease Vaccine",
    doctorName: "Dr. Priya Sharma",
    nextDate: "2025-04-15"
  }
];

const EXAMPLE_HEALTH_CHECKUPS: HealthCheckup[] = [
  {
    id: "1",
    date: "2025-03-20",
    animalBarcode: "PIG001234567",
    animalCategory: "Pig",
    breed: "Large White",
    weight: 85.5,
    condition: "healthy",
    notes: "Animal in excellent health, normal activity levels"
  },
  {
    id: "2",
    date: "2025-03-18",
    animalBarcode: "PIG001234568",
    animalCategory: "Pig",
    breed: "Duroc",
    weight: 72.3,
    condition: "healthy",
    notes: "Good appetite and normal behavior"
  }
];

const EXAMPLE_OUTBREAKS: DiseaseOutbreak[] = [
  {
    id: "1",
    date: "2025-02-25",
    diseaseName: "Foot and Mouth Disease",
    animalBarcode: "PIG001234570",
    preventionMethod: "Immediate isolation, vaccination of herd, disinfection of premises",
    status: "Resolved"
  }
];

const EXAMPLE_VISITORS: Visitor[] = [
  {
    id: "1",
    date: "2025-03-25",
    name: "Rajesh Patil",
    dob: "1985-06-15",
    mobile: "9876543210",
    address: "Village Khandala, Pune, Maharashtra",
    purpose: "Feed supplier delivery"
  },
  {
    id: "2",
    date: "2025-03-24",
    name: "Dr. Suresh Deshmukh",
    mobile: "9823456789",
    address: "Animal Hospital, Nashik Road",
    purpose: "Routine health inspection"
  }
];

const EXAMPLE_ASSESSMENTS: RiskAssessment[] = [
  {
    id: "1",
    date: "2025-03-25",
    score: 85,
    answers: {
      biosecurity_protocols: "Yes, strictly",
      visitor_management: "Always",
      animal_health: "All healthy",
      cleaning_schedule: "On schedule",
      feed_quality: "Excellent"
    }
  }
];

// Initialize storage with example data if empty
const initializeStorage = () => {
  if (!localStorage.getItem('animals')) {
    localStorage.setItem('animals', JSON.stringify(EXAMPLE_ANIMALS));
  }
  if (!localStorage.getItem('vaccinations')) {
    localStorage.setItem('vaccinations', JSON.stringify(EXAMPLE_VACCINATIONS));
  }
  if (!localStorage.getItem('healthCheckups')) {
    localStorage.setItem('healthCheckups', JSON.stringify(EXAMPLE_HEALTH_CHECKUPS));
  }
  if (!localStorage.getItem('outbreaks')) {
    localStorage.setItem('outbreaks', JSON.stringify(EXAMPLE_OUTBREAKS));
  }
  if (!localStorage.getItem('visitors')) {
    localStorage.setItem('visitors', JSON.stringify(EXAMPLE_VISITORS));
  }
  if (!localStorage.getItem('assessments')) {
    localStorage.setItem('assessments', JSON.stringify(EXAMPLE_ASSESSMENTS));
  }
};

// Generic storage functions
export const getItems = <T>(key: string): T[] => {
  initializeStorage();
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
};

export const addItem = <T>(key: string, item: T): void => {
  const items = getItems<T>(key);
  items.push(item);
  localStorage.setItem(key, JSON.stringify(items));
};

export const updateItem = <T extends { id: string }>(key: string, id: string, updates: Partial<T>): void => {
  const items = getItems<T>(key);
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    localStorage.setItem(key, JSON.stringify(items));
  }
};

export const deleteItem = (key: string, id: string): void => {
  const items = getItems<any>(key);
  const filtered = items.filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(filtered));
};

// Specific getters
export const getAnimals = () => getItems<Animal>('animals');
export const getVaccinations = () => getItems<VaccinationRecord>('vaccinations');
export const getHealthCheckups = () => getItems<HealthCheckup>('healthCheckups');
export const getOutbreaks = () => getItems<DiseaseOutbreak>('outbreaks');
export const getVisitors = () => getItems<Visitor>('visitors');
export const getAssessments = () => getItems<RiskAssessment>('assessments');

// Specific adders
export const addAnimal = (animal: Animal) => addItem('animals', animal);
export const addVaccination = (vaccination: VaccinationRecord) => addItem('vaccinations', vaccination);
export const addHealthCheckup = (checkup: HealthCheckup) => addItem('healthCheckups', checkup);
export const addOutbreak = (outbreak: DiseaseOutbreak) => addItem('outbreaks', outbreak);
export const addVisitor = (visitor: Visitor) => addItem('visitors', visitor);
export const addAssessment = (assessment: RiskAssessment) => addItem('assessments', assessment);

// Get animal by barcode
export const getAnimalByBarcode = (barcode: string): Animal | undefined => {
  const animals = getAnimals();
  return animals.find(a => a.barcode === barcode);
};

// Generate barcode
export const generateBarcode = (category: string): string => {
  const prefix = category === "Pig" ? "PIG" : "PLT";
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}${timestamp}${random}`;
};
