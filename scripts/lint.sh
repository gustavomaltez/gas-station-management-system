#!/bin/sh

echo "🚧 Linting all typescript and javascript files..."
pnpm eslint --ext ts,js,tsx,jsx --fix
echo "✅ Hooray! Linting complete!"