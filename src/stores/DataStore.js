import { defineStore } from 'pinia';

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        availableLanguages: [
            { lang: 'en', name: 'english' },
            { lang: 'pl', name: 'polski' }
        ],
        currentLanguage: { lang: 'en', name: 'english' },
        cvLinks: {
            en: 'https://drive.google.com/file/d/1GCN57ckiYWPEOzi3BOg3Wi53B68YSeCS/view?usp=sharing',
            pl: 'https://drive.google.com/file/d/17trUs6uVkl1U6zEj0JDgXF0fUmcc6Ont/view?usp=sharing'
        },
        highlightedProjects: ['dreamspeak', 'manager', 'bargify', 'gymtracker', 'dreamfork', 'krosno24'],
        projects: [
            {
                id: 1,
                category: 'website',
                name: 'Krosno24.pl',
                slug: 'krosno24',
                images: 6,
                gallery_type: 'desktop',
                locale_key: 'krosno24',
                live_url: 'https://krosno24.pl'
            },
            {
                id: 2,
                category: 'website',
                name: 'Dream-Speak.pl',
                slug: 'dreamspeak',
                images: 5,
                gallery_type: 'desktop',
                locale_key: 'dreamspeak',
                live_url: 'https://dream-speak.pl'
            },
            {
                id: 3,
                category: 'website',
                name: 'PokeCrew.pl',
                slug: 'pokecrew',
                images: 3,
                gallery_type: 'mobile',
                locale_key: 'pokecrew',
                live_url: 'https://pokecrew.pl',
                source_url: 'https://github.com/PiciuU/PokeCrew-App'
            },
            {
                id: 4,
                category: 'website',
                name: 'DreamFork',
                slug: 'dreamfork',
                images: 5,
                gallery_type: 'desktop',
                locale_key: 'dreamfork',
                live_url: 'https://dreamfork.dream-speak.pl',
                source_url: 'https://github.com/PiciuU/DreamFork-PHP-Framework'
            },
            {
                id: 5,
                category: 'website',
                name: 'Bargify',
                slug: 'bargify',
                images: 4,
                gallery_type: 'desktop',
                locale_key: 'bargify',
                live_url: 'https://dev.dream-speak.pl/bargify/',
                source_url: 'https://github.com/PiciuU/Bargify-DreamFork-App'
            },
            {
                id: 6,
                category: 'website',
                name: 'GymTracker',
                slug: 'gymtracker',
                images: 5,
                gallery_type: 'mobile',
                locale_key: 'gymtracker',
                live_url: 'https://dev.dream-speak.pl/gymtracker/',
                source_url: 'https://github.com/PiciuU/GymTracker-App'
            },
            {
                id: 7,
                category: 'website',
                name: 'AdManager',
                slug: 'manager',
                images: 6,
                gallery_type: 'desktop',
                locale_key: 'manager',
                live_url: 'https://dev.dream-speak.pl/system/',
                source_url: 'https://github.com/PiciuU/Ad-Manager-App'
            },
            {
                id: 8,
                category: 'game',
                name: 'BALLER',
                slug: 'baller',
                images: 4,
                gallery_type: 'mobile',
                locale_key: 'baller',
                live_url: 'https://play.google.com/store/apps/details?id=com.dominikszybiszgamestudio.topballer'
            },
            {
                id: 9,
                category: 'game',
                name: 'Project Aridia',
                slug: 'project-aridia',
                images: 6,
                gallery_type: 'mobile',
                locale_key: 'project-aridia'
            },
            {
                id: 10,
                category: 'game',
                name: 'PlayGround',
                slug: 'playground',
                images: 5,
                gallery_type: 'mobile',
                locale_key: 'playground',
                live_url: 'https://dev.dream-speak.pl/PlayGround.apk',
                source_url: 'https://github.com/PiciuU/WSIZ-Project-Unity-CS'
            },
            {
                id: 11,
                category: 'other',
                name: 'DreamLife',
                slug: 'dreamlife',
                images: 6,
                gallery_type: 'desktop',
                locale_key: 'dreamlife',
                live_url: 'https://www.figma.com/design/RIUtgKeohdfhlxQ5vPYwn7/Project---DreamLife-Fashion-Shop?node-id=0-1&t=rNfuGxKLsT0W6Qoa-1'
            },
            {
                id: 12,
                category: 'other',
                name: 'PlayGround',
                slug: 'playground',
                images: 4,
                gallery_type: 'desktop',
                locale_key: 'playground',
                live_url: 'https://dev.dream-speak.pl/playground/',
                source_url: 'https://github.com/PiciuU/PlayGround-App'
            }
        ]
    }),
    getters: {
        getAvailableLanguages: (state) => state.availableLanguages,
        getCurrentLanguage: (state) => state.currentLanguage,
        getCvLink: (state) => state.cvLinks[state.currentLanguage.lang],
        getProjects: (state) => state.projects,
        getProject: (state) => (id) => state.projects.find((project) => project.id == id),
        getHighlightedProjects: (state) => {
            return state.projects
                .filter((project) => state.highlightedProjects.includes(project.slug))
                .sort((a, b) => state.highlightedProjects.indexOf(a.slug) - state.highlightedProjects.indexOf(b.slug));
        }
    }
});
