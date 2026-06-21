# MongoDB Skill

**Category:** Domain - Database  
**Priority:** 70

## Overview

Expert knowledge for MongoDB development.

## Key Topics

- Document design
- Aggregation pipeline
- Indexing
- Replication
- Sharding
- mongoose ODM

## Usage

```javascript
// Find documents
const users = await User.find({ age: { $gte: 18 } })
  .sort({ createdAt: -1 })
  .limit(10);

// Aggregation pipeline
const result = await Order.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$customerId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
]);
```
