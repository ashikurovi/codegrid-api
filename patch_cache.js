const fs = require('fs');
const path = require('path');

const controllers = [
  'src/products/products.controller.ts',
  'src/category/category.controller.ts',
  'src/brands/brands.controller.ts',
  'src/flashsell/flashsell.controller.ts',
  'src/budget-pick/budget-pick.controller.ts',
  'src/banners/banners.controller.ts',
  'src/campaign-notice/campaign-notice.controller.ts',
  'src/blogs/blogs.controller.ts'
];

for (const file of controllers) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('CacheInterceptor')) {
    content = content.replace(
      "from '@nestjs/common';",
      "from '@nestjs/common';\nimport { CacheInterceptor } from '@nestjs/cache-manager';"
    );
    
    // Some files might not have UseInterceptors imported
    if (!content.includes('UseInterceptors')) {
        content = content.replace(
            "import { Controller, Get,",
            "import { Controller, Get, UseInterceptors,"
        );
    }
    
    // Apply CacheInterceptor to findAll and findOne
    content = content.replace(
      /@Get\(\)\n  @HttpCode\(HttpStatus\.OK\)/g,
      "@Get()\n  @HttpCode(HttpStatus.OK)\n  @UseInterceptors(CacheInterceptor)"
    );
    // If HttpCode is not there
    content = content.replace(
      /@Get\(\)\n  findAll/g,
      "@Get()\n  @UseInterceptors(CacheInterceptor)\n  findAll"
    );
    
    content = content.replace(
      /@Get\(':id'\)\n  @HttpCode\(HttpStatus\.OK\)/g,
      "@Get(':id')\n  @HttpCode(HttpStatus.OK)\n  @UseInterceptors(CacheInterceptor)"
    );
    content = content.replace(
      /@Get\(':id'\)\n  findOne/g,
      "@Get(':id')\n  @UseInterceptors(CacheInterceptor)\n  findOne"
    );

    fs.writeFileSync(file, content, 'utf8');
  }
}
