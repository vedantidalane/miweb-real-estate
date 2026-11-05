/* properties.js */
(function(){
'use strict';
const PER=8;let filtered=[],page=1;

function filters(){
  const q=(document.getElementById('citySearch')?.value||'').toLowerCase();
  const status=document.getElementById('statusFilter')?.value||'';
  const types=[...document.querySelectorAll('.type-check:checked')].map(c=>c.value);
  const beds=parseInt(document.getElementById('bedroomFilter')?.value||'0');
  const price=parseFloat(document.getElementById('priceRange')?.value||2000000);
  const sort=document.getElementById('sortProps')?.value||'default';
  const urlParams=new URLSearchParams(window.location.search);
  const urlType=urlParams.get('type'),urlCity=urlParams.get('city'),urlStat=urlParams.get('status');

  filtered=RE.properties.filter(p=>{
    const mq=!q&&!urlCity||p.city.toLowerCase().includes(q||urlCity?.toLowerCase()||'')||p.location.toLowerCase().includes(q||'');
    const ms=!status&&!urlStat||p.status===(status||urlStat);
    const mt=types.length===0&&!urlType||types.includes(p.type)||urlType===p.type;
    const mb=p.bedrooms>=beds;
    const mp=p.price<=price;
    return mq&&ms&&mt&&mb&&mp;
  });

  if(sort==='price-low')filtered.sort((a,b)=>a.price-b.price);
  else if(sort==='price-high')filtered.sort((a,b)=>b.price-a.price);
  else if(sort==='area-high')filtered.sort((a,b)=>b.area-a.area);
  else if(sort==='newest')filtered.sort((a,b)=>b.id-a.id);

  page=1;render();paginate();
  document.getElementById('resultsCount').textContent=filtered.length;
}

function cardHTML(p){
  return `<div class="col-md-6 col-xl-4">
    <div class="property-card">
      <div class="property-thumb" style="background:${RE.gradients[p.gradient]}">
        <i class="fas ${RE.icons[p.icon]}"></i>
        <span class="property-badge property-badge-${p.status.replace(/ /g,'-')}">${p.status}</span>
        <button class="property-fav-btn ${RE.isFav(p.id)?'active':''}" data-id="${p.id}" onclick="toggleF(${p.id},this)"><i class="fas fa-heart"></i></button>
        <span class="property-price-tag">${RE.priceLabel(p.price,p.status)}</span>
      </div>
      <div class="property-body">
        <div class="property-type">${p.type}</div>
        <h6 class="property-title"><a href="property-detail.html?id=${p.id}" class="text-decoration-none">${p.title}</a></h6>
        <div class="property-location"><i class="fas fa-map-marker-alt"></i>${p.location}</div>
        <div class="property-specs">
          ${p.bedrooms>0?`<span><i class="fas fa-bed"></i>${p.bedrooms} Beds</span>`:''}
          ${p.bathrooms>0?`<span><i class="fas fa-bath"></i>${p.bathrooms} Baths</span>`:''}
          <span><i class="fas fa-ruler-combined"></i>${p.area.toLocaleString()} sqft</span>
          ${p.parking>0?`<span><i class="fas fa-car"></i>${p.parking} Park</span>`:''}
        </div>
      </div>
    </div>
  </div>`;
}

function render(){
  const g=document.getElementById('propertiesGrid');if(!g)return;
  const sl=filtered.slice((page-1)*PER,page*PER);
  if(sl.length===0){g.innerHTML='<div class="col-12 text-center py-5 text-muted"><i class="fas fa-search fa-3x mb-3 d-block opacity-25"></i><h5>No properties found</h5><p>Try adjusting filters.</p></div>';return;}
  g.innerHTML=sl.map(cardHTML).join('');
}

function paginate(){
  const el=document.getElementById('propPagination');if(!el)return;
  const total=Math.ceil(filtered.length/PER);if(total<=1){el.innerHTML='';return;}
  let h=`<li class="page-item ${page===1?'disabled':''}"><a class="page-link" href="#" data-p="${page-1}">‹</a></li>`;
  for(let i=1;i<=total;i++)h+=`<li class="page-item ${i===page?'active':''}"><a class="page-link" href="#" data-p="${i}">${i}</a></li>`;
  h+=`<li class="page-item ${page===total?'disabled':''}"><a class="page-link" href="#" data-p="${page+1}">›</a></li>`;
  el.innerHTML=h;
  el.querySelectorAll('.page-link[data-p]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();const p=+a.dataset.p;if(p<1||p>total)return;page=p;render();paginate();window.scrollTo({top:200,behavior:'smooth'});
  }));
}

window.toggleF=function(id,btn){
  const added=RE.toggleFav(id);
  btn.classList.toggle('active',added);
  showToast(added?'Added to favourites!':'Removed from favourites.',added?'success':'warning');
};

document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('citySearch')?.addEventListener('input',filters);
  document.getElementById('statusFilter')?.addEventListener('change',filters);
  document.querySelectorAll('.type-check').forEach(c=>c.addEventListener('change',filters));
  document.getElementById('bedroomFilter')?.addEventListener('change',filters);
  document.getElementById('sortProps')?.addEventListener('change',filters);
  document.getElementById('priceRange')?.addEventListener('input',function(){
    const v=+this.value;
    document.getElementById('priceLabel').textContent=v>=2000000?'$2M+':'$'+(v/1000).toFixed(0)+'k';
    filters();
  });
  document.getElementById('clearFilters')?.addEventListener('click',function(){
    document.getElementById('citySearch').value='';
    document.getElementById('statusFilter').value='';
    document.querySelectorAll('.type-check').forEach(c=>c.checked=false);
    document.getElementById('bedroomFilter').value='0';
    document.getElementById('priceRange').value=2000000;
    document.getElementById('priceLabel').textContent='$2M';
    filters();
  });
  // Apply URL params
  const p=new URLSearchParams(window.location.search);
  if(p.get('type')){const cb=document.getElementById('t-'+p.get('type').toLowerCase());if(cb)cb.checked=true;}
  if(p.get('status'))document.getElementById('statusFilter').value=p.get('status');
  filters();
});
})();
