<template>
    <footer class="footer">
        <div class="footer__container">
            <p>&copy; {{ new Date().getFullYear() }} designed & developed by <a href="https://github.com/PiciuU" target="_blank">Patryk Strzałka</a></p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    width: 100%;

    &__container {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        padding: 10px 15px;
        margin: 0 auto;
        max-width: 1440px;

        p {
            font-size: 1.2rem;
        }

        a {
            color: inherit;
        }
    }
}
</style>
