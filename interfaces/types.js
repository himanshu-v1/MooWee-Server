export const user = {
    username: String,
    password: String,
    access: Number,
};

export const movie = {
    title: String,
    year: Number,
    genre: String,
    poster: URL,
    rating: Number,
    director: String,
    id: String,
};

export const tvShow = {};

export const comments = {
    id: String,
    comment: String,
    mwId: String,
    timestamp: String,
    likes: Number,
    username: user.username,
};

export const replies = {
    id: String,
    reply: String,
    cmId: comments.id,
    timestamp: String,
    likes: Number,
    username: user.username,
};

export const dataList = ["poster", "title", "year", "rating", "director", "genre", "time"];
export const detailList = ["plot", "cast", "producer", "production"];
export const dataTvList = ["poster", "title", "tv_year", "tv_rating", "tv_director", "genre", "episodes"];
export const detailTvList = ["plot", "cast", "tv_producer", "tv_production"];

export const init = [
    'The_Prestige_(film)',
    'Inglourious_Basterds',
    'Eternal_Sunshine_of_the_Spotless_Mind',
    'The_Shining_(film)'
];

export const initTv = [
    'It%27s_Always_Sunny_in_Philadelphia',
    'The_Big_Bang_Theory',
];