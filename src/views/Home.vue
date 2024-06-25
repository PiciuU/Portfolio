<template>
    <main>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <ContactSection />
    </main>
</template>

<script setup>
import HeroSection from '@/components/Home/Hero.vue';
import AboutSection from '@/components/Home/About.vue';
import ProjectSection from '@/components/Home/Projects.vue';
import ContactSection from '@/components/Home/Contact.vue';
</script>

<style lang="scss">
section .container {
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
}

@media screen and (max-width: 1600px) {
    section .container {
        max-width: 1200px;
    }
}

@media screen and (max-width: 1350px) {
    section .container {
        max-width: 1000px;
    }
}

@media screen and (max-width: 1000px) {
    section .container {
        max-width: 100%;
    }
}
</style>
