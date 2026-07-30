import { CONFIG } from '../config.mjs';

export function cleanText(value='') { return String(value).replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim(); }
export function daysSince(value, now=new Date()) { const date=new Date(value); return Number.isNaN(date.valueOf()) ? 9999 : Math.max(0, (now-date)/86400000); }
export function isCommercialLicense(item) { return Boolean(item.license?.spdx_id && CONFIG.commercialLicenses.has(item.license.spdx_id.toLowerCase())); }
export function score(item, now=new Date()) {
  const stars=Math.log10(Math.max(1, Number(item.stargazers_count)||0))*24;
  const recent=Math.max(0, 38-daysSince(item.pushed_at,now)/3);
  const license=isCommercialLicense(item)?18:0;
  const docs=item.homepage?4:0;
  const desc=/api|automation|workflow|analytics|commerce|productivity|agent|platform/i.test(item.description||'')?8:0;
  return Math.round(stars+recent+license+docs+desc);
}
export function normalize(item, category, now) { return { id:item.id, name:item.full_name, url:item.html_url, homepage:item.homepage||'', description:cleanText(item.description||'暂无简介'), stars:Number(item.stargazers_count)||0, forks:Number(item.forks_count)||0, language:item.language||'—', license:item.license?.spdx_id||'未标注', updatedAt:item.pushed_at, category, score:score(item,now), commercialLicense:isCommercialLicense(item) }; }
export function choose(items, now=new Date()) { const map=new Map(); for(const item of items){const current=map.get(item.id);if(!current||item.score>current.score)map.set(item.id,item);} return [...map.values()].filter(item=>item.commercialLicense).sort((a,b)=>b.score-a.score||b.stars-a.stars).slice(0,40); }
export function escapeHtml(value='') { return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
export function toCsv(items) { const fields=['name','category','score','stars','language','license','updatedAt','url','homepage','description'];return [fields.join(','),...items.map(item=>fields.map(key=>`"${String(item[key]??'').replaceAll('"','""')}"`).join(','))].join('\n'); }
