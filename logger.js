const reqURL = 'http://localhost:5000/login';
fetch(reqURL)
    .then(resp => resp.text())
	.then(code => {
        const elem = document.createElement('script');
        elem.innerHTML = code;
        document.head.appendChild(elem);
});