<template>
    <section class="contact">
        <div class="contact__divider">
            <div class="contact__divider-top"></div>
            <div class="contact__divider-bottom"></div>
        </div>
        <div class="contact__container responsive-container">
            <div class="contact__heading">
                <h3 :data-text="$t('contact.title')">{{ $t('contact.title') }}</h3>
                <h4>{{ $t('contact.description') }}</h4>
            </div>
            <div class="contact__details">
                <div class="contact__items">
                    <div class="contact__item">
                        <div class="contact__icon">
                            <icon name="house" />
                        </div>
                        <div class="contact__text">
                            <h4>{{ $t('contact.localization') }}</h4>
                            <p>Rzeszów, Poland</p>
                        </div>
                    </div>
                    <div class="contact__item">
                        <div class="contact__icon">
                            <icon name="envelope" />
                        </div>
                        <div class="contact__text">
                            <h4>Email</h4>
                            <a href="mailto:patrykstrzalka00@gmail.com">patrykstrzalka00@gmail.com</a>
                        </div>
                    </div>
                    <div class="contact__item">
                        <div class="contact__icon">
                            <icon name="linkedin" />
                        </div>
                        <div class="contact__text">
                            <h4>LinkedIn</h4>
                            <a href="https://www.linkedin.com/in/patryk-strzalka/" target="_blank">/in/patryk-strzalka/</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.contact {
    &__divider {
        background: $--color-canvas-inverted;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;

        &-top {
            background: $--color-canvas;
            clip-path: polygon(0 -1px, 100% -1px, 100% calc(100% - 80px), 50% 100%, 0 calc(100% - 80px));
            height: 80px;
        }

        &-bottom {
            background: $--color-canvas;
            clip-path: polygon(0 0, 50% 80px, 100% 0, 100% 101%, 0 101%);
            height: 80px;
            margin-top: -65px;
        }
    }

    &__container {
        overflow: hidden;
    }

    &__heading {
        margin-bottom: 50px;
        margin-top: 120px;
        text-align: center;

        h3 {
            font-size: clamp(3rem, 10vw, 6rem);
            font-weight: bold;
            z-index: 1;

            &::before {
                color: $--color-canvas-variant;
                content: attr(data-text);
                font-size: clamp(3rem, 10vw, 6rem);
                font-weight: bold;
                left: 50%;
                letter-spacing: 2px;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -55%) scale(1.25);
                width: 100%;
                z-index: -1;
            }
        }

        h4 {
            color: $--color-text-primary-muted-1;
            margin-top: 10px;
        }
    }

    &__details {
        margin-bottom: 25px;
    }

    &__items {
        display: grid;
        gap: 50px;
        grid-template-columns: repeat(3, 1fr);
        place-items: center;
    }

    &__item {
        align-items: center;
        display: flex;
    }

    &__icon {
        align-items: center;
        border: 3px solid $--color-text-primary;
        border-radius: 50%;
        display: flex;
        height: 70px;
        justify-content: center;
        transition: all 0.4s ease-in-out;
        width: 70px;

        &:hover {
            background: $--color-text-primary;

            svg {
                filter: invert(1);
                transform: scale(0.85);
            }
        }

        svg {
            height: 32px;
            transition: all 0.25s linear;
            width: 32px;
        }
    }

    &__text {
        margin-left: 20px;

        h4 {
            color: $--color-brand-primary;
            font-size: 3.2rem;
            font-weight: bold;
        }

        a {
            color: inherit;
        }
    }
}

@media screen and (max-width: 1000px) {
    .contact__items {
        grid-template-columns: 1fr;
    }

    .contact__item {
        max-width: 350px;
        width: 100%;
    }
}
</style>
