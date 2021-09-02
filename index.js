document.getElementById('spiner').style.display = 'none'
document.getElementById('book-empty').style.display = 'none'
//load Data from server
const loadResult = async () => {
    const inputField = document.getElementById('inputField');
    const inputText = inputField.value;
    inputField.value = ''
    if (inputText !== '') {
        try {
            document.getElementById('book-empty').style.display = 'none'
            const booksField = document.getElementById('booksResult');
            booksField.textContent = '';
            document.getElementById('spiner').style.display = 'block'
            //console.log(inputText)
            const url = `http://openlibrary.org/search.json?q=${inputText}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.docs.length > 0) {
                displayResult(data.docs, data.numFound)
            }
            else {
                document.getElementById('spiner').style.display = 'none'
                document.getElementById('book-empty').style.display = 'block'
            }
        } catch (error) {
            document.getElementById('spiner').style.display = 'none'
            document.getElementById('book-empty').style.display = 'block'
        }
    }
}
// display Data
const displayResult = (books, numberOfBook) => {
    //console.log(books)
    document.getElementById('spiner').style.display = 'none'
    const booksField = document.getElementById('booksResult');
    const div = document.createElement('div')
    div.classList.add('col-md-12')
    div.innerHTML = `<h3 class='text-center'>The available books are: ${numberOfBook} </h3>`
    booksField.appendChild(div)

    books.forEach(book => {
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-40" style="max-width: 300px;">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..."
            style="max-height: 300px;">
          <div class="card-body">
            <h5 class="card-title">Title: ${book.title}</h5>
            <h6 class="mb-4">Author: ${book.author_name ? book.author_name[0] : ''}</h6>
            <p class='m-0'>Publisher: ${book.publisher ? book.publisher[0] : ''}</p>
            <p>Publish_Date: ${book.first_publish_year ? book.first_publish_year : ''}</p>
          </div>
       </div>
        `
        booksField.appendChild(div)
    })


}