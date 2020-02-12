<template>
    <div>
        <ul class="languages">
            <li
                class="languages__item"
                v-for="(language, index) in languages"
                :key="index"
            >
                <button @click="changeLanguage(language.code)">
                    <img
                        class="languages__image"
                        :src="language.flag"
                        :alt="language.code"
                        :title="language.code"
                    >
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data: () => ({
        languages: [
            {
                code: 'en',
                flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png',
            },
            {
                code: 'ptbr',
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1024px-Flag_of_Brazil.svg.png',
            },
        ],
    }),

    methods: {
        changeLanguage (languageCode) {
           this.$i18n.locale = languageCode;
        },
    },
};
</script>
