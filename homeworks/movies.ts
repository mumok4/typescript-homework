const GENRES = ['comedy', 'drama', 'action', 'horror', 'sci-fi'] as const
type Genre = typeof GENRES[number]

type SortBy = 'year' | 'rating' | 'title'

interface Movie {
    id: number
    title: string
    year: number        // год выхода
    rating: number      // рейтинг от 0 до 10
    genre: Genre
    description?: string
    director?: string
}

type MovieCard = Pick<Movie, 'id' | 'title' | 'year' | 'rating'>
type MovieFull = Readonly<Movie>

const GENRE_EMOJI: { [key in Genre]: string } = {
    comedy: '😂',
    drama: '🎭',
    action: '💥',
    horror: '👻',
    'sci-fi': '🚀',
}

function filterByGenre(movies: Movie[], genre: Genre): Movie[] {
    return movies.filter((movie) => movie.genre === genre)
}

function sortMovies(movies: Movie[], by: SortBy): Movie[] {
    return [...movies].sort((a, b) => {
        if (by === 'title') return a.title.localeCompare(b.title)
        return a[by] - b[by]
    })
}

function toCard(movie: Movie): MovieCard {
    return {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
    }
}

const movies: Movie[] = [
    { id: 1, title: 'Kin-dza-dza!', year: 1986, rating: 8.5, genre: 'sci-fi' },
    { id: 2, title: 'Viy', year: 1967, rating: 7.9, genre: 'horror' },
    { id: 3, title: 'The Diamond Arm', year: 1969, rating: 8.6, genre: 'comedy' },
    { id: 4, title: 'Moscow Does Not Believe in Tears', year: 1980, rating: 8.1, genre: 'drama' },
    { id: 5, title: 'The Irony of Fate', year: 1975, rating: 8.3, genre: 'action' },
]

console.log("---Фильтрация по жанру научной фантастики")
console.log(filterByGenre(movies, 'sci-fi'))
console.log("---Сортировка по рэйтингу")
console.log(sortMovies(movies, 'rating'))
console.log("---Карточка фильма")
console.log(toCard(movies.find((m) => m.id === 1)!))
console.log("---Эмодзи жанра")
console.log(GENRE_EMOJI['sci-fi'])