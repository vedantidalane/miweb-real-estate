/* auth.js – Real Estate */
(function(){
'use strict';
const SK='realestate_session',UK='realestate_users',LP='login.html',HP='index.html';
const DEMO={email:'agent@demo.com',password:'agent123',firstName:'Agent',lastName:'Smith'};

window.showToast=function(msg,type='success'){
  const c=document.getElementById('toastContainer');if(!c)return;
  const icons={success:'fa-check-circle',error:'fa-times-circle',info:'fa-info-circle',warning:'fa-exclamation-triangle'};
  const el=document.createElement('div');
  el.className=`toast-custom toast-${type}`;
  el.innerHTML=`<div class="toast-icon"><i class="fas ${icons[type]||icons.info}"></i></div><div class="toast-msg">${msg}</div>`;
  c.appendChild(el);setTimeout(()=>{el.style.opacity='0';el.style.transition='opacity .4s';setTimeout(()=>el.remove(),400)},3500);
};

function getSession(){try{return JSON.parse(sessionStorage.getItem(SK))||null;}catch{return null;}}
function setSession(u){sessionStorage.setItem(SK,JSON.stringify({...u,loginTime:new Date().toISOString()}));}
function clearSession(){sessionStorage.removeItem(SK);}
function getUsers(){try{return JSON.parse(localStorage.getItem(UK))||[];}catch{return[];}}
function saveUsers(u){localStorage.setItem(UK,JSON.stringify(u));}
window.getRealEstateSession=getSession;

function updateNav(){
  const s=getSession();
  const an=document.getElementById('authNav'),un=document.getElementById('userNav');
  if(!an||!un)return;
  if(s){an.classList.add('d-none');un.classList.remove('d-none');
    const ne=document.getElementById('navUserName'),ae=document.getElementById('navUserAvatar');
    if(ne)ne.textContent=s.firstName||s.email;
    if(ae)ae.src=`https://ui-avatars.com/api/?name=${encodeURIComponent((s.firstName||'U')+' '+(s.lastName||''))}&background=6366f1&color=fff&size=36`;
  }else{an.classList.remove('d-none');un.classList.add('d-none');}
}

const lf=document.getElementById('loginForm');
if(lf){
  document.getElementById('pwToggle')?.addEventListener('click',function(){
    const i=document.getElementById('loginPassword'),isP=i.type==='password';
    i.type=isP?'text':'password';this.querySelector('i').className=isP?'fas fa-eye-slash':'fas fa-eye';
  });
  lf.addEventListener('submit',function(e){
    e.preventDefault();
    const em=document.getElementById('loginEmail').value.trim(),pw=document.getElementById('loginPassword').value;
    const al=document.getElementById('loginAlert');let valid=true;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){document.getElementById('emailErr')?.classList.remove('d-none');valid=false;}
    else document.getElementById('emailErr')?.classList.add('d-none');
    if(pw.length<6){document.getElementById('passErr')?.classList.remove('d-none');valid=false;}
    else document.getElementById('passErr')?.classList.add('d-none');
    if(!valid)return;
    document.getElementById('loginBtnText')?.classList.add('d-none');
    document.getElementById('loginBtnLoad')?.classList.remove('d-none');
    setTimeout(()=>{
      const users=getUsers();
      const found=(em===DEMO.email&&pw===DEMO.password)?DEMO:users.find(u=>u.email===em&&u.password===pw);
      if(found){setSession(found);window.location.href=HP;}
      else{
        document.getElementById('loginBtnText')?.classList.remove('d-none');
        document.getElementById('loginBtnLoad')?.classList.add('d-none');
        if(al){al.className='alert alert-danger mb-3';al.textContent='Invalid credentials. Try agent@demo.com / agent123';}
      }
    },1000);
  });
}

const rf=document.getElementById('registerForm');
if(rf){
  rf.addEventListener('submit',function(e){
    e.preventDefault();
    const fn=document.getElementById('regFirstName').value.trim(),ln=document.getElementById('regLastName').value.trim();
    const em=document.getElementById('regEmail').value.trim(),pw=document.getElementById('regPassword').value,cp=document.getElementById('regConfirmPass').value;
    const al=document.getElementById('registerAlert');let valid=true;
    if(!fn||!ln||pw.length<8){valid=false;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){document.getElementById('regEmailErr')?.classList.remove('d-none');valid=false;}
    else document.getElementById('regEmailErr')?.classList.add('d-none');
    if(pw!==cp){document.getElementById('regPassErr')?.classList.remove('d-none');valid=false;}
    else document.getElementById('regPassErr')?.classList.add('d-none');
    if(!valid)return;
    document.getElementById('regBtnText')?.classList.add('d-none');
    document.getElementById('regBtnLoad')?.classList.remove('d-none');
    setTimeout(()=>{
      const users=getUsers();
      if(users.find(u=>u.email===em)){
        document.getElementById('regBtnText')?.classList.remove('d-none');
        document.getElementById('regBtnLoad')?.classList.add('d-none');
        if(al){al.className='alert alert-danger mt-3';al.textContent='Email already registered.';}
        return;
      }
      const nu={firstName:fn,lastName:ln,email:em,password:pw};
      users.push(nu);saveUsers(users);setSession(nu);window.location.href=HP;
    },1200);
  });
}

document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('#logoutBtn,#logoutBtn2').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();clearSession();window.location.href=LP;}));
  updateNav();
});
})();
