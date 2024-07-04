<template>
    <swiper-container
        @swiperafterinit="onSwiperReady"
        :pagination="{
            clickable: true
        }"
        :loop="true"
        :space-between="60"
        :mousewheel="true"
        :parallax="true"
        :centered-slides="true"
        :effect="'coverflow'"
        :slideToClickedSlide="true"
        :coverflowEffect="{
            rotate: 40,
            slideShadows: false
        }"
        :breakpoints="{
            0: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            700: {
                slidesPerView: 2,
                spaceBetween: 60
            },
            1350: {
                slidesPerView: 3,
                spaceBetween: 80
            }
        }"
        class="swiper"
    >
        <swiper-slide class="swiper__slide" v-for="project in dataStore.getHighlightedProjects" :key="project.id">
            <div class="swiper__card" data-swiper-parallax="20" data-swiper-parallax-scale="0.9" data-swiper-parallax-opacity="0.75" data-swiper-parallax-duration="1000">
                <img
                    :src="loadImage(`${project.category}/${project.slug}`)"
                    width="330"
                    height="170"
                    alt="Screenshot showing the project"
                    data-swiper-parallax="80"
                    data-swiper-parallax-duration="1000"
                    loading="lazy"
                />

                <h4 data-swiper-parallax="80" data-swiper-parallax-duration="1000">{{ project.name }}</h4>

                <h5 data-swiper-parallax="80" data-swiper-parallax-duration="1000">{{ $t(`projects.${project.category}.${project.locale_key}.subtitle`) }}</h5>

                <div class="swiper__card-description" data-swiper-parallax="80" data-swiper-parallax-duration="1250">
                    <p>{{ $t(`projects.${project.category}.${project.locale_key}.introduction`) }}</p>
                </div>

                <router-link
                    :to="`/showcase/${project.category}/${project.slug}`"
                    :title="$t('projects.check-details')"
                    data-swiper-parallax="80"
                    data-swiper-parallax-opacity="0.2"
                    data-swiper-parallax-duration="1500"
                >
                    {{ $t('projects.check-details') }}
                    <icon name="arrow" />
                </router-link>
            </div>
        </swiper-slide>
    </swiper-container>
</template>

<script setup>
import { useDataStore } from '@/stores/DataStore';
import { register } from 'swiper/element/bundle';

register();

const dataStore = useDataStore();

function onSwiperReady(instance) {
    const swiper = instance.detail[0];
    swiper.slidePrev(100);
}

const loadImage = (fileset) => {
    return new URL(import.meta.env.BASE_URL + 'images/projects/' + fileset + '/preview.jpg', import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.swiper {
    &__slide {
        background-color: $--color-canvas-variant-secondary;
        border-radius: 7px;
        cursor: grab;
        height: auto;
        margin: 10px 0px 50px 0px;
        padding: 15px;
        transition: background-color 2s linear;

        &::before {
            content: '';
            background: linear-gradient(180deg, #3a3ae2, #6363e2, #8c8ce2, #a1a1e4, #b4b4b4, #dcdcdc, #d3d3d3);
            border-radius: 7px;
            bottom: 0;
            left: 0;
            opacity: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition: opacity 0.25s ease-in-out;
        }

        &:hover::before {
            opacity: 1;
        }
    }

    &__card {
        align-items: flex-start;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 7px;
        display: flex;
        flex-direction: column;
        padding: 20px;

        img {
            border-radius: 5px;
            height: auto;
            margin-bottom: 25px;
            width: 100%;
        }

        h4 {
            color: $--color-text-inverted;
            font-size: 3.2rem;
            line-height: 1.1;
            margin: 0 0 10px 0;
        }

        h5 {
            color: $--color-text-inverted-muted-1;
            font-size: 1.8rem;
            font-style: italic;
            font-weight: bold;
            line-height: 1.2;
            margin: 0 0 13px 0;
        }

        &-description {
            margin: 0 0 20px 0;

            p {
                color: $--color-text-inverted-muted-2;
                display: -webkit-box;
                line-clamp: 4;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
            }
        }

        a {
            align-items: center;
            background-color: $--color-canvas-inverted;
            border-radius: 5px;
            color: $--color-text-inverted;
            display: flex;
            overflow: hidden;
            padding: 10px 20px;
            text-decoration: none;
            transition: all 0.6s ease-in-out;
            z-index: 1;

            &:hover {
                svg {
                    margin-left: 20px;
                    transition: all 0.6s ease-in-out;
                }
            }

            &::after {
                background-color: $--color-brand-primary;
                bottom: 0;
                content: '';
                height: 100%;
                position: absolute;
                right: 100%;
                transition: all 0.6s ease;
                width: 100%;
                z-index: -1;
            }

            &:hover::after {
                right: 0;
                transition: all 0.6s ease;
            }

            svg {
                fill: $--color-text-inverted;
                height: 12px;
                margin-left: 10px;
                transition: all 0.6s ease;
                width: 12px;
            }
        }
    }
}

@media (max-width: 500px) {
    .swiper-slide {
        padding: 10px;
    }
}
</style>
