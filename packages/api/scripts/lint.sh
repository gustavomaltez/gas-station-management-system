#!/bin/sh

echo "🧰 Linting all files inside src folder on api package..."
pnpm eslint src --fix
echo "✅ Api package linting complete!"
