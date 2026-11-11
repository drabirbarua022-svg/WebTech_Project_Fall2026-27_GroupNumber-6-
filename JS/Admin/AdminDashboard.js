const users = [
 {id:"DN-1001",name:"Amina Rahman",role:"Donor",active:true,blood:"A+"},
 {id:"DN-1002",name:"Rafi Hasan",role:"Donor",active:true,blood:"O+"},
 {id:"DN-1003",name:"Nadia Islam",role:"Donor",active:false,blood:"B+"},
 {id:"DN-1004",name:"Sami Ahmed",role:"Donor",active:true,blood:"O-"},
 {id:"DN-1005",name:"Mira Akter",role:"Donor",active:true,blood:"A-"},
 {id:"REQ-4001",name:"Example Requester",role:"Requester",active:true},
 {id:"REQ-4002",name:"Sample Family",role:"Requester",active:false},
 {id:"CO-2001",name:"Farhan Kabir",role:"Coordinator",active:true},
 {id:"CO-2002",name:"Tania Noor",role:"Coordinator",active:true},
 {id:"ADM-1001",name:"System Admin",role:"Administrator",active:true}
];
const stats = document.getElementById("stats");
["Donor","Requester","Coordinator"].forEach(role=>{
 const count = users.filter(u=>u.role===role).length;
 stats.insertAdjacentHTML("beforeend", `<div class="stat-card"><strong>${count}</strong><span>${role}s</span></div>`);
});
stats.insertAdjacentHTML("beforeend", `<div class="stat-card"><strong>${users.filter(u=>!u.active).length}</strong><span>Inactive users</span></div>`);
const bloodGroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const counts = Object.fromEntries(bloodGroups.map(g=>[g,users.filter(u=>u.role==="Donor"&&u.blood===g).length]));
const max = Math.max(1,...Object.values(counts));
document.getElementById("bloodChart").innerHTML = bloodGroups.map(g=>`<div class="bar-row"><b>${g}</b><div class="bar-track"><div class="bar-fill" style="width:${counts[g]/max*100}%"></div></div><span>${counts[g]}</span></div>`).join("");
let announcements = [{subject:"Welcome to DonorConnect",message:"This is a sample announcement for all platform members.",targets:["Donor","Requester","Coordinator"],priority:"Normal",date:"Demo"}];
function renderAnnouncements(){
 document.getElementById("announcementList").innerHTML = announcements.map(a=>`<article class="notice"><b>${a.subject}</b> · ${a.priority}<p>${a.message}</p><small>For: ${a.targets.join(", ")} | ${a.date}</small></article>`).join("");
}
renderAnnouncements();
const msg = document.getElementById("announcementMessage");
msg.addEventListener("input",()=>document.getElementById("messageCount").textContent=`${msg.value.length} / 300 characters`);
document.getElementById("announcementForm").addEventListener("submit",e=>{
 e.preventDefault();
 const targets=[...document.querySelectorAll('input[name="target"]:checked')].map(x=>x.value);
 const subject=document.getElementById("subject").value.trim(), message=msg.value.trim(), priority=document.getElementById("priority").value;
 const checks={target:targets.length>0,subject:subject.length>=5&&subject.length<=60,announcementMessage:message.length>=15&&message.length<=300,priority:!!priority};
 Object.entries(checks).forEach(([k,ok])=>{const id=k==="target"?"targetError":k+"Error";document.getElementById(id).textContent=ok?"":({target:"Choose at least one target role.",subject:"Subject must be 5–60 characters.",announcementMessage:"Message must be 15–300 characters.",priority:"Choose a priority."}[k]);});
 if(!Object.values(checks).every(Boolean)) return;
 announcements.unshift({subject,message,targets,priority,date:new Date().toLocaleDateString()});
 renderAnnouncements(); e.target.reset();document.getElementById("messageCount").textContent="0 / 300 characters";
 document.getElementById("announcementFeedback").textContent="Announcement added to this demo page. It is not saved.";
});
