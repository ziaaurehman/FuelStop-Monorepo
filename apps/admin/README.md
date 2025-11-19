# FuelStop - Fleet Management Dashboard

A modern, full-stack fleet management application built with Next.js 16, Turborepo, and TypeScript.

## 📁 Project Structure

fuelstop/
├── apps/
│   └── admin
│       └── src/
│           ├── app/
│           │   ├── (dashboard)/           # All dashboard routes under group
│           │   │   ├── page.tsx           # Dashboard Home
│           │   │   ├── orders/
│           │   │   │   └── page.tsx
│           │   │   ├── drivers/
│           │   │   │   └── page.tsx
│           │   │   ├── clients/
│           │   │   │   └── page.tsx
│           │   │   ├── delivery-schedule/
│           │   │   │   └── page.tsx
│           │   │   ├── reports/
│           │   │   │   └── page.tsx
│           │   │   ├── billing/
│           │   │   │   └── page.tsx
│           │   │   ├── settings/
│           │   │   │   ├── page.tsx       # Settings Overview
│           │   │   │   ├── general/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── admin-role/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── fuel-price/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── notifications/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── security/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── api-key/
│           │   │   │   │   └── page.tsx
│           │   │   │   ├── integrations/
│           │   │   │   │   └── page.tsx
│           │   │   │   └── localization/
│           │   │   │       └── page.tsx
│           │   │   └── support/
│           │   │       └── page.tsx
│           │   └── layout.tsx
│           │
│           ├── components/
│           │   ├── pages/                     # Page-specific components
│           │   │   ├── dashboard/
│           │   │   ├── orders/
│           │   │   ├── drivers/
│           │   │   ├── clients/
│           │   │   ├── delivery-schedule/
│           │   │   ├── reports/
│           │   │   ├── billing/
│           │   │   ├── settings/
│           │   │   └── support/
│           │   │
│           │   ├── layout/                    # Layout components (Sidebar, Header, etc.)
│           │   │   ├── Sidebar.tsx
│           │   │   ├── Header.tsx
│           │   │   ├── Navigation.tsx
│           │   │   └── DashboardLayout.tsx
│           │   │
│           │   └── misc/                      # Miscellaneous reusable components
│           │       ├── LoadingSpinner.tsx
│           │       ├── EmptyState.tsx
│           │       ├── ErrorBoundary.tsx
│           │       └── Modal.tsx
│           │
│           ├── data/                          # Mock data
│           ├── lib/                           # Utilities
│           └── types/                         # TypeScript types
│
└── packages/
    └── components/                        # Reusable UI package
        ├── ui/                            # shadcn/ui components
        └── index.ts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The app will be available at `http://localhost:3003`

## 🧩 Component Architecture

### Shared Components (@repo/components)

Located in `packages/ui/components/`, these are reusable across apps:

```typescript
// Usage example
import { Button, Card, Badge } from "@repo/components";
import { Avatar, AvatarImage } from "@repo/components";
```

**Available Components:**
- Button, Input, Label, Textarea
- Card, CardHeader, CardContent
- Badge, Avatar, Checkbox
- Select, Dropdown, Dialog, Drawer
- Table, DataTable
- Chart components (Recharts)


## 📊 Creating New Components

### 1. Shared Component (Reusable)

Create in `packages/components/src/shared`:

```typescript
// packages/components/src/shared/custom-card.tsx
export function CustomCard({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

// Export in packages/components/src/shared/index.ts
export * from "./custom-card";
```

### 2. Feature Component (App-specific)

For Pages: Create in `src/components/[page]/`:
For Layout: Create in `src/components/layout/`:
For Misc: Create in `src/components/misc/`:

```typescript
"use client";

import { Card, CardContent } from "@repo/components";

export function StatsCard({ stat }: { stat: Stat }) {
  return (
    <Card>
      <CardContent>{/* ... */}</CardContent>
    </Card>
  );
}


```

### 3. Page Component

for Dashboard Layout: Create in `src/app/(dashboard)/[page]/page.tsx`:
for Blank Layout: Create in `src/app/(blank)/[page]/page.tsx`:

```typescript
"use client";

import { StatsCard } from "@/components/analytics/stats-card";

export default function AnalyticsPage() {
  return (
    <div>
      <StatsCard />
    </div>
  );
}
```

## 🗂️ Data Management

### Mock Data Structure

Located in `src/data/`:

```typescript
// data/orders.ts
export type Order = {
  id: string;
  client: string;
  // ... other fields
};

export const orders: Order[] = [/* ... */];
```

### Usage in Components

