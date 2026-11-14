let users = [
 {id:"DN-1001",name:"Amina Rahman",email:"amina@example.com",role:"Donor",city:"Dhaka",active:true},
 {id:"DN-1002",name:"Rafi Hasan",email:"rafi@example.com",role:"Donor",city:"Sylhet",active:true},
 {id:"DN-1003",name:"Nadia Islam",email:"nadia@example.com",role:"Donor",city:"Khulna",active:false},
 {id:"REQ-4001",name:"Sadia Karim",email:"sadia@example.com",role:"Requester",city:"Dhaka",active:true},
 {id:"CO-2001",name:"Farhan Kabir",email:"farhan@example.com",role:"Coordinator",city:"Chattogram",active:true},
 {id:"ADM-1001",name:"System Admin",email:"admin@example.com",role:"Administrator",city:"Dhaka",active:true}
];
function renderUsers(){
 const q=document.getElementById("searchUser").value.toLowerCase(), role=document.getElementById("roleFilter").value, status=document.getElementById("statusFilter").value;
 const filtered=users.filter(u=>(!q||[u.id,u.name,u.email].some(v=>v.toLowerCase().includes(q)))&&(!role||u.role===role)&&(!status||(status==="Active"?"Active":"Inactive")===(u.active?"Active":"Inactive")));
 document.getElementById("userCount").textContent=`Showing ${filtered.length} of ${users.length} users`;
 document.getElementById("userRows").innerHTML=filtered.map(u=>`<tr><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>${u.city}</td><td><span class="status ${u.active?"active":"inactive"}">${u.active?"Active":"Inactive"}</span></td><td><button class="btn ${u.active?"secondary":""}" data-id="${u.id}">${u.active?"Deactivate":"Activate"}</button></td></tr>`).join("")||'<tr><td colspan="7">No matching users found.</td></tr>';
 document.querySelectorAll("#userRows button").forEach(b=>b.addEventListener("click",()=>{const u=users.find(x=>x.id===b.dataset.id);u.active=!u.active;renderUsers();}));
}
["searchUser","roleFilter","statusFilter"].forEach(id=>document.getElementById(id).addEventListener(id==="searchUser"?"input":"change",renderUsers));
renderUsers();
document.getElementById("addUserForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.getElementById("userName").value.trim(),email=document.getElementById("userEmail").value.trim(),role=document.getElementById("userRole").value,city=document.getElementById("userCity").value;
 const valid={userName:/^[A-Za-z][A-Za-z .'-]{2,}$/.test(name),userEmail:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)&&!users.some(u=>u.email.toLowerCase()===email.toLowerCase()),userRole:!!role,userCity:!!city};
 const messages={userName:"Enter a name with at least 3 letters.",userEmail:"Enter a valid email that is not already used.",userRole:"Choose a role.",userCity:"Choose a city."};
 Object.entries(valid).forEach(([k,v])=>document.getElementById(k+"Error").textContent=v?"":messages[k]);
 if(!Object.values(valid).every(Boolean))return;
 const next=users.length+1;users.push({id:"USR-"+String(next).padStart(4,"0"),name,email,role,city,active:true});renderUsers();e.target.reset();
 document.getElementById("addUserFeedback").textContent="User added to the sample list. This demo does not save data.";
});
