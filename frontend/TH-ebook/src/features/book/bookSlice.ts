import {createSlice} from "@reduxjs/toolkit";
import {Category} from "../../models/Category.ts";

/*
*
* Khi chuyển sang dùng API phải dùng Async Action để có thể lấy API
*
* */

const categories: Category[] = [
    {name: "Action"},
    {name: "Adventure"},
    {name: "Comedy"},
    {name: "Drama"},
    {name: "Fantasy"},
    {name: "Horror"},
    {name: "Mystery"},
    {name: "Romance"},
    {name: "Sci-Fi"},
    {name: "Thriller"},
    {name: "Western"},
    {name: "Biography"},
    {name: "Cookbook"},
];

const initialState = [

    {
        id: "123456789",
        title: "Fuck Microsoft",
        description:
            'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
        cover_image:
            "https://img.perlego.com/book-covers/778577/9781451648553_300_450.webp",
        file_path: "dede",
        published_year: 2023,
        language: "vi",
        created_at: "2024-10-10T08:31:36.732Z",
        updated_at: "2024-10-10T08:31:36.732Z",
        authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
        coins: 50,
        category: categories,
    },
    {
        id: "123456781",
        title: "Fuck Apple",
        description:
            'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
        cover_image:
            "https://img.perlego.com/book-covers/3427220/9788858436059_300_450.webp",
        file_path: "dede",
        published_year: 2023,
        language: "vi",
        created_at: "2024-10-10T08:31:36.732Z",
        updated_at: "2024-10-10T08:31:36.732Z",
        authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
        coins: 50,
        category: categories,
    },
    {
        id: "123456782",
        title: "Fuck Facebook",
        description:
            'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
        cover_image:
            "https://img.perlego.com/book-covers/4168677/thumbnail_9780313351280.jpg",
        file_path: "dede",
        published_year: 2023,
        language: "vi",
        created_at: "2024-10-10T08:31:36.732Z",
        updated_at: "2024-10-10T08:31:36.732Z",
        authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
        coins: 50,
        category: categories,
    },
    {
        id: "123456785",
        title: "Fuck Google",
        description:
            'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
        cover_image:
            "https://img.perlego.com/book-covers/2193445/9781351768290_300_450.webp",
        file_path: "dede",
        published_year: 2023,
        language: "vi",
        created_at: "2024-10-10T08:31:36.732Z",
        updated_at: "2024-10-10T08:31:36.732Z",
        authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
        coins: 50,
        category: categories,
    },


    {
        id: "123456785",
        title: "Test ",
        description:
            'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
        cover_image:
            "https://img.perlego.com/book-covers/2193445/9781351768290_300_450.webp",
        file_path: "dede",
        published_year: 2023,
        language: "vi",
        created_at: "2024-10-10T08:31:36.732Z",
        updated_at: "2024-10-10T08:31:36.732Z",
        authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
        coins: 50,
        category: categories,
    },
    {
        id: "123456785",
        title: "Test 2",
        description:
            'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
        cover_image:
            "https://img.perlego.com/book-covers/2193445/9781351768290_300_450.webp",
        file_path: "dede",
        published_year: 2023,
        language: "vi",
        created_at: "2024-10-10T08:31:36.732Z",
        updated_at: "2024-10-10T08:31:36.732Z",
        authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
        coins: 50,
        category: categories,
    },
    {
        id: "123456785",
        title: "test 3",
        description:
            'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
        cover_image:
            "https://img.perlego.com/book-covers/2193445/9781351768290_300_450.webp",
        file_path: "dede",
        published_year: 2023,
        language: "vi",
        created_at: "2024-10-10T08:31:36.732Z",
        updated_at: "2024-10-10T08:31:36.732Z",
        authors: [{name: "Nguyen Thanh Hung"}, {name: "Huynh Gia Bao"}],
        coins: 50,
        category: categories,
    }


]

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
})

export default bookSlice.reducer;