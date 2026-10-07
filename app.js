const pages=[...document.querySelectorAll('.page')], navs=[...document.querySelectorAll('.nav')];
const titles={overview:'Forest Intelligence Overview',monitor:'Satellite Change Monitor',analysis:'AI Deforestation Analysis',alerts:'Forest Threat Center',reports:'Evidence & Reports'};
function openPage(id){pages.forEach(p=>p.classList.toggle('active',p.id===id));navs.forEach(n=>n.classList.toggle('active',n.dataset.page===id));document.getElementById('title').textContent=titles[id];document.getElementById('crumb').textContent=id.toUpperCase();window.scrollTo({top:0,behavior:'smooth'})}
navs.forEach(n=>n.onclick=()=>openPage(n.dataset.page));
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
window.addEventListener('load',()=>setTimeout(()=>{document.getElementById('loading').style.opacity='0';setTimeout(()=>document.getElementById('loading').remove(),550)},650));
document.getElementById('runScan').onclick=()=>{const b=document.getElementById('runScan');b.textContent='◌ ANALYZING…';setTimeout(()=>{b.textContent='✓ AI SCAN COMPLETE';document.getElementById('lossVal').textContent='3.1 km²';document.getElementById('ndviVal').textContent='−51%';document.getElementById('confidenceVal').textContent='94%';toast('AI scan complete — deforestation risk HIGH')},1800)};
document.querySelectorAll('.tab').forEach(x=>x.onclick=()=>{document.querySelectorAll('.tab').forEach(y=>y.classList.remove('active'));x.classList.add('active');toast(x.textContent+' layer activated')});
const input=document.getElementById('fileInput'), overlay=document.getElementById('uploadedOverlay'), img=document.getElementById('uploadedImage'), prompt=document.querySelector('.drop-prompt'), nameEl=document.getElementById('imageName');
input.onchange=e=>{const f=e.target.files[0];if(!f)return;img.src=URL.createObjectURL(f);overlay.style.display='block';prompt.classList.add('hidden');nameEl.textContent=f.name.toUpperCase().slice(0,32);toast('Satellite image loaded — ready for AI scan')};
const dz=document.getElementById('dropzone');['dragenter','dragover'].forEach(e=>dz.addEventListener(e,x=>{x.preventDefault();dz.style.outline='2px solid #54df91'}));['dragleave','drop'].forEach(e=>dz.addEventListener(e,x=>{x.preventDefault();dz.style.outline=''}));dz.addEventListener('drop',e=>{const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/')){img.src=URL.createObjectURL(f);overlay.style.display='block';prompt.classList.add('hidden');nameEl.textContent=f.name.toUpperCase().slice(0,32);toast('Satellite image loaded')}});

document.getElementById('downloadReport').onclick=()=>{const report=`FORESTWATCH AI — DEFORESTATION INCIDENT REPORT
Generated: 07 October 2026
Location: Amazonia Sector 14
Coordinates: 23.5102 N, 78.1201 E

CLASSIFICATION: TRUE DEFORESTATION LIKELY
RISK: HIGH
ESTIMATED FOREST LOSS: 2.8 km²
NDVI CHANGE: -47%
AI CONFIDENCE: 92%

EVIDENCE:
- Persistent vegetation decline
- Clearing-like surface texture
- Increased bare-soil signal
- Nearby access-road signature
- Change confirmed across temporal observations

RECOMMENDED ACTION:
1. Field verification
2. Enforcement assessment
3. Conservation response
4. Reforestation planning
5. Follow-up satellite scan

NOTE: Prototype academic demonstration. Satellite values are simulated and are not an official remote-sensing assessment.`;
const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([report],{type:'text/plain'}));a.download='ForestWatch_AI_Deforestation_Report.txt';a.click();toast('Report downloaded')};
