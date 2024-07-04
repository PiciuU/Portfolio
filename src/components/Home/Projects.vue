<template>
    <section class="projects">
        <div class="projects__container responsive-container">
            <div class="projects__ribbon">{{ $t('projects.title') }}</div>
            <div class="projects__content">
                <Carousel />
                <div class="projects__information">
                    <p>
                        {{ $t('projects.information-part-one') }}
                    </p>
                    <p>{{ $t('projects.information-part-two') }} <router-link to="/showcase/">Showcase</router-link>.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Carousel from '@/components/Home/ProjectsCarousel.vue';
</script>

<style lang="scss" scoped>
.projects {
    &__ribbon {
        --r: 30px;

        background: $--color-canvas-inverted;
        clip-path: polygon(-100vw 0, calc(100% - var(--r)) 0, 100% 50%, calc(100% - var(--r)) 100%, -100vw 100%);
        color: $--color-text-inverted;
        font-size: clamp(2rem, 8vw, 3.2rem);
        font-weight: bold;
        letter-spacing: 1px;
        line-height: 1.8;
        margin-bottom: 80px;
        margin-top: -40px;
        max-width: 100%;
        padding-right: calc(var(--r) + 0.25em);
        width: 500px;

        &::before {
            background: $--color-canvas-inverted;
            content: '';
            height: 100%;
            left: -100vw;
            position: absolute;
            width: 100vw;
        }
    }

    &__content {
        width: 100%;
    }

    &__information {
        text-align: center;
        margin-top: 20px;
        color: $--color-text-primary-muted-1;

        a {
            text-decoration: none;
            color: $--color-brand-primary;
            font-weight: bold;
        }
    }
}
</style>
