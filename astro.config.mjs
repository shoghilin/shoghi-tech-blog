// @ts-check

// import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';
// import { defineConfig } from 'astro/config';

// // https://astro.build/config
// export default defineConfig({
// 	site: 'https://example.com',
// 	integrations: [mdx(), sitemap()],
// });

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
	site: 'https://blog.shoghilin.com',
	base: '/',
	integrations: [mdx(), sitemap()],
	i18n: {
		defaultLocale: 'zh-tw',
		locales: ['zh-tw', 'en', 'ja'],
		routing: {
		prefixDefaultLocale: false, // 預設語言不加前綴，保持原有連結
		},
  	},
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [
			[
				rehypeKatex,
				{
					// 建議使用 'htmlAndMathml'，只要有載入上述 CSS，MathML 就會被正確隱藏
					output: 'htmlAndMathml',
				},
			],
		],
	},
});