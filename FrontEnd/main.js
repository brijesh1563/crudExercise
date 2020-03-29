let firstName = document.getElementById('fnm');
let lastName = document.getElementById('lnm');
let docId = document.getElementById("_id");
let tbody = document.getElementById('tbody');
let user = [];
let id = 0;
let addbtn = document.getElementById('add');
let updatebtn = document.getElementById('update');
let updatedusr;
let entries;
 
async function showUser() {
		let response = await fetch('http://localhost:3000/Backend/connection');
		entries = await response.json(); 
		try{
			console.log('successfully data retrieve')
		}
		catch(error){
			console.log('errror in retrieving data',error)
		}
	tbody.innerHTML = '';
	for(let i=0;i<entries.length;i++){
		tbody.innerHTML += `<tr>
							<td>${entries[i].firstName}</td>
							<td>${entries[i].lastName}</td>
							<td><span onclick = "edit(${i})"><i class="fas fa-edit text-warning"></i></span></td>
							<td><span onclick = "del(${i})"><i class="fas fa-trash text-danger"></i></span></td>
							</tr>`;
	};
}

async function addUser() {
		try {
			const data = {
				fname: firstName.value,
				lname: lastName.value
			};

			console.log(data);
			await fetch("http://localhost:3000/Backend/connection/addUser", { 
				method: "POST",
				headers: {
					'Content-type': 'application/json'  
				},
				body: JSON.stringify(data)
			});
			fname.value = '';
			lname.value = '';
			show();           

		} catch (error) {
			console.log('error',error);
		} 
	}
		
async function editUser(i) {
	try{
		addbtn.style.display = 'none';
		updatebtn.style.display = 'initial';
		docId.value = entries[i]._id; 
		firstName.value = entries[i].firstName; 
		lastName.value = entries[i].lastName;
	}
	catch (error) {
        console.log('error',error);
    } 
}

async function updateUser(i) {
	try {
		const data = {
			_id: docId.value,                 
			fname: firstName.value,
			lname: lastName.value
		};

		console.log(data);
		await fetch("http://localhost:3000/Backend/connection/updateUser", {
			method: "PUT",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		show();
		
		addbtn.style.display = 'initial';
		updatebtn.style.display = 'none';
    } catch (error) {
        console.log('error',error);
    }   	    
}

async function delUser(i) {
	try {
		const data = {
			_id: entries[i]._id        
		};

		await fetch("http://localhost:3000/Backend/connection/deleteUser", {
			method: "DELETE",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		show();
    } catch (error) {
        console.log('error',error);
    }   	
}

show();
