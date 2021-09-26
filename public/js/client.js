function sendRequestNewInstance() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:9000/instance', true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
	xhr.onload = () => {
		let body = JSON.parse(xhr.response);
		alert(body.msg)
	};
	xhr.send();
}