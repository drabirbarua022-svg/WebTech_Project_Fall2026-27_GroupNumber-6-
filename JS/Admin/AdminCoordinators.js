let coordinators=[
 {id:"CO-2001",name:"Farhan Kabir",email:"farhan@example.com",phone:"01700000001",centre:"Dhaka",date:"2026-01-10",active:true},
 {id:"CO-2002",name:"Tania Noor",email:"tania@example.com",phone:"01700000002",centre:"Sylhet",date:"2026-02-15",active:true},
 {id:"CO-2003",name:"Imran Hossain",email:"imran@example.com",phone:"01700000003",centre:"Khulna",date:"2026-03-20",active:false}
];
function renderCoordinators(){
 const active=coordinators.filter(c=>c.active).length, suspended=coordinators.length-active;
 document.getElementById("coordinatorStats").innerHTML=`<div class="stat-card"><strong>${active}</strong><span>Active</span></div><div class="stat-card"><strong>${suspended}</strong><span>Suspended</span></div>`;
 document.getElementById("coordinatorRows").innerHTML=coordinators.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.email}</td><td>${c.centre}</td><td><span class="status ${c.active?"active":"suspended"}">${c.active?"Active":"Suspended"}</span></td><td><button class="btn ${c.active?"secondary":""}" data-id="${c.id}">${c.active?"Suspend":"Reactivate"}</button></td></tr>`).join("");
 document.querySelectorAll("#coordinatorRows button").forEach(b=>b.addEventListener("click",()=>{const c=coordinators.find(x=>x.id===b.dataset.id);c.active=!c.active;renderCoordinators();}));
 const select=document.getElementById("suspendId"),old=select.value;
 select.innerHTML='<option value="">Choose active coordinator</option>'+coordinators.filter(c=>c.active).map(c=>`<option value="${c.id}">${c.id} — ${c.name}</option>`).join("");
 if([...select.options].some(o=>o.value===old))select.value=old;
}
renderCoordinators();
document.getElementById("suspendForm").addEventListener("submit",e=>{
 e.preventDefault();const id=document.getElementById("suspendId").value,reason=document.getElementById("suspendReason").value,details=document.getElementById("suspendDetails").value.trim();
 const valid={suspendId:!!id,suspendReason:!!reason,suspendDetails:details.length>=10};
 const messages={suspendId:"Choose a coordinator.",suspendReason:"Choose a reason.",suspendDetails:"Provide at least 10 characters of details."};
 Object.entries(valid).forEach(([k,v])=>document.getElementById(k+"Error").textContent=v?"":messages[k]);
 if(!Object.values(valid).every(Boolean))return;
 coordinators.find(c=>c.id===id).active=false;renderCoordinators();e.target.reset();document.getElementById("suspendFeedback").textContent="Coordinator suspended in this demo. The reason is not stored.";
});
document.getElementById("createCoordinatorForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.getElementById("coordName").value.trim(),id=document.getElementById("staffId").value.trim(),email=document.getElementById("coordEmail").value.trim(),phone=document.getElementById("coordPhone").value.trim(),centre=document.getElementById("centre").value,date=document.getElementById("startDate").value;
 const today=new Date();today.setHours(0,0,0,0);const start=date?new Date(date+"T00:00:00"):null;const max=new Date(today);max.setDate(max.getDate()+30);
 const valid={coordName:/^[A-Za-z][A-Za-z .'-]{2,}$/.test(name),staffId:/^CO-\d{4}$/.test(id)&&!coordinators.some(c=>c.id===id),coordEmail:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),coordPhone:/^01\d{9}$/.test(phone),centre:!!centre,startDate:!!start&&start>=today&&start<=max};
 const messages={coordName:"Enter a valid name (at least 3 letters).",staffId:"Use a new staff ID such as CO-2007.",coordEmail:"Enter a valid email.",coordPhone:"Enter an 11-digit Bangladeshi mobile number.",centre:"Choose a centre.",startDate:"Choose a date from today to 30 days ahead."};
 Object.entries(valid).forEach(([k,v])=>document.getElementById(k+"Error").textContent=v?"":messages[k]);
 if(!Object.values(valid).every(Boolean))return;
 coordinators.push({id,name,email,phone,centre,date,active:true});renderCoordinators();e.target.reset();document.getElementById("createFeedback").textContent="Coordinator created in this demo. Data is not saved.";
});
