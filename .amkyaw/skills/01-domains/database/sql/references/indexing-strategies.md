# Indexing Strategies

## Index Types

### B-Tree (Default)
```sql
CREATE INDEX idx_name ON table_name(column);
```

### Hash Index
```sql
CREATE INDEX idx_name ON table_name USING HASH(column);
```

### Partial Index
```sql
CREATE INDEX idx_active ON users(email) WHERE status = 'active';
```

### Composite Index
```sql
CREATE INDEX idx_user_post ON comments(user_id, post_id);
```

## Best Practices

1. Index foreign keys
2. Index columns in WHERE clauses
3. Index columns used in JOINs
4. Consider column order in composite indexes
5. Use covering indexes for frequent queries

## When NOT to Index

- Small tables
- Columns with low cardinality
- Columns frequently updated
- Text fields used in pattern matching (use full-text search)

## Index Maintenance

```sql
-- Analyze table
ANALYZE TABLE table_name;

-- Check index usage
SELECT * FROM pg_stat_user_indexes;

-- Remove unused indexes
DROP INDEX idx_unused;
```
