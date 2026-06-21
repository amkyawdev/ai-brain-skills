# Data Warehousing Skill

**Category:** Domain - Database  
**Priority:** 65

## Overview

Patterns for data warehousing and analytics.

## Key Topics

- Star/Snowflake schema
- Slowly changing dimensions
- ETL pipelines
- Data partitioning
- Aggregation tables
- CDC patterns

## Schema Design

### Star Schema
```
┌─────────────┐
│  Fact Table │
├─────────────┤
│  user_id    │
│  product_id │
│  amount     │
│  quantity   │
│  date_id    │
└─────────────┘
     │
     ▼
┌─────────────────┐
│ Dimension Tables│
├─────────────────┤
│ users           │
│ products        │
│ dates           │
│ locations       │
└─────────────────┘
```

## Best Practices

1. Partition large fact tables by date
2. Use surrogate keys for dimensions
3. Implement slowly changing dimensions (SCD) type 2
4. Build aggregation tables for common queries
5. Use columnar storage for analytics
