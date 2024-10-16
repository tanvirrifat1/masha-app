# Project Name

This is a template project for backend development using Typescript, Node.js, Express, Mongoose, Bcrypt, JWT, NodeMailer, Multer, ESLint, and Prettier. The aim is to reduce setup time for new backend projects.

## Features

- **Authentication API:** Complete authentication system using JWT for secure token-based authentication and bcrypt for password hashing.
- **File Upload:** Implemented using Multer with efficient file handling and short-term storage.
- **Data Validation:** Robust data validation using Zod and Mongoose schemas.
- **Code Quality:** Ensured code readability and quality with ESLint and Prettier.
- **Email Service:** Sending emails through NodeMailer.
- **File Handling:** Efficient file deletion using `fs.unlink`.
- **Environment Configuration:** Easy configuration using a `.env` file.
- **Logging:** Logging with Winston and file rotation using DailyRotateFile.
- **API Request Logging:** Logging API requests using Morgan.

## Tech Stack

- Typescript
- Node.js
- Express
- Mongoose
- Bcrypt
- JWT
- NodeMailer
- Multer
- ESLint
- Prettier
- Winston
- Daily-winston-rotate-file
- Morgen
- Socket

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Create a `.env` file:**

   In the root directory of the project, create a `.env` file and add the following variables. Adjust the values according to your setup.

   ```env
   # Basic
   NODE_ENV=development
   DATABASE_URL=mongodb://127.0.0.1:27017/project_name
   IP_ADDRESS=192.0.0.0
   PORT=5000

   # Bcrypt
   BCRYPT_SALT_ROUNDS=12

   # JWT
   JWT_SECRET=jwt_secret
   JWT_EXPIRE_IN=1d

   # Email
   EMAIL_FROM=email@gmail.com
   EMAIL_USER=email@gmail.com
   EMAIL_PASS=mkqcfjeqloothyax
   EMAIL_PORT=587
   EMAIL_HOST=smtp.gmail.com
   ```

4. **Run the project:**

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn run dev
   ```

### Running the Tests

Explain how to run the automated tests for this system.

```bash
npm test
```

const getAllCampaigns = async (
// filters: IICampaignFilters,
// paginationOptions: IPaginationOptions
// ) => {
// const { searchTerm, ...filtersData } = filters;
// const { page, limit, skip, sortBy, sortOrder } =
// paginationHelpers.calculatePagination(paginationOptions);

// const andConditions: any[] = [];

// // Filtering conditions from filterData
// if (Object.keys(filtersData).length) {
// andConditions.push({
// $and: Object.entries(filtersData).map(([field, value]) => {
// if (typeof value === 'string') {
// return {
// [field]: {
// $regex: value,
// $options: 'i',
// },
// };
// } else {
// return { [field]: value };
// }
// }),
// });
// }

// // Add condition for "active" status
// andConditions.push({
// status: 'active',
// });

// const sortConditions: Record<string, 1 | -1> = {};

// if (sortBy && sortOrder) {
// sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
// }

// const whereConditions =
// andConditions.length > 0 ? { $and: andConditions } : {};

// // Use aggregate to perform lookup and search on category.name
// const result = await Campaign.aggregate([
// {
// $lookup: {
//         from: 'brands',
//         localField: 'brand',
//         foreignField: '_id',
//         as: 'brand',
//       },
//     },
//     {
//       $unwind: '$brand',
// },
// {
// $lookup: {
//         from: 'categories',
//         localField: 'brand.category',
//         foreignField: '_id',
//         as: 'category',
//       },
//     },
//     {
//       $unwind: '$category',
// },
// {
// $lookup: {
//         from: 'influencers',
//         localField: 'influencer',
//         foreignField: '_id',
//         as: 'influencer',
//       },
//     },
//     {
//       $unwind: '$influencer',
// },
// // Move the $match stage here to filter after lookups
// {
// $match: {
// ...whereConditions,
// $or: [
// ...CampaignSearchAbleFields.map(field => ({
// [field]: {
// $regex: searchTerm,
// $options: 'i',
// },
// })),
// { 'category.categoryName': { $regex: searchTerm, $options: 'i' } },
// { 'brand.country': { $regex: searchTerm, $options: 'i' } },
// { 'brand.city': { $regex: searchTerm, $options: 'i' } },
// { 'brand.brandName': { $regex: searchTerm, $options: 'i' } },
// ],
// },
// },
// {
// $sort: sortConditions,
// },
// {
// $skip: skip,
// },
// {
// $limit: limit,
// },
// ]);

// const total = await Campaign.countDocuments(whereConditions);
// console.log(result);
// return {
// meta: {
// page,
// limit,
// total,
// },
// data: result,
// };
// };
