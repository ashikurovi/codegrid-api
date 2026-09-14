const fs = require('fs');
const path = 'src/app.module.ts';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('@nestjs/cache-manager')) {
  content = content.replace(
    "import { Module } from '@nestjs/common';",
    "import { Module } from '@nestjs/common';\nimport { CacheModule } from '@nestjs/cache-manager';"
  );
  
  content = content.replace(
    "imports: [",
    "imports: [\n    CacheModule.register({ isGlobal: true, ttl: 60000 }),"
  );
  fs.writeFileSync(path, content, 'utf8');
}
