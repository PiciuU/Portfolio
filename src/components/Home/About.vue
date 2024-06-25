<template>
    <section class="about">
        <div class="about__background-wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                    d="M0,192L48,197.3C96,203,192,213,288,218.7C384,224,480,224,576,208C672,192,768,160,864,170.7C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
        </div>
        <div class="about__container container">
            <div class="about__heading">
                <h3 :data-text="$t('about.title')">{{ $t('about.title') }}</h3>
            </div>
            <div class="about__content">
                <div class="about__details">
                    <div class="about__technologies">
                        <div class="about__technology" v-for="technology in technologies" :key="technology" @mousemove="handleMouseMove" @mouseout="handleMouseOut">{{ technology }}</div>
                    </div>
                    <div class="about__description">
                        <p>
                            {{ $t('about.description') }}
                        </p>
                    </div>
                </div>
                <div class="about__image">
                    <img src="@/assets/images/illustration.png" alt="Illustration with Vue and Laravel logo" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const technologies = ['Vue', 'Laravel', 'PHP', 'JavaScript', 'C#', 'CSS', 'HTML', 'SASS', 'Element Plus', 'MySQL', 'MariaDB', 'Git', 'GitHub', 'Postman', 'Figma', 'Visual Studio Code', 'Unity 3D'];

function handleMouseMove(e) {
    const element = e.currentTarget;

    const { clientWidth, clientHeight } = element;

    const xRotation = -30 * ((e.layerY - clientHeight / 2) / clientHeight);
    const yRotation = 30 * ((e.layerX - clientWidth / 2) / clientWidth);

    element.style.transform = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
}

function handleMouseOut(e) {
    e.currentTarget.style.transform = '';
}
</script>

<style lang="scss" scoped>
.about {
    &__container {
        overflow: hidden;
        padding: 40px;
        width: 100%;
    }

    &__background-wave {
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

    &__heading {
        margin-bottom: 50px;
        margin-top: 6vw;
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
    }

    &__content {
        align-items: flex-start;
        display: flex;
        gap: 100px;
    }

    &__details {
        flex: 1;
    }

    &__technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }

    &__technology {
        backface-visibility: hidden;
        background: $--color-canvas-inverted;
        border-radius: 5px;
        color: $--color-text-inverted;
        cursor: default;
        padding: 5px 10px;
        transition: transform 0.1s ease;
        -webkit-font-smoothing: subpixel-antialiased;
    }

    &__description {
        margin-top: 30px;
    }

    &__image {
        flex-basis: 25%;

        img {
            height: 100%;
            width: 100%;
        }
    }

    @media screen and (max-width: 1000px) {
        &__image {
            display: none;
        }
    }
}
</style>
