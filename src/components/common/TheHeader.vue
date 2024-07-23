<template>
    <header class="header">
        <div class="header__container responsive-container">
            <nav class="header__nav">
                <div class="header__links">
                    <router-link to="/">{{ $t('header.home') }}</router-link>
                    <div class="divider"></div>
                    <router-link to="/showcase" :class="{ active: isRouterActive('/showcase') }">{{ $t('header.showcase') }}</router-link>
                </div>
                <div class="language-picker">
                    <button class="language-picker-button" @click="toggleLanguagePicker" ref="languagePickerButtonRef">
                        <div>
                            <icon name="globe" />
                            <span>{{ ucFirst(dataStore.getCurrentLanguage.name) }}</span>
                            <svg viewBox="0 0 16 16" class="icon"><polygon points="3,5 8,11 13,5"></polygon></svg>
                        </div>
                    </button>
                    <Transition name="fade">
                        <ul class="language-picker-selector" v-if="isLanguagePickerEnabled" v-on-click-outside="onClickOutsideHandler">
                            <li v-for="(language, index) in dataStore.getAvailableLanguages" :key="index" @click="changeLanguage(language)">
                                <button :class="{ active: language.lang == dataStore.getCurrentLanguage.lang }">
                                    {{ ucFirst(language.name) }}
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
import { useRoute } from 'vue-router';
import { useDataStore } from '@/stores/DataStore';

const i18n = useI18n({ useScope: 'global' });
const route = useRoute();
const dataStore = useDataStore();

const isLanguagePickerEnabled = ref(false);
const languagePickerButtonRef = ref(null);

onMounted(() => {
    if (typeof window !== 'undefined') {
        const browserLang = navigator.language.split('-')[0];
        dataStore.currentLanguage = dataStore.getAvailableLanguages.find((language) => language.lang === browserLang) || dataStore.getAvailableLanguages[0];
    } else {
        dataStore.currentLanguage = dataStore.getAvailableLanguages[0];
    }

    i18n.locale.value = dataStore.currentLanguage.lang;
});

const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function changeLanguage(language) {
    dataStore.currentLanguage = language;
    i18n.locale.value = language.lang;
    toggleLanguagePicker();
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

function isRouterActive(path) {
    return route.path.startsWith(path);
}
</script>

<style lang="scss" scoped>
.header {
    background: $--color-canvas-variant;
    height: 100px;
    width: 100%;

    &__container {
        padding: 20px 40px;
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

@media screen and (max-width: 450px) {
    .header {
        height: 150px;
    }

    .header__nav {
        flex-direction: column-reverse;
        gap: 15px;
        justify-content: center;

        .language-picker {
            width: 100%;

            &-button {
                width: 100%;
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
