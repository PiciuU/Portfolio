<template>
    <main>
        <div class="background-wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                    d="M0,192L48,197.3C96,203,192,213,288,218.7C384,224,480,224,576,208C672,192,768,160,864,170.7C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
        </div>
        <section class="showcase">
            <div class="showcase__container responsive-container">
                <div class="showcase__nav">
                    <nav>
                        <ul>
                            <li v-for="category in categories" :key="category.key" :class="{ 'sub-on': currentCategory == category.slug }">
                                <h2 @click="expandCategory(category)">{{ $t(`projects.categories.${category.locale_key}`) }}</h2>
                                <ul>
                                    <li v-for="project in category.projects" :key="project.id" :class="{ active: currentProject?.id == project.id }">
                                        <router-link :to="`/showcase/${category.slug}/${project.slug}`">{{ project.title }}</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="showcase__content">
                    <div class="card" v-if="currentProject">
                        <div class="card__header">
                            <div class="card__title">
                                <h1>{{ currentProject.name }}</h1>
                            </div>
                            <div class="card__action">
                                <a v-if="currentProject.live_url" :href="currentProject.live_url" target="_blank"><icon name="arrow-up-right-from-square" /></a>
                                <a v-if="currentProject.source_url" :href="currentProject.source_url" target="_blank"> <icon name="github" /></a>
                            </div>
                        </div>
                        <div class="card__body">
                            <div class="card__subtitle">
                                <h2>{{ $t(`projects.${currentProject.category}.${currentProject.locale_key}.subtitle`) }}</h2>
                            </div>
                            <div class="card__introduction">
                                <p>
                                    {{ $t(`projects.${currentProject.category}.${currentProject.locale_key}.introduction`) }}
                                </p>
                            </div>
                            <div class="card__description">
                                {{ $t(`projects.${currentProject.category}.${currentProject.locale_key}.description`) }}
                            </div>
                            <div class="card__gallery">
                                <swiper-container
                                    @swiperafterinit="onSwiperReady"
                                    :zoom="true"
                                    :rewind="true"
                                    :initialSlide="Math.ceil(currentProject.images / 2) - 1"
                                    :effect="'cards'"
                                    :grabCursor="true"
                                    :pagination="{
                                        clickable: true
                                    }"
                                    class="swiper"
                                    :class="{ 'swiper--mobile': currentProject.gallery_type == 'mobile' }"
                                >
                                    <swiper-slide class="swiper__slide" v-for="index in currentProject.images" :key="index">
                                        <div class="swiper-zoom-container">
                                            <img
                                                :src="loadImage(`${currentProject.category}/${currentProject.slug}`, index.toString().padStart(2, '0'))"
                                                width="900"
                                                height="450"
                                                loading="lazy"
                                                alt="Screenshot showing the project"
                                            />
                                        </div>
                                    </swiper-slide>
                                </swiper-container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { register } from 'swiper/element/bundle';
import { useDataStore } from '@/stores/DataStore';

register();

const dataStore = useDataStore();

const route = useRoute();
const router = useRouter();

const categories = ref([
    { slug: 'website', locale_key: 'websites', projects: [] },
    { slug: 'game', locale_key: 'games', projects: [] },
    { slug: 'other', locale_key: 'other', projects: [] }
]);

const currentCategory = ref(null);
const currentProject = ref(null);
const swiper = ref(null);

watch(route, loadCurrentProject);

onMounted(() => {
    categories.value.forEach((category) => {
        category.projects = dataStore.getProjects
            .filter((project) => project.category === category.slug)
            .map((project) => ({
                id: project.id,
                title: project.name,
                slug: project.slug
            }));
    });

    loadCurrentProject();
});

function loadCurrentProject() {
    const { type, id } = route.params;

    if (type && id) {
        const loadedCategory = categories.value.find((category) => category.slug === type);
        const loadedProject = loadedCategory?.projects.find((project) => project.slug === id);

        if (loadedCategory && loadedProject) {
            currentCategory.value = loadedCategory.slug;
            currentProject.value = dataStore.getProject(loadedProject.id);

            if (swiper.value) {
                swiper.value.activeIndex = Math.ceil(currentProject.value.images / 2) - 1;
            }
        } else {
            redirectToDefaultProject();
        }
    } else {
        redirectToDefaultProject();
    }
}

