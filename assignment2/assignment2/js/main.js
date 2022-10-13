let page = 1;

let perPage = 10;

function showComments(data){
    return `
    <strong>Directed By:</strong> ${data.directors.join(',')}<br><br>
    <p>${data.fullplot}</p>
    <strong>Cast:</strong> ${data.cast ? data.cast.join(',') : 'N/A'}<br><br>
    <strong>Awards:</strong> ${data.awards.text}<br>
    <strong>IMDB Rating:</strong> ${data.imdb.rating} (${data.imdb.votes} votes)
    `;
}


function loadMovieData(title = null) {
    let url = title
    ? `https://encouraging-gray-chameleon.cyclic.app/api/movies?page=${page}&perPage=${perPage}&title=${title}`
    : `https://encouraging-gray-chameleon.cyclic.app/api/movies?page=${page}&perPage=${perPage}`;

    const div = document.querySelector('.pagination')
    title ? div.classList.add("d-none") : div.classList.remove("d-none")
    
    fetch(url)
        .then((res) => {
            return res.json();
         })
        .then((movies) => {
         
            let movieRows = `
            ${movies.map(movie => (
              `<tr data-id=${movie._id}>
                <td>${movie.year}</td>
                <td>${movie.title}</td>
                <td>${movie.plot ? movie.plot : 'N/A'}</td>
                <td>${movie.rated ? movie.rated : 'N/A'}</td>
                <td>${Math.floor(movie.runtime / 60).toString()}:${(movie.runtime % 60).toString().padStart(2, '0')}</td>
              </tr>`
            )).join('')}`;
            document.querySelector('#moviesTable tbody').innerHTML = movieRows;
            document.querySelector('#current-page').innerHTML = page;
            
            document.querySelectorAll('#moviesTable tbody tr').forEach((row) => {
                row.addEventListener('click', (e) => {
                    let clickedId = row.getAttribute('data-id');
                    fetch(`https://encouraging-gray-chameleon.cyclic.app/api/movies/${clickedId}`)
                    .then((res) => res.json())
                    .then((movie) => {
                        console.log(movie)
                        let modalBody = "";
                        if(movie.poster){
                            modalBody = `<img class="img-fluid w-100" src="${movie.poster}"><br><br>`;
                            modalBody += showComments(movie);
                        }
                        else{
                            modalBody = showComments(movie);
                        }
                        
        
                        document.querySelector('#detailModal .modal-title').innerHTML = movie.title;//.h5?
                        document.querySelector('#detailModal .modal-body').innerHTML = modalBody;
        
                        let myModal = new bootstrap.Modal(document.getElementById('detailModal'), {
                            backdrop: 'static', // default true - "static" indicates that clicking on the backdrop will not close the modal window
                            keyboard: false, // default true - false indicates that pressing on the "esc" key will not close the modal window
                            focus: true, // default true - this instructs the browser to place the modal window in focus when initialized
                          });
          
                          myModal.show();
                    })
                })
            })
           
        }) 

   
        
    
}

document.addEventListener('DOMContentLoaded', function () {
    loadMovieData();
    document.querySelector('#previous-page').addEventListener('click', (event) => {
        if(page > 1)
            page--;
        loadMovieData();
    });

    document.querySelector('#next-page').addEventListener('click', (event) => {
        page++;
        loadMovieData();
    });
    document.querySelector('#searchForm').addEventListener('submit', (event) => {
        event.preventDefault();
        page = 1;
        loadMovieData(document.querySelector('#title').value);
    });

    document.querySelector('#clearForm').addEventListener('click', (event) => { 
        document.querySelector('#title').value = ""
        loadMovieData();
    });
   
});