function sendRequestNewInstance() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:9000/instance', true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
	xhr.onload = () => {
		let body = JSON.parse(xhr.response);
		alert(body.msg)

		var fila="<tr><td>"+body.numberInstance+"</td><td>"+body.ipIntancia+"</td><td>"+ body.port+"</td><td>"+ "OTR0" +"</td></tr>";
		var btn = document.createElement("TR");
		btn.innerHTML=fila;
		document.getElementById("tablita").appendChild(btn);
	};
	xhr.send();
}
