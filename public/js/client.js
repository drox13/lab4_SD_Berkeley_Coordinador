function sendRequestNewInstance() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:9000/instance', true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
	xhr.onload = () => {
		let body = JSON.parse(xhr.response);
		alert(body.msg)

		var fila="<tr><td>"+body.numberInstance+"</td><td>"+body.ipIntancia+"</td><td>"+ body.port+"</td><td>"
		+ "<a href='http://119.18.0.2/5000' target='_blank'>" +  body.ipIntancia + "/5000</a>" +"</td></tr>";
		var btn = document.createElement("TR");
		btn.innerHTML=fila;
		document.getElementById("tablita").appendChild(btn);
	};
	xhr.send();
}
