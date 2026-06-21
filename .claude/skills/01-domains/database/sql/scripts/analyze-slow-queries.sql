-- Analyze slow queries
-- PostgreSQL example

-- Enable slow query log
ALTER SYSTEM SET log_min_duration_statement = 1000;

-- Check for sequential scans
SELECT 
    relname,
    seq_scan,
    idx_scan,
    n_tup_ins,
    n_tup_upd,
    n_tup_del
FROM pg_stat_user_tables
ORDER BY seq_scan DESC
LIMIT 20;

-- Find missing indexes
SELECT 
    schemaname,
    tablename,
    seq_scan,
    idx_scan,
    seq_scan - idx_scan AS seq_scan_diff
FROM pg_stat_user_tables
WHERE seq_scan > idx_scan
ORDER BY seq_scan_diff DESC;

-- Table bloat analysis
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)),
    n_dead_tup
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;
