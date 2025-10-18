export type Language = 'en' | 'pt' | 'es';

type TranslationTree = {
  [key: string]: string | TranslationTree;
};

export const translations: Record<Language, TranslationTree> = {
  en: {
    brand: 'Movies',
    common: {
      loading: 'Loading...',
      errorMovies: 'Unable to load movies. Please try again soon.',
      errorMovie: 'Unable to load this movie.',
      back: 'Back',
      backHome: 'Back to start',
      backDetail: 'Back',
      watchNow: 'Watch now',
      watch: 'Watch',
      play: 'Play',
      moreInfo: 'More information',
      trailer: 'Trailer',
      myList: 'My list',
      all: 'All',
      next: 'Next',
      previous: 'Previous',
      duration: 'Duration',
      imdb: 'IMDb',
      fansFavorite: 'Fan favorite',
      highlight: 'Highlight',
      relevance: '{{value}}% relevance',
      search: 'Search',
      notifications: 'Notifications',
      kids: 'Kids',
      menu: 'Menu',
      close: 'Close',
      topBadge: 'Top 10 in Brasil',
      originalBadge: 'Original',
      newBadge: 'New',
      recommendedBadge: 'Recommended',
      noResults: 'No movies found with the selected filters.',
      genres: 'Genres',
      languages: 'Languages',
      additionalInfo: 'Additional information',
      rating: 'Rating',
      classification: 'Rating',
      cast: 'Main cast',
      audienceScore: 'Audience score: {{value}}%',
      languageNames: {
        english: 'English',
        portuguese: 'Portuguese',
        spanish: 'Spanish',
      },
    },
    header: {
      nav: {
        home: 'Home',
        series: 'Series',
        movies: 'Movies',
        newPopular: 'New & Popular',
        myList: 'My list',
      },
      language: 'Language',
    },
    hero: {
      top10: 'Top 10 • Most watched today',
      durationLabel: 'Duration',
      genreBadge: 'Top genres',
    },
    carousel: {
      title: 'Popular on Movies',
      subtitle: 'Keep watching titles similar to the ones you love.',
      genres: 'Genres',
    },
    searchPage: {
      heading: 'Explore the catalog and find something incredible to watch.',
      description:
        'Search by title, browse by genres and discover new releases curated for you. Results update in real time.',
      searchLabel: 'Search',
      placeholder: 'Search for a title...',
      genresLabel: 'Genres',
      error:
        'We could not refresh the list right now. Showing the latest data available.',
    },
    modal: {
      relevance: '{{value}}% relevant',
      imdbScore: 'IMDb {{value}}',
    },
    movieDetail: {
      top: 'Top 10 in Brasil',
      listButton: 'My list',
      trailer: 'Trailer',
    },
  },
  pt: {
    brand: 'Movies',
    common: {
      loading: 'Carregando...',
      errorMovies: 'Não foi possível carregar os filmes. Tente novamente em instantes.',
      errorMovie: 'Não foi possível carregar o filme.',
      back: 'Voltar',
      backHome: 'Voltar para início',
      backDetail: 'Voltar',
      watchNow: 'Assistir agora',
      watch: 'Assistir',
      play: 'Reproduzir',
      moreInfo: 'Mais informações',
      trailer: 'Trailer',
      myList: 'Minha lista',
      all: 'Todos',
      next: 'Próximo',
      previous: 'Anterior',
      duration: 'Duração',
      imdb: 'IMDb',
      fansFavorite: 'Favorito dos fãs',
      highlight: 'Destaque',
      relevance: '{{value}}% relevância',
      search: 'Buscar',
      notifications: 'Notificações',
      kids: 'Infantil',
      menu: 'Menu',
      close: 'Fechar',
      topBadge: 'Top 10 no Brasil',
      originalBadge: 'Original',
      newBadge: 'Novidade',
      recommendedBadge: 'Recomendado',
      noResults: 'Nenhum filme encontrado com os filtros selecionados.',
      genres: 'Gêneros',
      languages: 'Idiomas',
      additionalInfo: 'Informações adicionais',
      rating: 'Classificação',
      classification: 'Classificação',
      cast: 'Elenco principal',
      audienceScore: 'Nota do público: {{value}}%',
      languageNames: {
        english: 'Inglês',
        portuguese: 'Português',
        spanish: 'Espanhol',
      },
    },
    header: {
      nav: {
        home: 'Início',
        series: 'Séries',
        movies: 'Filmes',
        newPopular: 'Mais assistidos',
        myList: 'Minha lista',
      },
      language: 'Idioma',
    },
    hero: {
      top10: 'Top 10 • Mais assistidos hoje',
      durationLabel: 'Duração',
      genreBadge: 'Principais gêneros',
    },
    carousel: {
      title: 'Populares na Movies',
      subtitle: 'Continue assistindo títulos parecidos com os que você ama.',
      genres: 'Gêneros',
    },
    searchPage: {
      heading: 'Explore o catálogo e encontre algo incrível para assistir.',
      description:
        'Pesquise por títulos, navegue por gêneros e descubra novidades pensadas para você. Os resultados atualizam em tempo real.',
      searchLabel: 'Buscar',
      placeholder: 'Procure por título...',
      genresLabel: 'Gêneros',
      error:
        'Não foi possível atualizar a lista agora. Exibindo últimos dados.',
    },
    modal: {
      relevance: '{{value}}% relevante',
      imdbScore: 'IMDb {{value}}',
    },
    movieDetail: {
      top: 'Top 10 no Brasil',
      listButton: 'Minha lista',
      trailer: 'Trailer',
    },
  },
  es: {
    brand: 'Movies',
    common: {
      loading: 'Cargando...',
      errorMovies: 'No fue posible cargar las películas. Intenta nuevamente más tarde.',
      errorMovie: 'No fue posible cargar esta película.',
      back: 'Volver',
      backHome: 'Volver al inicio',
      backDetail: 'Volver',
      watchNow: 'Ver ahora',
      watch: 'Ver',
      play: 'Reproducir',
      moreInfo: 'Más información',
      trailer: 'Tráiler',
      myList: 'Mi lista',
      all: 'Todos',
      next: 'Siguiente',
      previous: 'Anterior',
      duration: 'Duración',
      imdb: 'IMDb',
      fansFavorite: 'Favorita de los fans',
      highlight: 'Destacado',
      relevance: '{{value}}% relevancia',
      search: 'Buscar',
      notifications: 'Notificaciones',
      kids: 'Infantil',
      menu: 'Menú',
      close: 'Cerrar',
      topBadge: 'Top 10 en Brasil',
      originalBadge: 'Original',
      newBadge: 'Novedad',
      recommendedBadge: 'Recomendado',
      noResults: 'No se encontraron películas con los filtros seleccionados.',
      genres: 'Géneros',
      languages: 'Idiomas',
      additionalInfo: 'Información adicional',
      rating: 'Clasificación',
      classification: 'Clasificación',
      cast: 'Elenco principal',
      audienceScore: 'Puntuación de la audiencia: {{value}}%',
      languageNames: {
        english: 'Inglés',
        portuguese: 'Portugués',
        spanish: 'Español',
      },
    },
    header: {
      nav: {
        home: 'Inicio',
        series: 'Series',
        movies: 'Películas',
        newPopular: 'Novedades populares',
        myList: 'Mi lista',
      },
      language: 'Idioma',
    },
    hero: {
      top10: 'Top 10 • Más vistos hoy',
      durationLabel: 'Duración',
      genreBadge: 'Géneros principales',
    },
    carousel: {
      title: 'Populares en Movies',
      subtitle: 'Sigue viendo títulos similares a los que te encantan.',
      genres: 'Géneros',
    },
    searchPage: {
      heading: 'Explora el catálogo y encuentra algo increíble para ver.',
      description:
        'Busca por título, navega por géneros y descubre novedades pensadas para ti. Los resultados se actualizan en tiempo real.',
      searchLabel: 'Buscar',
      placeholder: 'Busca por título...',
      genresLabel: 'Géneros',
      error:
        'No fue posible actualizar la lista ahora. Mostrando los últimos datos disponibles.',
    },
    modal: {
      relevance: '{{value}}% relevante',
      imdbScore: 'IMDb {{value}}',
    },
    movieDetail: {
      top: 'Top 10 en Brasil',
      listButton: 'Mi lista',
      trailer: 'Tráiler',
    },
  },
};

function resolvePath(tree: TranslationTree, path: string): string | TranslationTree | undefined {
  return path.split('.').reduce<TranslationTree | string | undefined>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return acc[key];
    }
    return undefined;
  }, tree);
}

export function translate(
  language: Language,
  key: string,
  variables?: Record<string, string | number>,
): string {
  const value = resolvePath(translations[language], key);
  if (typeof value !== 'string') {
    return key;
  }

  if (!variables) {
    return value;
  }

  return Object.entries(variables).reduce((acc, [varKey, varValue]) => {
    return acc.replace(new RegExp(`{{\\s*${varKey}\\s*}}`, 'g'), String(varValue));
  }, value);
}
