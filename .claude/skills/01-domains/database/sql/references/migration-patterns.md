# Migration Patterns

## Safe Migrations

### Add Column
```sql
-- Safe: Add nullable column
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(255);

-- Then backfill
UPDATE users SET avatar_url = '/default.png' WHERE avatar_url IS NULL;
```

### Rename Column
```sql
-- Two-step approach
ALTER TABLE users RENAME COLUMN name TO full_name;

-- Or use tool like pg_repack
```

### Add NOT NULL Column
```sql
-- Step 1: Add nullable
ALTER TABLE users ADD COLUMN age INTEGER;

-- Step 2: Backfill
UPDATE users SET age = 30 WHERE age IS NULL;

-- Step 3: Add constraint
ALTER TABLE users ALTER COLUMN age SET NOT NULL;
```

## Zero-downtime Migrations

1. Add new column (nullable)
2. Deploy code using both columns
3. Backfill old data
4. Deploy code using new column
5. Drop old column

## Rollback Strategy

```sql
-- Always have rollback script
-- Test migrations in staging
-- Keep backups before critical changes
```

## Tools

- Flyway
- Liquibase
- Alembic (Python)
- ActiveRecord Migrations (Rails)
- Knex.js
