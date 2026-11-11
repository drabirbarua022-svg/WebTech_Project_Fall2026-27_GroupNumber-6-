const sample={blood:[["A+",4],["A-",2],["B+",3],["B-",1],["AB+",1],["AB-",0],["O+",5],["O-",2]],status:[["Pending",3],["Under Review",4],["Donor Matched",2],["Completed",6],["Cancelled",1]],city:[["Dhaka",5],["Chattogram",3],["Sylhet",2],["Rajshahi",1],["Khulna",2],["Barishal",1],["Rangpur",1],["Mymensingh",1]]};
document.getElementById("reportForm").addEventListener("submit",e=>{
 e.preventDefault();const type=document.getElementById("reportType").value,from=document.getElementById("fromDate").value,to=document.getElementById("toDate").value;
 const today=new Date();today.setHours(0,0,0,0);const f=from?new Date(from+"T00:00:00"):null,t=to?new Date(to+"T00:00:00"):null;
 const valid={reportType:!!type,fromDate:!!f,toDate:!!t};
 const messages={reportType:"Choose a report type.",fromDate:"Choose a start date.",toDate:"Choose an end date."};
 Object.entries(valid).forEach(([k,v])=>document.getElementById(k+"Error").textContent=v?"":messages[k]);
 if(!Object.values(valid).every(Boolean))return;
 if(f&&t&&f>t){document.getElementById("fromDateError").textContent="From date cannot be after To date.";return;}
 if(t>today){document.getElementById("toDateError").textContent="To date cannot be in the future.";return;}
 let rows,title;
 if(type==="blood"){rows=sample.blood;title="Requests by Blood Group";}
 if(type==="status"){rows=sample.status;title="Requests by Status";}
 if(type==="city"){rows=sample.city;title="Donors by City";}
 if(type==="feedback"){rows=[["Average rating",4.3],["Total feedback",12],["Would recommend",10]];title="Feedback Summary";}
 document.getElementById("reportTitle").textContent=title;
 const max=Math.max(1,...rows.map(r=>Number(r[1])));
 document.getElementById("reportOutput").innerHTML=`<p><b>Date range:</b> ${from} to ${to}</p><div class="table-wrap"><table><thead><tr><th>Category</th><th>Count / Value</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table></div><h4>Visual summary</h4>${rows.map(r=>`<div class="bar-row"><b>${r[0]}</b><div class="bar-track"><div class="bar-fill" style="width:${Number(r[1])/max*100}%"></div></div><span>${r[1]}</span></div>`).join("")}<p class="hint">Illustrative sample values only; the selected dates are displayed but do not filter a live database.</p>`;
});
document.getElementById("printReport").addEventListener("click",()=>window.print());
