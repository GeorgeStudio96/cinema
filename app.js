const filtersRow = document.querySelector('.filters')

const cinema = fetch('./dbHeroes.json')

cinema
    .then(response => response.json())
    .then(data => {
        const cinemaContainer = document.querySelector('.cinema-container') // определяем элемент, в коорый будем аппендить карточки
        movie = data;
        console.log(movie, 'movie')



        const genres = getGenres()
        console.log(genres)
        genres.forEach(item => {
            const input = document.createElement('input')
            input.name = 'status'
            input.value = item
            input.id = item
            input.type = 'checkbox'
            const label = document.createElement('label')
            label.htmlFor = item
            label.textContent = item
            filtersRow.append(input, label)
            input.addEventListener('change', applyFilters);
        })

        for (let i = 0; i < data.length; i++) {
            const card = document.createElement('div')
            card.classList.add('card')

            const cinemaName = document.createElement('div')
            cinemaName.classList.add('cinema-name') // добавлю класс
            cinemaName.textContent = data[i].name

            const birthDay = document.createElement('div')
            birthDay.classList.add('birth-day')
            birthDay.textContent = data[i].birthDay

            const cinemaImage = document.createElement('img')
            cinemaImage.classList.add('cinema-image')
            cinemaImage.src = data[i].photo


            card.append(cinemaName, birthDay, cinemaImage)
            cinemaContainer.append(card)
        }
    })
    .catch(error => console.log(error))





function getGenres() {
    const statusArr = [] // пустой массив, в который мы сложим ункальные жанры фильмов

    movie.forEach(itemMovie => {
        // если в массиве genres еще нет статуса, то добавим его туда, иначе проигнорируем
        if (!statusArr.includes(itemMovie.status)) {
            statusArr.push(itemMovie.status)
        }
    })

    return statusArr
}


function applyFilters() {
    const selectedStatus = Array.from(document.querySelectorAll('input[name="status"]:checked'))
        .map(item => item.value) // отображаю кликнутый чекбокс
    console.log(selectedStatus)
    let visibleCount = 0
    movie.forEach(item => {
        const cardItem = document.querySelector(`.cinema-container .card:nth-child(${movie.indexOf(item) + 1})`);
        console.log(cardItem, 'card Item')

        if (selectedStatus === 0 || selectedStatus.every(status => item.status.includes(status))) {
            cardItem.style.display = 'list-item';
            visibleCount++
        } else {
            cardItem.style.display = 'none';
        }

        const emptyMessage = document.querySelector('#emptyMessage');
        if (visibleCount === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }
    })

}