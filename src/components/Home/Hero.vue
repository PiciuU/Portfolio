<template>
    <section class="hero">
        <div class="hero__container responsive-container">
            <div class="hero__image">
                <div class="hero__image-content">
                    <div class="hero__image-wrapper">
                        <div class="hero__image-circle"></div>
                        <img class="hero__image-img" src="@/assets/images/avatar.png" width="340" height="450" loading="lazy" alt="Profile Picture" />
                    </div>
                </div>
            </div>
            <div class="hero__text">
                <p class="hero__text-intro">{{ $t('hero.greeting') }}</p>
                <h1 class="hero__text-name"><span>Patryk</span> Strzałka</h1>
                <h2 class="hero__text-title">Fullstack Web Developer</h2>
                <div class="hero__text-description">
                    <p>{{ $t('hero.description') }}</p>
                </div>
                <div class="hero__text-shortcuts">
                    <a href="https://github.com/PiciuU" target="_blank" title="Github">
                        <icon name="github" />
                    </a>
                    <a href="https://www.linkedin.com/in/patryk-strzalka/" target="_blank" title="Linkedin">
                        <icon name="linkedin" />
                    </a>
                    <a href="mailto:patrykstrzalka00@gmail.com" target="_blank" title="Email">
                        <icon name="envelope" />
                    </a>
                    <a :href="dataStore.getCvLink" target="_blank" title="CV">
                        <icon name="folder" />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useDataStore } from '@/stores/DataStore';
const dataStore = useDataStore();
</script>

<style lang="scss" scoped>
.hero {
    background: $--color-canvas-variant;

    &__container {
        align-items: center;
        display: flex;
        gap: 100px;
    }

    &__image {
        flex-basis: 25%;

        &-content {
            transition: 0.25s ease;
            z-index: 1;

            &::before {
                aspect-ratio: 1/1;
                bottom: 0;
                border-radius: 50%;
                border-top: 2px solid $--color-brand-primary;
                content: '';
                left: 0;
                position: absolute;
                transform: scale(1.2);
                transition: all 0.5s ease-in-out;
                width: 100%;
            }

            &:hover {
                transform: scale(1.1);

                .image img {
                    transform: scale(1.1) translateY(-2rem);
                }

                &::before {
                    transform: scale(1.2) rotate(90deg);
                }
            }
        }

        &-wrapper {
            align-items: end;
            border-radius: 0 0 100vw 100vw;
            display: grid;
            filter: drop-shadow(2px 4px 3px rgba(0, 0, 0, 0.15));
            overflow: hidden;
        }

        &-circle {
            aspect-ratio: 1 / 1;
            background: white;
            border-radius: 50%;
            position: absolute;
            width: 100%;
        }

        &-img {
            filter: drop-shadow(2px 4px 6px black);
            height: auto;
            max-width: 100%;
            top: 30px;
            transform: scale(1.1);
            transition: 0.4s ease;
        }
    }

    &__text {
        flex: 1;
        padding: 20px 40px;

        &-intro {
            font-size: 2.4rem;
        }

        &-name {
            font-size: 10rem;
            font-weight: bold;

            span {
                color: $--color-brand-primary;
                font-weight: bold;
            }

            &::after {
                background: $--color-brand-primary;
                bottom: 10px;
                content: '';
                height: 2px;
                position: absolute;
                right: 0;
                width: 35%;
            }
        }

        &-title {
            font-size: 3.2rem;
            letter-spacing: 2px;
        }

        &-description {
            margin-top: 15px;

            p {
                font-size: 2rem;
            }
        }

        &-shortcuts {
            display: flex;
            gap: 20px;
            margin-top: 20px;

            a {
                &:hover > svg {
                    fill: $--color-brand-primary;
                }

                svg {
                    height: 32px;
                    transition: all 0.25s ease-in-out;
                    width: 32px;
                }
            }
        }
    }

    @media screen and (max-width: 1600px) {
        &__text-name {
            font-size: 8rem;
        }
    }

    @media screen and (max-width: 1350px) {
        &__container {
            gap: 50px;
        }

        &__text-name {
            font-size: 6rem;
        }
    }

    @media screen and (max-width: 1000px) {
        &__container {
            flex-direction: column;
            gap: 20px;
        }

        &__image {
            flex-basis: 100%;
            max-width: 200px;

            &-content {
                transform: scale(1.1);
            }

            &-img {
                transform: scale(1.1) translateY(-2rem);
            }
        }

        &__text {
            padding: 20px 10px;

            &-name {
                line-height: 8rem;

                &::after {
                    display: none;
                }
            }
        }
    }
}
</style>
