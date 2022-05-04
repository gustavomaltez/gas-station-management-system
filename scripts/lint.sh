#!/bin/sh

echo "🚧 Linting all typescript and javascript files..."
pnpm turbo run lint
echo "✅ Hooray! Linting complete!"