```typescript
import { orders, Order } from "@/data";

export function OrderList() {
  return orders.map((order) => <OrderCard key={order.id} order={order} />);
}
```

## 🎨 Styling Guidelines

### Tailwind CSS

We use Tailwind CSS for styling:

```typescript
<div className="flex items-center gap-4 p-6 rounded-lg">
  {/* content */}
</div>
```

### Common Patterns

**Responsive Grid:**
```typescript
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
```

**Card Layout:**
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>{/* content */}</CardContent>
</Card>
```

**Color System:**
- `bg-primary` / `text-primary` / `hover:bg-primary-foreground` - Primary brand color
- `bg-primary-light` / `text-primary-light` - Light Primary brand color
- `bg-secondary` / `text-secondary` - Secondary brand color
- `bg-secondary-light` / `text-secondary-light` - Light Secondary brand color
- `bg-muted` / `text-muted-foreground` - Subtle backgrounds

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Usage
```typescript
<div className="p-4 md:p-8">           {/* Padding */}
<div className="grid-cols-1 lg:grid-cols-3">  {/* Columns */}
<div className="hidden md:block">       {/* Visibility */}
```

## 🔄 State Management

### Client Components

Use React hooks for local state:

```typescript
"use client";

import { useState } from "react";

export function Component() {
  const [data, setData] = useState([]);
  // ... component logic
}
```

## Key Features

### 1. **Dashboard**
- Real-time fuel analytics & KPIs
- Live delivery status overview
- Revenue & cost trends at a glance

> `/(dashboard)/page.tsx` | `components/pages/dashboard/*`

---

### 2. **Orders**
- Full order lifecycle management
- Advanced filtering (status, date, client, driver)
- Bulk actions & driver assignment

> `/orders` | `components/pages/orders/*`

---

### 3. **Drivers**
- Driver profiles & performance tracking
- Assignment history & availability
- Real-time location & status

> `/drivers` | `components/pages/drivers/*`

---

### 4. **Clients**
- Client database with contact & contract details
- Order history per client
- Credit limits & payment terms

> `/clients` | `components/pages/clients/*`

---

### 5. **Delivery Schedule**
- Calendar-based scheduling
- Drag & drop rescheduling
- Conflict detection & route optimization

> `/delivery-schedule` | `components/pages/delivery-schedule/*`

---

### 6. **Reports**
- Comprehensive fuel usage reports
- Consumption trends & savings analysis
- Exportable charts (PNG, CSV, PDF)

> `/reports` | `components/pages/reports/*`

---

### 7. **Billing & Invoices**
- Automated invoice generation
- Payment status tracking (Paid, Pending, Overdue)
- PDF export & email delivery
- Payment gateway integration

> `/billing` | `components/pages/billing/*`

---

### 8. **Settings**
#### Sub-sections:
| Section | Features |
|-------|---------|
| **General** | Platform name, timezone, currency |
| **Admin Role** | Role-based access control (RBAC), permissions |
| **Fuel Price** | Dynamic pricing rules, tax configurations |
| **Notifications** | Email, SMS, in-app alerts |
| **Security** | 2FA, login audit, session management |
| **API Key** | Generate, revoke, scope-based keys |
| **Integrations** | Connect ERP, accounting, telematics |
| **Localization** | Multi-language, date/number formats |

> `/settings/*` | `components/pages/settings/*`

---

### 9. **Support**
- Interactive **AI-powered chatbot** (24/7)
- **FAQ accordion** with search
- **Contact form** with file attachment
- Ticket history & status

> `/support` | `components/pages/support/*`

---

## Component Architecture

| Folder | Purpose |
|------|--------|
| `components/pages/` | Page-specific UI components (modals, tables, charts) |
| `components/layout/` | Reusable layout wrappers (`DashboardLayout`, `Sidebar`, `Header`) |
| `components/misc/` | Utility components (`Loading`, `EmptyState`, `Modal`, `Toast`) |

---

## 🎯 Best Practices

### Component Structure
```typescript
"use client"; // Only if client-side needed

import { ... } from "@repo/components";
import { ... } from "@/components";
import { type } from "@/types";

interface ComponentProps {
  // ... props
}

export function Component({ ...props }: ComponentProps) {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Handlers
  const handleClick = () => {};
  
  // 3. Render
  return <div>...</div>;
}
```

### File Naming
- Components: `kebab-case.tsx`
- Types: `PascalCase`
- Functions: `camelCase`

### Imports Order
1. React
2. Third-party libraries
3. @repo/components
4. Local components
5. Types
6. Utils

## 🚢 Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Follow the component structure
2. Use TypeScript for type safety
3. Follow responsive design patterns
4. Test on mobile and desktop
5. Document complex components
