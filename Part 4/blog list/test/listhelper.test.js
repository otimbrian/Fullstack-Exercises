const listHelper = require('../utils/list_helper')

const singleBlog = [
    {
        'title': 'Welcome to Nature',
        'author': 'Otim Brian',
        'url': 'http://localhost',
        'likes': 20,
        'id': '61d438f5f64dcc7493e89c6a'
    }
]
const multipleBlogs = [
    {
        'title': 'Welcome to Nature',
        'author': 'Otim Brian',
        'url': 'http://localhost',
        'likes': 20,
        'id': '61d438f5f64dcc7493e89c6a'
    },
    {
        'title': 'This is the world',
        'author': 'Edwin Huble',
        'url': 'http://localhost/getting-to-the-stars',
        'likes': 50,
        'id': '61d43941f64dcc7493e89c6c'
    },
    {
        'title': 'Nas The GOAT',
        'author': 'Otim Brian',
        'url': 'http://localhost/getting-nas',
        'likes': 23,
        'id': '61d44636dbf4a54bc01e034e'
    },
    {
        'title': 'React.JS for web',
        'author': 'Denny Jolly',
        'url': 'http://localhost/web-frame-work',
        'likes': 15,
        'id': '61d469a2a667a36b77c0ff94'
    }
]
const multipleBlogsWithMoreThanOneFavourite = [
    {
        'title': 'Welcome to Nature',
        'author': 'Otim Brian',
        'url': 'http://localhost',
        'likes': 20,
        'id': '61d438f5f64dcc7493e89c6a'
    },
    {
        'title': 'This is the world',
        'author': 'Edwin Huble',
        'url': 'http://localhost/getting-to-the-stars',
        'likes': 50,
        'id': '61d43941f64dcc7493e89c6c'
    },
    {
        'title': 'Nas The GOAT',
        'author': 'DJ Danny The Don',
        'url': 'http://localhost/getting-nas',
        'likes': 50,
        'id': '61d44636dbf4a54bc01e034e'
    },
    {
        'title': 'React.JS for web',
        'author': 'Denny Jolly',
        'url': 'http://localhost/web-frame-work',
        'likes': 15,
        'id': '61d469a2a667a36b77c0ff94'
    }
]
describe('Dummy Test', () => {
    test('[] should be 1', () => {
        expect(listHelper.dummy([])).toBe(1)
    })

})

describe('Total likes of ', () => {
    test('[] should be zero ', () => {
        expect(listHelper.totalLike([])).toBe(0)
    })

    test('A single blog should be equal to likes of that blog', () => {
        expect(listHelper.totalLike(singleBlog)).toBe(20)
    })
    test('Multibe blogs should be calculated right', () => {
        expect(listHelper.totalLike(multipleBlogs)).toBe(108)
    })

})

const resultForMultipleBlog = [
    {
        'title': 'This is the world',
        'author': 'Edwin Huble',
        'url': 'http://localhost/getting-to-the-stars',
        'likes': 50,
        'id': '61d43941f64dcc7493e89c6c'
    }
]
const resultForMultipleBlogWwithMorethanOneFavourites = [
    {
        'title': 'This is the world',
        'author': 'Edwin Huble',
        'url': 'http://localhost/getting-to-the-stars',
        'likes': 50,
        'id': '61d43941f64dcc7493e89c6c'
    },
    {
        'title': 'Nas The GOAT',
        'author': 'DJ Danny The Don',
        'url': 'http://localhost/getting-nas',
        'likes': 50,
        'id': '61d44636dbf4a54bc01e034e'
    }
]

describe('Favourite Blogs of', () => {
    test('[] should be zero', () => {
        expect(listHelper.favouriteBlog([])).toEqual([])
    })

    test('A single blog should return that blog', () => {
        expect(listHelper.favouriteBlog(singleBlog)).toEqual(singleBlog)
    })

    test('Multiple Blogs should be right', () => {
        expect(listHelper.favouriteBlog(multipleBlogs)).toEqual(resultForMultipleBlog)
    })
    test('Multiple Blogs with more than one favourite should return all favourite', () => {
        expect(listHelper.favouriteBlog(multipleBlogsWithMoreThanOneFavourite)).toEqual(resultForMultipleBlogWwithMorethanOneFavourites)
    })
})
const mostPubAuthor = {
    'author' : 'Otim Brian',
    'Blogs' : 2
}
describe('Top Blogger',  () => {
    test('trial', () => {
        expect(listHelper.mostBlogs(multipleBlogs)).toEqual(mostPubAuthor)
    })
    test('empty list', () => {
        expect(listHelper.mostBlogs([])).toEqual({ author: undefined, Blogs: 0 })
    })
    test('Many top bloggers', () => {
        expect(listHelper.mostBlogs(multipleBlogsWithMoreThanOneFavourite)).toEqual({
            'author': 'Otim Brian',
            'Blogs' : 1
        })
    })
})

describe('Most liked author', () => {
    test('Multiple blogs should be most liked blog', () => {
        expect(listHelper.mostLikes(multipleBlogsWithMoreThanOneFavourite)).toEqual({
            'author': 'Edwin Huble',
            'likes' : 50
        })
    })

    test('[] should return correct', () => {
        expect(listHelper.mostLikes([])).toEqual({
            'author' : 'No author',
            'likes' : 0
        })
    })

})