function redirectToDefaultProject() {
    const projectToLoad = dataStore.getProject(1);
    router.push({ path: `/showcase/${projectToLoad.category}/${projectToLoad.slug}` });
}

function expandCategory(category) {
    currentCategory.value = currentCategory.value === category.slug ? null : category.slug;
}

function onSwiperReady(instance) {
    swiper.value = instance.detail[0];
}

const loadImage = (fileset, imageIndex) => {
    return new URL(import.meta.env.BASE_URL + 'images/projects/' + fileset + '/' + imageIndex + '.jpg', import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.background-wave {
    height: 10vw;
    position: absolute;
    line-height: 0;
    top: 0;
    transform: rotate(180deg);
    width: 100%;
    z-index: 0;

    svg {
        fill: $--color-canvas-variant;
        height: 100%;
        width: 100%;
    }
}

.swiper {
    min-height: 0;
    min-width: 0;
    width: 80%;

    &--mobile {
        width: 300px;
    }

    &__slide {
        border-radius: 15px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        margin-bottom: 50px;
    }

    img {
        height: auto;
        width: 100%;
    }
}

.card {
    width: 100%;

    &__header {
        align-items: center;
        display: flex;
        justify-content: space-between;
    }

    &__title {
        h1 {
            color: $--color-brand-primary;
            font-size: clamp(3rem, 8vw, 4.8rem);
            font-weight: bold;
        }
    }

    &__action {
        display: flex;
        gap: 25px;

        a {
            color: inherit;
            text-decoration: none;

            svg {
                height: 24px;
                transition: all 0.25s ease-in-out;
                width: 24px;

                &:hover {
                    fill: $--color-brand-primary;
                }
            }
        }
    }

    &__subtitle {
        h2 {
            color: $--color-text-primary-muted-1;
            font-size: 2.4rem;
            font-weight: bold;
        }
    }

    &__introduction {
        border-left: 10px solid $--color-brand-primary;
        margin: 15px 0px;
        padding-left: 15px;
    }

    &__description {
        text-align: justify;
    }

    &__gallery {
        display: grid;
        margin-top: 35px;
        place-items: center;
        width: 100%;
    }
}

.showcase {
    overflow: hidden;

    &__container {
        display: flex;
        width: 100%;
    }

    &__content {
        flex: 1;
    }

    &__nav {
        margin-top: 10vw;
        width: 250px;

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        li {
            display: block;
            padding: 0.65em 0;
            white-space: nowrap;

            &.sub-on {
                ul {
                    max-height: none;
                }

                h2 {
                    margin-bottom: 1rem;
                }
            }

            &.active {
                a::before {
                    background: $--color-brand-primary;
                    border-radius: 50%;
                    content: '';
                    height: 0.5rem;
                    left: 0;
                    position: absolute;
                    top: 0.25em;
                    width: 0.5rem;
                }
            }
        }

        h2 {
            color: $--color-text-primary;
            cursor: pointer;
            font-size: 1.6rem;
            font-weight: bold;
            margin-bottom: 0;
            text-decoration: none;
            transition: all 0.3s ease;

            &:hover {
                transform: translate3d(5px, 0, 0);
            }
        }

        li > ul {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.45s ease;

            li {
                padding: 10px 0px;
                white-space: nowrap;
            }

            a {
                color: $--color-text-primary;
                display: block;
                font-size: 1.4rem;
                line-height: 1.25;
                padding-left: 15px;
                text-decoration: none;
                transition: transform 0.3s ease;

                &:hover {
                    transform: translate3d(5px, 0, 0);
                }
            }
        }
    }

    &__content {
        margin-top: 6vw;
    }
}

@media screen and (max-width: 800px) {
    .showcase__container {
        flex-direction: column;
    }

    .showcase__nav {
        width: 100%;
    }

    .showcase__content {
        margin-top: 0px;
    }

    .card__header {
        align-items: start;
        flex-direction: column-reverse;
    }

    .card__action {
        align-self: flex-end;
    }

    .swiper {
        width: 95%;

        &--mobile {
            max-width: 200px;
            width: 50%;
        }
    }
}

@media screen and (max-width: 500px) {
    .card__description {
        text-align: initial;
    }
}
</style>
