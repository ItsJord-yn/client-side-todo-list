console.log("works");
var days = ["Sunday", "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday"];
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

var localStorage = window.localStorage;

function update() {
    var date = new Date();
	
	// load in tasks from localStorage
	// get number of tasks in HTML collection, and loop through it
	// use collection to find text same as task stored in localStorage
	
	var activeTaskElements = document.getElementById("list").getElementsByClassName("task");
	for (let i = 0; i < activeTaskElements.length; i++) {
		if (activeTaskElements[i] !== undefined) {
			var taskStr = activeTaskElements[i].getElementsByTagName("p")[0];
			var dateStr = activeTaskElements[i].getElementsByTagName("p")[1];
			//console.log("looping")
			for (let x = 0; x < 1000; x++) {
				var dT = localStorage.getItem("task"+x);
				if (dT !== null) {
					dT = JSON.parse(dT);
					console.log(new Date());
					console.log(new Date(dT.Deadline))
					console.log("---=-=-=-=");
					console.log(dT.Text);
					console.log(taskStr);

					//console.log(dT.Text + " " + taskStr)
					if (dT.Text == taskStr.innerText) {
						console.log("YES")
						if (new Date() > new Date(dT.Deadline)) {
							console.log("handling"+dT.Text);
							console.log("overdue");
							dateStr.classList.remove("inProgress");
							dateStr.classList.add("overdue");
						}
					}
				}
			}
		}	
	}
	
	
	// update the clock
    var clock = document.getElementById("clock");
    clock.innerHTML = `${date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"}`;
}

update();
setInterval(update,1000);

// code for adding new tasks
document.getElementById("submit").addEventListener("click",function() {
	
	var taskStr = document.getElementById("taskName").value;
	var dateStr = document.getElementById("deadline").value;
	
	var taskObject = {
		Text: taskStr,
		Deadline: dateStr
	}
	//console.log(taskStr);
	//console.log(dateStr);
	
	// this puts the task into the DOM (makes a new li)
    if (dateStr.length > 0 && taskStr.length > 0) {
        var date = new Date(dateStr);
        var date2 = new Date();
        console.log(date);
        
        var li = document.createElement("li");
        li.setAttribute("id","taskElement");
		li.classList.add("task");

        var taskText = document.createElement("p");
        taskText.setAttribute("id","taskText");

        var taskDeadline = document.createElement("p");
        taskDeadline.setAttribute("id","taskText");

        var delBtn = document.createElement("button");
        delBtn.setAttribute("id","deleteBtn");
        
        taskText.appendChild(document.createTextNode(taskStr));
        taskDeadline.appendChild(document.createTextNode(`${days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate()} | ${date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"}`));
        delBtn.appendChild(document.createTextNode("Delete"));

        if (date2 >= date) {
            taskDeadline.classList.add("overdue");
        } else if (date2 < date) {
            taskDeadline.classList.add("inProgress");
        }
		
		
        li.appendChild(taskText);
        li.appendChild(taskDeadline);
        li.appendChild(delBtn);

        document.getElementById("list").appendChild(li);
		
		// this adds the task to window.localStorage
		for (let i = 0; i < 1000; i++) {
			if (localStorage.getItem("task" + i) == null) {
				localStorage.setItem("task"+i,JSON.stringify(taskObject));
				break;
			}
		}
		
		delBtn.addEventListener("click",function() {
			for (let i = 0; i < 1000; i++) {
			if (localStorage.getItem("task" + i) !== null) {
				let task = localStorage.getItem("task" + i);
				task = JSON.parse(task);
				if (task.Text == taskStr) {
					console.log("fds")
					localStorage.removeItem("task"+i);
					li.remove();
					break;
				}
			}
		}
		})
    }
});

