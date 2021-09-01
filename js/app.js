const getText = () => {
    const input = document.getElementById('input-field');
    const inputValue = input.value;
    input.value = "";
    document.getElementById('search-result').innerHTML = "";
    if (inputValue === "") {
        const box = document.getElementById('error-box');
        box.classList.add('bg-danger', 'p-2', 'm-5');
        box.innerHTML = `<h1 class="text-white text-center"> Please Input Book Name</h1>`
        return;
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => showDetails(data.docs))
    }
}
const showDetails = data => {
    data.forEach(data => {
        console.log(data);
        const searchResult = document.getElementById('search-result')
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top " alt="...">
                <div class="card-body">
                  <h5 class="card-title text-info">${data.title ? data.title : ''}</h5>
                <p><span class="fw-bold">Author Name:</span> ${data.author_name}</p>
                <p><span class="fw-bold">Publisher Name:</span> ${data.publisher}</p>
                <p><span class="fw-bold">First Publish Date:</span> ${data.first_publish_year}</p>
                </div>
        </div>
        `
        searchResult.appendChild(div);
    });
}
