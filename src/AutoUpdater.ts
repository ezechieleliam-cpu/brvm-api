import News from './models/NewsModel.js';

const dummyNews = [
  {
    title: 'BRVM monte',
    source: 'Ecofin',
    url: 'https://example.com/brvm-monte',
    html: '<p>Actualité fictive</p>',
    date: new Date()
  }
];

await News.insertMany(dummyNews);



export async function autoUpdate() {
  console.log('🔄 Mise à jour BRVM lancée...');
  // ici tu peux appeler tes scrapers, sauvegarder en base, etc.
}
