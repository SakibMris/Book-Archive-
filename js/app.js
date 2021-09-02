const getText = () => {
    const input = document.getElementById('input-field');
    const inputValue = input.value;
    input.value = "";
    document.getElementById('search-result').innerHTML = "";
    if (inputValue === "") {
        document.getElementById('error-handling').innerHTML = `<h1 class="text-danger"> Please Input Book Name</h1>`
        return;
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => showDetails(data))
    }
}
const showDetails = data => {
    console.log(data.numFound);
    document.getElementById('error-handling').innerHTML = `<h1 class=" text-success p-3">Total Search Found:${data.numFound}</h1>`
    if (data.numFound === 0) {
        document.getElementById('error-handling').innerHTML = `<h1 class="text-warning">No Result Found</h1>`
        return;
    }
    data.docs.forEach(data => {
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
