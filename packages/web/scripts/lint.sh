#!/bin/sh

echo "🧰 Linting all files inside src folder on web package..."
pnpm eslint src --fix
echo "✅ Web package linting complete!"
