<template>
    <header class="header">
        <div class="header__container">
            <nav class="header__nav">
                <div class="header__links">
                    <router-link to="/">{{ $t('header.home') }}</router-link>
                    <div class="divider"></div>
                    <router-link to="/showcase">{{ $t('header.showcase') }}</router-link>
                </div>
                <div class="language-picker">
                    <button class="language-picker-button" @click="toggleLanguagePicker" ref="languagePickerButtonRef">
                        <div>
                            <icon name="globe-solid" />
                            <span>{{ ucFirst(availableLanguages[currentLanguageIndex].value) }}</span>
                            <svg viewBox="0 0 16 16" class="icon"><polygon points="3,5 8,11 13,5"></polygon></svg>
                        </div>
                    </button>
                    <Transition name="fade">
                        <ul class="language-picker-selector" v-if="isLanguagePickerEnabled" v-on-click-outside="onClickOutsideHandler">
                            <li v-for="(language, index) in availableLanguages" :key="index" @click="changeLanguage(index)">
                                <button :class="{ active: index == currentLanguageIndex }">
                                    {{ ucFirst(language.value) }}
                                </button>
                            </li>
                        </ul>
                    </Transition>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { useI18n } from 'vue-i18n';

const i18n = useI18n({ useScope: 'global' });

const availableLanguages = [
    {
        lang: 'en',
        value: 'english'
    },
    {
        lang: 'pl',
        value: 'polski'
    }
];

const isLanguagePickerEnabled = ref(false);

const currentLanguageIndex = ref(0);

const languagePickerButtonRef = ref(null);

onMounted(() => {
    if (typeof window !== 'undefined') {
        currentLanguageIndex.value = availableLanguages.findIndex((language) => language.lang == navigator.language);
        i18n.locale.value = availableLanguages[currentLanguageIndex.value].lang;
    }
});

const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function changeLanguage(index) {
    currentLanguageIndex.value = index;
    toggleLanguagePicker();
    i18n.locale.value = availableLanguages[currentLanguageIndex.value].lang;
}

function toggleLanguagePicker() {
    isLanguagePickerEnabled.value = !isLanguagePickerEnabled.value;
}

const onClickOutsideHandler = [
    () => {
        toggleLanguagePicker();
    },
    { ignore: [languagePickerButtonRef] }
];
</script>

<style lang="scss" scoped>
.header {
    background: $--color-canvas-variant;
    height: 80px;
    width: 100%;

    &__container {
        height: 100%;
        padding: 10px 40px;
        margin: 0 auto;
        max-width: 1440px;
    }

    &__nav {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: space-between;
        width: 100%;
    }

    &__links {
        align-items: center;
        display: flex;
        height: 100%;

        .divider {
            background: $--color-brand-primary;
            border-radius: 25px;
            height: 75%;
            width: 10px;
        }

        a {
            color: $--color-text-primary-muted-1;
            font-weight: bold;
            overflow: hidden;
            padding: 10px 15px;
            text-decoration: none;
            z-index: 1;

            transition: all 0.25s ease-in-out;
            transition-delay: 0.15s;

            &:first-child {
                padding-left: 20px;
            }

            &:last-child {
                padding-right: 20px;
            }

            &:first-child::after,
            &:last-child::after {
                content: '';
                background: $--color-brand-primary;
                height: 65%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                transition: all 0.25s ease-in-out;
                transition-delay: 0.15s;
                width: 100%;
                z-index: -1;
            }

            &:first-child::after {
                border-radius: 10px 0px 0px 10px;
                right: -100%;
            }

            &:last-child::after {
                border-radius: 0px 10px 10px 0px;
                left: -100%;
            }

            &.active {
                color: $--color-text-inverted;

                &:first-child::after {
                    right: 0;
                }

                &:last-child::after {
                    left: 0;
                }
            }
        }
    }
}

.language-picker {
    &-button {
        background: $--color-canvas;
        border: none;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        font-family: inherit;
        padding: 5px 10px;
        width: 120px;

        div {
            align-items: center;
            display: flex;
            justify-content: center;
        }

        svg {
            height: 16px;
            width: 16px;
        }

        span {
            margin: 0px 5px 0px 10px;
            font-weight: bold;
        }

        @media screen and (max-width: 360px) {
            width: 100%;

            svg {
                margin-left: 10px;
            }

            span {
                display: none;
            }
        }
    }

    &-selector {
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        margin-top: 3px;
        list-style: none;
        overflow: hidden;
        padding: 0px;
        position: absolute;
        width: 100%;
        z-index: 1;

        button {
            background: $--color-canvas;
            border: none;
            color: $--color-text-primary;
            cursor: pointer;
            display: flex;
            font-family: inherit;
            font-size: 1.4rem;
            outline: none;
            padding: 5px 15px;
            transition: all 0.25s ease-in-out;
            width: 100%;

            @media screen and (max-width: 360px) {
                font-size: 1.2rem;
            }

            &:focus-visible,
            &:hover {
                background: $--color-canvas-variant-secondary;
            }

            &.active {
                background: $--color-brand-primary;
                color: $--color-text-inverted;

                &::after {
                    content: '\2713';
                    color: $--color-canvas;
                    margin-left: auto;

                    @media screen and (max-width: 360px) {
                        display: none;
                    }
                }
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
