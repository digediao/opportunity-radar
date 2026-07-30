export const CONFIG = {
  siteName: '开源商业机会雷达',
  limitPerQuery: 20,
  queries: [
    { label: 'AI 与自动化', query: 'topic:ai topic:automation stars:>80 archived:false' },
    { label: '电商与营销', query: 'topic:ecommerce stars:>30 archived:false' },
    { label: '效率与协作', query: 'topic:productivity stars:>80 archived:false' },
    { label: '开发者工具', query: 'topic:developer-tools stars:>100 archived:false' }
  ],
  commercialLicenses: new Set(['mit','apache-2.0','bsd-2-clause','bsd-3-clause','isc','mpl-2.0']),
  freeItems: 10
};
