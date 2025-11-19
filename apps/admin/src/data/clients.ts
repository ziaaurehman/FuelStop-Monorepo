export type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  receivables: string;
  unusedCredits: string;
  status: "active" | "on break" | "offline";
  avatar?: string;
};

export const clients: Client[] = [
  {
    id: "C-001",
    name: "Dianne Russell",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(207) 555-0119",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "offline",
  },
  {
    id: "C-002",
    name: "Savannah Nguyen",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(270) 555-0117",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "active",
  },
  {
    id: "C-003",
    name: "Jacob Jones",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(303) 555-0105",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "active",
  },
  {
    id: "C-004",
    name: "Albert Flores",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(302) 555-0107",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "active",
  },
  {
    id: "C-005",
    name: "Esther Howard",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(702) 555-0122",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "active",
  },
  {
    id: "C-006",
    name: "Cody Fisher",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(316) 555-0116",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "active",
  },
  {
    id: "C-007",
    name: "Marvin McKinney",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(201) 555-0124",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "on break",
  },
  {
    id: "C-008",
    name: "Floyd Miles",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(671) 555-0110",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "on break",
  },
  {
    id: "C-009",
    name: "Darlene Robertson",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(225) 555-0118",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "on break",
  },
  {
    id: "C-010",
    name: "Robert Fox",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(684) 555-0102",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "offline",
  },
  {
    id: "C-011",
    name: "Guy Hawkins",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(208) 555-0112",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "offline",
  },
  {
    id: "C-012",
    name: "Darrell Steward",
    company: "Metro Gas Station",
    email: "ex@fuelstop.com",
    phone: "(307) 555-0133",
    receivables: "$0.00",
    unusedCredits: "$0.00",
    status: "offline",
  },
];
