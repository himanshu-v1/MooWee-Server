#!/bin/bash

## Google Cloud Project ID
GOOGLE_PROJECT_ID=$PROJECT_ID

## GCP Region
GCP_REGION=$REGION

## Array of Cloud Run services to clean up
CLOUD_RUN_SERVICES=($SERVICES)

for SERVICE in "${CLOUD_RUN_SERVICES[@]}"; do
    echo "Processing service: $SERVICE"

    # Get list of inactive revisions
    REVISIONS=$(gcloud run revisions list \
        --service="$SERVICE" \
        --project="$GOOGLE_PROJECT_ID" \
        --region="$GCP_REGION" \
        --format='value(metadata.name)' \
        --sort-by='metadata.creationTimestamp' \
        --filter="status.conditions.type:Active AND status.conditions.status:'False'")

    if [ -z "$REVISIONS" ]; then
        echo "No inactive revisions found for $SERVICE"
        continue
    fi

    REVISION_COUNT=$(echo "$REVISIONS" | wc -l)
    echo "Found $REVISION_COUNT inactive revisions"

    echo "$REVISIONS" | while read -r REVISION; do
        echo "Deleting revision: $REVISION"
        gcloud run revisions delete "$REVISION" \
        --quiet \
        --project="$GOOGLE_PROJECT_ID" \
        --region="$GCP_REGION"
    done

    echo "Cleanup cancelled for $SERVICE"
done