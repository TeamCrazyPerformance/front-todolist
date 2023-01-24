function toggleDiv(){
    const div = document.getElementById('inputBlock');
    if(div.style.display === 'none')  {
        div.style.display = 'block';
      }else {
        div.style.display = 'none';
      }
}
    
    let TODOnum=0;
function createDiv(){
    let schedule= document.getElementById('schedule').value;
    emptyNotice=document.getElementById('emptyNotice');
    if(schedule!=''){
        obj= document.getElementById("div1");
        let div=document.createElement('div');
        div.className="TODOobj"
        div.innerHTML ="<h1 style='font-size: 20px'>"+schedule+"</h1>"+"<input type='button' value='x' onclick='removeSchedule(this)' style=' cursor: pointer; border : none; background:#FFFFFF'>"
        obj.appendChild(div);
        if(TODOnum==0){
            emptyNotice.remove();
        }
        TODOnum++;
        document.getElementById("schedule").value ='';
    }
}

function removeSchedule(obj) {
	obj.parentElement.remove();
    TODOnum--;
    if(TODOnum==0){
        obj= document.getElementById("div1");
        let div=document.createElement('div');
        div.id='emptyNotice';
        div.className="emptyNotice";
        div.innerHTML ="남은 일정이 없어요."
        obj.appendChild(div);
    }
}