import assert from 'node:assert/strict';
import { cleanText, normalize, choose, toCsv } from '../scripts/core.mjs';
const now=new Date('2026-07-30T00:00:00Z');
const base={id:1,full_name:'acme/tool',html_url:'https://github.com/acme/tool',homepage:'https://example.com',description:'Automation API tool\nwith  spaces',stargazers_count:1000,forks_count:20,language:'TypeScript',license:{spdx_id:'MIT'},pushed_at:'2026-07-25T00:00:00Z'};
const valid=normalize(base,'AI 与自动化',now);assert.equal(cleanText(base.description),'Automation API tool with spaces');assert.equal(valid.commercialLicense,true);assert.ok(valid.score>50);assert.equal(choose([valid],now).length,1);assert.match(toCsv([valid]),/"acme\/tool"/);
const blocked=normalize({...base,id:2,license:{spdx_id:'GPL-3.0'}},'AI 与自动化',now);assert.equal(blocked.commercialLicense,false);assert.equal(choose([blocked],now).length,0);console.log('All Opportunity Radar tests passed.');
