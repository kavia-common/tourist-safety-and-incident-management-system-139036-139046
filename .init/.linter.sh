#!/bin/bash
cd /home/kavia/workspace/code-generation/tourist-safety-and-incident-management-system-139036-139046/main_backend_service
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

