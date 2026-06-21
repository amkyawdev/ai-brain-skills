# Query Optimization

## Basic Principles

1. **Select only needed columns**
2. **Use appropriate indexes**
3. **Avoid SELECT ***
4. **Use EXPLAIN to analyze queries**
5. **Minimize joins**

## Common Patterns

### Bad
```sql
SELECT * FROM users WHERE id = 1;
```

### Good
```sql
SELECT id, name, email FROM users WHERE id = 1;
```

## JOIN Optimization

```sql
-- Use covering indexes
CREATE INDEX idx_user_email ON users(email);

-- Optimize join order
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active';
```

## Aggregation Optimization

```sql
-- Use indexed columns
SELECT customer_id, SUM(total)
FROM orders
WHERE created_at >= '2024-01-01'
GROUP BY customer_id;

-- Consider materialized views for complex aggregations
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT DATE_TRUNC('month', created_at) as month,
       SUM(total) as total
FROM orders
GROUP BY 1;
```

## Tools

- EXPLAIN/EXPLAIN ANALYZE
- pg_stat_statements (PostgreSQL)
- Query Store (SQL Server)
- EXPLAIN (MySQL)
