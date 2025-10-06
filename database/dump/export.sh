#!/bin/bash
# Export current MongoDB data for backup

DB_NAME="finforecast"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="../database/dump/${DB_NAME}_${TIMESTAMP}"

mkdir -p "$BACKUP_DIR"

mongodump --db=$DB_NAME --out=$BACKUP_DIR

echo "✅ Database exported to $BACKUP_DIR"
