# Clinic Management API

سیستم مدیریت کلینیک - Node.js + Express + MongoDB

## Setup

```bash
npm install
# Set MONGO_URI in .env
node app.js
```

## API Endpoints

### Customer (فرم مریض)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/customer` | ایجاد مریض جدید |
| GET | `/api/customer?fromDate=&toDate=` | لیست مریض‌ها + جمع سهم کلینیک |
| GET | `/api/customer/:id` | دریافت یک مریض |
| PUT | `/api/customer/:id` | ویرایش مریض |
| DELETE | `/api/customer/:id` | حذف مریض |

**Create Body Example:**
```json
{
  "patientName": "علی حسینی",
  "surgery": { "surgeryId": "...", "price": 5000000 },
  "doctor": { "doctorId": "...", "percent": 30, "price": 1500000 },
  "initialCosts": [{ "initialPriceId": "...", "price": 2000000 }],
  "reagent": { "reagentId": "...", "percent": 10, "price": 500000 },
  "assist": { "assistId": "...", "desc": "توضیحات", "price": 300000 },
  "sharedCosts": [{ "sharedId": "...", "date": "1403/06/15", "price": 100000 }],
  "deposit": [{ "desc": "واریز اول", "date": "1403/06/10", "price": 3000000 }],
  "hospital": [{ "hospitalId": "...", "desc": "اتاق عمل", "price": 1000000 }],
  "date": "1403/06/15",
  "clinicPrice": 2000000
}
```

---

### Surgery, Doctor, InitialCost, Reagent, Assist, SharedCost, Hospital
هر کدام دارای CRUD استاندارد + specialList هستند.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/{entity}` | ایجاد `{ "name": "..." }` |
| GET | `/api/{entity}` | لیست |
| PUT | `/api/{entity}/:id` | ویرایش |
| DELETE | `/api/{entity}/:id` | حذف |
| GET | `/api/{entity}/special-list?fromDate=&toDate=` | لیست تجمیعی با فیلتر تاریخ |

**Entities:** `surgery`, `doctor`, `initial-cost`, `reagent`, `assist`, `shared-cost`, `hospital`

---

### AllCost (تمامی هزینه‌ها)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/all-cost` | ایجاد دسته‌بندی هزینه `{ "name": "هزینه تبلیغات" }` |
| GET | `/api/all-cost` | لیست دسته‌بندی‌ها |
| PUT | `/api/all-cost/:id` | ویرایش دسته‌بندی |
| DELETE | `/api/all-cost/:id` | حذف دسته‌بندی |
| POST | `/api/all-cost/entry` | ثبت هزینه `{ "allCostId": "...", "price": 500000, "date": "1403/06/15" }` |
| GET | `/api/all-cost/entry?allCostId=&fromDate=&toDate=` | لیست هزینه‌ها |
| PUT | `/api/all-cost/entry/:id` | ویرایش هزینه |
| DELETE | `/api/all-cost/entry/:id` | حذف هزینه |
| GET | `/api/all-cost/special-list?fromDate=&toDate=` | لیست تجمیعی هزینه‌ها |

## Date Filter
تمام endpointهایی که فیلتر تاریخ دارند از query params زیر استفاده می‌کنند:
- `fromDate`: از تاریخ (مثلا `1403/01/01`)
- `toDate`: تا تاریخ (مثلا `1403/12/29`)
