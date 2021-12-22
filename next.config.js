const withPlugins = require('next-compose-plugins'); // handle plug in  integration
const withVideos = require('next-videos'); // handle video rendering

// module.exports = withPlugins(
//     [
//         [withVideos, {}], // video rendering support plugin, configuration goes in the curly braces
//     ],
// );

module.exports = {
  reactStrictMode: true,
  distDir: 'build', // change the default build folder from .next to build
  images: {
    domains: [
      'assets.vercel.com',
      'dummyimage.com',
      'googleusercontent.com',
      'avatars.githubusercontent.com',
      'firebasestorage.googleapis.com/',
      'flowbite.com',
      'source.unsplash.com',
      'picsum.photos',
      'static.xx.fbcdn.net',
      "cdn.dribbble.com",
    ],
  },
  plugins: withPlugins([withVideos, {}]),
}
