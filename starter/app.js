

/*var id_to_do_count="to_do_count";
var id_in_progress_count="in_progress_count";
var id_done_count="done_count";*/ 


//var i=0;

function reloadTasks(){

    document.getElementById("todo-ul").innerHTML="";
    document.getElementById("inprogress-ul").innerHTML="";
    document.getElementById("done-ul").innerHTML="";

    var task_index;
    var to_do_index=0;
    var in_progress_index=0;
    var done_index=0;

    var id_count;

    var img ;
    var ul;
    /*var toDoUl='todo-ul';//id
    var inProgressUl="inprogress-ul";//id
    var done="done-ul";//id*/

    //i=0;

    for (let index = 0; index < tasks.length; index++) {
        if(tasks[index].status=="To Do"){
            to_do_index++;
            task_index=to_do_index;
            id_count="to_do_count";
            img = "question.png";
            ul='todo-ul';
        }else if(tasks[index].status=="In Progress"){
            in_progress_index++;
            task_index=in_progress_index;
            id_count="in_progress_count";
            img = "work-in-progress.png";
            ul="inprogress-ul";
        }else if (tasks[index].status=="Done"){
            done_index++;
            task_index=done_index;
            id_count="done_count";
            img = "check.png";
            ul="done-ul";
        }
        let reloadTask = `
        <li class="list-group-item d-flex" >
            <div><img src="./assets/img/${img}" alt=""></div>
            <div class="w-100">
                <div class="fs-3 fw-bold">${tasks[index].title}</div>
                <div class=""># created in ${tasks[index].date}</div>
                <div class="">${tasks[index].description}</div>
                <div class="d-flex justify-content-between">
                    <div class="">
                        <span class="badge rounded-pill text-bg-primary">${tasks[index].priority}</span>
                        <span class="badge rounded-pill text-bg-secondary">${tasks[index].type}</span>
                    </div>
                    <div>
                        <button type="button" class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="Edit(${index})">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="Delete(${index})">Delete</button>
                    </div>
                
                </div>
            </div>
        </li>`;
        document.getElementById(ul).innerHTML+=reloadTask;
        document.getElementById(id_count).innerText=task_index;
    
        //i++;
    }
}


var saveButton=document.getElementById("save");

/*var toDoIcon="question.png";
var inProgressIcon="work-in-progress.png";
var Done="check.png";*/

//var index;

saveButton.addEventListener("click",function(){

    //index=i;
    
    var title=document.getElementById("title").value;
    var feature=document.getElementById("feature");
    var bug=document.getElementById("bug");
    var selectedType ;
    if (feature.checked) {
        selectedType = feature.value;
    }else{
        selectedType =bug.value;
    } 
    var priority=document.getElementById("priority").value;
    var status=document.getElementById("status").value;
    var date=document.getElementById("date").value;
    var description=document.getElementById("description").value;
    
    /*if(status=="To Do"){
        img = toDoIcon;
        ul=toDoUl;
        to_do_index++;
        task_index=to_do_index;
        id_count=id_to_do_count;

    }else if(status=="In Progress"){
        img = inProgressIcon;
        ul=inProgressUl;
        in_progress_index++;
        task_index=in_progress_index;
        id_count=id_in_progress_count;
    }else{
        img = Done;
        ul=done;
        done_index++;
        task_index=done_index;
        id_count=id_done_count;
    }*/

    object={
        'title'         :   title,
        'type'          :   selectedType,
        'priority'      :   priority,
        'status'        :   status,
        'date'          :   date,
        'description'   :   description,
    };
    tasks.push(object);
    
    reloadTasks();

    /*let task = `
        <li class="list-group-item d-flex" id="task${index}" >
            <div><img src="./assets/img/${img}" alt=""></div>
            <div class="w-100">
                <div class="fs-3 fw-bold">${tasks[index].title}</div>
                <div class="">
                    <div class=""># created in ${tasks[index].date}</div>
                    <div class="">
                        ${tasks[index].description}
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="">
                            <span class="badge rounded-pill text-bg-primary" >${tasks[index].priority}</span>
                            <span class="badge rounded-pill text-bg-secondary">${tasks[index].type}</span>
                        </div>
                        <div>
                            <button type="button" class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="edit(${index})">Edit</button>
                            <button type="button" class="btn btn-danger" onclick="Delete(${index})" >Delete</button>
                        </div>
                
                    </div>
                </div>
            </div>
        </li>`;
    
        document.getElementById(ul).innerHTML+=task;
        document.getElementById(id_count).innerText=task_index;*/
        
        //index++;

})

function Edit(index){
    document.getElementById("save").style.display = "none";
    document.getElementById("save_changes").style.display = "block";

    document.getElementById("title").value=tasks[index].title;
    if (tasks[index].type=="Feature") {
        document.getElementById("feature").checked=true;
    }else{
        document.getElementById("bug").checked=true;
    }
    document.getElementById("priority").value=tasks[index].priority;
    document.getElementById("status").value=tasks[index].status;
    document.getElementById("date").value=tasks[index].date;
    document.getElementById("description").value=tasks[index].description;

    var x=0;
    var cancelBtn=document.getElementById("cancel");
    cancelBtn.addEventListener("click",function(){
        x=1;
    });
    if(x==1){
        return;
    }
    var saveChangesBtn=document.getElementById("save_changes");
   
    saveChangesBtn.addEventListener("click",function(){
        
        if(x==0){
            tasks[index].title=document.getElementById("title").value;
            var selectedType;
            if (document.getElementById("feature").checked) {
                selectedType = document.getElementById("feature").value;
            }else{
                selectedType =document.getElementById("bug").value;
            }
            tasks[index].type=selectedType;
            tasks[index].priority=document.getElementById("priority").value;
            tasks[index].status=document.getElementById("status").value;
            tasks[index].date=document.getElementById("date").value;
            tasks[index].description=document.getElementById("description").value;
    
            reloadTasks();
        
        }
      
    }, {once : true});
    
}


function Delete(index){
    tasks.splice(index,1);
    reloadTasks();
}

function hideSaveChanges(){
    document.getElementById("save_changes").style.display = "none";
    document.getElementById("save").style.display = "block";
}